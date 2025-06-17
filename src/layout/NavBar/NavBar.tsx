import { LogoTitle } from "@components/images/Logo/LogoTitle";
import { useNavigationBarContext } from "@context/NavigationBarContext/NavigationBarProvider";
import { ChatButton } from "@features/chats";
import { NotificationButton } from "@features/notifications";
import { RootState } from "@store/store";
import { useState } from "react";
import {  Container, Dropdown, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Can } from "src/config/permissions/can";
import { RxCross1 } from "react-icons/rx";

function BusinessDropdown(){
  const navigator = useNavigate()
  const [show,setShow] = useState(false)
  const profile = useSelector((state:RootState)=>state.authReducer.profile)
  if(!profile) return

  const onToggleBlur = ()=>{
    setTimeout(()=>{
      setShow(false)
    },100)
  }
  return( 
    <Can I="read" a="Business">
      <Dropdown  drop="down-centered" placement="right-start" autoClose show={show} onClick={()=>setShow(!show)}>
        <Dropdown.Toggle className="p-0 text-2xl  font-semibold md:text-sm md:font-medium bg-transparent border-none text-surface-a0 hover:bg-none hover:!text-surface-a0 focus:!text-surface-a0" onBlur={onToggleBlur}>
          BUSINESS
        </Dropdown.Toggle>

          <Dropdown.Menu className={`transition-all duration-500 md:!absolute border-none md:border-solid !relative !flex flex-col md:!flex-row !justify-center !items-center gap-4 md:!gap-8 !px-10 !py-2 !bg-surface-a0 top-0 right-0 md:!-translate-x-1/2 md:!left-1/2 !bg-gray-200 backdrop-blur-3xl bg-opacity-5 md:!border-t-0  !rounded-b-2xl !rounded-t-none md:translate-y-6 my-2 !w-max ${show ? '' : '!hidden md:flex'}`}>
            <Dropdown.Item className=" md:p-0 px-2 m-0 !font-sans md:!text-sm !text-base !font-medium " onClick={()=>navigator(`/company/${profile.id}/store/`)} >
                STORES
            </Dropdown.Item>
            <Dropdown.Item className="md:p-0 px-2 m-0 !font-sans !font-medium md:!text-sm !text-base"  onClick={()=>navigator(`/company/${profile.id}/orders/`)}>
              ORDERS
            </Dropdown.Item>
            <Dropdown.Item className="md:p-0 px-2 m-0 !font-sans !font-medium md:!text-sm !text-base" onClick={()=>navigator(`/company/${profile.id}/order-delivery-batch/`)}>
              BATCHES
            </Dropdown.Item>
          </Dropdown.Menu>
  
      </Dropdown> 
    </Can>
  )
}

function SubNavigation({isCollapse}:{isCollapse:boolean}){
  const navigator = useNavigate()
  let className = ''
  if(!isCollapse){
    className = "flex flex-row gap-8 px-10 py-2 font-sans text-sm font-medium bg-gray-500 rounded-full bg-opacity-15 w-max backdrop-blur-3xl"
  } else {
    className = "flex flex-col gap-6 pl-4 text-2xl font-semibold h-max"
  }

  return(
    <div className={className}>
      <Nav.Link onClick={()=>navigator('/')}>HOME</Nav.Link>
      <Nav.Link onClick={()=>navigator('/carts/')}>CARTS</Nav.Link>
    
      <BusinessDropdown />

      <Nav.Link onClick={()=>navigator('/orders/')}>ORDERS</Nav.Link>
      <Nav.Link onClick={()=>navigator('/account')}>ACCOUNT</Nav.Link>
    </div>
  )
}

export function NavigationBar() {
  const {show,setShow} = useNavigationBarContext()
  return (
    <Navbar expand={false} collapseOnSelect className="p-0 shadow-md bg-surface-a0 text-surface-a0 h-max " sticky="top">
      <Container fluid className="p-0 mx-mb-df md:mx-df">
        <div className="flex flex-row gap-2">
          {
            <Navbar.Toggle onClick={()=>setShow(!show)} className="px-1 border-none md:hidden"/>
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
        show={show}

      >
        <Offcanvas.Header >
          <div className="flex flex-row items-center justify-between w-full ">
            <LogoTitle firstLetterClassName="text-6xl" restLettersClassName="text-5xl"/>
            <button className="p-2" onClick={()=>setShow(false)}>
              <RxCross1 size={25}/>
            </button>
          </div>
        </Offcanvas.Header>
        <Offcanvas.Body className="flex flex-col justify-between ">
          <SubNavigation isCollapse/>
          {
            // <button className="flex flex-row items-center self-end justify-center gap-2 px-4 py-2 w-max">
            //   <GrLogout size={27.5}/>
            //   <span className="text-lg font-medium">LOGOUT</span>
            // </button>
          }
        </Offcanvas.Body>
      </Navbar.Offcanvas>
    </Navbar>
  );
}


