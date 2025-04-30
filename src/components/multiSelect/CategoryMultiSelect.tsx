import { useGetCategoryQuery } from "@features/home/hook/useGetCategoryQuery/useGetCategoryQuery";
import { getKey } from "@lib/kegGenerator/keyGenerator";
import { FloatingLabel, Form } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import Select from 'react-select';
interface CategoryMultiSelectProps {
    id:string,
    label:string,

}
export function CategoryMultiSelect({id,label}:CategoryMultiSelectProps){    
    const {register,formState:{errors}} = useFormContext()
    const errorMessage = errors?.[id]?.message as string | undefined;
    const {data:categories,isLoading,isSuccess} = useGetCategoryQuery()
    if(isLoading || !isSuccess) return 
    const formattedCategories = categories.map((category)=>({value:category.id,label:category.name}))
    return(
        <FloatingLabel label={label}>
            
            <Form.Select as="button">
                {categories.map((category,index)=>{
                    return(
                        <option value={index}>{category.name}</option>
                    )
                })}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
                {errorMessage}
            </Form.Control.Feedback>
        </FloatingLabel>   
    )
}