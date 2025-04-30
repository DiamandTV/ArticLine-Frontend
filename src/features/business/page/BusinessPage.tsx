import { NavigationBar } from "src/layout/NavBar/NavBar";
import { BusinessBottomNavigation } from "../layout/BottomBar/BusinessBottomBar";
import { Outlet } from "react-router";
import { PaddingView } from "@views/PaddingView";
import { Container } from "react-bootstrap";
export function BusinessPage() {
    return (
        <div className="flex flex-col h-screen">
            <NavigationBar />
            
            {/* Contenuto che si espande tra le due barre */}
            <div className="flex-1 overflow-auto">
                <PaddingView>
                    <Container className="p-2 sm:p-4 md:p-6 lg:!p-10 rounded-xl bg-surface-a0">
                        <Outlet />
                    </Container>
                </PaddingView>
            </div>

            {/* Spazio riservato per la barra fissa in basso */}
            <div className="h-[64px]" /> {/* altezza uguale alla BusinessBottomNavigation */}

            <BusinessBottomNavigation />
        </div>
    );
}