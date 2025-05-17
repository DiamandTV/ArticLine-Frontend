
import { EntityAddressCard } from "@features/autentication/components/cards/EntityAddressCard/EntityAddressCard"
import { EntityAddressProvider } from "@features/autentication/context/EntityAddressContext/EntityAddressProvider"
import { useGetEntityAddressSavedListQuery } from "@features/autentication/hooks/useGetEntityAddressSavedListQuery/useGetEntityAddressSavedListQuery"
import { Form } from "react-bootstrap"

export function EntityAddressList(){
    const {data,isSuccess,isLoading} = useGetEntityAddressSavedListQuery()
    if(isLoading || !isSuccess) return null
    return(
        <div className="w-full h-full flex flex-col gap-2">
            {data.map((entityAddress)=>{
                return(
                    <EntityAddressProvider entityAddress={entityAddress}>
                        <Form.Check>
                            <EntityAddressCard/>
                        </Form.Check>
                    </EntityAddressProvider>
                )
            })}
        </div>
    )
}

