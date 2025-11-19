import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useDiaryStore from "../app/store/diary";

export default function RootLayout() {

  const {selectedDate, setSelectedDate} = useDiaryStore();
  
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
