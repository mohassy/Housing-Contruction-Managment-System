import {Tab, Row, Nav, Col, Container, InputGroup, Form} from 'react-bootstrap';
import Tasks from "../components/tasks.tsx";
import Posts from "../components/posts.tsx";
import Stakeholders from "../components/stakeholders.tsx";
import LocationRanker from "../components/LocationRanker.tsx";
import {useLocation} from "react-router-dom";
import ErrorPage from "./error.tsx";
import {useState} from "react";
import NavComp from "../components/Navbar.tsx";



const Dashboard = () => {
    const location = useLocation();

    const projectExists = location.state && location.state.project;

    if(!projectExists)
        return <ErrorPage/>
    const project = location.state.project

    const [isEditingBudget, setIsEditingBudget] = useState(false);
    const [isEditingStatus, setIsEditingStatus] = useState(false);
    const [editedBudget, setEditedBudget] = useState(project.budget);
    const [editedStatus, setEditedStatus] = useState(project.status)

    const handleBudgetDoubleClick = () => {
        setIsEditingBudget(true);
    };

    const handleStatusDoubleClick = () => {
        setIsEditingStatus(true);
    };

    const handleBudgetChange = (e:any) => {
        setEditedBudget(e.target.value);
    };

    const handleStatusChange = (e:any) => {
        setEditedStatus(e.target.value);
    };

    const handleBudgetBlur = async () => {
        setIsEditingBudget(false);
        console.log({new_budget: parseFloat(editedBudget)})
        try {
            const response = await fetch(`http://localhost:8000/project/budget/${project.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ new_budget: parseFloat(editedBudget) })
            });
            if (!response.ok) {
                throw new Error('Failed to update budget');
            }
        } catch (error) {
            console.error('Error updating budget:', error);
        }
    };

    const handleStatusBlur = async () => {
        setIsEditingStatus(false);
        try {
            const response = await fetch(`http://localhost:8000/project/status/${project.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ new_status: editedStatus })
            });
            if (!response.ok) {
                throw new Error('Failed to update status');
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    return (
        <>
            <NavComp title={project.name}/>
            <Tab.Container id="left-tabs" defaultActiveKey="tasks">
                <Row className={"ms-1"}>
                    <Col sm={2} className=" mt-5 d-flex flex-column justify-content-evenly border border-2">
                        <Row className={"mb-5 p-1 m-1 border-bottom border-start border-end border-2"}>
                            <Nav variant="underline" className="flex-column justify-content-evenly">
                                <Nav.Item>
                                    <Nav.Link eventKey="tasks">Tasks</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="stakeholders">Stakeholders</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="posts">Posts</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="locationRanker">Ranks</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Row>
                        <Row className={"p-1 m-1 bg-success-subtle bg-gradient mt-5 border-top border-start border-end border-2"}>
                            <h6 className={"mb-3"}>Project ID: {project.id}</h6>
                            {isEditingBudget ? (
                                <InputGroup>
                                    <Form.Control
                                        type="number"
                                        value={editedBudget}
                                        onChange={handleBudgetChange}
                                        onBlur={handleBudgetBlur}
                                        autoFocus
                                    />
                                </InputGroup>
                            ) : (
                                <h6 className={"mb-3"} onDoubleClick={handleBudgetDoubleClick}>Budget: ${editedBudget}</h6>
                            )}
                            {isEditingStatus ? (
                                <InputGroup>
                                    <Form.Control
                                        type="text"
                                        value={editedStatus}
                                        onChange={handleStatusChange}
                                        onBlur={handleStatusBlur}
                                        autoFocus
                                    />
                                </InputGroup>
                            ) : (
                                <h6 onDoubleClick={handleStatusDoubleClick}>Status: {editedStatus}</h6>
                            )}
                        </Row>
                    </Col>
                    <Col sm={10}>
                        <Tab.Content>
                            <Tab.Pane eventKey="tasks">
                                <Container className="fixed-height w-50 my-5 d-flex justify-content-center ">
                                    <Tasks project_tasks={project.tasks}/>
                                </Container>
                            </Tab.Pane>
                            <Tab.Pane eventKey="stakeholders">
                                <Container className="fixed-height w-50 my-5 d-flex justify-content-center ">
                                    <Stakeholders project_stakeholders={project.stakeholders}/>
                                </Container>
                            </Tab.Pane>
                            <Tab.Pane eventKey="posts">
                                <Container className="fixed-height w-50 my-5 d-flex justify-content-center">
                                    <Posts project_posts={project.posts}/>
                                </Container>
                            </Tab.Pane>
                            <Tab.Pane eventKey="locationRanker">
                                <Container className="fixed-height w-50 my-5 d-flex justify-content-center ">
                                    <LocationRanker />
                                </Container>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </>

    );
};

export default Dashboard;
