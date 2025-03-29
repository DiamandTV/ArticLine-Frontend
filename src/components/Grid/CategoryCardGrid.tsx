import { CategoryModel } from "../../models/category";
import { GridView } from "../../views/GridView";
import { CategoryDetailedCard } from "../Cards/CategoryCard";

export function CategoryCardGrid({categories}:{categories:Array<CategoryModel>}){
    return (
        <GridView className="grid-cols-3">
            {categories.map((category)=>{
                return (
                    <CategoryDetailedCard category={category}/>
                )
            })}
        </GridView>
    )
}