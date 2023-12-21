# Import necessary modules
import http.server
import socketserver
import os

# Define main function
def http_server(host, port):
    current_folder = os.getcwd() # Get the current folder
    my_html_folder_path = os.path.join(current_folder, "../Pages") # Goes one folder above and attatches the Pages folder


    # Change to the specified directory
    os.chdir(my_html_folder_path)

    # Create a simple HTTP server
    handler = http.server.SimpleHTTPRequestHandler

    # Use a socket server with the chosen host and port
    httpd = socketserver.TCPServer((host, port), handler)

    print(f"Serving on http://{host}:{port}")

    # Start the server
    httpd.serve_forever()

if __name__ == "__main__":
    http_server("localhost", 80)