import { LogoTitle } from "@components/images/Logo/LogoTitle";
import { ChatButton } from "@features/chats";
import { NotificationButton } from "@features/notifications";
import {  Container, Nav, Navbar, NavDropdown, Offcanvas } from "react-bootstrap";
import { useNavigate } from "react-router";

function BusinessDropdown(){
  return( 
      <NavDropdown title="BUSINESS" >
        <NavDropdown.Item>
            STORES
        </NavDropdown.Item>
        <NavDropdown.Divider/>
        <NavDropdown.Item>
          ORDERS
        </NavDropdown.Item>
        <NavDropdown.Divider/>
        <NavDropdown.Item>
          DELIVERY BATCHES
        </NavDropdown.Item>
      </NavDropdown> 
  )
}

function SubNavigation({isCollapse}:{isCollapse:boolean}){
  const navigator = useNavigate()
  let className = ''
  if(!isCollapse){
    className = "flex flex-row gap-8 px-10 py-2 font-sans text-sm font-medium bg-gray-500 rounded-full bg-opacity-15 w-max backdrop-blur-3xl"
  } else {
    className = "flex flex-col h-full gap-6 pl-4 text-2xl font-semibold"
  }

  const navigateTo = (url:string)=>{
    navigator(url)
  }

  return(
    <div className={className}>
      <Nav.Link onClick={()=>navigateTo('/')}>HOME</Nav.Link>
      <Nav.Link onClick={()=>navigateTo('/carts/')}>CARTS</Nav.Link>
    
      <BusinessDropdown />

      <Nav.Link onClick={()=>navigateTo('/orders/')}>ORDERS</Nav.Link>
      <Nav.Link onClick={()=>navigateTo('/account')}>ACCOUNT</Nav.Link>
    </div>
  )
}

export function NavigationBar() {
  return (
    <Navbar expand={false} collapseOnSelect className="p-0 shadow-md bg-surface-a0 text-surface-a0 h-max " sticky="top">
      <Container fluid className="p-0 mx-mb-df md:mx-df">
        <div className="flex flex-row gap-2">
          {
            <Navbar.Toggle className="px-1 border-none md:hidden"/>
          }
          <Navbar.Brand>
            <LogoTitle />
          </Navbar.Brand>
        </div>
        
        <div className="hidden md:block">
          <SubNavigation isCollapse={false}/>
        </div>

        <div className="flex flex-row items-center justify-between px-1 gap-x-4 lg:gap-x-6 ">
          <NotificationButton/>
          <ChatButton/>
        </div>
      </Container>
      <Navbar.Offcanvas
   
      >
        <Offcanvas.Header closeButton></Offcanvas.Header>
        <Offcanvas.Body>
          <SubNavigation isCollapse/>
        </Offcanvas.Body>
      </Navbar.Offcanvas>
    </Navbar>
  );
}


