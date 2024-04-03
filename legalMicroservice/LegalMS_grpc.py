import grpc
import legalMicroservice_pb2
import legalMicroservice_pb2_grpc
import LegalMS_dataset
import logging
from concurrent import futures


class LegalMS(legalMicroservice_pb2_grpc.legalMicroserviceServicer):
    def getLocations(self, request, context):
        result = LegalMS_dataset.get_location_access_type(request.locations)  # expected : string
        return legalMicroservice_pb2.LocationStatus(status=result)

    def availableLocations(self, request, context):
        result_arr = LegalMS_dataset.get_avail_locations()  # expected: string
        return legalMicroservice_pb2.LocationReply(availLocations=result_arr)


def serve():
    # create grpc server
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))

    # add legalMicroserviceServicer to the server
    legalMicroservice_pb2_grpc.add_legalMicroserviceServicer_to_server(LegalMS(), server)

    # assign a port
    server.add_insecure_port('[::]:50051')  # port number yet to be decided
    server.start()
    logging.info("LegalMS Server started on port 50051")
    server.wait_for_termination()


if __name__ == "__main__":
    # start grpc server
    logging.basicConfig()
    print("starting server")
    serve()
