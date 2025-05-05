import { StoreCategoryInfoFieldsType } from "@features/store/model/StoreCategory/Fields/StoreCategoryFields";
import { StoreCategoryInterface } from "@features/store/model/StoreCategory/Interface/StoreCategoryInterface";
import { urlToFile } from "@utils/fileConverter/fileConverter";

export async function storeCategoryToFields(storeCategory:StoreCategoryInterface):Promise<StoreCategoryInfoFieldsType>{
    const imageFile = await urlToFile(storeCategory.image)
    return {
        ...storeCategory,
        image:imageFile,
    }
}