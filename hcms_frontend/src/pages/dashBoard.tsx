import { Tab, Row, Nav, Col} from 'react-bootstrap';
import Tasks from "../components/tasks.tsx";
import Posts from "../components/posts.tsx";
import Stakeholders from "../components/stakeholders.tsx";
import LocationRanker from "../components/LocationRanker.tsx";

const Dashboard = () => {
    return (
        <Tab.Container id="left-tabs" defaultActiveKey="tasks">
            <Row>
                <Col xs={1} className="mt-5">
                    <Nav variant="tabs" className="flex-column justify-content-center">
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
                </Col>
                <Col xs={10}>
                    <Tab.Content>
                        <Tab.Pane eventKey="tasks">
                            <Tasks />
                        </Tab.Pane>
                        <Tab.Pane eventKey="stakeholders">
                            <Stakeholders />
                        </Tab.Pane>
                        <Tab.Pane eventKey="posts">
                            <Posts />
                        </Tab.Pane>
                        <Tab.Pane eventKey="locationRanker">
                            <LocationRanker />
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    );
};

export default Dashboard;
