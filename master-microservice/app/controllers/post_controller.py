import time

from fastapi import APIRouter, HTTPException
from typing_extensions import List

from app.services.Service import Service
from app.models.models import Project, Post, Task

router = APIRouter()

service = Service()


@router.get("/{project_id}", response_model=List[Post])
async def get_posts(project_id: int):
    project = service.get_project(project_id)
    if project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    return project.posts


@router.post("/{project_id}", response_model=List[Post])
async def create_post(project_id: int, post: Post):
    post.id = int(time.time() * 5)
    project = service.get_project(project_id)
    if project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    project.posts.append(post)
    service.update_project(project.id, project)
    return project.posts


@router.put("/{project_id}/{post_id}", response_model=Post)
async def edit_task(project_id: int, post_id: int, updated_post: Post):
    project = service.get_project(project_id)
    if project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    for post in project.posts:
        if post.id == post_id:
            post.text = updated_post.text
            post.author = updated_post.author
            post.status = updated_post.status
            break
    service.update_project(project_id, project)
    return updated_post


@router.delete("/{project_id}", response_model=List[Post])
async def delete_post(project_id: int, post_id: int):
    project = service.get_project(project_id)
    if project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    project.posts = [p for p in project.posts if p.id != post_id]
    service.update_project(project.id, project)
    return project.posts
