import firebase_admin
from firebase_admin import firestore
from firebase_admin import credentials
from app.models.models import Project, Stakeholder, Task, Post
from app.repositories.project_crud import ProjectCrud

cred = credentials.Certificate("app/config/hcms-db-firebase-adminsdk-6t3g4-d0ec7a8b08.json")
firebase_admin.initialize_app(cred)
# Firestore client
db = firestore.client()
class Service:
    def __init__(self):
        self.projects_crud = ProjectCrud(db)

    def add_project(self, project: Project):
        self.projects_crud.add_project(project)
    def get_project_by_id(self, project_id):
        return self.projects_crud.get_project_by_id(project_id)
    def delete_project_by_id(self, project_id: int):
        return self.projects_crud.delete_project_by_id(project_id)
