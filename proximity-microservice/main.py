from dotenv import load_dotenv
import os
import requests
from typing import Union
import concurrent.futures
import proximityMicroservice_pb2
import proximityMicroservice_pb2_grpc
import pandas
import grpc
import threading
import sys



commuteList = {"japan": 1, "canada": 2}
driveList = {"japan": 3, "canada": 1}

df = pandas.read_csv('proxCSVData.csv')
vals = df.values


class main(proximityMicroservice_pb2_grpc.rankProxServicer):

    def getRanking(self, bias):
        global commuteList
        global driveList
        proxRankings = {}
        for key in commuteList.keys():  # might want to normalize the environment and walking values.
            proxRankings.update({key: (commuteList[key] * (1 - bias) + driveList[
                key] * bias)})  # make a new list with the environment and walking defined
            proxSort = sorted(proxRankings.items(), key=lambda x: x[1], reverse=True)  # sort it based
        return proxSort

    def updateLists(self, locs):
        print("updating lists...")
        locations = locs.split(",")
        # read locations.contents.
        global commuteList
        global driveList
        commuteList.clear()
        driveList.clear()
        for location in locations:
            print(location)
            foundIt = False
            for val in vals:

                if (val[0] == location):  # if the entry is the correct one.
                    name = location
                    CommuteValue = val[1]  # need to fetch this from the sheet
                    DriveValue = val[2]  # fetch this from sheet\
                    foundIt = True
            if (foundIt):
                commuteList.update({name: CommuteValue})
                driveList.update({name: DriveValue})
            else:
                print("didn't find entry for " + location)
                # should we return an exception??

    def getCommute(self, request, context):
        self.updateLists(request.rankPlease)
        return proximityMicroservice_pb2.rankedProxResponse(rankedAreas=str(self.getRanking(0)), rankings=1, rankedResponse="NOT IMPLEMENTED YET!")

    def getDrive(self, request, context):
        self.updateLists(request.locations)
        return proximityMicroservice_pb2.ranking(rankings={str(self.getRanking(1))}, response="NOT IMPLEMENTED YET!")

    def getCommDrive(self, request, context):
        self.updateLists(request.locations)
        return proximityMicroservice_pb2.ranking(rankings={str(self.getRanking(0.5))}, response="NOT IMPLEMENTED YET!")


def serve():  # GRPC stuff.
    print("SERVIN'!")
    server = grpc.server(concurrent.futures.ThreadPoolExecutor(max_workers=10))
    proximityMicroservice_pb2_grpc.add_rankProxServicer_to_server(main(), server)
    server.add_insecure_port('[::]:50053')
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