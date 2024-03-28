import React from 'react';
import { Container, Row, Col, Card, Form, Button, Table } from 'react-bootstrap';
import { Stakeholder } from './models'; // Import your Stakeholder model

const Stakeholders = () => {
    // Dummy stakeholder objects
    const stakeholders = [
        new Stakeholder({ id: 1, name: "John Doe", role: "Manager" }),
        new Stakeholder({ id: 2, name: "Jane Smith", role: "Assistant" }),
        new Stakeholder({ id: 3, name: "Michael Johnson", role: "Intern" })
    ];

    return (
        <section className="vh-100" style={{ backgroundColor: "#eee" }}>
            <Container className="py-5 h-100">
                <Row className="d-flex justify-content-center align-items-center">
                    <Card className="rounded-3">
                        <Card.Body className="p-4">
                            <h4 className="text-center my-3 pb-3">Project Stakeholders</h4>
                            <Table className="mb-4">
                                <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Role</th>
                                    <th scope="col">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {/* Render each stakeholder */}
                                {stakeholders.map((stakeholder, index) => (
                                    <tr key={index}>
                                        <th>{stakeholder.id}</th>
                                        <td>{stakeholder.name}</td>
                                        <td>{stakeholder.role}</td>
                                        <td>
                                            <Col className="d-flex">
                                                <Button type="submit" variant="danger" className="me-1 col-6">
                                                    Delete
                                                </Button>
                                                <Button type="submit" variant="success" className="col-6">
                                                    Finished
                                                </Button>
                                            </Col>
                                        </td>
                                    </tr>
                                ))}
                                <tr>
                                    <td>
                                        <Form.Control type="number" disabled={true} placeholder="ID"/>
                                    </td>
                                    <td>
                                        <Form.Control type="text" placeholder="Name"
                                        />
                                    </td>
                                    <td>
                                    <Form.Control type="text" placeholder="Role"/>
                                    </td>
                                    <td>
                                        <Button className={"col-12 ms-1"} type="submit" variant="primary">
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

export default Stakeholders;
