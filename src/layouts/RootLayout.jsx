 import { Container, Nav, Navbar } from 'react-bootstrap'
 import { Link, Outlet } from 'react-router-dom'

 export default function RootLayout() {
   return (
     <>
       <Navbar bg="light" expand="lg">
         <Container>
           <Navbar.Brand as={Link} to="/">Emotion Diary</Navbar.Brand>
           <Nav className="ms-auto">
             <Nav.Link as={Link} to="/">Diaries</Nav.Link>
             <Nav.Link as={Link} to="/diary/new">New</Nav.Link>
           </Nav>
         </Container>
       </Navbar>
       <Container className="py-4">
         <Outlet />
       </Container>
     </>
   )
 }
