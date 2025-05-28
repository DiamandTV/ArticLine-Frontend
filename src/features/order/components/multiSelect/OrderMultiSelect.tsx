import { OrderBusinessInterface } from "@features/order/models/Order/Interface/OrderInterface";
import { orderBusinessService } from "@features/order/services/orderBusinessServices";
import { PaginationInterface } from "@models/ApiResponse/PaginationResponse/PaginationInterface";
import classNames from "classnames";
import { Form } from "react-bootstrap";
import { Controller, useFormContext } from "react-hook-form";
import { createSearchParams } from "react-router";
import { GroupBase, OptionsOrGroups, ValueContainerProps } from "react-select";
import { AsyncPaginate } from "react-select-async-paginate";
const TIMEOUT_INPUT_QUERY = 1000
interface OrderMultiSelectProps{
    id:string,
    label:string
}

import { components } from 'react-select';
import { useGetOrderDeliveryBatchOrderListQuery } from "@features/orderDeliveryBatch/hooks/useGetOrderDeliveryBatchOrderListQuery/useGetOrderDeliveryBatchOrderListQuery";
import { ReactNode, useContext } from "react";
import { OrderDeliveryBatchContext } from "@features/orderDeliveryBatch/context/OrderDeliveryBatchContext/OrderDeliveyBatchContext";
const CustomValueContainer = ({ children, ...props }:ValueContainerProps<OrderBusinessInterface>) => {
    const context = useContext(OrderDeliveryBatchContext)
    const value = props.getValue()
    const childrenArray = Array.from(children as Iterable<ReactNode>);
    return (
    <components.ValueContainer {...props}>
      <div style={{
        display: 'flex',
        overflowX: 'auto',
        maxWidth: '100%',
        gap: '4px',
        scrollbarWidth: 'thin',
        paddingBottom: 2,
      }}>

       { value.length > 0 && childrenArray[0]}
       {context && <ValueContainerServerFetchedItem/>}
        {childrenArray[1]}
      </div>

    </components.ValueContainer>
  );
};

function ValueContainerServerFetchedItem(){
    //const {orderDeliveryBatch} = useOrderDeliveryBatchContext()
    const {data,isLoading,isSuccess} = useGetOrderDeliveryBatchOrderListQuery({orderDeliveryBatchId:0})
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
        </>
    )
}



export function OrderMultiSelect({id,label}:OrderMultiSelectProps){
    const {
        control,
        formState: { errors },
      } = useFormContext();
    
    const errorMessage = errors?.[id]?.message as string | undefined;
    
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
    
    return (
        <div className="form-floating">
        <Controller
            control={control}
            name={id}
            render={({ field }) => (
            <AsyncPaginate
                {...field}
                debounceTimeout={TIMEOUT_INPUT_QUERY}
                inputId={id}
                defaultOptions={true}
                loadOptions={loadOptions}
                getOptionValue={(option)=>option.id.toString()}
                getOptionLabel={(option)=>`${option.cart.store.title} #${option.id}`}
                additional={{
                    page:1
                }}
                components={{ValueContainer:CustomValueContainer}}
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
            )}
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