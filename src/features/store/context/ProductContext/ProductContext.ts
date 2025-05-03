import { ProductInterface } from "@features/store/model/Product/Interface/ProductInterface";
import { createContext } from "react";

interface ProductContextInterface {
    product?:ProductInterface
}

export const ProductContext = createContext<ProductContextInterface>({})