import http.server
import socketserver
import os

current_folder = os.getcwd()
my_html_folder_path = os.path.join(current_folder, "../Pages")
my_home_page_file_path = '../index.html'

# Set the host and port number to use (e.g., "localhost" and 8000)
host = "localhost"
port = 8000

# Change to the specified directory
os.chdir(my_html_folder_path)

# Create a simple HTTP server
handler = http.server.SimpleHTTPRequestHandler

# Use a socket server with the chosen host and port
httpd = socketserver.TCPServer((host, port), handler)

print(f"Serving on http://{host}:{port}")
# Start the server
httpd.serve_forever()