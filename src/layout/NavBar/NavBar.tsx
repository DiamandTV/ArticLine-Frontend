import { LogoTitle } from "@components/images/Logo/LogoTitle";
import { ChatButton } from "@features/chats";
import { NotificationButton } from "@features/notifications";
import {  Container, Navbar } from "react-bootstrap";
export function NavigationBar() {
  return (
    <Navbar expand={false} className="bg-surface-a0 text-surface-a0 shadow-md h-max p-0" sticky="top">
      <Container fluid>
        <Navbar.Brand>
          <LogoTitle />
        </Navbar.Brand>

        <div className="flex flex-row gap-x-4 md:gap-x-8 justify-between items-center px-1 ">
          <NotificationButton/>
          <ChatButton/>
        </div>
      
          
      </Container>
    </Navbar>
  );
}


