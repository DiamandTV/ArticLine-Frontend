import { EntityAddressInfoFieldsType } from "@features/autentication/models/EntityAddress/Field/EntityAddressFields";
import { EntityAddressInterface } from "@features/autentication/models/EntityAddress/Interface/EntityAddressInterface";

export  function entityAddressToFields(entityAddress:EntityAddressInterface):EntityAddressInfoFieldsType{
    return {
        address:{
            full_address:entityAddress.address.full_address
        },
        denomination:entityAddress.denomination,
        phone_number:entityAddress.phone_number,
        extra_info:entityAddress.extra_info
    }
}