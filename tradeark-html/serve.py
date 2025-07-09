#!/usr/bin/env python3
"""
Simple HTTP server for the TradeArk HTML website
Usage: python serve.py [port]
Default port: 8000
"""

import sys
import os
import http.server
import socketserver
import webbrowser
from pathlib import Path

def main():
    # Get port from command line argument or use default
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    
    # Change to the directory containing this script
    os.chdir(Path(__file__).parent)
    
    # Create server
    handler = http.server.SimpleHTTPRequestHandler
    
    # Add CORS headers for local development
    class CORSHandler(handler):
        def end_headers(self):
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            super().end_headers()
    
    with socketserver.TCPServer(("", port), CORSHandler) as httpd:
        print(f"TradeArk HTML Website Server")
        print(f"Serving at http://localhost:{port}")
        print(f"Press Ctrl+C to stop the server")
        
        # Try to open browser
        try:
            webbrowser.open(f"http://localhost:{port}")
        except:
            pass
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")

if __name__ == "__main__":
    main()