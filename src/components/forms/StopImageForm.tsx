import { ImagePicker } from "../inputs/ImagePicker/ImagePicker";
import { FormProvider } from "react-hook-form";

export function StoreImageForm(){
    return (
        <FormProvider>
            <ImagePicker/>
        </FormProvider>
    )
}