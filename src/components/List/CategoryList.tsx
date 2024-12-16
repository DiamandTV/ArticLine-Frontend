import { CategoryCard } from "../Cards/CategoryCard"
import { CardList } from "./CardList"
import { CategoryModel } from "../../models/category"
import { StoreCategoriesModel } from "../../models/StoreCategories"

export function CategoryCardList({categories}:{categories:Array<CategoryModel>|Array<StoreCategoriesModel>}){
    
    return (
        categories ? 
        <CardList
            itemCount={categories.length}
            
            itemSize={320}
            className=" pt-2 pb-4"
            >
            {({index,style})=><CategoryCard  category={categories[index]} style={style} className="px-1 first:pr-1 first:pl-0 last:pr-0 last:pl-1"/>}
        </CardList> : null
    )
}