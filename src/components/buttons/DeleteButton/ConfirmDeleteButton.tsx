import { ModalProvider } from "@context/Modal/ModalProvider";
import { ModalContext } from "@context/Modal/ModalContext";
import { Modal } from "react-bootstrap";
import { DeleteButton } from "./DeleteButton";
import { useContext } from "react";
import { BottomSheetModalContext } from "@context/BottomSheetModal/BottomSheetModalContext";

interface ConfermDeleteButtonProps extends React.HTMLAttributes<HTMLElement>{
    children:React.ReactNode
}
export function ConfermDeleteButton({children,...attr}:ConfermDeleteButtonProps){
    const {setOpen:setOpenBottom} = useContext(BottomSheetModalContext)
    return(
        <ModalProvider>
            <ModalContext.Consumer>
                {
                    ({isOpen,setOpen})=>{
                        const onClick = (e:React.MouseEvent<HTMLElement>)=>{
                            attr.onClick?.(e)
                            //setOpenBottom(false)
                            setOpen(true)
                        }
                        return(
                            <>
                                <DeleteButton
                                    {...attr}
                                    onClick={onClick}
                                />
                                <Modal show={isOpen} onHide={()=>setOpen(false)} >
                                    {children}
                                </Modal>
                            </>
                        )
                    }
                }
            </ModalContext.Consumer>
        </ModalProvider>
    )
}