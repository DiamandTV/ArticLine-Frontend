import { Card } from "react-bootstrap";

export function CategoryCard() {
    return (
        <Card>
            <Card.Img
                variant="top"
                src="https://fr.canadabeef.ca/wp-content/uploads/sites/2/2020/07/Big-Burgers_1.jpg"
            />
            <Card.Body>
                <Card.Title>HAMBURGER</Card.Title>
                <Card.Text>SOME</Card.Text>
            </Card.Body>
            <Card.Footer
            />
        </Card>
    )
}