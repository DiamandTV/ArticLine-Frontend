
import { useContext } from "react";
import { StoreCategoryContext } from "@features/store/context/StoreCategoryContext/StoreCategoryContext";
import { ConfermDeleteModal } from "@components/modal/ConfermDelete/ConfermDeleteModal";
import { ModalContext } from "@context/Modal/ModalContext";
import Modal from 'react-bootstrap4-modal';
import { useMutation, useQueryClient } from "react-query";
import { storeBusinessCategoryServices } from "@features/store/services/storeBusinessCategoryService";
import { StoreCategoryFormProps } from "./StoreCategoryForm";
import { storeCategoryCacheKey } from "@features/store/data/query";
export function Delete(params:StoreCategoryFormProps){
    const {storeId,storeCategoryId} = params
    const {storeCategory} = useContext(StoreCategoryContext)
    const {isOpen,setOpen} = useContext(ModalContext)
    const queryClient = useQueryClient()
    const {mutateAsync} = useMutation({
        mutationKey:[storeCategoryCacheKey.delete],
        mutationFn:async()=>await storeBusinessCategoryServices.delete(storeId,storeCategoryId!),
        onSuccess:(data)=>{
            console.log(data)
            queryClient.invalidateQueries({queryKey:['fetch-store-category-list']})
        }
    })
    if(!storeCategory) return
    return(
        <>
            <Modal visible={isOpen} onClickBackdrop={(e)=>{
                e.stopPropagation()
                setOpen(false)
            }}>
                <ConfermDeleteModal
                    body={
                        <>
                            Are you sure you want to delete the category{" "}
                            <strong>{storeCategory?.name}</strong>? <br />
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