import { Button, Container, Nav, Navbar } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link, Outlet, useLocation } from "react-router-dom";
import useDiaryStore from "../app/store/diary";
import LoginPage from "../pages/auth/LoginPage";
import useMoodFillNavigation from "../app/hooks/useMoodFillNavigation";

export default function RootLayout() {
  const location = useLocation().pathname;
  const { selectedDate, setSelectedDate } = useDiaryStore();
  useMoodFillNavigation();

  return (
    <>
      <Navbar bg="light" expand="lg" className="app-navbar shadow-sm sticky-top">
        <Container className="app-content">
          <Navbar.Brand as={Link} to="/" className="app-navbar-brand">
            Emotion Diary
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="mx-auto mb-3 mb-lg-0">
              <DatePicker
                dateFormat="yyyy/MM/dd"
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                className="form-control text-center"
              />
            </Nav>
            <Nav className="justify-content-center d-flex gap-3 align-items-center">
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
      <Container className="py-4 app-content">
        <Outlet />
      </Container>
    </>
  );
}
