import React from 'react';
import { Container, Row, Col, Card, Form, Button, Table } from 'react-bootstrap';
import { Task, Stakeholder } from './models'; // Import your Task and Stakeholder models

const Tasks = () => {
    // Dummy task objects
    const tasks = [
        new Task({
            id: 1,
            description: "Buy groceries for next week",
            date_due: "2024-03-30", // Example date
            assigned_stakeholder: new Stakeholder({ id: 1, name: "John Doe", role: "Manager" }), // Example stakeholder
            complete: false
        }),
        new Task({
            id: 2,
            description: "Renew car insurance",
            date_due: "2024-04-15", // Example date
            assigned_stakeholder: new Stakeholder({ id: 2, name: "Jane Smith", role: "Assistant" }), // Example stakeholder
            complete: false
        }),
        new Task({
            id: 3,
            description: "Sign up for online course",
            date_due: "2024-04-05", // Example date
            assigned_stakeholder: new Stakeholder({ id: 3, name: "Michael Johnson", role: "Intern" }), // Example stakeholder
            complete: false
        })
    ];

    return (
        <section className="vh-100" style={{ backgroundColor: "#eee" }}>
            <Container className="py-5 h-100">
                <Row className="d-flex justify-content-center align-items-center">
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
                                            <td>{task.date_due.toString()}</td>
                                            <td>{task.assigned_stakeholder.name}</td>
                                            <td>{task.complete ? 'Complete' : 'In Progress'}</td>
                                            <td>
                                                <Col className="d-flex">
                                                    <Button type="submit" variant="danger" className="me-1">
                                                        Delete
                                                    </Button>
                                                    <Button type="submit" variant="success">
                                                        Finished
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
                                            />
                                        </td>
                                        <td>
                                            <Form.Control type="text" placeholder="Due Date"/>
                                        </td>
                                        <td>
                                            <Form.Control type="text" placeholder="Assigned To"/>
                                        </td>
                                        <td>
                                            <Form.Control type="text" placeholder="Status"/>
                                        </td>
                                        <td>
                                            <Button className={"col-12"} type="submit" variant="primary">
                                                Save
                                            </Button>
                                        </td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                </Row>
            </Container>
        </section>
    );
}

export default Tasks;
