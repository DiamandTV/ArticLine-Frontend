import { BottomSheetModalContext } from "@context/BottomSheetModal/BottomSheetModalContext";
import { useContext } from "react";
import { Sheet } from "react-modal-sheet";
import type {SheetProps} from "react-modal-sheet"
interface SimpleBottomSheetModalProps extends Omit<SheetProps,'isOpen'|'onClose'|'children'>{
    isOpen?:boolean,
    setClose?:()=>void,
    children:React.ReactNode
}
export function SimpleBottomSheetModal({children,...attr}:SimpleBottomSheetModalProps){
    const {isOpen,setOpen} = useContext(BottomSheetModalContext)
    return(
        <Sheet {...attr} isOpen={attr.isOpen ?? isOpen } onClose={attr.setClose ? attr.setClose : ()=>{setOpen(false)}} className="relative h-full " onClick={(e)=>{
            e.stopPropagation()
  
        }} >
            <Sheet.Container className="relative overflow-scroll" >
            <Sheet.Header />
            <Sheet.Content className="h-full">
                {children}
            </Sheet.Content>
            </Sheet.Container>
            <Sheet.Backdrop onTap={(e)=>{
                e.stopPropagation()
            }}/>
        </Sheet>
    )
}