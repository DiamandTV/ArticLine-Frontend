import { useSelector } from "react-redux";
import { Can } from "../../../config/permissions/can";
import { RootState } from "../../../store/store";;
import { IoIosSettings } from "react-icons/io"
import { FaPlus } from "react-icons/fa6";
import { PopupIconButton } from "../../PopUps/PoupIconButton";
import { BlurCard } from "../../cards/BlurCard";
import { ProductCreate } from "../../forms/ProductCreate";
import { StoreCategoryCreate } from "../../forms/StoreCategoryCreate";
import { DrawerProvider } from "../../Drawer/DrawerProvider";
import { StoreFromEdit } from "../../forms/StoreEdit";

export function StoreSettings(){
    const store = useSelector((state:RootState)=>state.storeReducer.store)
    return(
        store ? 
        <Can I="update" a="STORE" this={store}>
            <div className="tranparent h-full flex flex-col justify-center items-center gap-y-3">
                <DrawerProvider>
                    <PopupIconButton
                        iconData={{
                            label:"SETTINGS",
                            icon:<IoIosSettings size={30}/>
                        }}
                    >
                        <BlurCard className=" w-[600px] max-w-4xl max-h-max text-white pt-4">
                            <StoreFromEdit store={store}/>
                        </BlurCard>    
                    </PopupIconButton>
                </DrawerProvider>
                
                <DrawerProvider>
                    <PopupIconButton
                        iconData={{
                            label:"CATEGORIES",
                            icon:<FaPlus size={30}/>
                        }}
                    >
                    <BlurCard className="max-w-lg w-full h-full max-h-screen text-white">
                            <StoreCategoryCreate/>
                        </BlurCard>
                    </PopupIconButton>
                </DrawerProvider>
                
                <DrawerProvider>
                    <PopupIconButton
                        iconData={{
                            label:"PRODUCTS",
                            icon:<FaPlus size={30}/>
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