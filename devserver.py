#!/usr/bin/env python3
"""Local preview server for toUnknown.

Serves the repo statically and proxies /api/* to the live VPS, so the local app
is same-origin end to end — gated audio streams and range requests work exactly
as they do in production.

    python3 devserver.py [port]     # default 4173
"""
import http.server, socketserver, ssl, sys, urllib.request, urllib.error

ROOT = "/Users/clown/Desktop/toUnknown.Com"
UPSTREAM = "https://srv1873771.hstgr.cloud"
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 4173
HOP = {"connection", "keep-alive", "transfer-encoding", "upgrade", "content-encoding"}

# This Python has no system CA bundle; certifi supplies one for the upstream TLS.
try:
    import certifi
    SSL_CTX = ssl.create_default_context(cafile=certifi.where())
except ImportError:
    SSL_CTX = ssl._create_unverified_context()
    print("! certifi missing — upstream TLS is not verified (local dev only)")


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw):
        super().__init__(*a, directory=ROOT, **kw)

    def _proxy(self, body=None):
        url = UPSTREAM + self.path
        req = urllib.request.Request(url, data=body, method=self.command)
        for h in ("Range", "Authorization", "Content-Type", "Accept"):
            if self.headers.get(h):
                req.add_header(h, self.headers[h])
        try:
            with urllib.request.urlopen(req, context=SSL_CTX) as up:
                self.send_response(up.status)
                for k, v in up.headers.items():
                    if k.lower() not in HOP:
                        self.send_header(k, v)
                self.end_headers()
                while chunk := up.read(65536):
                    self.wfile.write(chunk)
        except urllib.error.HTTPError as e:
            payload = e.read()
            self.send_response(e.code)
            self.send_header("Content-Type", e.headers.get("Content-Type", "application/json"))
            self.send_header("Content-Length", str(len(payload)))
            self.end_headers()
            self.wfile.write(payload)
        except Exception as e:
            self.send_error(502, str(e))

    def do_GET(self):
        if self.path.startswith("/api/"):
            return self._proxy()
        return super().do_GET()

    def do_POST(self):
        if self.path.startswith("/api/"):
            n = int(self.headers.get("Content-Length") or 0)
            return self._proxy(self.rfile.read(n) if n else b"")
        self.send_error(405)

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def log_message(self, fmt, *args):
        first = str(args[0]) if args else ""
        if "/api/" in first or "code 5" in first:
            super().log_message(fmt, *args)


class Server(socketserver.ThreadingTCPServer):
    allow_reuse_address = True
    daemon_threads = True


if __name__ == "__main__":
    with Server(("127.0.0.1", PORT), Handler) as httpd:
        print(f"toUnknown dev server → http://localhost:{PORT}/webapp/ui_kits/app/")
        print(f"  /api/* proxied to {UPSTREAM}")
        httpd.serve_forever()
