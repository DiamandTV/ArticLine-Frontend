import { NavBarItem } from "@components/cards/NavBarItem/NavBarItem";
import { LogoTitle } from "@components/images/Logo/LogoTitle";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import {
  FaHome,
  FaShoppingCart,
  FaHeart,
  FaReceipt,
  FaMapMarkerAlt,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";

export function NavigationBar() {
  return (
    <Navbar expand={false} className="bg-surface-a0 text-surface-a0 shadow-md" fixed="top">
      <Container fluid>
        <Navbar.Brand>
          <LogoTitle />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvas-navbar" className="border-none text-primary-a0" />
        <Navbar.Offcanvas
          id="offcanvas-navbar"
          placement="end"
          className="bg-surface-a0 text-surface-a0"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              <LogoTitle />
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="flex flex-col gap-2">
              <Nav.Link href="/">
                <NavBarItem icon={<FaHome />} title="Home" />
              </Nav.Link>
              <Nav.Link href="/orders">
                <NavBarItem icon={<FaReceipt />} title="Orders" />
              </Nav.Link>
              <Nav.Link href="/cart">
                <NavBarItem icon={<FaShoppingCart />} title="Carrello" />
              </Nav.Link>
              <Nav.Link href="/favorites">
                <NavBarItem icon={<FaHeart />} title="Preferiti" />
              </Nav.Link>
              <Nav.Link href="/account">
                <NavBarItem icon={<FaUserCircle />} title="Account" />
              </Nav.Link>
              <div className="border-t border-surface-a30 my-2"></div>
              <Nav.Link href="/logout">
                <NavBarItem icon={<FaSignOutAlt />} title="Logout" />
              </Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}
