/* eslint-disable @typescript-eslint/no-explicit-any */
import { ConfermDeleteModal } from "@components/modal/ConfermDelete/ConfermDeleteModal"
import { ModalContext } from "@context/Modal/ModalContext"
import { useOrderContext } from "@features/order/context/OrderContext/OrderProvider"
import { orderBusinessCacheKey } from "@features/order/data/query"
import { orderBusinessService } from "@features/order/services/orderBusinessServices"
import { useContext } from "react"
import Modal from 'react-bootstrap4-modal';
import { useMutation } from "react-query"

export function Refuse(){
    const {order} = useOrderContext()
    const {isOpen,setOpen} = useContext(ModalContext)
    
    const {mutateAsync} = useMutation({
        mutationKey:[orderBusinessCacheKey.refuse],
        mutationFn:async()=>await orderBusinessService.refuse(order.id)
    })
    console.log(isOpen)
    return(
        <>
            <Modal visible={isOpen} onClickBackdrop={(e:any)=>{
                e.stopPropagation()
                setOpen(false)
            }}>
                <ConfermDeleteModal
                    body={
                        <>
                            Are you sure you want to refuse the order{" "}
                            <strong>#{order?.id}</strong>? <br />
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