from firebase_functions import https_fn
from firebase_admin import initialize_app
from flask import Flask, request, make_response
from tls_api_server import app as flask_app

# Initialize Firebase Admin
initialize_app()

# Using secrets=['GEMINI_API_KEY'] will make the secret available 
# as an environment variable in the function.
# invoker="public" allows unauthenticated access.
@https_fn.on_request(secrets=['GEMINI_API_KEY'], invoker="public", timeout_sec=120)
def api(req: https_fn.Request) -> https_fn.Response:
    """
    Firebase Cloud Function entry point for QuantumGuard.
    Handles routing from Firebase Hosting rewrites (/api/**).
    """
    # Create a WSGI environment from the request
    environ = req.environ.copy()
    
    # Firebase Hosting rewrites /api/* to the function.
    original_path = req.path
    if original_path.startswith('/api'):
        new_path = original_path[4:] or '/'
        environ['PATH_INFO'] = new_path
        environ['SCRIPT_NAME'] = '/api'
    
    # WSGI Bridge to Flask
    response_headers = []
    response_status = [None]

    def start_response(status, headers, exc_info=None):
        response_status[0] = status
        response_headers.extend(headers)

    app_iter = flask_app(environ, start_response)
    try:
        response_body = b''.join(app_iter)
    finally:
        if hasattr(app_iter, 'close'):
            app_iter.close()

    # Create the Firebase/Functions response object
    status_code = int(response_status[0].split()[0])
    
    return https_fn.Response(
        response=response_body,
        status=status_code,
        headers=dict(response_headers)
    )
