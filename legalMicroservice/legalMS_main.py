import uvicorn
import LegalMS_api
from fastapi import FastAPI

app = FastAPI()
app.include_router(LegalMS_api.legalMS_router)



if __name__ == "__main__":
    # start api
    uvicorn.run(app, host="127.0.0.1", port=8000)

