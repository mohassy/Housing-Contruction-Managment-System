from fastapi import APIRouter, HTTPException
from typing import List
from app.services.Service import Service
from app.models.models import Project, Stakeholder

router = APIRouter()

service = Service()


@router.post("/add/{project_id}", response_model=Project)
async def add_stakeholder(project_id: int, stakeholder: Stakeholder):
    project = service.get_project_by_id(project_id)
    if project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    project.stakeholders.append(stakeholder)
    return project


@router.delete("/remove/{project_id}", response_model=Project)
async def remove_stakeholder(project_id: int, stakeholder_id: int):
    project = service.get_project_by_id(project_id)
    if project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    project.stakeholders = [s for s in project.stakeholders if s.id != stakeholder_id]
    return project


@router.get("/{project_id}", response_model=List[Stakeholder])
async def get_stakeholders(project_id: int):
    project = service.get_project_by_id(project_id)
    if project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    return project.stakeholders
