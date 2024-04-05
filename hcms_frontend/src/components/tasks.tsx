import {useState} from 'react';
import { Col, Card, Form, Button, Table } from 'react-bootstrap';
import { Task } from './models';
import {useParams} from "react-router-dom"; // Import your Task and Stakeholder models

interface TasksProps {
    project_tasks: Task[];
}
const Tasks = ({ project_tasks }: TasksProps) => {

    // Dummy task objects
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState(Date);
    const [assignedTo, setAssignedTo] = useState('');
    const [tasks, setTasks] = useState(project_tasks);
    let { projectID } = useParams();
    const handleAdd = async () => {
        try {
            // Make API request to add task
            const response = await fetch(`http://localhost:8000/task/${projectID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: tasks.length + 1,
                    description,
                    date_due: dueDate,
                    assigned_stakeholder: assignedTo,
                    complete: false,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to add task');
            }

            // Assuming successful addition, update the state to add the new task
            const newTaskData = await response.json();
            setTasks([...tasks, newTaskData[newTaskData.length - 1]]);
            setDescription('');
            setDueDate('');
            setAssignedTo('');
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const handleDelete = async ( taskId: number) => {
        try {
            // Make API request to delete task
            const response = await fetch(`http://localhost:8000/task/${projectID}?task_id=${taskId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete task');
            }

            // Assuming successful deletion, update the state to remove the deleted task
            setTasks(tasks.filter(task => task.id !== taskId));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleFinish = async (taskId: number) => {
        try {
            const task = tasks.find(task => task.id === taskId)
            // Make API request to update task
            const response = await fetch(`http://localhost:8000/task/${projectID}/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(task && {
                    id: taskId,
                    description: task.description,
                    date_due: task.date_due,
                    assigned_stakeholder: task.assigned_stakeholder,
                    complete: true,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to mark task as complete');
            }

            // Assuming successful update, update the state to mark the task as complete
            const updatedTasks = tasks.map(task => {
                if (task.id === taskId) {
                    return { ...task, complete: true };
                } else {
                    return task;
                }
            });
            setTasks(updatedTasks);
        } catch (error) {
            console.error('Error marking task as complete:', error);
        }
    };

    return (
        <Col className="h-75 bg-body-secondary justify-content-center align-items-center">
                <Card className="rounded-3">
                    <Card.Body className="p-4">
                        <h4 className="text-center my-3 pb-3">Project Tasks</h4>
                        <Table className="mb-4">
                            <thead>
                            <tr>
                                <th scope="col">No.</th>
                                <th scope="col">Description</th>
                                <th scope="col">Due Date</th>
                                <th scope="col">Assigned To</th>
                                <th scope="col">Status</th>
                                <th scope="col">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {tasks.map((task, index) => (
                                <tr key={index}>
                                    <th>{task.id}</th>
                                    <td>{task.description}</td>
                                    <td>{task.date_due.toLocaleString('UTC')}</td>

                                    <td>{task.assigned_stakeholder}</td>
                                    <td>{task.complete ? 'Complete' : 'In Progress'}</td>
                                    <td>
                                        <Col className="w-100">
                                            <Button type="submit" variant="outline-success"
                                                    className={"me-1"}
                                                    onClick={() => handleFinish(task.id)}
                                                    disabled={task.complete}
                                            >
                                                Finish
                                            </Button>
                                            <Button type="submit" variant="outline-danger"
                                                    onClick={() => handleDelete(task.id)}>
                                                Delete
                                            </Button>

                                        </Col>
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td>
                                    <Form.Control type="number" placeholder="ID" disabled={true}/>
                                </td>
                                <td>
                                    <Form.Control type="text" placeholder="Description"
                                                  as="textarea"
                                                  rows={2}
                                                  onChange={(e) => setDescription(e.target.value)}
                                    />
                                </td>
                                <td>
                                    <Form.Control type="date" placeholder="Due Date"
                                                  onChange={(e) => setDueDate(e.target.value)}/>
                                </td>
                                <td>
                                    <Form.Control type="text" placeholder="Assigned To"
                                                  onChange={(e) => setAssignedTo(e.target.value)}/>
                                </td>
                                <td>
                                    <Form.Control type="text" placeholder="Starting"
                                                  disabled={true}/>
                                </td>
                                <td>
                                    <Button className={"col-12"} type="submit" variant="primary" onClick={handleAdd}>
                                        Add
                                    </Button>
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
        </Col>
    );
}

export default Tasks;
