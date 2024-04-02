import uvicorn
from fastapi import FastAPI
from dotenv import load_dotenv
import os
import requests
from typing import Union
from pydantic import BaseModel
import valueMS_pb2
import valueMS_pb2_grpc
import pandas

environmentlist = {"japan":1,"canada":2}
walkList = {"japan":3, "canada":1}

def getRanking(bias):
    global environmentlist
    global walkList
    therankings = {}
    for key in environmentlist.keys(): #might want to normalize the environment and walking values. 
        therankings.update({key:(environmentlist[key]*(1-bias) + walkList[key]*bias)}) #make a new list with the environment and walking defined
        thesort = sorted(therankings.items(), key=lambda x:x[1], reverse=True) #sort it based 
    return thesort

def updateLists(locations):
    print("updating lists...")
    #read locations.contents.
    global environmentlist
    global walkList
    environmentlist.clear()
    walkList.clear()
    for location in locations:
        print(location) 
        #find location in the excel sheet
        name = location
        EnvironmentValue = 3 #need to fetch this from the sheet
        WalkValue = 3 #fetch this from sheet\
        foundIt = True
        if(foundIt):
            environmentlist.update({name:EnvironmentValue})
            walkList.update({name:WalkValue})
        else:
            print("didn't find entry for " + location)
            #should we return an exception??
        

print(getRanking(0))





def getEnv(self, request, context):
    print("not implemented")

    return valueMS_pb2.ranking(rankings = {getRanking(0)}, response = "NOT IMPLEMENTED YET!") 


def getWalk(self, request, context):

    print("not implemented")
    return valueMS_pb2.ranking(rankings = {getRanking(1)}, response = "NOT IMPLEMENTED YET!") 



def getBoth(self, request, context):
    print("not implemented")
    return valueMS_pb2.ranking(rankings = {getRanking(0.5)}, response = "NOT IMPLEMENTED YET!") 


base_url = "https://ckan0.cf.opendata.inter.prod-toronto.ca"
 
# Datasets are called "packages". Each package can contain many "resources"
# To retrieve the metadata for this package and its resources, use the package name in this page's URL:
#https://ckan0.cf.opendata.inter.prod-toronto.ca/api/3/action/package_show?id=pedestrian-network API for all pedestrian network related stuff.

#"https://ckan0.cf.opendata.inter.prod-toronto.ca/dataset/4b5c7a84-dea1-4137-875d-71d7f662c83f/resource/4fb0563f-4ea4-40f4-87ad-9386b7aad2eb/download/pedestrian-network-data-2952.csv",
#^Download for the pedestrian network data as CSV. Do i need to download? coordinates are in 
url = base_url + "/api/3/action/package_show"
params = { "id": "pedestrian-network"}
#package = requests.get(url, params = params).json()