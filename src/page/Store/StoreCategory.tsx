import { useMutation } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

export function StoreCategory(){
    const params = useParams()
    const subCategoryID = params['sub-category-id']
    if(!subCategoryID) return null;
    const {} = useMutation({})
    return (
        
    )
}