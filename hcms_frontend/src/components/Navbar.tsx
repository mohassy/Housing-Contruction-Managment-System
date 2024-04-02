import {Container, Navbar} from 'react-bootstrap';

const NavComp = () => {
    return (
        <Container>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container className="text-center">
                    <Navbar.Brand href="#">Housing Construction Management System</Navbar.Brand>
                </Container>
            </Navbar>
        </Container>
    );
}

export default NavComp;