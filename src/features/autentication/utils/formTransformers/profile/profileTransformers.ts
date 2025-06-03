import { CompanyProfileInfoFieldsType } from "@features/autentication/models/Profile/InfoFields/CompanyProfileInfoFields/CompanyProfileInfoFieldsType";
import { CourierProfileInfoFieldsType } from "@features/autentication/models/Profile/InfoFields/CourierProfileInfoFields/CourierProfileInfoFieldsType";
import { UserProfileInfoFieldsType } from "@features/autentication/models/Profile/InfoFields/UserProfileInfoFields/UserProfileInfoFieldsType";
import { ProfileInterface } from "@features/autentication/models/Profile/Interface/Type";
import { urlToFile } from "@utils/fileConverter/fileConverter";

type ProfileToFieldsType = UserProfileInfoFieldsType | CourierProfileInfoFieldsType | CompanyProfileInfoFieldsType
export async function profileToFields(profile:ProfileInterface):Promise<ProfileToFieldsType>{
    switch(profile!.auth.type){
        case 'USER':
            return {
                image:await urlToFile(profile!.image),
                first_name:profile!.first_name,
                last_name:profile!.last_name,
                username:(profile as unknown as UserProfileInfoFieldsType).username,
                date_of_birth:(profile as unknown as UserProfileInfoFieldsType).date_of_birth,
                address:{
                    full_address:profile!.address.full_address
                }
            } as UserProfileInfoFieldsType
        case 'COURIER':
            return {
                image:await urlToFile(profile!.image),
                first_name:profile!.first_name,
                last_name:profile!.last_name,
                username:(profile as unknown as CourierProfileInfoFieldsType).username,
                date_of_birth:(profile as unknown as CourierProfileInfoFieldsType).date_of_birth,
                address:{
                    full_address:profile!.address.full_address
                }
            } as CourierProfileInfoFieldsType
        case 'COMPANY':
            return {
                image:await urlToFile(profile!.image),
                first_name:profile!.first_name,
                last_name:profile!.last_name,
                company_name:(profile as unknown as CompanyProfileInfoFieldsType).company_name,
                date_of_foundation:(profile as unknown as CompanyProfileInfoFieldsType).date_of_foundation,
                address:{
                    full_address:profile!.address.full_address
                }
            } as CompanyProfileInfoFieldsType
    }
}