# Import necessary modules
# dbmanager is for the backend API
# webserver is for the http serverI
# multiprocessing is for parallelising the two processesI
from dbmanager import api_server
from webserver import http_server
import multiprocessing
import argparse


# Check if the script is the main entry point
if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="runs the server functions for AmazonLeaf")

    # Define command-line arguments
    parser.add_argument('--host_web', default='localhost', help='Host WEB address (default: localhost).')
    parser.add_argument('--port_web', type=int, default=80, help='Port WEB number (default: 80).')
    # Parse the command-line arguments
    args = parser.parse_args()

    # Create a list to store the spawned processes
    processes = []

    # Create a multiprocessing manager to share data between processes
    manager = multiprocessing.Manager()

    # Spawn a process for the HTTP server on localhost and port 80
    process = multiprocessing.Process(target=http_server, args=(args.host_web, args.port_web))
    processes.append(process)
    process.start()

    # Spawn a process for the API server on localhost and port 10000
    process = multiprocessing.Process(target=api_server, args=(False, "localhost", 10000))
    processes.append(process)
    process.start()

    # Wait for all spawned processes to finish before proceeding
    for process in processes:
        process.join()
