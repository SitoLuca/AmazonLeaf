# Import necessary modules
# dbmanager is for the backend API
# webserver is for the http serverI
# multiprocessing is for parallelising the two processesI
from dbmanager import api_server
from webserver import http_server
import multiprocessing

# Check if the script is the main entry point
if __name__ == "__main__":
    # Create a list to store the spawned processes
    processes = []

    # Create a multiprocessing manager to share data between processes
    manager = multiprocessing.Manager()

    # Spawn a process for the HTTP server on localhost and port 80
    process = multiprocessing.Process(target=http_server, args=("localhost", 80))
    processes.append(process)
    process.start()

    # Spawn a process for the API server on localhost and port 10000
    process = multiprocessing.Process(target=api_server, args=(False, "localhost", 10000))
    processes.append(process)
    process.start()

    # Wait for all spawned processes to finish before proceeding
    for process in processes:
        process.join()
