import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { CategoryCardGrid } from "../../components/Grid/CategoryCardGrid"

export function Categories(){
    const categories = useSelector((state:RootState)=>state.categoryReducer.categories)
    if(!categories) return null
    return (
        <div className="w-full h-full @container">
            <CategoryCardGrid categories={categories}/>
        </div>
    )
}