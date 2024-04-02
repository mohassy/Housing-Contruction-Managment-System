import { useState } from 'react';
import {Col, Button, Form, Tab, Tabs, Container, Stack} from 'react-bootstrap';

const dummyPosts = [
    { id: 1, text: 'Dummy Post 1', author: { name: 'Author 1' }, due_date: new Date(Date.UTC(2001, 1, 23)), status: 'Draft' },
    { id: 2, text: 'Dummy Post 2', author: { name: 'Author 2' }, due_date: new Date(Date.UTC(2001, 1, 23)), status: 'Published' },
    { id: 3, text: 'Dummy Post 3', author: { name: 'Author 3' }, due_date: new Date(Date.UTC(2001, 1, 23)), status: 'Published' },
    // Add more dummy posts as needed
];

const Posts = () => {
    const [posts, setPosts] = useState(dummyPosts);
    const [postText, setPostText] = useState('');
    const [author, setAuthor] = useState('');
    const [dueDate, setDueDate] = useState(Date.UTC.prototype);


    const handleCreatePost = (e: any) => {
        e.preventDefault();
        const newPost = {
            id: posts.length + 1,
            text: postText,
            author: { name: author },
            due_date: new Date(dueDate),
            status: 'Draft'
        };
        setPosts([...posts, newPost]);
        setPostText('');
        setAuthor('');
        setDueDate('');
    };

    const handlePostDelete = (postId: number) => {
        const updatedPosts = posts.filter(post => post.id !== postId);
        setPosts(updatedPosts);
    };

    const handlePostApprove = (postId: number) => {
        const updatedPosts = posts.map(post => {
            if (post.id === postId) {
                return { ...post, status: 'Approved' };
            }
            return post;
        });
        setPosts(updatedPosts);
    };

    return (
        <section className="vh-100" style={{ backgroundColor: "#eee" }}>
            <Container className="py-5 h-100">
                <Col className={"w-50 bg-body-secondary p-3"}>
                    <Tabs defaultActiveKey="viewPosts" className="mb-4">
                        <Tab eventKey="viewPosts" title="View Posts">
                            {posts.map(post => (
                                <Container className={"mb-2 p-2 border-bottom border-end border-5 bg-light-subtle"}>
                                    <Stack direction={"horizontal"}
                                           className={"rounded border-bottom border-end border-2 border-opacity-50 border-success-subtle m-2 p-2 bg-light-subtle"}>
                                        <h6 className={"w-100 text-success text-center"}>{post.text}</h6>
                                    </Stack>
                                    <Stack direction={"horizontal"}
                                           className={"rounded border-bottom border-end border-2 border-opacity-50 pt-1 border-secondary-subtle m-2 bg-secondary-subtle"}>
                                        <Stack direction="horizontal" gap={3} className={"w-100 justify-content-evenly"}>
                                            <p>By: {post.author.name}</p>
                                            <div className="vr"/>
                                            <p >Due Date: {post.due_date.toLocaleDateString()}</p>
                                            <div className="vr"/>
                                            <p>Status: {post.status}</p>
                                        </Stack>
                                    </Stack>
                                    <Stack direction={"horizontal"} className={"w-100 align-items-center justify-content-evenly"}>
                                        <Button variant="outline-success" onClick={() => handlePostApprove(post.id)}>Approve</Button>
                                        <Button variant="outline-danger" onClick={() => handlePostDelete(post.id)}>Delete</Button>
                                    </Stack>
                                </Container>

                            ))}
                        </Tab>
                        <Tab eventKey="createPost" title="Create Post">
                            <Form onSubmit={handleCreatePost} className="">
                                <Form.Group controlId="formPostText" className={"m-3"}>
                                    <Form.Label className={"me-3"}>Post Text</Form.Label>
                                    <Form.Control className={"mb-2 w-75"} type="text" placeholder="Enter Text" as="textarea" rows={3} value={postText} onChange={(e) => setPostText(e.target.value)} />
                                </Form.Group>
                                <Form.Group controlId="formAuthor" className={"m-3"}>
                                    <Form.Label className={"me-3"}>Author</Form.Label>
                                    <Form.Control className={"mb-2 w-50"} type="text" placeholder="Enter Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
                                </Form.Group>
                                <Form.Group controlId="formDueDate" className={"m-3"}>
                                    <Form.Label className={"me-3"}>Due Date</Form.Label>
                                    <Form.Control className={"mb-2 w-50"} type="date" placeholder="Enter Due Date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                                </Form.Group>
                                <Button className={"m-3"} variant="success" type="submit">
                                    Create Post
                                </Button>
                            </Form>
                        </Tab>
                    </Tabs>
                </Col>
            </Container>

        </section>

    );
};

export default Posts;
