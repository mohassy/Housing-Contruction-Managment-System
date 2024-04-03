import datetime
from typing import List, Optional
from pydantic import BaseModel


class Stakeholder(BaseModel):
    id: int
    name: str
    role: str


class Task(BaseModel):
    id: int
    description: str
    date_due: datetime.date | str
    assigned_stakeholder: str
    complete: bool


class Post(BaseModel):
    id: int
    text: str
    author: str
    status: str


class Project(BaseModel):
    id: int
    name: str
    manager_name: str
    stakeholders: List[Stakeholder] = []
    tasks: List[Task] = []
    posts: List[Post] = []
    budget: Optional[float] = None  # Optional[float] means the budget is not required
    status: Optional[str] = None


class BudgetEdit(BaseModel):
    new_budget: float


class StatusEdit(BaseModel):
    new_status: str
