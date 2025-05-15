import { AddressCard } from "@components/cards/AddressCard/AddressCard"
import { useGetAddressSavedListQuery } from "@features/autentication/hooks/useGetAddressSavedListQuery/useGetAddressSavedListQuery"

export function AddressSavedList(){
    const {data,isSuccess,isLoading} = useGetAddressSavedListQuery()
    if(isLoading || !isSuccess) return null
    return(
        <div>
            {data.map((address)=>{
                return(
                    <AddressCard
                        address={address.full_address}
                        isHome={false}
                    />
                )
            })}
        </div>
    )
}