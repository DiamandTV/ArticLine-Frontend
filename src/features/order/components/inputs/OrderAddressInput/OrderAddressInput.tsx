import { Button, FormCheck, FormControl, Spinner, Tab, Tabs } from "react-bootstrap";
import { IoAdd } from "react-icons/io5";
import { BottomSheetModalProviderFn } from "@context/BottomSheetModal/BottomSheetModalProviderFn";
import { SimpleBottomSheetModal } from "@components/modal/BottomSheetModal/SimpleBottomSheetModal";
import { EntityAddressForm } from "@features/autentication/components/forms/EntityAddressForm/EntityAddressForm";
import { PaddingView } from "@views/PaddingView";
import { EntityAddressDetailedCard } from "@features/autentication/components/cards/EntityAddressCard/EntityAddressCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@store/store";
import { EntityAddressProvider } from "@features/autentication/context/EntityAddressContext/EntityAddressProvider";
import { TabsProvider, useTabsContext } from "@context/Tabs/TabsProvider";
import { TabsContext } from "@context/Tabs/TabsContext";
import { EntityAddressChooseDefaultFields, EntityAddressDefaultFieldsProvider } from "@features/autentication/components/fields/EntityAddressDefault/EntityAddressDefaultFields";
import { useMutation } from "react-query";
import { entityAddressCacheKey } from "@features/autentication/data/query";
import { entityAddressService } from "@features/autentication/services/entityAddressService";
import { useFormContext } from "react-hook-form";
import { EntityAddressDefaultFields } from "@features/autentication/models/EntityAddress/Field/EntityAddressDefault";
import { authSliceActions } from "@features/autentication";
import { OrderInfoFieldsType } from "@features/order/models/Order/Field/OrderField";

export function OrderAddressInput(){
    const {register,formState:{errors},getValues} = useFormContext<OrderInfoFieldsType>()
    console.log(getValues())
    const entityAddress = useSelector((state:RootState)=>state.authReducer.profile?.entity_address)
    return(
        <div className="w-full flex flex-col gap-2 px-0">
            <TabsProvider defaultKey={entityAddress ? 'home' : 'change'}>
                <TabsContext.Consumer>
                    {
                        ({key})=>{
                            return(
                                <Tabs className="hidden" activeKey={key}>
                                    <Tab eventKey="home" title="HOME">
                                        <EntityAddressDetailedCardTabView/>
                                    </Tab>
                                    <Tab eventKey="change" title="CHANGE">
                                        <EntityAddressListTabView/>
                                    </Tab>
                                </Tabs>
                            )
                        }
                    }
                </TabsContext.Consumer>
            </TabsProvider>
            <div className="-mt-4">
                <FormControl type="" hidden isInvalid={!!errors.entity_address}/>
                <FormControl.Feedback type="invalid" >
                    {errors.entity_address?.message}
                </FormControl.Feedback>
            </div>
        </div>
    )
}

function EntityAddressDetailedCardTabView(){
    const {setKey} = useTabsContext()
    const entityAddress = useSelector((state:RootState)=>state.authReducer.profile?.entity_address)
    if(!entityAddress) return
    return(
        <div className="w-full flex flex-col gap-2">
            {
                <div className="w-full flex flex-row justify-between items-center h-8">
                    <h1 className="font-medium">DELIVERY ADDRESS</h1>
                    <Button className="text-sm font-medium" onClick={()=>setKey('change')}>
                        CHANGE
                    </Button>
                </div>
            }
            <EntityAddressProvider entityAddress={entityAddress}>
                <EntityAddressDetailedCard/>
            </EntityAddressProvider>
        </div>
    )
}


function EntityAddressListTabView(){
    const entityAddressId = useSelector((state:RootState)=>state.authReducer.profile?.entity_address)?.id
    return(
        <div className="w-full flex flex-col gap-2">
            {
                <div className="w-full flex flex-row justify-between items-center h-8">
                    <h1 className="font-medium">DELIVERY ADDRESS</h1>
                </div>
            }
            <AddButton/>
            <EntityAddressDefaultFieldsProvider defaultValues={{
                entity_address:entityAddressId
            }}>
                <EntityAddressChooseDefaultFields/>
                {
                    entityAddressId ?
                    <div className="w-full flex flex-row items-center justify-between gap-2">
                        <CancelButton/>
                        <SetDefaultButton/>
                    </div> 
                    : null
                }
            </EntityAddressDefaultFieldsProvider>
        </div>
    )
}

function CancelButton(){
    const {setKey} = useTabsContext()
    return(
        <Button className="w-full text-sm font-medium" variant="outline-primary" onClick={()=>setKey('home')}>
            CANCEL
        </Button>
    )
}

function SetDefaultButton(){
    const {setKey} = useTabsContext()
    const dispatch = useDispatch()
    const {getValues} = useFormContext<EntityAddressDefaultFields>()
    const {mutateAsync,isLoading} = useMutation({
        mutationKey:[entityAddressCacheKey.setDefault],
        mutationFn:async(entityAddressId:number)=>await entityAddressService.setDefault(entityAddressId),
        onError:(error)=>{
            console.log(error)
        },
        onSuccess:(data)=>{
            dispatch(authSliceActions.setEntityAddress(data.data))
            setKey('home')
        }
    
    })
    return(
        <Button 
            className="w-full text-sm font-medium"
            onClick={async()=>{
                const values = getValues()
                await mutateAsync(values.entity_address)
            }}
            disabled={isLoading}
        >
            {isLoading ? <Spinner/> : "USE THIS LOCATION"}
        </Button>
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



