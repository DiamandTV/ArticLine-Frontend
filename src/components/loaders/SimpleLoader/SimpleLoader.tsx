import { Container, Spinner } from "react-bootstrap";

type SimpleLoaderProps = React.HTMLAttributes<HTMLElement>
export function SimpleLoader(props:SimpleLoaderProps){
    return(
        <Container {...props}>
            <Spinner variant="grow" {...props} size="sm"/>
        </Container>
    )
}