// MAIN PAGE ACCOUNT
import { NavBar } from "../../layouts/NavBar/NavBar"
import { MainView } from "../../views/MainView"
import { NavBarType } from "../../layouts/NavBar/NavBarTypes"
//import { SearchBar } from "../../components/SearchBar/SearchBar"
import { SideBarApp } from "../../layouts/SideBar/SideBar"
import { SiderBarProvider } from "../../layouts/SideBar/context/SiderBarProvider"
import { MainViewOutlet } from "../../components/Main/MainViewOutlet"

export function Main(){
    return (
        <MainView>
            <SiderBarProvider>
                <NavBar
                    type={NavBarType.ONLY_TITLE}
                />
                <hr className="bg-gray-600 border-gray-500 " />
                <div className="flex flex-row gap-x-2 overflow-hidden">
                    <SideBarApp/>
                    <MainViewOutlet/>
                </div>   
            </SiderBarProvider>
        </MainView>
    )
}