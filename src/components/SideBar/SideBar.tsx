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
export function SideBarApp(){
    return (
        <div className="h-screen ">
            <Sidebar 
                className="h-full flex flex-col"    
                backgroundColor="transparent"
                style={{borderColor:"rgb(75 85 99)",borderRightWidth:"2px"}}
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
                <MenuItem id="HOME" icon={<IoHome/>} >HOME</MenuItem>
                <SubMenu id="CATEGORIES" icon={<BiSolidCategory/>} label="CATEGORIES"></SubMenu>
                <SubMenu id="ORDERS" icon={<FaClipboardList/>} label="ORDERS"></SubMenu>
                <SubMenu id="DASHBOARDS" icon={<IoBarChartSharp/>} label="DASHBOARDS"></SubMenu>
                <SubMenu id="STORES" icon={<FaStore/>} label="STORES"></SubMenu>
                <SubMenu id="CHARTS" icon={<IoChatbubbleEllipses/>} label="CHATS" ></SubMenu>
                <MenuItem id="ACCOUNT" icon ={<FaUser/>}>ACCOUNT</MenuItem>
                <MenuItem icon={<IoMdSettings/>} >SETTINGS</MenuItem>
                <MenuItem icon={<IoMdNotificationsOutline/>} >NOTIFICATIONS</MenuItem>
                <MenuItem id="LOGOUT" icon={<BiLogOut/>} >LOGOUT</MenuItem>
            </Menu>


            </Sidebar>
        </div>
    )
}