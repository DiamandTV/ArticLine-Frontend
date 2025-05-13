import { Store } from "@features/store/compositions/Store";
import { Card } from "react-bootstrap";
import { StoreHeader } from "../../store/StoreHeader";
import { IoStorefront } from "react-icons/io5";

export function StoreIntroCard(){
    return(
        <Card className="w-max h-16 relative flex flex-row justify-evenly p-0 box-content">
            {/* STORE ICON */}
            <IoStorefront className="absolute -right-4 -top-4 text-2xl bg-primary-a30 p-2 box-content rounded-full"/>
            <Store.Image className="w-20 h-16 rounded-l-lg"/>
            <Card.Header className="py-2 w-32 flex flex-col justify-between items-start">
                <Store.Title className="text-base font-medium truncate"/>
                <StoreHeader.Rating/>             
            </Card.Header>

            <Card.Body className="py-2 flex flex-col justify-end items-end">
                <Store.Distance/>
            </Card.Body>
        </Card>
    )
}