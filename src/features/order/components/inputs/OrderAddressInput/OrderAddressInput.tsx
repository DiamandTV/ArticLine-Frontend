import { EntityAddressList } from "../../list/EntityAddressList";
import { Button } from "react-bootstrap";
import { IoAdd } from "react-icons/io5";
import { BottomSheetModalProviderFn } from "@context/BottomSheetModal/BottomSheetModalProviderFn";
import { SimpleBottomSheetModal } from "@components/modal/BottomSheetModal/SimpleBottomSheetModal";
import { EntityAddressForm } from "@features/autentication/components/forms/EntityAddressForm/EntityAddressForm";
import { PaddingView } from "@views/PaddingView";

export function OrderAddressInput(){
    return(
        <div className="w-full flex flex-col gap-2 px-2">
            <EntityAddressList/>
            <AddButton/>
            
        </div>
    )
}

function AddButton(){
    return(
        <BottomSheetModalProviderFn>
            {
                ({setOpen})=>{
                    return(
                        <>
                            <Button 
                            
                                className="w-full flex flex-row justify-center items-center gap-2"
                                onClick={()=>setOpen(true)}>
                                <IoAdd className="text-2xl"/>
                                <span className="font-medium text-sm">ADD NEW LOCATION</span>
                            </Button>
                            <SimpleBottomSheetModal detent="content-height">
                                <PaddingView>
                                    <EntityAddressForm.Create/>
                                </PaddingView>
                            </SimpleBottomSheetModal>
                        </>
                    )
                }
            }
        </BottomSheetModalProviderFn>
    )
}



