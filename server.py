#!/usr/bin/env python3
import os
import json
import http.server
import socketserver
from urllib.parse import urlparse, parse_qs

class RecaptchaHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        parsed_path = urlparse(self.path)
        
        # Handle reCAPTCHA configuration endpoint
        if parsed_path.path == '/api/recaptcha-config':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            # Get site key from environment
            site_key = os.environ.get('RECAPTCHA_SITE_KEY', '')
            
            response_data = {
                'siteKey': site_key,
                'success': bool(site_key)
            }
            
            self.wfile.write(json.dumps(response_data).encode())
            return
        
        # Default behavior for static files
        super().do_GET()

if __name__ == "__main__":
    PORT = 5000
    
    with socketserver.TCPServer(("0.0.0.0", PORT), RecaptchaHandler) as httpd:
        print(f"Serving at http://0.0.0.0:{PORT}")
        httpd.serve_forever()