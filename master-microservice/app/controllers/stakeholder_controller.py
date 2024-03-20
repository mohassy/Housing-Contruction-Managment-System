import time

from fastapi import APIRouter, HTTPException
from typing import List
from app.services.Service import Service
from app.models.models import Stakeholder

router = APIRouter()

service = Service()


@router.post("/add/{project_id}", response_model=List[Stakeholder])
async def add_stakeholder(project_id: int, stakeholder: Stakeholder):
    stakeholder.id = int(time.time() * 23)
    project = service.get_project(project_id)
    if project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    project.stakeholders.append(stakeholder)
    service.update_project(project_id, project)
    return project.stakeholders


@router.delete("/remove/{project_id}", response_model=List[Stakeholder])
async def remove_stakeholder(project_id: int, stakeholder_id: int):
    project = service.get_project(project_id)
    if project is None:
        raise HTTPException(status_code=404, detail="Project not found")

    for stakeholder in project.stakeholders:
        if stakeholder.id == stakeholder_id:
            project.stakeholders.remove(stakeholder)

    service.update_project(project_id, project)
    return project.stakeholders



@router.get("/{project_id}", response_model=List[Stakeholder])
async def get_stakeholders(project_id: int):
    stakeholders = service.get_project(project_id).stakeholders
    if stakeholders is None:
        raise HTTPException(status_code=404, detail="Project not found")
    return stakeholders
