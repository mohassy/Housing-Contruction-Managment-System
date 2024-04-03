import React, { useState } from 'react';
import {Container, Tab, Tabs, Form, Button, Alert} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
const LandingPage: React.FC = () => {
    const [projectName, setProjectName] = useState('');
    const [managerName, setManagerName] = useState('');
    const [budget, setBudget] = useState('');
    const [projectID, setProjectID] = useState<number>();
    const [errorShow, setErrorShow] = useState(false);
    const navigate = useNavigate();
    const handleCreateProject = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Make API request to create project
            const response = await fetch('http://localhost:8000/project/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: -1,
                    name: projectName,
                    manager_name: managerName,
                    tasks: [],
                    stakeholders: [],
                    posts:[],
                    budget: parseInt(budget),
                    status: "Planning Phase"
                }),
            });

            if (!response.ok) {
                setErrorShow(true)
                return
            }

            const data = await response.json();
            // Extract the projectID from the response

            // Construct the project object with relevant data
            const project = {
                id: data.id,
                name: data.name,
                managerName: data.manager_name,
                tasks: data.tasks,
                stakeholders: data.stakeholders,
                posts:data.posts,
                budget: data.budget,
                status: data.status
            };
            navigate(`/dashboard/${project.id}`, { state: { project } });
        } catch (error) {
            console.error('Error creating project:', error);
        }
    };

    const handleProjectID = async() => {
        try {
            // Make API request to get project details
            const response = await fetch(`http://localhost:8000/project/${projectID}`);

            if (!response.ok) {
                setErrorShow(true)
                return
            }

            const data = await response.json();
            // Extract the projectID from the response

            // Construct the project object with relevant data
            const project = {
                id: data.id,
                name: data.name,
                managerName: data.manager_name,
                tasks: data.tasks,
                stakeholders: data.stakeholders,
                posts:data.posts,
                budget: data.budget,
                status: data.status
            };
            navigate(`/dashboard/${project.id}`, { state: { project } })
        } catch (error) {
            console.error('Error getting project:', error);
        }
    };

    return (
        <Container className="mt-5">
            <h1>Welcome to Our Construction Management Application</h1>
            {errorShow &&
                <Alert variant="danger" onClose={() => setErrorShow(false)} dismissible>
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>
                    Something went wrong with creating or retrieving project.
                </p>
                </Alert>
            }
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
                <Tab eventKey="enterProjectID" title="Existing Project">
                    <Form>
                        <Form.Group controlId="formProjectID" className="mt-3 mb-3">
                            <Form.Label className="me-3">Project ID</Form.Label>
                            <Form.Control type="number" placeholder="Enter Project ID" value={projectID} onChange={(e) => setProjectID(parseInt(e.target.value))} />
                        </Form.Group>
                        <Button variant="primary" onClick={handleProjectID}>Continue</Button>
                    </Form>
                </Tab>
            </Tabs>
        </Container>
    );
};

export default LandingPage;
