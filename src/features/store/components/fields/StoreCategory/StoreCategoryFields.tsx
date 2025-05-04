import { ImageInput } from "@components/inputs/ImageInput";
import { FieldsProvider } from "@features/autentication/context/FieldsProvider/FieldsProvider";
import { FieldsProps } from "@features/autentication/models/Fields/FieldsProps";
import { FieldsProviderProps } from "@features/autentication/models/Fields/FieldsProviderProps";
import { storeCategoryInfoFieldsSchema, StoreCategoryInfoFieldsType } from "@features/store/model/StoreCategory/Fields/StoreCategoryFields";
import { tailwindMerge } from "@lib/tsMerge/tsMerge";
import { Col, FloatingLabel, Form } from "react-bootstrap";
import { useFormContext } from "react-hook-form";

export function StoreCategoryInfoFieldsProvider(props:FieldsProviderProps<StoreCategoryInfoFieldsType>){
    return(
        <FieldsProvider<StoreCategoryInfoFieldsType> {...props} schema={storeCategoryInfoFieldsSchema}>
            {props.children}
        </FieldsProvider>
    )
}

export function StoreCategoryFields(props:FieldsProps){
    const className = tailwindMerge("w-full flex flex-col items-center justify-center gap-2 ",props.className)
    const {register,formState:{errors},resetField,watch} = useFormContext<StoreCategoryInfoFieldsType>()
    console.log(errors)     
    return (
        <Form
            {...props}
            className={className}
            >
            <ImageInput
                className="w-full md:w-[400px]"
                image={watch('image')}
                onDelete={()=>{
                    resetField('image')
                }}
                isInvalid={!!errors.image}
                inputElement={
                    <Form.Control {...register('image')} isInvalid={!!errors.image} type="file" accept="image/*" hidden/>
                }
                errorElement={
                    <Form.Control.Feedback type="invalid">
                        {errors.image?.message}
                    </Form.Control.Feedback>
                }

            />
                <Col className="p-0" xs={12} md={6}>
                    <FloatingLabel label="TITLE" className="bg-surface-a10">
                        <Form.Control type="text" {...register('name')} isInvalid={!!errors.name }/>
                        <Form.Control.Feedback type="invalid" >
                            {errors.name?.message}
                        </Form.Control.Feedback>
                    </FloatingLabel>
                </Col >

                <Col  className="p-0" xs={12} md={6}>
                    <FloatingLabel label="DESCRIPTION">
                        <Form.Control type="text" {...register('description')} isInvalid={!!errors.description}/>
                        <Form.Control.Feedback type="invalid">
                            {errors.description?.message}
                        </Form.Control.Feedback>
                    </FloatingLabel>
                </Col>
        </Form>
    )
}