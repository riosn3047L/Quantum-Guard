"""
QuantumGuard TLS API Server
Flask API exposing SSLyze scanning and Gemini Chat Advisor via HTTP endpoints.
"""

import json
import os
import threading
from flask import Flask, request, jsonify, Response, stream_with_context
from flask_cors import CORS
from firebase_admin import firestore

from sslyze_scanner import scan_host
from chat_advisor import build_llm_payload, call_gemini_stream
from subdomain_discovery import discover_subdomains

app = Flask(__name__)
# In production, restrict CORS to your domain
CORS(app)

def store_scan_result(result, is_subdomain=False, parent_domain=None):
    """Stores scan results in Firestore leaderboard collection."""
    try:
        db = firestore.client()
        domain = result.get('hostname')
        if not domain:
            return

        # Prepare document data
        doc_data = {
            'domain': domain,
            'score': result.get('quantum_score', 0),
            'maturity_level': _get_maturity_level(result.get('quantum_score', 0)),
            'timestamp': result.get('timestamp'),
            'is_subdomain': is_subdomain,
            'parent_domain': parent_domain,
            'report': result
        }

        # Store in Firestore using domain as ID to prevent redundancy
        db.collection('leaderboard').document(domain).set(doc_data)
        print(f"[Firestore] Stored result for {domain}")
    except Exception as e:
        print(f"[Firestore] Error storing result for {domain}: {str(e)}")

def _get_maturity_level(score):
    if score >= 90: return 'Quantum Core'
    if score >= 70: return 'PQC Ready'
    if score >= 50: return 'Transitioning'
    return 'Legacy'

def scan_subdomains_async(domain):
    """Discover and scan subdomains in the background."""
    print(f"[SubdomainScan] Starting discovery for {domain}...")
    try:
        discovery = discover_subdomains(domain)
        # Limit to 10 subdomains to stay within function limits
        subdomains = [s['name'] for s in discovery.get('subdomains', []) if s['active']][:10]
        
        for sub in subdomains:
            print(f"[SubdomainScan] Scanning {sub}...")
            try:
                sub_result = scan_host(sub)
                if sub_result.get('status') == 'completed':
                    store_scan_result(sub_result, is_subdomain=True, parent_domain=domain)
            except Exception as e:
                print(f"[SubdomainScan] Failed to scan {sub}: {str(e)}")
    except Exception as e:
        print(f"[SubdomainScan] Discovery error for {domain}: {str(e)}")

@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        'status': 'ok', 
        'service': 'QuantumGuard API',
        'capabilities': ['tls_scan', 'chat_advisor', 'subdomain_discovery', 'leaderboard_sync']
    })

@app.route('/scan', methods=['POST'])
def scan():
    """Run an SSLyze scan against a hostname with background subdomain scanning."""
    data = request.get_json()
    if not data or 'hostname' not in data:
        return jsonify({'error': 'Missing required field: hostname'}), 400

    hostname = data['hostname'].strip().lower()
    port = int(data.get('port', 443))

    if not hostname:
        return jsonify({'error': 'Hostname cannot be empty'}), 400

    # Strip protocol prefixes if provided
    for prefix in ['https://', 'http://']:
        if hostname.startswith(prefix):
            hostname = hostname[len(prefix):]
    # Strip trailing slashes and paths
    hostname = hostname.split('/')[0]
    # Strip port if provided in hostname
    if ':' in hostname:
        parts = hostname.split(':')
        hostname = parts[0]
        try:
            port = int(parts[1])
        except ValueError:
            pass

    try:
        # 1. Scan the main domain
        result = scan_host(hostname, port)
        
        # 2. Store main result in Firestore and scan subdomains in background
        if result.get('status') == 'completed':
            store_scan_result(result)
            threading.Thread(target=scan_subdomains_async, args=(hostname,)).start()

        return jsonify(result)
    except Exception as e:
        return jsonify({
            'error': f'Scan failed: {str(e)}',
            'hostname': hostname,
            'port': port,
            'status': 'error',
        }), 500

@app.route('/chat', methods=['POST'])
def chat():
    """Context-aware security chat advisor."""
    data = request.get_json()
    if not data or 'message' not in data:
        return jsonify({'error': 'Missing required field: message'}), 400

    user_message = data.get('message')
    report_context = data.get('reportContext', {})
    chat_history = data.get('history', [])

    payload = build_llm_payload(report_context, chat_history, user_message)

    def generate():
        for chunk in call_gemini_stream(payload):
            yield chunk

    return Response(stream_with_context(generate()), mimetype='text/plain')

if __name__ == '__main__':
    # Determine port from environment or default to 5000
    port = int(os.environ.get('PORT', 5000))
    # In production, set debug=False
    debug_mode = os.environ.get('FLASK_DEBUG', 'True').lower() == 'true'
    
    print("=" * 60)
    print(f"  QuantumGuard API Server")
    print(f"  Running on http://0.0.0.0:{port}")
    print(f"  Debug Mode: {debug_mode}")
    print("=" * 60)
    
    app.run(host='0.0.0.0', port=port, debug=debug_mode)
