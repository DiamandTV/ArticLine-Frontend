import { BottomSheetModalContext } from "./BottomSheetModalContext"

interface BottomSheetModalSetter{
    isOpen:boolean,
    setOpen:(state:boolean)=>void,
    children:React.ReactNode
}

export function BottomSheetModalSetter({isOpen,setOpen,children}:BottomSheetModalSetter){
    return(
        <BottomSheetModalContext.Provider value={{isOpen,setOpen}}>
            {children}
        </BottomSheetModalContext.Provider>
    )
}