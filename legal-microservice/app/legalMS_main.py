import threading
import time
import LegalMS_grpc  # Client 1: Legal Microservice


# import ValueMS_grpc  # client 2: Value Microservice
# import ProximityMS_grpc # client 3: Proximity Microservice

def start_client(client_module):
    """Starts a gRPC client in a separate thread."""
    client_thread = threading.Thread(target=client_module.serve)  # Call the serve() function
    client_thread.start()

    # may have to add a '.join()' call if the threads fail to start


if __name__ == "__main__":
    # Start each client in its own thread
    start_client(LegalMS_grpc)
    # start_client(ProximityMS_grpc) #has its own 'serve()' method
    # start_client(ValueMS_grpc) #has its own 'serve()' method

    # should add the master microservice as a client?

    # Keep the main thread running until interrupted
    try:
        while True:
            time.sleep(10)  # Adjust sleep time as needed
    except KeyboardInterrupt:
        pass
