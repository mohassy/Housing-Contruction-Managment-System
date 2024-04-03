import legalMicroservice_pb2_grpc
import legalMicroservice_pb2
import grpc

# Create a gRPC channel and stub
channel = grpc.insecure_channel("localhost:50051")
stub = legalMicroservice_pb2_grpc.legalMicroserviceStub(channel)

def getLocation(locations_str):

    result = stub.getLocations(legalMicroservice_pb2.Locations(locations=locations_str))
    return result

if __name__ == "__main__":
    returnVal = getLocation('Main St. & Elm St.,Maple St. & Oak St.,Spruce Ave. & Fir St.,High St. & Market St.')
    print(returnVal)
