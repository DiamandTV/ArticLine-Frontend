import { Button, Modal } from "react-bootstrap";

interface ConfermDeleteModalProps{
    title?:React.ReactNode,
    body?:React.ReactNode,
    onCancel?:(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>void,
    onDelete?:(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>void
}
export function ConfermDeleteModal({title,body,...props}:ConfermDeleteModalProps){
    const onCancel = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.stopPropagation()
        props.onCancel?.(e)
    }
    const onDelete = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.stopPropagation()
        props.onDelete?.(e)
    }
    title = title ?? "⚠️ Confirm Deletion"
    body = body ?? "Are you sure you want to delete this item?"
    return(
        <>
            <Modal.Header  onClick={(e)=>e.stopPropagation()} >
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {body}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onCancel}>
                    ❌ Cancel
                </Button>
                <Button variant="danger" onClick={onDelete}>
                    ✅ Yes, Delete
                </Button>
            </Modal.Footer>
        </>
    )
}