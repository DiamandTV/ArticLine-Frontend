import { Outlet } from "react-router";
import { BottomNavigation } from "src/layout/BottomBar/BottomNavigation";
import { NavigationBar } from "src/layout/NavBar/NavBar";

export function LayoutView(){
    return(
        <div className="flex flex-col h-screen">
            <NavigationBar />
            
            {/* Contenuto che si espande tra le due barre */}
            <div className="flex-1 overflow-auto bg-transparent">
                <div className="w-full h-full bg-transparent p-0 sm:p-4 md:p-6 lg:!p-10 rounded-xl ">
                    <Outlet />
                    <BottomNavigation />
                </div>         
            </div>
            
            {/* Spazio riservato per la barra fissa in basso */}
            <div className="h-[64px] bg-transparent" > {/* altezza uguale alla BusinessBottomNavigation */}
                
            </div>
        </div>
    )
}