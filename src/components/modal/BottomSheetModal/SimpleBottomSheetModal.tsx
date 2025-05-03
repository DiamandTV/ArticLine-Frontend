import { BottomSheetModalContext } from "@context/BottomSheetModal/BottomSheetModalContext";
import { useContext } from "react";
import { Sheet } from "react-modal-sheet";
import type {SheetProps} from "react-modal-sheet"
interface SimpleBottomSheetModalProps extends Omit<SheetProps,'isOpen'|'onClose'|'children'>{
    children:React.ReactNode
}
export function SimpleBottomSheetModal({children,...attr}:SimpleBottomSheetModalProps){
    const {isOpen,setOpen} = useContext(BottomSheetModalContext)
    return(
        <Sheet {...attr} isOpen={isOpen} onClose={()=>{setOpen(false)}} >
            <Sheet.Container>
            <Sheet.Header />
            <Sheet.Content>
                {children}
            </Sheet.Content>
            </Sheet.Container>
            <Sheet.Backdrop />
        </Sheet>
    )
}