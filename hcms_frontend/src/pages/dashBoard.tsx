import {Tab, Row, Nav, Col, Container} from 'react-bootstrap';
import Tasks from "../components/tasks.tsx";
import Posts from "../components/posts.tsx";
import Stakeholders from "../components/stakeholders.tsx";
import LocationRanker from "../components/LocationRanker.tsx";
import {useLocation, useParams} from "react-router-dom";
import ErrorPage from "./error.tsx";



const Dashboard = () => {
    let { projectID } = useParams();
    const location = useLocation();

    const projectExists = location.state && location.state.project;

    if(!projectExists)
        return <ErrorPage/>
    const project = location.state.project

    return (
        <Tab.Container id="left-tabs" defaultActiveKey="tasks">
            <Row>
                <Col xs={2} className="mt-5 d-flex flex-column justify-content-evenly">
                    <Row>
                        <Nav variant="tabs" className="flex-column justify-content-evenly">
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
                    <Row>
                        <h1>{projectID}</h1>
                    </Row>
                </Col>
                <Col xs={10}>
                    <Tab.Content>
                        <Tab.Pane eventKey="tasks">
                            <Container className="vh-100 d-flex justify-content-center ">
                                <Tasks project_tasks={project.tasks}/>
                            </Container>
                        </Tab.Pane>
                        <Tab.Pane eventKey="stakeholders">
                            <Container className="vh-100 py-5 d-flex justify-content-center ">
                                <Stakeholders project_stakeholders={project.stakeholders}/>
                            </Container>
                        </Tab.Pane>
                        <Tab.Pane eventKey="posts">
                            <Container className="vh-100 d-flex justify-content-center">
                                <Posts project_posts={project.posts}/>
                            </Container>
                        </Tab.Pane>
                        <Tab.Pane eventKey="locationRanker">
                            <Container className="vh-100 d-flex justify-content-center ">
                                <LocationRanker />
                            </Container>
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    );
};

export default Dashboard;
