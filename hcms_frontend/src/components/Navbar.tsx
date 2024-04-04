import {Container, Navbar} from 'react-bootstrap';


const Nav = ({ title }: { title: string }) => {
    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container className={"d-flex justify-content-center"}>
                <Navbar.Brand>WELCOME TO {title.toUpperCase()}</Navbar.Brand>
            </Container>
        </Navbar>
    );
}

export default Nav;