import { OrderBusinessInterface } from "@features/order/models/Order/Interface/OrderInterface";
import { orderBusinessService } from "@features/order/services/orderBusinessServices";
import { useOrderDeliveryBatchContext } from "@features/orderDeliveryBatch/context/OrderDeliveryBatchContext/OrderDeliveryBatchProvider";
import { orderDeliveryBatchCacheKey } from "@features/orderDeliveryBatch/data/query";
import { orderDeliveryBatchServices } from "@features/orderDeliveryBatch/services/orderDeliveyBatchServices";
import { PaginationInterface } from "@models/ApiResponse/PaginationResponse/PaginationInterface";
import { Form } from "react-bootstrap";
import { useMutation, useQueryClient } from "react-query";
import { createSearchParams, useSearchParams } from "react-router";
import { ActionMeta, GroupBase, OptionsOrGroups, SingleValue } from "react-select";
import { AsyncPaginate } from "react-select-async-paginate";
const TIMEOUT_INPUT_QUERY = 1000
export function OrderListForm(){
    const queryClient = useQueryClient()
    const [searchParams] = useSearchParams()
    const {orderDeliveryBatch} = useOrderDeliveryBatchContext()
    const {mutateAsync,isLoading} = useMutation({
        mutationKey:[orderDeliveryBatchCacheKey.addOrder],
        mutationFn:async(orderId:number)=>await orderDeliveryBatchServices.addOrder(orderDeliveryBatch.id,orderId),
        onSuccess:async(data)=>{
            console.log(data)
            await queryClient.invalidateQueries([orderDeliveryBatchCacheKey.listOrders,orderDeliveryBatch.id])
            await queryClient.refetchQueries([orderDeliveryBatchCacheKey.listOrders,orderDeliveryBatch.id])

            await queryClient.invalidateQueries([orderDeliveryBatchCacheKey.list,...searchParams])
            await queryClient.refetchQueries([orderDeliveryBatchCacheKey.list,...searchParams])
        },
        onError:(data)=>{
            console.log(data)
        }
    })
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

    const addItem = async(newValue: SingleValue<OrderBusinessInterface>)=>{
        if(newValue){
            await mutateAsync(newValue?.id)
        }
    }

    const onChange = async(newValue: SingleValue<OrderBusinessInterface>, actionMeta: ActionMeta<OrderBusinessInterface>)=>{
            switch(actionMeta.action){
                case 'select-option':
                    await addItem(newValue)
                    break
            }
        }

    const errorMessage = ''
    return(
         <div className="w-full h-[300px] form-floating">
                <AsyncPaginate
                    clearCacheOnMenuClose
                    isDisabled={isLoading}
                    debounceTimeout={TIMEOUT_INPUT_QUERY}
                    value={[]}
                    onChange={onChange}
                  
                    loadOptions={loadOptions}
                
                    getOptionValue={(option)=>option.id.toString()}
                    getOptionLabel={(option)=>`${option.cart.store.title} #${option.id}`}
                    additional={{
                        page:1
                    }}
                    
                    reloadOnErrorTimeout={TIMEOUT_INPUT_QUERY*10}
                    isSearchable
                    //className={classNames("react-select", { "is-invalid": errorMessage })}
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
               
            <label  className="py-2 text-[13px] font-normal ">{'ORDER'}</label>
            {errorMessage && (
                <Form.Control.Feedback type="invalid" className="d-block">
                {errorMessage}
                </Form.Control.Feedback>
            )}
        </div>
    )
}