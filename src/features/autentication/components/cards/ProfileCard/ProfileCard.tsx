import { ProfileInterface } from "@features/autentication/models/Profile/Interface/Type";
import { Card } from "react-bootstrap";
import { IoStorefront } from "react-icons/io5";
interface ProfileCardProps extends React.HTMLAttributes<HTMLElement>{
    profile:ProfileInterface
}
export function ProfileCard({profile,...attr}:ProfileCardProps){
    const completeName = `${profile?.first_name} ${profile?.last_name}`
    return(
        <Card className="w-max h-16 relative flex flex-row justify-evenly p-0 box-content">
            {/* STORE ICON */}
            <IoStorefront className="absolute -right-4 -top-4 text-2xl bg-primary-a30 p-2 box-content rounded-full"/>
            <div
                className={'w-20 h-16 rounded-l-lg bg-contain'}
                style={{ backgroundImage: `url(${profile?.image})` }}
            />
            
            <Card.Header className="w-32 py-2 flex flex-col justify-between items-start">
                <h1 className="text-base font-medium truncate">{completeName}</h1>
                             
            </Card.Header>

            <Card.Body className="py-2 flex flex-col justify-end items-end">
                
            </Card.Body>
        </Card>
    )
}