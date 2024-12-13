import { useSelector } from "react-redux";
import { Can } from "../../../config/permissions/can";
import { RootState } from "../../../store/store";;
import { IoIosSettings } from "react-icons/io"
import { FaPlus } from "react-icons/fa6";
import { PopupIconButton } from "../../PopUps/PoupIconButton";
import { ProductForm } from "../../forms/ProductForm";
import { BlurCard } from "../../cards/BlurCard";
import { StoreForm } from "../../forms/StoreForm";
import { StoreFormLine } from "../../forms/StoreFromLine";
import { ProductCreate } from "../../forms/ProductCreate";
import { StoreCategoryForm } from "../../forms/StoreCategoryForm";
import { StoreCategoryCreate } from "../../forms/StoreCategoryCreate";
import { StoreFormEdit } from "../../forms/StoreFormEdit";

export function StoreSettings(){
    const store = useSelector((state:RootState)=>state.storeReducer.store)
    return(
        store ? 
        <Can I="update" a="STORE" this={store}>
            <div className="tranparent h-full flex flex-col justify-center items-center gap-y-3">
                <PopupIconButton
                    iconData={{
                        label:"SETTINGS",
                        icon:<IoIosSettings size={30}/>
                    }}
                >
                    <BlurCard className=" w-[600px] max-w-4xl h-full max-h-screen text-white pt-4">
                        <StoreFormEdit store={store}/>
                    </BlurCard>
                    
                </PopupIconButton>
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