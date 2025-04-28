import { CategoryInterface } from "@features/home/model/Category/CategoryInterface"
import { CategoryContext } from "./CategoryContext"

interface CategoryProviderProps{
    category:CategoryInterface
    children:React.ReactNode
}
export function CategoryProvider({category,children}:CategoryProviderProps){
    return (
        <CategoryContext.Provider value={{category}}>
            {children}
        </CategoryContext.Provider>
    )
}