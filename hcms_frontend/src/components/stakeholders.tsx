import { useState} from 'react';
import { Row, Card, Form, Button, Table } from 'react-bootstrap';
import {Stakeholder} from './models';
import {useParams} from "react-router-dom"; // Import your Stakeholder model

interface StakeholdersProps {
    project_stakeholders: Stakeholder[];
}
const Stakeholders = ({project_stakeholders}: StakeholdersProps) => {
    // Dummy stakeholder objects
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [stakeholders, setStakeholders] = useState(project_stakeholders);
    let { projectID } = useParams();
    const handleAdd = async () => {
        try {
            // Make API request to add stakeholder
            const response = await fetch(`http://localhost:8000/stakeholder/${projectID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: stakeholders.length + 1,
                    name,
                    role
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to add stakeholder');
            }

            // Assuming the backend responds with the newly added stakeholder data,
            // you can retrieve and update the state accordingly
            const newStakeholderData = await response.json();

            console.log(newStakeholderData);
            const newStakeholder = {
                id: newStakeholderData[newStakeholderData.length-1].id,
                name: newStakeholderData[newStakeholderData.length-1].name,
                role: newStakeholderData[newStakeholderData.length-1].role
            };
            setStakeholders([...stakeholders, newStakeholder]);
            console.log([...stakeholders, newStakeholder])
            setName('');
            setRole('');
        } catch (error) {
            console.error('Error adding stakeholder:', error);
        }
    };
    const handleDelete = async (stakeholderId: number) => {
        try {
            // Make API request to delete stakeholder
            const response = await fetch(`http://localhost:8000/stakeholder/${projectID}?stakeholder_id=${stakeholderId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete stakeholder');
            }

            // Assuming successful deletion, update the state to remove the deleted stakeholder
            setStakeholders(stakeholders.filter(stakeholder => stakeholder.id !== stakeholderId));
        } catch (error) {
            console.error('Error deleting stakeholder:', error);
        }
    }
    return (
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
                                    <Button type="submit" variant="danger" className="w-100" onClick={() => handleDelete(stakeholder.id)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td>
                                <Form.Control type="number" disabled={true} placeholder="ID"/>
                            </td>
                            <td>
                                <Form.Control type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
                            </td>
                            <td>
                                <Form.Control type="text" placeholder="Role" value={role} onChange={(e) => setRole(e.target.value)}/>
                            </td>
                            <td>
                                <Button className={"col-12 ms-1"} type="submit" variant="success" onClick={handleAdd}>
                                    Add
                                </Button>
                            </td>
                        </tr>
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </Row>
    );
}

export default Stakeholders;
