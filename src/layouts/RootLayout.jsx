import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export default function RootLayout() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Emotion Diary
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-center"
          >
            <Nav className="mx-auto">
              <DatePicker
                dateFormat="yyyy/MM/dd"
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                className="form-control text-center"
              />
            </Nav>
            <Nav>
              <LoginPage />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="py-4">
        <Outlet />
      </Container>
    </>
  );
}
