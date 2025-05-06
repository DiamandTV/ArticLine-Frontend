import { Button, Modal } from "react-bootstrap";
import { StoreCategoryFormProps } from "./StoreCategoryForm";
import { ConfermDeleteButton } from "@components/buttons/DeleteButton/ConfirmDeleteButton";
import { useContext } from "react";
import { StoreCategoryContext } from "@features/store/context/StoreCategoryContext/StoreCategoryContext";

export function Delete({...attr}:StoreCategoryFormProps){
    const {storeCategory} = useContext(StoreCategoryContext)
    if(!storeCategory) return
    return(
        <ConfermDeleteButton {...attr}>
            <Modal.Header closeButton >
                <Modal.Title>⚠️ Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete the category{" "}
                <strong>{storeCategory?.name}</strong>? <br />
                This action <strong>cannot be undone</strong>.
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" >
                    ❌ Cancel
                </Button>
                <Button variant="danger" >
                    ✅ Yes, Delete
                </Button>
            </Modal.Footer>
        </ConfermDeleteButton>
    )
}