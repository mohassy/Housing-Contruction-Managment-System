import uvicorn
from fastapi import FastAPI
from dotenv import load_dotenv
import os
from app.controllers import  project_controller, stakeholder_controller, task_controller, post_controller

app = FastAPI()

app.include_router(project_controller.router, prefix="/projects")
app.include_router(stakeholder_controller.router, prefix="/stakeholders")
app.include_router(task_controller.router, prefix="/tasks")
app.include_router(post_controller.router, prefix="/posts")

load_dotenv(dotenv_path='./app/config/.env')

# how to access environment variables
database_url = os.environ.get("DATABASE_URL")
secret_key = os.environ.get("SECRET_KEY")


if __name__ == "__main__":
    uvicorn.run(
        app="main:app",
        reload=True if os.environ.get("ENVIRONMENT") == "dev" else False,
        workers=1,
    )
