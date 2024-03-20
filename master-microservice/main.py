import uvicorn
from fastapi import FastAPI
from dotenv import load_dotenv
import os
from app.controllers import  project_controller, stakeholder_controller, task_controller, post_controller

app = FastAPI()

app.include_router(project_controller.router, prefix="/project")
app.include_router(stakeholder_controller.router, prefix="/stakeholder")
app.include_router(task_controller.router, prefix="/task")
app.include_router(post_controller.router, prefix="/post")

load_dotenv(dotenv_path='./app/config/.env')



if __name__ == "__main__":
    uvicorn.run(
        app="main:app",
        reload=True if os.environ.get("ENVIRONMENT") == "dev" else False,
        workers=1,
    )
