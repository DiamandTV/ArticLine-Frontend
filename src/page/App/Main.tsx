// MAIN PAGE ACCOUNT
import { NavBar } from "../../layouts/NavBar/NavBar"
import { MainView } from "../../views/MainView"
import { NavBarType } from "../../layouts/NavBar/NavBarTypes"
//import { SearchBar } from "../../components/SearchBar/SearchBar"
import { SideBarApp } from "../../components/SideBar/SideBar"
import { Outlet } from "react-router-dom"

export function Main(){
    return (
        <MainView>
            <NavBar
                type={NavBarType.ONLY_TITLE}
            />
            <hr className="bg-gray-600 border-gray-500 " />
            <div className="flex flex-row gap-x-2 overflow-hidden">
                <SideBarApp/>
                <div className="w-full flex flex-col bg-slate-900 overflow-auto">
                    <Outlet/>
                </div>
            </div>   
        </MainView>
    )
}