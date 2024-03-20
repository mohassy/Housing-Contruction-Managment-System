from google.cloud.firestore_v1 import FieldFilter, Client, DocumentReference
from app.models.models import Project, Stakeholder, Task, Post

class ProjectCrud():
    def __init__(self, db : Client):
        self.db = db

    # Function to retrieve a project by its ID
    def get_project_by_id(self, project_id: int) -> dict:
        # Reference to the "projects" collection
        project_ref = self.db.collection('projects')
        # Reference to the specific project document
        project_doc_ref: DocumentReference = project_ref.document(str(project_id))
        # Retrieve the project document
        project_doc = project_doc_ref.get()
        if project_doc.exists:
            # Return the project document data as a dictionary
            return project_doc.to_dict()
        else:
            # If the project does not exist, return None
            return None

    # Function that add a new project to database
    def add_project(self, project: Project):
        # Convert datetime.date to string for every task in project because firebase can only store string
        for task in project.tasks:
            if task.date_due is str:
                task.date_due = task.date_due.isoformat()
        project_dict = project.dict()
        project_ref = self.db.collection('projects').document(str(project.id))
        project_ref.set(project_dict)

    # Function to delete a project based on ID
    def delete_project_by_id(self, project_id: int):
        # Reference to the "projects" collection
        project_ref = self.db.collection('projects')
        # Reference to the specific project document
        project_doc_ref = project_ref.document(str(project_id))
        # Delete the project document
        project_doc_ref.delete()
        print(f"Project with ID {project_id} deleted successfully.")

    # Function to get projects by manager name
    def get_projects_by_manager(self, manager_name: str):
        # Query projects where manager_name matches the provided manager_name
        docs = (
            self.db.collection("projects")
            .where(filter=FieldFilter("manager_name", "==", manager_name))
            .stream()
        )
        projects = []
        # Iterate through the query result and append matching projects to the list
        for doc in docs:
            projects.append(doc.to_dict())
        return projects

