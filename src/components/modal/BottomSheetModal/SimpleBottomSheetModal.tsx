import { BottomSheetModalContext } from "@context/BottomSheetModal/BottomSheetModalContext";
import { useDivRefContext } from "@context/DivRefContext/DivRefProvider";
import { useContext } from "react";
import { Button } from "react-bootstrap";
import { Sheet } from "react-modal-sheet";
import type {SheetProps} from "react-modal-sheet"
import { RxCross1 } from "react-icons/rx";
interface SimpleBottomSheetModalProps extends Omit<SheetProps,'isOpen'|'onClose'|'children'>{
    children:React.ReactNode,
}
export function SimpleBottomSheetModal({children,...attr}:SimpleBottomSheetModalProps){
    const {divRef} = useDivRefContext()
    const {isOpen,setOpen} = useContext(BottomSheetModalContext)
    return(
        <Sheet {...attr} isOpen={ isOpen } onClose={()=>{setOpen(false)}} className="w-full  h-full md:h-max relative md:!static md:!shadow-none  " onClick={(e)=>{
            e.stopPropagation()
        }} 
        mountPoint={divRef?.current ?? undefined}
        >
            <Sheet.Container className="w-full md:!rounded-lg  md:!shadow-white md:!block md:!z-0 md:!static overflow-hidden md:!bg-transparent" >
            <Sheet.Header className="w-full overflow-scroll md:hidden "/>
            <Sheet.Content className=" !w-full h-full md:!bg-transparent" >
                <div className="w-full md:flex md:flex-col md:gap-2 md:p-4 md:bg-slate-900 md:bg-opacity-30 md:backdrop-blur-lg md:rounded-xl ">
                    <div className="flex-row justify-end hidden w-full overflow-hidden md:flex">
                        <Button
                            onClick={()=>setOpen(false)}
                        >
                            <RxCross1 className="text-xl"/>
                        </Button>
                    </div>
                    <div className="bg-surface-a0 md:rounded-lg">
                        {children}
                    </div>
                </div>
            </Sheet.Content>
            </Sheet.Container>
            <Sheet.Backdrop 
                className="md:!z-0 md:!static md:!bg-transparent md:!shadow-none md:hidden"
            onTap={(e)=>{
                e.stopPropagation()
            }}/>
        </Sheet>
       
    )
}