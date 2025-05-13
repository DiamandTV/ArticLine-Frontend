
import { useContext } from "react";

import { ConfermDeleteModal } from "@components/modal/ConfermDelete/ConfermDeleteModal";
import { ModalContext } from "@context/Modal/ModalContext";
import Modal from 'react-bootstrap4-modal';
import { StoreContext } from "@features/store/context/StoreContext/StoreContext";
import { useMutation } from "react-query";
import { storeBusinessServices } from "@features/store/services/storeBusinessServices";
import { StoreFormProps } from "./StoreForm";
import { storeCacheKey } from "@features/store/data/query";
export function Delete(params:StoreFormProps){
    const {companyId,storeId} = params
    const {store} = useContext(StoreContext)
    const {isOpen,setOpen} = useContext(ModalContext)
    const {mutateAsync} = useMutation({
        mutationKey:[storeCacheKey.delete],
        mutationFn:async()=>await storeBusinessServices.delete(companyId!,storeId!) //!!! it can't be null
    })
    if(!store) return
    return(
        <>
            <Modal visible={isOpen} onClickBackdrop={(e)=>{
                e.stopPropagation()
                setOpen(false)
            }}>
                <ConfermDeleteModal
                    body={
                        <>
                            Are you sure you want to delete the store{" "}
                            <strong>{store?.title}</strong>? <br />
                            This action <strong>cannot be undone</strong>.
                        </>
                    }
                    onCancel={()=>{
                        setOpen(false)
                    }}
                    onDelete={async()=>{
                        await mutateAsync()
                        setOpen(false)
                    }}
                />    
            </Modal>
                
        </>
    )
}