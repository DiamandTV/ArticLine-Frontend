import { OrderBusinessInterface } from "@features/order/models/Order/Interface/OrderInterface";
import { orderBusinessService } from "@features/order/services/orderBusinessServices";
import { useOrderDeliveryBatchContext } from "@features/orderDeliveryBatch/context/OrderDeliveryBatchContext/OrderDeliveryBatchProvider";
import { OrderDeliveryBatchContext } from "@features/orderDeliveryBatch/context/OrderDeliveryBatchContext/OrderDeliveyBatchContext";
import { useGetOrderDeliveryBatchOrderListQuery } from "@features/orderDeliveryBatch/hooks/useGetOrderDeliveryBatchOrderListQuery/useGetOrderDeliveryBatchOrderListQuery";
import { OrderDeliveryBatchFieldsType } from "@features/orderDeliveryBatch/models/OrderDeliveryBatch/Field/OrderDeliveryBatchField";
import { PaginationInterface } from "@models/ApiResponse/PaginationResponse/PaginationInterface";
import classNames from "classnames";
import { useContext, useState } from "react";
import { Form } from "react-bootstrap";
import { Controller, useFormContext } from "react-hook-form";
import { createSearchParams } from "react-router";
import { ActionMeta, GroupBase, MultiValue, OptionsOrGroups } from "react-select";
import { AsyncPaginate } from "react-select-async-paginate";
const TIMEOUT_INPUT_QUERY = 1000
interface OrderMultiSelectProps{
    id:string,
    label:string
}

// import { components } from 'react-select';
// import { useGetOrderDeliveryBatchOrderListQuery } from "@features/orderDeliveryBatch/hooks/useGetOrderDeliveryBatchOrderListQuery/useGetOrderDeliveryBatchOrderListQuery";
// import { ReactNode, useContext } from "react";
// import { OrderDeliveryBatchContext } from "@features/orderDeliveryBatch/context/OrderDeliveryBatchContext/OrderDeliveyBatchContext";
// const CustomValueContainer = ({ children, ...props }:ValueContainerProps<OrderBusinessInterface>) => {
//     const context = useContext(OrderDeliveryBatchContext)
//     const value = props.getValue()
//     const childrenArray = Array.from(children as Iterable<ReactNode>);
//     return (
//     <components.ValueContainer {...props}>
//       <div style={{
//         display: 'flex',
//         overflowX: 'auto',
//         maxWidth: '100%',
//         gap: '4px',
//         scrollbarWidth: 'thin',
//         paddingBottom: 2,
//       }}>

//        { value.length > 0 && childrenArray[0]}
//        {context && <ValueContainerServerFetchedItem/>}
//         {childrenArray[1]}
//       </div>

//     </components.ValueContainer>
//   );
// };

// function ValueContainerServerFetchedItem(){
//     //const {orderDeliveryBatch} = useOrderDeliveryBatchContext()
//     const {data,isLoading,isSuccess} = useGetOrderDeliveryBatchOrderListQuery({orderDeliveryBatchId:0})
//     if(isLoading || !isSuccess) return
//     return(
//         <>
//             {
//                 data.map((order) => (
//                     <div
//                     key={order.id}
//                     style={{
//                         backgroundColor: '#e2e8f0',
//                         borderRadius: '2px',
//                         display: 'flex',
//                         alignItems: 'center',
//                         padding: '2px 6px',
//                         fontSize: '0.875rem',
//                         marginRight: '4px',
//                     }}
//                     >
//                     {`${order.cart.store.title} #${order.id}`}
//                     </div>
//                 ))             
//             }
//         </>
//     )
// }



// export function OrderMultiSelect({id,label}:OrderMultiSelectProps){
//     const {
//         control,
//         formState: { errors },
//       } = useFormContext();
    
//     const errorMessage = errors?.[id]?.message as string | undefined;
    
//      const loadOptions = async (inputValue:string,
//         loadedOptions:OptionsOrGroups<OrderBusinessInterface,GroupBase<OrderBusinessInterface>>,
//         options?:{page:number})=>{
//         if(!options) {
//             return{
//             options:[],
//             hasMore:false,
//             additional:{
//                 page:1
//             }
//             }
//         }
//         const page = options.page
//         const response = await orderBusinessService.notAssignedList(Number(page),createSearchParams({search:inputValue}))
//         console.log(response)
//         const data:PaginationInterface = response.data
//         return{
//             options:data.results as OrderBusinessInterface[],
//             hasMore:data.current_page_number < data.number_of_pages,
//             additional:{
//             page:data.current_page_number + 1 
//             }
//         }
//     }
    
//     return (
//         <div className="form-floating">
//         <Controller
//             control={control}
//             name={id}
//             render={({ field }) => (
//             <AsyncPaginate
//                 {...field}
//                 debounceTimeout={TIMEOUT_INPUT_QUERY}
//                 inputId={id}
//                 defaultOptions={true}
//                 loadOptions={loadOptions}
//                 getOptionValue={(option)=>option.id.toString()}
//                 getOptionLabel={(option)=>`${option.cart.store.title} #${option.id}`}
//                 additional={{
//                     page:1
//                 }}
//                 components={{ValueContainer:CustomValueContainer}}
//                 reloadOnErrorTimeout={TIMEOUT_INPUT_QUERY*10}
//                 isSearchable
//                 isMulti
//                 className={classNames("react-select", { "is-invalid": errorMessage })}
//                 classNamePrefix="react-select"
//                 captureMenuScroll
//                 hideSelectedOptions={true}
//                 styles={{
//                 control: (base, state) => ({
//                     ...base,
//                     borderColor: errorMessage
//                     ? "#dc3545"
//                     : state.isFocused
//                     ? "#86b7fe"
//                     : "#ced4da",
//                     boxShadow: state.isFocused
//                     ? "0 0 0 0.25rem rgba(13, 110, 253, 0.25)"
//                     : undefined,
//                     minHeight: "3.5rem", // importante per l'altezza flottante
//                     paddingTop: "1.5rem", // spazio per il label
//                 }),
//                 //   valueContainer: (base) => ({
//                 //     ...base,
//                 //     paddingTop: "0rem",
//                 //   }),
//                 menu:(base)=>({
//                     ...base,
//                     zIndex:'20'
//                 })
//                 }}
//             />
//             )}
//         />
//         <label htmlFor={id} className="py-2 text-[13px] font-normal ">{label}</label>
//         {errorMessage && (
//             <Form.Control.Feedback type="invalid" className="d-block">
//             {errorMessage}
//             </Form.Control.Feedback>
//         )}
//         </div>
//     );
// }


function ValueContainerServerFetchedItem(){
    const {orderDeliveryBatch} = useOrderDeliveryBatchContext()
    const {data,isLoading,isSuccess,ref} = useGetOrderDeliveryBatchOrderListQuery({orderDeliveryBatchId:orderDeliveryBatch.id})
    if(isLoading || !isSuccess) return
    return(
        <>
            {
                data.map((order) => (
                    <div
                    key={order.id}
                    style={{
                        backgroundColor: '#e2e8f0',
                        borderRadius: '2px',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '2px 6px',
                        fontSize: '0.875rem',
                        marginRight: '4px',
                    }}
                    >
                    {`${order.cart.store.title} #${order.id}`}
                    </div>
                ))             
            }
            <div className="py-0.5" ref={ref}/>
        </>
    )
}

function OrderMultiValueContainer(){
    const {watch} = useFormContext<OrderDeliveryBatchFieldsType>()
    const {orderDeliveryBatch} = useOrderDeliveryBatchContext()
    const getServerData = ()=>{
        try{
            return orderDeliveryBatch?.id ?  <ValueContainerServerFetchedItem/> : null
        } catch{
            return null
        }
    }
    return(
        <div>
            {watch('orders')?.map((order)=>{
                return <OrderMultiValue order={order}/>
            })}
            {getServerData()}
        </div>   
    )
}

function OrderMultiValue({order}:{order:OrderBusinessInterface}){
    return(
        <div>
            {order.id}
        </div>
    )
}   

export function OrderMultiSelect({id,label}:OrderMultiSelectProps){
    const {
        formState: { errors },
        getValues,
        setValue,
        watch
      } = useFormContext<OrderDeliveryBatchFieldsType>();
    
    const errorMessage = errors?.['add_orders']?.message as string | undefined;
    
     const loadOptions = async (inputValue:string,
        loadedOptions:OptionsOrGroups<OrderBusinessInterface,GroupBase<OrderBusinessInterface>>,
        options?:{page:number})=>{
        if(!options) {
            return{
            options:[],
            hasMore:false,
            additional:{
                page:1
            }
            }
        }
        const page = options.page
        const response = await orderBusinessService.notAssignedList(Number(page),createSearchParams({search:inputValue}))
        console.log(response)
        const data:PaginationInterface = response.data
        return{
            options:data.results as OrderBusinessInterface[],
            hasMore:data.current_page_number < data.number_of_pages,
            additional:{
            page:data.current_page_number + 1 
            }
        }
    }
    
    const addItem = (newValue: MultiValue<OrderBusinessInterface>, actionMeta: ActionMeta<OrderBusinessInterface>)=>{
        const oldValue = getValues('orders')
        const add_orders = getValues('add_orders')
        const remove_orders = getValues('remove_orders')

        if(actionMeta.option ){
            if(remove_orders.find((order:OrderBusinessInterface)=>order.id === actionMeta.option!.id)){
                // remove this item from the remove orders list
            } else {
                // check if this item is unique in add orders list
                if(!add_orders.find((order:OrderBusinessInterface)=>order.id === actionMeta.option!.id)){
                    // add to the add orders list
                    setValue('orders',[actionMeta.option,...oldValue])
                    setValue('add_orders',[...getValues('add_orders'),actionMeta.option])
                }
                
            }
        }
    }

    const removeItem = (newValue: MultiValue<OrderBusinessInterface>, actionMeta: ActionMeta<OrderBusinessInterface>)=>{
        const oldValue = getValues('orders')
        // const add_orders = getValues('add_orders')
        // const remove_orders = getValues('remove_orders')

        if(actionMeta.removedValue){
            setValue('orders',oldValue.filter((order)=>order.id !== actionMeta.removedValue!.id))
        }
    }

    const clearItems = (newValue: MultiValue<OrderBusinessInterface>, actionMeta: ActionMeta<OrderBusinessInterface>)=>{
        setValue('orders',[])
    }

    const onChange = (newValue: MultiValue<OrderBusinessInterface>, actionMeta: ActionMeta<OrderBusinessInterface>)=>{
        switch(actionMeta.action){
            case 'select-option':
                addItem(newValue,actionMeta)
                break
            case 'deselect-option':
                removeItem(newValue,actionMeta)
                break
            case 'pop-value' :
                addItem(newValue,actionMeta)
            break
            case 'remove-value':
                removeItem(newValue,actionMeta)
                break
            case 'clear':
                clearItems(newValue,actionMeta)
                break
            case 'create-option':
                break
        }
    }

    console.log(watch('orders'))

    return (
        <div className="form-floating">
            <OrderMultiValueContainer />
                <AsyncPaginate
                    debounceTimeout={TIMEOUT_INPUT_QUERY}
                    inputId={id}
                    value={[]}
                    onChange={onChange}
                    defaultOptions={true}
                    loadOptions={loadOptions}
                    getOptionValue={(option)=>option.id.toString()}
                    getOptionLabel={(option)=>`${option.cart.store.title} #${option.id}`}
                    additional={{
                        page:1
                    }}
                    
                    reloadOnErrorTimeout={TIMEOUT_INPUT_QUERY*10}
                    isSearchable
                    isMulti
                    className={classNames("react-select", { "is-invalid": errorMessage })}
                    classNamePrefix="react-select"
                    captureMenuScroll
                    hideSelectedOptions={true}
                    styles={{
                    control: (base, state) => ({
                        ...base,
                        borderColor: errorMessage
                        ? "#dc3545"
                        : state.isFocused
                        ? "#86b7fe"
                        : "#ced4da",
                        boxShadow: state.isFocused
                        ? "0 0 0 0.25rem rgba(13, 110, 253, 0.25)"
                        : undefined,
                        minHeight: "3.5rem", // importante per l'altezza flottante
                        paddingTop: "1.5rem", // spazio per il label
                    }),
                    //   valueContainer: (base) => ({
                    //     ...base,
                    //     paddingTop: "0rem",
                    //   }),
                    menu:(base)=>({
                        ...base,
                        zIndex:'20'
                    })
                    }}
                />
               
            <label htmlFor={id} className="py-2 text-[13px] font-normal ">{label}</label>
            {errorMessage && (
                <Form.Control.Feedback type="invalid" className="d-block">
                {errorMessage}
                </Form.Control.Feedback>
            )}
        </div>
    );
}