import { BiEdit } from "react-icons/bi"
import { Can } from "../../config/permissions/can"
import { IconTextButton } from "../Buttons/IconTextButton"
import { DrawerContext } from "../Drawer/DrawerContext"
import { DrawerProvider } from "../Drawer/DrawerProvider"
import { DrawerApp } from "../Drawer/Drawer"
import { BlurCard } from "../Cards/BlurCard"
import { StoreCategoryEdit } from "../Forms/StoreCategoryEdit"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"

interface StoreCategoryEditPopUpWithButtonProps{
    buttonClassName?:string,
}

export function StoreCategoryEditPopUpWithButton({buttonClassName=""}:StoreCategoryEditPopUpWithButtonProps){
    const params = useParams()
    const store = useSelector((state:RootState)=>state.storeReducer.store)
    
    const store_categories = store?.store_categories?.find((store)=>store?.id?.toString() === params['sub-category-id'])
    return (
        store && store_categories ?
        <Can I="update" a="STORE" this={store!}>
        
        <DrawerProvider>
            <DrawerContext.Consumer>
                {({setOpen})=>
                    <IconTextButton
                        className={buttonClassName}
                        label={"EDIT"}
                        icon={<BiEdit/>}
                        onClick={()=>{
                            setOpen(true)
                        }}
                    />
                }
            </DrawerContext.Consumer>
            <DrawerApp>
                <BlurCard className="max-w-lg w-full h-full max-h-screen text-white">
                    <StoreCategoryEdit storeCategory={store_categories}/>
                </BlurCard>
            </DrawerApp>
        </DrawerProvider>
    </Can> : null
    )
}