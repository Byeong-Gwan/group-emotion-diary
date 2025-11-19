import { useState } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link, Outlet, useLocation } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
export default function RootLayout() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const location = useLocation().pathname;

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
            className="justify-content-center d-flex flex-column gap-3"
          >
            <Nav className="mx-auto">
              <DatePicker
                dateFormat="yyyy/MM/dd"
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                className="form-control text-center"
              />
            </Nav>
            <Nav className="justify-content-center d-flex flex-column gap-3">
              {location === "/" ? null : (
                <Button
                  as={Link}
                  to="/"
                  className="me-md-4 "
                  variant="outline-primary"
                >
                  📚다이어리 목록
                </Button>
              )}
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
