import { ProductInfoFieldsType } from "@features/store/model/Product/Fields/ProductFields";
import { ProductInterface } from "@features/store/model/Product/Interface/ProductInterface";
import { urlToFile } from "@utils/fileConverter/fileConverter";

export async function productToFields(product:ProductInterface):Promise<ProductInfoFieldsType>{
    const imageFile = await urlToFile(product.image)
    return{
        ...product,
        image:imageFile
    }
}