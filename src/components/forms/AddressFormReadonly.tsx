import { AddressModel } from "../../models/address"
import { AnimationPlaceholderInput } from "../inputs/AnimationPlaceholderInput"

interface AddressFormReadOnlyProps{
    address:AddressModel
}
export function AddressFormReadOnly({address}:AddressFormReadOnlyProps){
    const dataSet = [
        {
            labelName:"RECIPIENT NAME",
            defaultValue:address.recipient_name
        },
        {
            labelName:"ADDRESS",
            defaultValue:address.street
        },
        {
            labelName:"CITY",
            defaultValue:address.city
        },
        {
            labelName:"ZIP",
            defaultValue:address.postal_code
        },
        {
            labelName:"PROVINCE",
            defaultValue:address.province
        },
        {
            labelName:"COUNTRY",
            defaultValue:address.country
        }
    ]
    return(
        <>
            {
                dataSet.map((data)=>{
                    return (
                        <AnimationPlaceholderInput
                            labelName={data.labelName}
                            type="text"
                            defaultValue={data.defaultValue}
                            name={data.labelName}
                        />
                    )
                })
            }
        </>
    )
}