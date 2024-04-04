from typing import List

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import grpc
import sys


import os
sys.path.append("../value-microservice/")
import valueMS_pb2_grpc
import valueMS_pb2
from app.controllers import project_controller, stakeholder_controller, task_controller, post_controller
from legalMicroservice import legalMicroservice_pb2, legalMicroservice_pb2_grpc, LegalMS_grpc
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*", "http://localhost:5173", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=[""],
)

app.include_router(project_controller.router, prefix="/project")
app.include_router(stakeholder_controller.router, prefix="/stakeholder")
app.include_router(task_controller.router, prefix="/task")
app.include_router(post_controller.router, prefix="/post")


@app.post("/rank", response_model=List[str])
def get_rank(locations: List[str]):
    # values microservice ranking (Ethan)
    nlocs = ""
    for location in locations:
         nlocs = location + "," + nlocs
    with grpc.insecure_channel('localhost:50051') as channel:
            stub = valueMS_pb2_grpc.valueMicroserviceStub(channel)
            try:
                print("Retrieving the response from a serialReq")
                response = stub.getEnv(valueMS_pb2.rankreq(locations=nlocs))
                #print("response:" + str(response))
                print("Hm?")
                print("RANKING:" + response.rankings)
                print("DONE RANKING")
            except grpc.RpcError as e:
                print("Error: " , e.details())
    # policy microservice ranking (Astha)
    LMS_locs = ','.join(locations)   # covert list to a string
    with grpc.insecure_channel('localhost:50051') as channel:
        LMS_stub = legalMicroservice_pb2_grpc.legalMicroserviceStub(channel)
        try:
            LMS_response_str = LMS_stub.getLocations(legalMicroservice_pb2.Locations(locations=LMS_locs))
            # convert response (string) into an array
            LMS_response = LMS_response_str.split(',')  # expected: 1D array of available locations
        except grpc.RpcError as e:
            if e.code() == grpc.StatusCode.NOT_FOUND:
                raise HTTPException(status_code=404, detail='Response not found')

    # values microservice ranking (Shadman)

    # combine rankings (Hassan)
    print(locations)
    return sorted(locations)



@app.post("/rank", response_model=List[str])
def get_rank(locations: List[str]):
    # values microservice ranking (Ethan)
    nlocs = ""
    for location in locations:
         nlocs = location + "," + nlocs
    with grpc.insecure_channel('localhost:50051') as channel:
            stub = valueMS_pb2_grpc.valueMicroserviceStub(channel)
            try:
                print("Retrieving the response from a serialReq")
                response = stub.getEnv(valueMS_pb2.rankreq(locations=nlocs))
                #print("response:" + str(response))
                print("Hm?")
                print("RANKING:" + response.rankings)
                print("DONE RANKING")
            except grpc.RpcError as e:
                print("Error: " , e.details())
    # policy microservice ranking (Astha)

    LMS_locs = ','.join(locations)   # covert list to a string
    with grpc.insecure_channel('localhost:50051') as channel:
        LMS_stub = legalMicroservice_pb2_grpc.legalMicroserviceStub(channel)
        try:
            LMS_response_str = LMS_stub.getLocations(legalMicroservice_pb2.Locations(locations=LMS_locs))
            # convert response (string) into an array
            LMS_response = LMS_response_str.split(',')  # expected: 1D array of available locations
        except grpc.RpcError as e:
            if e.code() == grpc.StatusCode.NOT_FOUND:
                raise HTTPException(status_code=404, detail='Response not found')

    # values microservice ranking (Shadman)

    # combine rankings (Hassan)
    print(locations)
    return sorted(locations)


load_dotenv(dotenv_path='./app/config/.env')

if __name__ == "__main__":
    uvicorn.run(
        app="main:app",
        reload=True if os.environ.get("ENVIRONMENT") == "dev" else False,
        workers=1,
    )
