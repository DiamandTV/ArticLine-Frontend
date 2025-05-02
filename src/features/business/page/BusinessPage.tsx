import { NavigationBar } from "src/layout/NavBar/NavBar";
import { BusinessBottomNavigation } from "../layout/BottomBar/BusinessBottomBar";
import { Outlet } from "react-router";
export function BusinessPage() {
    return (
        <div className="flex flex-col h-screen">
            <NavigationBar />
            
            {/* Contenuto che si espande tra le due barre */}
            <div className="flex-1 overflow-auto">
               
                    <div className="w-full h-full p-0 sm:p-4 md:p-6 lg:!p-10 rounded-xl">
                        <Outlet />
                    </div>
               
            </div>

            {/* Spazio riservato per la barra fissa in basso */}
            <div className="h-[64px]" /> {/* altezza uguale alla BusinessBottomNavigation */}

            <BusinessBottomNavigation />
        </div>
    );
}