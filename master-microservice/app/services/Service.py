from app.models.models import Project, Stakeholder, Task, Post


class Service:
    def __init__(self):
        self.projects_db = []

    def get_project_by_id(self, project_id: int) -> Project:
        for project in self.projects_db:
            if project.id == project_id:
                return project
        return None