import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import { IoHome } from "react-icons/io5";
import { IoBarChartSharp } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { useContext, } from "react";
import { Link } from "react-router-dom";
import { SIDEBAR_ICON_SIZE } from "../../constraints";
import { StoreSection } from "./Sections/StoreSection";
//import { CompanyProtectedRoute } from "../../router/CompanyProtectedRoute";
import { CartSection } from "./Sections/CartSection";
import { OrderSection } from "./Sections/OrderSection";
import { DeviceSection } from "./Sections/DeviceSection";
import { RxHamburgerMenu } from "react-icons/rx";
import { SiderBarContext } from "./context/SiderBarContext";
import { useMediaQuery } from "../../hooks/useMediaQuery";

//import { OrderBatchSection } from "./Sections/OrderBatchSection";
/*
const useProfile:UserProfileModel = {
    auth:{
        email:"",
        password:"",
        phone_number:""
    },
    image:"77832",
    first_name:"Rehman",
    last_name:"Nazir",
    username:"Flezon",
    date_of_birth:"1999/12/2017",
    address:{
        recipient_name:"",
        street:"",
        city:"",
        province:"",
        country:"",
        postal_code:""
    }
}
*/

export function SideBarApp(){
    const isSM = useMediaQuery({query:'(min-width:40rem)'})
    const {open,setOpen} = useContext(SiderBarContext)

    const getCollapsedWidth = ()=>{
        if(!isSM){
            return '0px'
        } 
        return undefined
    }
    return (
        <div className={`h-screen  z-50 absolute bg-slate-900  sm:relative sm:bg-transparent ` }>
            <Sidebar 
                className="h-full flex flex-col "
                backgroundColor="transparent"
                style={
                    (isSM || open) ? {
                        borderColor:"rgb(75 85 99)",borderRightWidth:"2px"} : {borderWidth:'0px'}
                        
                    }
                collapsed={!open}
                collapsedWidth={getCollapsedWidth()}
                // onMouseEnter={()=>setCollapsed(false)}
                // onMouseLeave={()=>setCollapsed(true)}
            >
            <Menu
                menuItemStyles={{
                    button: () => ({
                        backgroundColor: "transparent",
                        ":hover": {
                            backgroundColor: "transparent", // Mantieni trasparente
                            color: "inherit", // Assicura che il testo non cambi colore
                        },
                    }),
                    subMenuContent: () => ({
                        backgroundColor: "transparent",
                        ":hover": {
                            backgroundColor: "transparent", // Disattiva il bianco sull'hover
                        },
                    }),
                }}
            >
                <MenuItem className="hidden sm:block" icon={<RxHamburgerMenu size={SIDEBAR_ICON_SIZE}/>} onClick={()=>{
                    setOpen(!open)
                }}/>
                <Link to={"/"}>
                    <MenuItem id="HOME" icon={<IoHome size={SIDEBAR_ICON_SIZE}/>} >HOME</MenuItem>
                </Link>
                {
                    // <Link to={"/categories"}>
                    //     <MenuItem id="CATEGORIES" icon={<BiSolidCategory size={SIDEBAR_ICON_SIZE}/>}>CATEGORIES</MenuItem>
                    // </Link>
                }
                <CartSection/>
                {
                //    <SubMenu id="DASHBOARDS" icon={<IoBarChartSharp size={SIDEBAR_ICON_SIZE}/>} label="DASHBOARDS"></SubMenu>
                }
                
                <StoreSection/>
                
                <DeviceSection/>

                
                <OrderSection/>

                <SubMenu id="CHARTS" icon={<IoChatbubbleEllipses size={SIDEBAR_ICON_SIZE}/>} label="CHATS" ></SubMenu>
                <MenuItem id="ACCOUNT" icon ={<FaUser size={SIDEBAR_ICON_SIZE}/>}>ACCOUNT</MenuItem>
                
                {/*<MenuItem icon={<IoMdnotifications size={SIDEBAR_ICON_SIZE}/>} >NOTIFICATIONS</MenuItem>*/}
                <MenuItem icon={<IoMdSettings size={SIDEBAR_ICON_SIZE}/>} >SETTINGS</MenuItem>
                </Menu>    
            </Sidebar>
            
        </div>
    )
}