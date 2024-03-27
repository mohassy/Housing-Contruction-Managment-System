from concurrent import futures
import logging

import grpc
import requests

import legalMicroservice_pb2
import legalMicroservice_pb2_grpc

class LegalMS(legalMicroservice_pb2_grpc.legalMicroserviceServicer):
    def getLocations(self, request, context):
        '''receive locations, read through .json file to find these locations and their statuses
            , and return an array with these statuses.'''
        #example output array
        arr = {"COMMON","CONDO","RESERVE","CORRIDOR","COMMON"}
        print("Not implemented")
        return legalMicroservice_pb2.LocationStatus(arr)

    def availableLocations(self, request, context):
        '''receive a string "available location list", and return an
            array of 10 available locations'''
        #example output array : coordinates? or location address?
        arr = {"60,90", "10,35", "40,80"} #stll haven't decided on how the coordinates will be returned or received
        return legalMicroservice_pb2.LocationReply(arr)


def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    legalMicroservice_pb2_grpc.add_legalMicroserviceServicer_to_server(LegalMS(), server)
    server.add_insecure_port('[::]:50050') #port number yet to be decided
    server.start()
    server.wait_for_termination()

if __name__ == '__main__':
    logging.basicConfig()
    serve()