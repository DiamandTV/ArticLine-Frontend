import { CategoryModel } from "../../models/category";
import { GridView } from "../../views/GridView";
import { CategoryDetailedCard } from "../Cards/CategoryCard";

export function CategoryCardGrid({categories}:{categories:Array<CategoryModel>}){
    return (
        <GridView className="@md:grid-cols-2 @lg:grid-cols-3 @xl:grid-cols-4 @2xl:grid-cols-5">
            {categories.map((category)=>{
                return (
                    <CategoryDetailedCard category={category}/>
                )
            })}
        </GridView>
    )
}