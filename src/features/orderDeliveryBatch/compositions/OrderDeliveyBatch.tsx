import { SimpleBottomSheetModal } from "@components/modal/BottomSheetModal/SimpleBottomSheetModal"
import { BottomSheetModalProviderFn } from "@context/BottomSheetModal/BottomSheetModalProviderFn"
import { PaddingView } from "@views/PaddingView"
import { Button } from "react-bootstrap"
import { IoAdd } from "react-icons/io5"
import { OrderDeliveryBatchForm } from "../components/fields/forms/OrderDeliveryBatch/OrderDeliveryBatchForm"

export const OrderDeliveryBatch = ()=>null

OrderDeliveryBatch.CreateButton = function CreateButton(){
    return(
        <BottomSheetModalProviderFn>
            {
                ({setOpen})=>{
                    return(
                        <>
                            <Button 
                                className=""
                                onClick={()=>setOpen(true)}
                            >
                                <IoAdd/>
                            </Button>
                            <SimpleBottomSheetModal detent="content-height">
                                <PaddingView>
                                    <OrderDeliveryBatchForm.Create/>    
                                </PaddingView>       
                            </SimpleBottomSheetModal>
                        </>
                    )
                }
            }
        </BottomSheetModalProviderFn>
    )
}