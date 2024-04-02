import React, { useState } from 'react';
import { Container, Tab, Tabs, Form, Button } from 'react-bootstrap';

const LandingPage: React.FC = () => {
    const [projectName, setProjectName] = useState('');
    const [managerName, setManagerName] = useState('');
    const [budget, setBudget] = useState('');

    const handleCreateProject = () => {
        console.log('Creating project:', projectName, managerName, budget);
    };

    const handleManagerNameSubmit = () => {
        console.log('Submitted manager name:', managerName);
    };

    return (
        <Container className="mt-5">
            <h1>Welcome to Our Construction Management Application</h1>
            <Tabs defaultActiveKey={'createProject'}>
                <Tab eventKey="createProject" title="Create New Project">
                    <Form onSubmit={handleCreateProject}>
                        <Form.Group controlId="formProjectName" className="mt-3 mb-3">
                            <Form.Label className="me-3">Project Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter project name" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
                        </Form.Group>
                        <Form.Group  controlId="formManagerName" className="mb-3">
                            <Form.Label className="me-3">Manager Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter manager name" value={managerName} onChange={(e) => setManagerName(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formBudget" className="mb-3">
                            <Form.Label className="me-3">Budget</Form.Label>
                            <Form.Control type="number" placeholder="Enter budget (CAD)" value={budget} onChange={(e) => setBudget(e.target.value)} />
                        </Form.Group>
                        <Button variant="primary" type="submit">Create Project</Button>
                    </Form>
                </Tab>
                <Tab eventKey="enterManager" title="Existing Project">
                    <Form>
                        <Form.Group controlId="formManagerName" className="mt-3 mb-3">
                            <Form.Label className="me-3">Manager Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter manager name" value={managerName} onChange={(e) => setManagerName(e.target.value)} />
                        </Form.Group>
                        <Button variant="primary" onClick={handleManagerNameSubmit}>Continue</Button>
                    </Form>
                </Tab>
            </Tabs>
        </Container>
    );
};

export default LandingPage;
