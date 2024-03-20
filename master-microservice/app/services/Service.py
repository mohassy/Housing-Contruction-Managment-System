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
        self.project_crud = ProjectCrud(db)

    def add_project(self, project: Project):
        self.project_crud.add_project(project)

    def get_project(self, project_id):
        return self.project_crud.get_project(project_id)

    def delete_project(self, project_id: int):
        return self.project_crud.delete_project(project_id)

    def update_project(self, project_id: int, updated_project: Project):
        return self.project_crud.update_project(project_id, updated_project)

