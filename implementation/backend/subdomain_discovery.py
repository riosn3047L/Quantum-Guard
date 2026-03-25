import time
import socket
import logging
import concurrent.futures
import requests

from typing import Dict, List, Any

# Simple in-memory cache to avoid spamming crt.sh for repeated queries requests
_CACHE: Dict[str, Dict[str, Any]] = {}
CACHE_TTL = 300  # 5 minutes

logger = logging.getLogger(__name__)

def _resolve_host(hostname: str, timeout: int = 2) -> Dict[str, Any]:
    """Resolve a single hostname to see if it's active."""
    start_time = time.time()
    try:
        # Use a short timeout for socket address resolution
        socket.setdefaulttimeout(timeout)
        ip = socket.gethostbyname(hostname)
        return {"name": hostname, "active": True, "ip": ip, "resolve_time": time.time() - start_time}
    except socket.gaierror:
        # Host could not be resolved
        return {"name": hostname, "active": False, "ip": None, "resolve_time": time.time() - start_time}
    except Exception as e:
        logger.debug(f"Error resolving {hostname}: {e}")
        return {"name": hostname, "active": False, "ip": None, "resolve_time": time.time() - start_time}


def discover_subdomains(domain: str, timeout: int = 5) -> Dict[str, Any]:
    """
    Discover subdomains for a given root domain using crt.sh Certificate Transparency logs.
    Then, concurrently verify which subdomains are active (resolvable via DNS).
    """
    domain = domain.strip().lower()

    # Check cache first
    now = time.time()
    if domain in _CACHE:
        cached_data = _CACHE[domain]
        if now - cached_data['cached_at'] < CACHE_TTL:
            return cached_data['data']

    start_time = time.time()
    discovered_names = set()

    # 1. Query crt.sh for subdomains
    try:
        url = f"https://crt.sh/?q=%.{domain}&output=json"
        headers = {'User-Agent': 'QuantumGuard/1.0'}
        
        # Adding a timeout for the API request
        response = requests.get(url, headers=headers, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            for entry in data:
                # 'name_value' can contain multiple names separated by newlines
                names = entry.get('name_value', '').split('\\n')
                for name in names:
                    name = name.strip().lower()
                    # Filter out wildcard certificates (*.domain.com) and exact main domain
                    if name and not name.startswith('*') and name != domain and name.endswith(domain):
                        discovered_names.add(name)
        else:
            logger.warning(f"crt.sh API returned status code {response.status_code}")
    except Exception as e:
        logger.error(f"Error fetching subdomains from crt.sh: {e}")
    
    # Optional: Cap subdomains to max 50 to prevent abuse and excessive scanning times
    discovered_names = list(discovered_names)[:50]
    total_found = len(discovered_names)

    # 2. Concurrently check DNS liveness
    subdomain_results = []
    active_count = 0
    
    if total_found > 0:
        # Use ThreadPoolExecutor to check many subdomains simultaneously
        with concurrent.futures.ThreadPoolExecutor(max_workers=20) as executor:
            # Submit all tasks
            future_to_host = {executor.submit(_resolve_host, host): host for host in discovered_names}
            
            for future in concurrent.futures.as_completed(future_to_host):
                try:
                    res = future.result()
                    subdomain_results.append(res)
                    if res['active']:
                        active_count += 1
                except Exception as exc:
                    host = future_to_host[future]
                    logger.debug(f"{host} generated an exception during resolution: {exc}")
                    subdomain_results.append({"name": host, "active": False, "ip": None})
    
    # Sort results explicitly placing active ones first, then alphabetically
    subdomain_results.sort(key=lambda x: (not x['active'], x['name']))

    result_data = {
        'domain': domain,
        'subdomains': subdomain_results,
        'total_found': total_found,
        'active_count': active_count,
        'source': 'crt.sh',
        'discovery_duration': round(time.time() - start_time, 2)
    }

    # Cache the result
    _CACHE[domain] = {'data': result_data, 'cached_at': now}

    return result_data

if __name__ == '__main__':
    # Simple CLI test
    import sys
    import json
    logging.basicConfig(level=logging.INFO)
    test_domain = sys.argv[1] if len(sys.argv) > 1 else 'cloudflare.com'
    print(f"Discovering subdomains for {test_domain}...")
    res = discover_subdomains(test_domain)
    print(json.dumps(res, indent=2))
