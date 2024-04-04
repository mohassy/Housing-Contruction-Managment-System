import time

from fastapi import APIRouter, HTTPException

from app.models.models import Project, BudgetEdit, StatusEdit
from app.services.Service import Service

router = APIRouter()
service = Service()


@router.get("/{project_id}", response_model=Project)
async def get_project(project_id: int):
    project = service.get_project(project_id)
    if project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    return project


@router.post("/", response_model=Project)
async def create_project(project: Project):
    project.id = int(time.time() * 7)
    service.add_project(project)
    return project


@router.delete("/{project_id}")
async def get_project(project_id: int):
    service.delete_project(project_id)


@router.get("/budget/{project_id}", response_model=float)
async def get_budget(project_id: int):
    project = service.get_project(project_id)
    if project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    return project.budget


@router.put("/budget/{project_id}", response_model=float)
async def edit_budget(project_id: int, budget: BudgetEdit):
    project = service.get_project(project_id)
    if project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    project.budget = budget.new_budget
    service.update_project(project_id, project)
    return project.budget


@router.get("/status/{project_id}", response_model=str)
async def get_project_status(project_id: int):
    project = service.get_project(project_id)
    if project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    return project.status


@router.put("/status/{project_id}", response_model=str)
async def edit_project_status(project_id: int , status: StatusEdit):
    project = service.get_project(project_id)
    if project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    project.status = status.new_status
    service.update_project(project_id, project)
    return project.status
