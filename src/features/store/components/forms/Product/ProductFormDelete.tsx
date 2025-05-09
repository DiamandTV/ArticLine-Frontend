
import { useContext } from "react";

import { ConfermDeleteModal } from "@components/modal/ConfermDelete/ConfermDeleteModal";
import { ModalContext } from "@context/Modal/ModalContext";
import Modal from 'react-bootstrap4-modal';
import { ProductContext } from "@features/store/context/ProductContext/ProductContext";
import { useMutation } from "react-query";
import { storeBusinessProductServices } from "@features/store/services/storeBusinessProductService";
import { ProductFormProps } from "./ProductForm";
import { productCacheKey } from "@features/store/data/query";
export function Delete({...params}:ProductFormProps){
    const {storeId,storeCategoryId,productId} = params
    const {product} = useContext(ProductContext)
    const {isOpen,setOpen} = useContext(ModalContext)
    const {mutateAsync} = useMutation({
        mutationKey:[productCacheKey.delete],
        mutationFn:async()=>await storeBusinessProductServices.delete(storeId,storeCategoryId,productId!)
    })
    if(!product) return
    return(
        <>
            <Modal visible={isOpen} onClickBackdrop={(e)=>{
                e.stopPropagation()
                setOpen(false)
            }}>
                <ConfermDeleteModal
                    body={
                        <>
                            Are you sure you want to delete the product{" "}
                            <strong>{product?.name}</strong>? <br />
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