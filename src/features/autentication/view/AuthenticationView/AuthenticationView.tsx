import { AlignCenter } from "@components/cards/CenterHelper/AlignCenter";
import { Container } from "react-bootstrap";

interface AuthenticationViewProps{
    children:React.ReactNode
}

export function AuthenticationView(props:AuthenticationViewProps){
    return(
        <AlignCenter>
            <Container className="p-2 sm:p-4 md:p-6 lg:!p-10 bg-white rounded-xl ">
                {props.children}
            </Container>
        </AlignCenter>
    )
}