import React, { useState } from 'react';
import { Col, Row, Button, Stack, Form } from 'react-bootstrap';

const dummyPosts = [
    { id: 1, text: 'Dummy Post 1', author: { name: 'Author 1' }, due_date: 'Today', status: 'Draft' },
    { id: 2, text: 'Dummy Post 2', author: { name: 'Author 2' }, due_date: 'Today', status: 'Published' },
    { id: 3, text: 'Dummy Post 3', author: { name: 'Author 3' }, due_date: 'Today', status: 'Published' },
    // Add more dummy posts as needed
];

const PostList = () => {
    const [showForm, setShowForm] = useState(false);

    const handleCreatePost = () => {
        setShowForm(!showForm);
    };

    return (
        <Col className={"w-50 bg-body-secondary p-3"}>
            <Button className={'float-end'} variant={!showForm ? "success" : "secondary"} onClick={handleCreatePost}>{!showForm ? "New Post" : "Close"}</Button>
            {showForm && (
                <Form className="m-5">
                    <Form.Group controlId="formPostText" className={"m-3"}>
                        <Row >
                            <Form.Control className={"mb-2 w-75"} type="text" placeholder="Enter Text"
                                          as="textarea"
                                          rows={3} // Set rows to 3 for a height of 3 lines

                            />
                        </Row>
                        <Row>
                            <Form.Control className={"mb-2 w-50"} type="text" placeholder="Author" />
                        </Row>
                        <Row>
                            <Form.Control className={"mb-2 w-50"} type="text" placeholder="Due Date" />
                        </Row>


                    </Form.Group>
                    <Button className={"m-2"} variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            )}
            {dummyPosts.map(post => (
                <Row className={"border border-2 border-opacity-50 border-primary m-5 bg-light-subtle"}>
                    <Stack>
                        <h4 className={"p-2 text-success"}>{post.text}</h4>
                    </Stack>
                    <Stack direction="horizontal" gap={3} className={"d-flex flex-row justify-content-between"}>
                        <p className={"p-2 text-primary-emphasis"}>Author: {post.author.name}</p>
                        <p className={"p-2 text-info-emphasis"}>Due Date: {post.due_date}</p>
                        <div className="vr"/>
                        <p className={"p-2 col-3 text-warning-emphasis"}>Status: {post.status}</p>
                        <Button variant="outline-success">Approve</Button>
                        <Button variant="outline-danger">Delete</Button>
                    </Stack>
                </Row>
            ))}
        </Col>
    );
};

export default PostList;
