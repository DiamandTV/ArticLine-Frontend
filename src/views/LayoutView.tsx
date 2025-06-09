import { Outlet } from "react-router";
import { NavigationBar } from "src/layout/NavBar/NavBar";

export function LayoutView(){
    return(
        <div className="flex flex-col h-full min-h-screen">
            <NavigationBar />
            
        
            {
                // {/* Contenuto che si espande tra le due barre */}
                // <div className="flex-1 w-full h-full overflow-auto bg-transparent">
                //     <div className="w-full h-full p-0 bg-transparent rounded-xl ">
                //         <Outlet />
                //         <BottomNavigation />
                //     </div>         
                // </div>
            }

            <Outlet/>
            
            {/* Spazio riservato per la barra fissa in basso */}
            <div className="h-4 bg-transparent" > {/* altezza uguale alla BusinessBottomNavigation */}
                
            </div>
        </div>
    )
}