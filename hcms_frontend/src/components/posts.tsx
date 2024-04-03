import { useState } from 'react';
import {Col, Button, Form, Tab, Tabs, Container, Stack} from 'react-bootstrap';
import {Post} from "./models.ts";
import {useParams} from "react-router-dom";

interface PostsProps {
    project_posts: Post[]
}

const Posts = ({project_posts}: PostsProps) => {
    const [posts, setPosts] = useState(project_posts);
    const [postText, setPostText] = useState('');
    const [author, setAuthor] = useState('');
    const [dueDate, setDueDate] = useState(Date.UTC.prototype);
    let { projectID } = useParams();
    const handleCreatePost = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8000/post/${projectID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: posts.length + 1,
                    text: postText,
                    author: author,
                    status: 'Draft'
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create post');
            }

            const newPost = await response.json();
            setPosts([...posts, newPost]);
            setPostText('');
            setAuthor('');
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    const handlePostDelete = async ( postId: number) => {
        try {
            const response = await fetch(`http://localhost:8000/post/${projectID}?post_id=${postId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete post');
            }

            const updatedPosts = posts.filter(post => post.id !== postId);
            setPosts(updatedPosts);
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const handlePostApprove = async (postId: number) => {
        try {
            const response = await fetch(`http://localhost:8000/post/${projectID}?post_id=${postId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status: 'Approved',
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to approve post');
            }

            const updatedPosts = posts.map(post => {
                if (post.id === postId) {
                    return { ...post, status: 'Approved' };
                }
                return post;
            });
            setPosts(updatedPosts);
        } catch (error) {
            console.error('Error approving post:', error);
        }
    };


    return (
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
                                    <p>By: {post.author}</p>
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

    );
};

export default Posts;
