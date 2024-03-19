from fastapi import APIRouter, HTTPException
from typing_extensions import List

from app.services.Service import Service
from app.models.models import Project, Post

router = APIRouter()

service = Service()

@router.post("/create/{project_id}", response_model=Project)
async def create_post(project_id: int, post: Post):
    project = service.get_project_by_id(project_id)
    if project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    project.posts.append(post)
    return project


@router.delete("/delete/{project_id}", response_model=Project)
async def delete_post(project_id: int, post_id: int):
    project = service.get_project_by_id(project_id)
    if project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    project.posts = [p for p in project.posts if p.id != post_id]
    return project


@router.get("/{project_id}", response_model=List[Post])
async def get_posts(project_id: int):
    project = service.get_project_by_id(project_id)
    if project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    return project.posts


