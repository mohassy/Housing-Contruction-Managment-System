import time
from typing import List

from fastapi import APIRouter, HTTPException
from app.services.Service import Service
from app.models.models import Project, Task

router = APIRouter()

service = Service()


@router.get("/add/{project_id}", response_model=List[Task])
async def add_task(project_id: int, task: Task):
    project = service.get_project(project_id)
    if project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    return project.tasks


@router.post("/add/{project_id}", response_model=List[Task])
async def add_task(project_id: int, task: Task):
    task.id = int(time.time() * 3)
    project = service.get_project(project_id)
    if project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    project.tasks.append(task)
    service.update_project(project_id, project)
    return project.tasks


@router.delete("/remove/{project_id}", response_model=List[Task])
async def remove_task(project_id: int, task_id: int):
    project = service.get_project(project_id)
    if project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    project.tasks = [t for t in project.tasks if t.id != task_id]
    service.update_project(project_id, project)
    return project.tasks


@router.put("/edit/{project_id}/{task_id}", response_model=List[Task])
async def edit_task(project_id: int, task_id: int, updated_task: Task):
    project = service.get_project(project_id)
    if project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    for task in project.tasks:
        if task.id == task_id:
            task.description = updated_task.description
            task.date_due = updated_task.date_due
            task.assigned_stakeholder = updated_task.assigned_stakeholder
            task.complete = updated_task.complete
            break
    return project.tasks
