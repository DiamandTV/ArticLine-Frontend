import { CategoryInterface } from "@features/home/model/Category/CategoryInterface";
import { createContext } from "react";

interface CategoryContextInterface {
    category?:CategoryInterface
}

export const CategoryContext = createContext<CategoryContextInterface>({})