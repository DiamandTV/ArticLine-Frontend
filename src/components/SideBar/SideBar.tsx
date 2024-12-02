import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import { IoHome } from "react-icons/io5";
import { FaClipboardList } from "react-icons/fa6";
import { IoBarChartSharp } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FaStore } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { AccountAvatar } from "../AccountAvatar/AccountAvatar";
import { IoMdSettings } from "react-icons/io";
import { UserProfileModel } from "../../models/user";
import { BiLogOut } from "react-icons/bi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useState } from "react";
import { IoMdNotifications } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
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
const SIDEBAR_ICON_SIZE = 22.5
export function SideBarApp(){
    const [collapsed,setCollapsed] = useState(false)
    return (
        <div className="h-screen">
            <Sidebar 
                className="h-full flex flex-col"    
                backgroundColor="transparent"
                style={{borderColor:"rgb(75 85 99)",borderRightWidth:"2px"}}
                collapsed={collapsed}
            >
            <Menu
                menuItemStyles={{
                    subMenuContent:({level,active,disabled})=> {
                        return {
                            backgroundColor:"transparent"
                        }
                    },
                }}
            >
                <MenuItem id="HOME" icon={<GiHamburgerMenu size={SIDEBAR_ICON_SIZE}/>} onClick={()=>setCollapsed(!collapsed)} className="w-full"/>
                <MenuItem id="HOME" icon={<IoHome size={SIDEBAR_ICON_SIZE}/>} >HOME</MenuItem>
                <SubMenu id="CATEGORIES" icon={<BiSolidCategory size={SIDEBAR_ICON_SIZE}/>} label="CATEGORIES"></SubMenu>
                <SubMenu id="ORDERS" icon={<FaClipboardList size={SIDEBAR_ICON_SIZE}/>} label="ORDERS"></SubMenu>
                <SubMenu id="DASHBOARDS" icon={<IoBarChartSharp size={SIDEBAR_ICON_SIZE}/>} label="DASHBOARDS"></SubMenu>
                <SubMenu id="STORES" icon={<FaStore size={SIDEBAR_ICON_SIZE}/>} label="STORES"></SubMenu>
                <SubMenu id="CHARTS" icon={<IoChatbubbleEllipses size={SIDEBAR_ICON_SIZE}/>} label="CHATS" ></SubMenu>
                <MenuItem id="ACCOUNT" icon ={<FaUser size={SIDEBAR_ICON_SIZE}/>}>ACCOUNT</MenuItem>
                <MenuItem icon={<IoMdSettings size={SIDEBAR_ICON_SIZE}/>} >SETTINGS</MenuItem>
                <MenuItem icon={<IoMdNotifications size={SIDEBAR_ICON_SIZE}/>} >NOTIFICATIONS</MenuItem>
                
                </Menu>    
            </Sidebar>
            
        </div>
    )
}