"""
QuantumGuard TLS API Server
Flask API exposing SSLyze scanning via HTTP endpoints.
"""

import json
from flask import Flask, request, jsonify
from flask_cors import CORS

from sslyze_scanner import scan_host

app = Flask(__name__)
CORS(app)


@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok', 'service': 'QuantumGuard TLS Scanner API'})


@app.route('/scan', methods=['POST'])
def scan():
    """Run an SSLyze scan against a hostname."""
    data = request.get_json()
    if not data or 'hostname' not in data:
        return jsonify({'error': 'Missing required field: hostname'}), 400

    hostname = data['hostname'].strip()
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
        result = scan_host(hostname, port)
        return jsonify(result)
    except Exception as e:
        return jsonify({
            'error': f'Scan failed: {str(e)}',
            'hostname': hostname,
            'port': port,
            'status': 'error',
        }), 500


if __name__ == '__main__':
    print("=" * 60)
    print("  QuantumGuard TLS Scanner API")
    print("  Starting on http://localhost:5000")
    print("=" * 60)
    app.run(host='0.0.0.0', port=5000, debug=True)
