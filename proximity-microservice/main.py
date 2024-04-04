import uvicorn
from fastapi import FastAPI
from dotenv import load_dotenv
import os
import requests
from typing import Union
from pydantic import BaseModel
import concurrent.futures
import proximityMicroservice_pb2
import proximityMicroservice_pb2_grpc
import pandas
import grpc
import threading

environmentlist = {"japan": 1, "canada": 2}
walkList = {"japan": 3, "canada": 1}

df = pandas.read_csv('proxCSVData.csv')
vals = df.values


class main(proximityMicroservice_pb2_grpc.valueMicroserviceServicer):

    def getRanking(self, bias):
        global environmentlist
        global walkList
        therankings = {}
        for key in environmentlist.keys():  # might want to normalize the environment and walking values.
            therankings.update({key: (environmentlist[key] * (1 - bias) + walkList[
                key] * bias)})  # make a new list with the environment and walking defined
            thesort = sorted(therankings.items(), key=lambda x: x[1], reverse=True)  # sort it based
        return thesort

    def updateLists(self, locs):
        print("updating lists...")
        locations = locs.split(",")
        # read locations.contents.
        global environmentlist
        global walkList
        environmentlist.clear()
        walkList.clear()
        for location in locations:
            print(location)
            foundIt = False
            for val in vals:

                if (val[0] == location):  # if the entry is the correct one.
                    name = location
                    EnvironmentValue = val[1]  # need to fetch this from the sheet
                    WalkValue = val[2]  # fetch this from sheet\
                    foundIt = True
            if (foundIt):
                environmentlist.update({name: EnvironmentValue})
                walkList.update({name: WalkValue})
            else:
                print("didn't find entry for " + location)
                # should we return an exception??

    def getEnv(self, request, context):
        updateLists(request.locations)
        return valueMS_pb2.ranking(rankings={str(getRanking(0))}, response="NOT IMPLEMENTED YET!")

    def getWalk(self, request, context):
        updateLists(request.locations)
        return valueMS_pb2.ranking(rankings={str(getRanking(1))}, response="NOT IMPLEMENTED YET!")

    def getBoth(self, request, context):
        updateLists(request.locations)
        return valueMS_pb2.ranking(rankings={str(getRanking(0.5))}, response="NOT IMPLEMENTED YET!")


def serve():  # GRPC stuff.
    print("SERVIN'!")
    server = grpc.server(concurrent.futures.ThreadPoolExecutor(max_workers=10))
    valueMS_pb2_grpc.add_valueMicroserviceServicer_to_server(main(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    server.wait_for_termination()


if __name__ == '__main__':
    try:
        grpcthread = threading.Thread(target=serve)  # serve()
        grpcthread.start()
        grpcthread.join()
    except KeyboardInterrupt:
        print('Interrupted')
        try:
            sys.exit(0)
        except SystemExit:
            os._exit(0)