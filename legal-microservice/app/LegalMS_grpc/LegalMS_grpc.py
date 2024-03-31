import grpc
import legalMicroservice_pb2
import legalMicroservice_pb2_grpc
from app.Data import dataRequests
import logging
from concurrent import futures


class LegalMS(legalMicroservice_pb2_grpc.legalMicroserviceServicer):
    def getLocations(self, request, context):
        result_arr = get_location_access_type(request.locations)  # expected : 1D array or null array
        return legalMicroservice_pb2.LocationStatus(result_arr)

    def availableLocations(self, request, context):
        result_arr = get_avail_locations()  # expected: 1D array
        return legalMicroservice_pb2.LocationReply(result_arr)


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
