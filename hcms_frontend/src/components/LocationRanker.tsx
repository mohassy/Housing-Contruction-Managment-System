import { useState } from 'react';
import {Col, Button, Form, Tab, Tabs, Table} from 'react-bootstrap';

const LocationRanker = () => {
    const suggestions = [
        'West Humber-Clairville',
        'Islington-City Centre West',
        'York University Heights',
        'Rouge',
        'Wexford/Maryvale',
        'Malvern',
        'Downsview-Roding-CFB',
        'Milliken',
        'Yorkdale-Glen Park',
        'St.Andrew-Windfields',
        'Woburn',
        "L'Amoreaux",
        'Dovercourt-Wallace Emerson-Juncti',
        'Clairlea-Birchmount',
        'Banbury-Don Mills',
        'Mimico',
        'Yonge-Eglinton',
        'Centennial Scarborough',
        'Scarborough Village',
        'Etobicoke West Mall'
    ];

    const [locations, setLocations] = useState<string[]>([]);
    const [locationInput, setLocationInput] = useState('');

    const handleLocationSubmit = (e: any) => {
        e.preventDefault();
        if (locations && locations.length < 5 && locationInput.trim() !== '') {
            setLocations([...locations, locationInput.trim()]);
            setLocationInput('');
        }
    };

    const handleRankSubmit = async() => {
        try {
            // Make API request
            const response = await fetch(`http://localhost:8000/rank`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify([...locations]),
            });
            if (!response.ok) {
                throw new Error('Failed to rank locations');
            }

            // Assuming successful addition, update the state to add the new task
            const rankedLocations = await response.json();
            setLocations(rankedLocations);
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const handleDeleteLocation = (index: number) => {
        const updatedLocations = [...locations];
        updatedLocations.splice(index, 1);
        setLocations(updatedLocations);
    };

    return (
        <Col className={"h-75 bg-body-secondary"}>
            <Tabs defaultActiveKey="addLocation" className="mb-4">
                <Tab eventKey="addLocation" title="Add Location">
                    <Form onSubmit={handleLocationSubmit} className="">
                        <Form.Group controlId="formLocation" className={"m-3"}>
                            <Form.Label className={"me-3"}>Location</Form.Label>
                            <Form.Control className={"mb-2 w-50"} type="text" placeholder="Enter Location" list="locationSuggestions"
                                          value={locationInput} onChange={(e) => setLocationInput(e.target.value)}/>
                            <datalist id="locationSuggestions">
                                {suggestions.map((suggestion, index) => (
                                    <option key={index} value={suggestion}/>
                                ))}
                            </datalist>
                        </Form.Group>
                        <Button className={"m-3"} variant="success" type="submit">
                            Add Location
                        </Button>
                    </Form>
                </Tab>
                <Tab eventKey="rankLocation" title="Rank Locations">
                    <Button className={"w-25 ms-3"} variant="primary" onClick={handleRankSubmit}>
                        Rank
                    </Button>
                    <Table striped bordered hover className="m-3">
                        <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Location</th>
                        </tr>
                        </thead>
                        <tbody>
                        {locations.map((location, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{location}</td>
                                <td className="d-flex justify-content-center">
                                    <Button variant="danger" onClick={() => handleDeleteLocation(index)}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Tab>
            </Tabs>
        </Col>
    );
};

export default LocationRanker;
