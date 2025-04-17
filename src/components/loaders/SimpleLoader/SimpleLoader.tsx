import { Container, Spinner } from "react-bootstrap";

export function SimpleLoader(){
    return(
        <Container>
            <Spinner variant="grow"/>
        </Container>
    )
}