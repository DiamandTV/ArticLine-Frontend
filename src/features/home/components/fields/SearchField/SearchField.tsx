import { FloatingLabel, Form } from "react-bootstrap";

export function SearchField(){
    return(
        <Form>
            <FloatingLabel label="SEARCH">
                <Form.Control type="text"/>
            </FloatingLabel>
        </Form>
    )
}