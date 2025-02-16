import { useSelector } from "react-redux";
import { Can } from "../../../config/permissions/can";
import { RootState } from "../../../store/store";;
import { IoIosSettings } from "react-icons/io"
import { FaPlus } from "react-icons/fa6";
import { PopupIconButton } from "../../PopUps/PoupIconButton";
import { BlurCard } from "../../Cards/BlurCard";
import { ProductCreate } from "../../Forms/ProductCreate";
import { StoreCategoryCreate } from "../../Forms/StoreCategoryCreate";
import { DrawerProvider } from "../../Drawer/DrawerProvider";
import { StoreFromEdit } from "../../Forms/StoreEdit";

export function StoreSettings(){
    const store = useSelector((state:RootState)=>state.storeReducer.store)
    const  classNamePopIconButton = ""
    return(
        store ? 
        <Can I="update" a="STORE" this={store}>
            <div className="tranparent h-full flex flex-col justify-start items-center gap-y-3  sm:text-xl">
                <DrawerProvider>
                    <PopupIconButton
                        className={classNamePopIconButton}
                        iconData={{
                            label:"SETTINGS",
                            icon:<IoIosSettings />
                        }}
                    >
                        <BlurCard className=" w-[600px] max-w-4xl max-h-max text-white pt-4">
                            <StoreFromEdit store={store}/>
                        </BlurCard>    
                    </PopupIconButton>
                </DrawerProvider>
                
                <DrawerProvider>
                    <PopupIconButton
                        className={classNamePopIconButton}
                        iconData={{
                            label:"CATEGORIES",
                            icon:<FaPlus />
                        }}
                    >
                        <BlurCard className="max-w-lg w-full h-full max-h-screen text-white">
                                <StoreCategoryCreate/>
                        </BlurCard>
                    </PopupIconButton>
                </DrawerProvider>
                
                <DrawerProvider>
                    <PopupIconButton
                        className={classNamePopIconButton}
                        iconData={{
                            label:"PRODUCTS",
                            icon:<FaPlus />
                        }}

                    >
                        <BlurCard className="max-w-lg h-full max-h-screen text-white">
                            <ProductCreate/>
                        </BlurCard>
                    </PopupIconButton>
                </DrawerProvider>
            </div>
        </Can> 
        : null
    )
}

{/* <IconTextButton
label="CATEGORIES"
icon={<FaPlus size={30}/>}
onClick={()=>{}}
/>
<IconTextButton
label="PRODUCTS"
icon={<FaPlus size={30}/>}
onClick={()=>{}}
/> */}