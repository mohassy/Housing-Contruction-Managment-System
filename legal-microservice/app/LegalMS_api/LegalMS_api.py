from app.LegalMS_grpc import legalMicroservice_pb2_grpc
from app.LegalMS_grpc import legalMicroservice_pb2
from fastapi import APIRouter
import grpc

# implementation
legalMS_router = APIRouter()

# Create a gRPC channel and stub
channel = grpc.insecure_channel("legalMS_grpc:50051")
stub = legalMicroservice_pb2_grpc.legalMicroserviceStub(channel)


@legalMS_router.get("/locations/{location_ids}")
async def get_location_statuses(location_ids: array):
    # example: location_ids = location1, location2, location 3, ...
    try:
        # Convert location IDs to a list and call the gRPC method
        location_list = location_ids.split(",")
        # Find a way to send these locations to the request
        response = stub.getLocations(legalMicroservice_pb2.Locations(locations=location_list))
    except grpc.RpcError as e:
        if e.code() == grpc.StatusCode.NOT_FOUND:
            raise HTTPException(status_code=404, detail='location not found')

    # response still yet to be implemented: put the array into strings maybe?
    return response


@legalMS_router.get("/available-locations")
async def get_available_locations():
    try:
        response = stub.availableLocations(legalMicroservice_pb2.LocationRequest())
    except grpc.RpcError as e:
        if e.code() == grpc.StatusCode.NOT_FOUND:
            raise HTTPException(status_code=404, detail='Todo not found')

    # response still yet to be implemented
    return response

"""
    import asyncio
    routers and then app calls in a main file
    # Run FastAPI application
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)  # Replace with desired FastAPI port
"""
