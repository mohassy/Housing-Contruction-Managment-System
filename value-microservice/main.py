import uvicorn
from fastapi import FastAPI
from dotenv import load_dotenv
import os
import requests
from typing import Union
from pydantic import BaseModel

class VMSQuery(BaseModel):
    locations: list
    walkabilityBias: Union[float, None] = None #bias a query that values both walkability and environmental concerns to focus only on walkability (vals from 0 to 1)

app = FastAPI()

@app.get("/")
def read_both(query:VMSQuery):
    return{"ranking":"apple"}
    
#@app.get("/items/{item_id}")
@app.get("/walkability")#get information about the locations from the datasets
def read_walkability(query:VMSQuery):
    
    return{"ranking":str(arr)}


@app.get("/environmental")#get information about the locations from the datasets.
def read_environmental(query:VMSQuery):
   
    return{"ranking":str(arr)}




base_url = "https://ckan0.cf.opendata.inter.prod-toronto.ca"
 
# Datasets are called "packages". Each package can contain many "resources"
# To retrieve the metadata for this package and its resources, use the package name in this page's URL:
#https://ckan0.cf.opendata.inter.prod-toronto.ca/api/3/action/package_show?id=pedestrian-network API for all pedestrian network related stuff.

#"https://ckan0.cf.opendata.inter.prod-toronto.ca/dataset/4b5c7a84-dea1-4137-875d-71d7f662c83f/resource/4fb0563f-4ea4-40f4-87ad-9386b7aad2eb/download/pedestrian-network-data-2952.csv",
#^Download for the pedestrian network data as CSV. Do i need to download? coordinates are in 
url = base_url + "/api/3/action/package_show"
params = { "id": "pedestrian-network"}
#package = requests.get(url, params = params).json()