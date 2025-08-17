#!/usr/bin/env python3
import os
import sys
import json
import http.server
import socketserver
from urllib.parse import urlparse
import re

class TradeArkHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        parsed_path = urlparse(self.path)
        
        # Handle reCAPTCHA configuration endpoint
        if parsed_path.path == '/api/recaptcha-config':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            site_key = os.environ.get('RECAPTCHA_SITE_KEY', '')
            response_data = {
                'siteKey': site_key,
                'success': bool(site_key)
            }
            
            self.wfile.write(json.dumps(response_data).encode())
            return
            
        # For HTML files, inject reCAPTCHA site key
        if self.path.endswith('.html') or self.path == '/':
            file_path = 'index.html' if self.path == '/' else self.path.lstrip('/')
            
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Replace empty data-sitekey attributes with actual site key
                site_key = os.environ.get('RECAPTCHA_SITE_KEY', '')
                if site_key:
                    content = content.replace('data-sitekey=""', f'data-sitekey="{site_key}"')
                
                self.send_response(200)
                self.send_header('Content-type', 'text/html; charset=utf-8')
                self.send_header('Content-Length', str(len(content.encode('utf-8'))))
                self.end_headers()
                self.wfile.write(content.encode('utf-8'))
                return
                
            except FileNotFoundError:
                pass
        
        # Default behavior for other files
        super().do_GET()

def inject_recaptcha_keys():
    """Inject reCAPTCHA site key into HTML files"""
    site_key = os.environ.get('RECAPTCHA_SITE_KEY', '')
    if not site_key:
        print("Warning: RECAPTCHA_SITE_KEY not found in environment variables")
        return
    
    html_files = ['index.html', 'products/makhana.html', 'products/horeca.html']
    
    for file_path in html_files:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Replace empty data-sitekey attributes
            updated_content = content.replace('data-sitekey=""', f'data-sitekey="{site_key}"')
            
            if updated_content != content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(updated_content)
                print(f"Updated reCAPTCHA site key in {file_path}")
                
        except FileNotFoundError:
            print(f"Warning: {file_path} not found")
        except Exception as e:
            print(f"Error updating {file_path}: {e}")

if __name__ == "__main__":
    # Inject reCAPTCHA keys on startup
    inject_recaptcha_keys()
    
    PORT = 5000
    print(f"Starting TradeArk server on http://0.0.0.0:{PORT}")
    
    with socketserver.TCPServer(("0.0.0.0", PORT), TradeArkHandler) as httpd:
        print(f"Server running at http://0.0.0.0:{PORT}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")