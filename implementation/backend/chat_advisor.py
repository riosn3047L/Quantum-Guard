import os
import json
import requests

SYSTEM_PROMPT = """You are QuantumGuard Security Advisor, a Senior Security Engineer specializing in TLS/SSL configurations, post-quantum cryptography (PQC), and web PKI.

RULES:
- You ONLY discuss the provided scan report and general web/TLS security topics.
- If the user asks about anything unrelated (cooking, games, coding unrelated to security), politely decline: "I'm specialized in analyzing your QuantumGuard scan results. Let's focus on securing your infrastructure!"
- Always reference specific findings from the report (hostnames, cipher suites, scores) when giving advice.
- Provide step-by-step remediation with exact config snippets (Nginx, Apache, HAProxy) when applicable.
- Use markdown formatting: headers, bold, code blocks, numbered lists.
- Be concise but thorough. Prioritize critical vulnerabilities first.
"""

# Max context size in characters to prevent token overflow
MAX_CONTEXT_CHARS = 8000


def build_llm_payload(report_context, chat_history, user_message):
    """
    Builds the Gemini API payload.
    chat_history is a list of dicts: [{'role': 'user'|'model', 'content': '...'}, ...]
    """
    contents = []

    # Trim context to stay within token limits
    context_json = json.dumps(report_context)
    if len(context_json) > MAX_CONTEXT_CHARS:
        context_json = context_json[:MAX_CONTEXT_CHARS] + '...(truncated)'

    context_part = f"SCAN REPORT DATA:\n{context_json}\n\n"

    for msg in chat_history:
        role = "user" if msg.get('role') == "user" else "model"
        contents.append({
            "role": role,
            "parts": [{"text": msg.get('content', '')}]
        })

    # Append the new message with context
    contents.append({
        "role": "user",
        "parts": [{"text": context_part + "USER MESSAGE: " + user_message}]
    })

    return {
        "system_instruction": {"parts": [{"text": SYSTEM_PROMPT}]},
        "contents": contents
    }


def call_gemini_stream(payload):
    """
    Generator that calls the Gemini API with streaming and yields text chunks.
    Includes timeout and robust error handling.
    """
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        yield "[ERROR] GEMINI_API_KEY environment variable is not set on the server."
        return

    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:streamGenerateContent?alt=sse&key={api_key}"
    headers = {'Content-Type': 'application/json'}

    print(f"[ChatAdvisor] Calling Gemini API...")
    print(f"[ChatAdvisor] Payload size: {len(json.dumps(payload))} chars")

    try:
        response = requests.post(
            url,
            headers=headers,
            json=payload,
            stream=True,
            timeout=(10, 120)  # 10s connect timeout, 120s read timeout
        )
        response.raise_for_status()

        chunk_count = 0
        for line in response.iter_lines():
            if line:
                decoded_line = line.decode('utf-8')
                if decoded_line.startswith("data: "):
                    data_str = decoded_line[6:]
                    if data_str.strip() == "[DONE]":
                        break
                    try:
                        chunk = json.loads(data_str)
                        if "candidates" in chunk and len(chunk["candidates"]) > 0:
                            parts = chunk["candidates"][0].get("content", {}).get("parts", [])
                            if parts:
                                text = parts[0].get("text", "")
                                if text:
                                    chunk_count += 1
                                    yield text
                    except json.JSONDecodeError:
                        continue

        print(f"[ChatAdvisor] Stream complete. Yielded {chunk_count} chunks.")

    except requests.exceptions.ConnectTimeout:
        print("[ChatAdvisor] ERROR: Connection to Gemini API timed out.")
        yield "\n\n**Error:** Connection to the AI service timed out. Please try again."
    except requests.exceptions.ReadTimeout:
        print("[ChatAdvisor] ERROR: Read timeout from Gemini API.")
        yield "\n\n**Error:** The AI took too long to respond. Please try a shorter question."
    except requests.exceptions.HTTPError as e:
        error_body = e.response.text if e.response else "No response body"
        print(f"[ChatAdvisor] HTTP ERROR {e.response.status_code}: {error_body}")
        # Try to parse the error message if it's JSON
        try:
            err_json = e.response.json()
            err_msg = err_json.get('error', {}).get('message', error_body)
            yield f"\n\n**API Error ({e.response.status_code}):** {err_msg[:500]}"
        except:
            yield f"\n\n**API Error ({e.response.status_code}):** {error_body[:200]}"
    except requests.exceptions.ConnectionError:
        print("[ChatAdvisor] ERROR: Could not connect to Gemini API.")
        yield "\n\n**Error:** Could not connect to the AI service. Check your internet connection."
    except Exception as e:
        print(f"[ChatAdvisor] UNEXPECTED ERROR: {type(e).__name__}: {str(e)}")
        yield f"\n\n**Error:** {str(e)}"
