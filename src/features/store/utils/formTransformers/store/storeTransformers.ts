import { StoreInfoFieldsTransformedType } from "@features/store/model/Store/Fields/StoreFields";
import { StoreInterface } from "@features/store/model/Store/Interface/StoreInterface";
import { urlToFile } from "@utils/fileConverter/fileConverter";

export async function storeToFields(store:StoreInterface):Promise<StoreInfoFieldsTransformedType>{
    const imageFile = await urlToFile(store.image)
    return{
        image:imageFile,
        title:store.title,
        description:store.description,
        categories:store.categories,
        address:{
            full_address:store.address.full_address
        },

    }

}