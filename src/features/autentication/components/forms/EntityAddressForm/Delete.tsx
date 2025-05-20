import { ConfermDeleteModal } from "@components/modal/ConfermDelete/ConfermDeleteModal";
import { ModalContext } from "@context/Modal/ModalContext";
import { useEntityAddressContext } from "@features/autentication/context/EntityAddressContext/EntityAddressProvider";
import { entityAddressCacheKey } from "@features/autentication/data/query";
import { entityAddressService } from "@features/autentication/services/entityAddressService";
import { useContext } from "react";
import Modal from 'react-bootstrap4-modal';
import { useMutation } from "react-query";

export function Delete(){
    const {entityAddress} = useEntityAddressContext()
    const {isOpen,setOpen} = useContext(ModalContext)
    const {mutateAsync} = useMutation({
        mutationKey:[entityAddressCacheKey.delete],
        mutationFn:async()=>await entityAddressService.delete(entityAddress.id)
    })
    return(
        <>
            <Modal visible={isOpen} onClickBackdrop={(e)=>{
                e.stopPropagation()
                setOpen(false)
            }}>
                <ConfermDeleteModal
                    body={
                        <>
                            Are you sure you want to delete the entity address{" "}
                            <strong>{entityAddress?.denomination}</strong>? <br />
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