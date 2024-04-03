import uvicorn
from fastapi import FastAPI
from dotenv import load_dotenv
import grpc
import sys
sys.path.append("../value-microservice/")

import valueMS_pb2_grpc
import valueMS_pb2


import os
from app.controllers import project_controller, stakeholder_controller, task_controller, post_controller

app = FastAPI()

app.include_router(project_controller.router, prefix="/project")
app.include_router(stakeholder_controller.router, prefix="/stakeholder")
app.include_router(task_controller.router, prefix="/task")
app.include_router(post_controller.router, prefix="/post")

<<<<<<< Updated upstream
=======

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

    # values microservice ranking (Shadman)

    # combine rankings (Hassan)
    print(locations)
    return sorted(locations)


>>>>>>> Stashed changes
load_dotenv(dotenv_path='./app/config/.env')

if __name__ == "__main__":
    uvicorn.run(
        app="main:app",
        reload=True if os.environ.get("ENVIRONMENT") == "dev" else False,
        workers=1,
    )

#@app.get("/items/{item_id}")
#def read_item(item_id:int, q: Union[str, None]=None):
#    for item in listofItems:
#        if(item_id == item.item_id):
#            return{"item_name":item.name, "q":q, "found":"true"}
#        
#    return{"item_id":item_id, "q":q, "found":"false"}

