import urllib.request
import json

data = json.dumps({"hostname": "cloudflare.com", "port": 443}).encode("utf-8")
req = urllib.request.Request("http://localhost:5000/scan", data=data, headers={"Content-Type": "application/json"})
with urllib.request.urlopen(req) as f:
    res = json.loads(f.read().decode("utf-8"))

print("TLS 1.3 Supported:", res.get("protocol_support", {}).get("tls_1_3", {}).get("supported"))
print("Cipher Suites count:", len(res.get("protocol_support", {}).get("tls_1_3", {}).get("cipher_suites", [])))
print("Mozilla Compliance:", res.get("mozilla_compliance"))
print("Errors:", res.get("errors"))
