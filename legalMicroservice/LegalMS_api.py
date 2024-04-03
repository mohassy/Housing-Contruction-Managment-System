import legalMicroservice_pb2_grpc
import legalMicroservice_pb2
from fastapi import APIRouter
import grpc

# implementation
legalMS_router = APIRouter()

# Create a gRPC channel and stub
channel = grpc.insecure_channel("localhost:50051")
stub = legalMicroservice_pb2_grpc.legalMicroserviceStub(channel)


@legalMS_router.get("/locations", response_model=str)
async def get_location_statuses(locations: str):
    # example: locations= "location1, location2, location 3, ..."
    try:
        response = stub.getLocations(legalMicroservice_pb2.Locations(locations=locations))
    except grpc.RpcError as e:
        if e.code() == grpc.StatusCode.NOT_FOUND:
            raise HTTPException(status_code=404, detail='location not found')
    return response  # A single string: "location1, location2, location3, ..."


@legalMS_router.get("/available-locations", response_model=str)
async def get_available_locations():
    try:
        response = stub.availableLocations(legalMicroservice_pb2.LocationRequest())
    except grpc.RpcError as e:
        if e.code() == grpc.StatusCode.NOT_FOUND:
            raise HTTPException(status_code=404, detail='Not found')
    return response  # a single string: "location1, location2, location3, ..."

"""
    import asyncio
    routers and then app calls in a main file
    # Run FastAPI application
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)  # Replace with desired FastAPI port
"""
