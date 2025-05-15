import { AddressInput } from "@components/inputs/AddressInput";
import { ImageInput } from "@components/inputs/ImageInput";
import { CategoryMultiSelect } from "@components/multiSelect/CategoryMultiSelect";
import { FieldsProvider } from "@features/autentication/context/FieldsProvider/FieldsProvider";
import { FieldsProps } from "@features/autentication/models/Fields/FieldsProps";
import { FieldsProviderProps } from "@features/autentication/models/Fields/FieldsProviderProps";
import { storeInfoFieldsSchema, StoreInfoFieldsType } from "@features/store/model/Store/Fields/StoreFields";
import { tailwindMerge } from "@lib/tsMerge/tsMerge";
import { Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { useFormContext } from "react-hook-form";

export function StoreInfoFieldsProvider(props:FieldsProviderProps<StoreInfoFieldsType>){
    return(
        <FieldsProvider<StoreInfoFieldsType> {...props} schema={storeInfoFieldsSchema}>
            {props.children}
        </FieldsProvider>
    )
}

export function StoreInfoFields(props:FieldsProps){
    const className = tailwindMerge("w-full flex flex-col items-center justify-center gap-2 ",props.className)
    const {register,formState:{errors}} = useFormContext<StoreInfoFieldsType>()
    console.log(errors)    

    
    return (
        <Form
            {...props}
            className={className}
            >
            <ImageInput id="image"/>
            <Row className="w-full gap-2" >
                <Col className="p-0" xs={12} md={6}>
                    <FloatingLabel label="TITLE" className="bg-surface-a10">
                        <Form.Control type="text" {...register('title')} isInvalid={!!errors.title }/>
                        <Form.Control.Feedback type="invalid" >
                            {errors.title?.message}
                        </Form.Control.Feedback>
                    </FloatingLabel>
                </Col >

                <Col  className="p-0" >
                    <FloatingLabel label="DESCRIPTION">
                        <Form.Control type="text" {...register('description')} isInvalid={!!errors.description}/>
                        <Form.Control.Feedback type="invalid">
                            {errors.description?.message}
                        </Form.Control.Feedback>
                    </FloatingLabel>
                </Col>
            </Row>

            <Row className="w-full">
                <Col as={Col} className="p-0" >
                    <CategoryMultiSelect id="categories" label="CATEGORY" />
                </Col>            
            </Row>

            <Row className="w-full">
                <Col as={Col} className="p-0" >
                    <AddressInput
                        label="ADDRESS"
                        inputElement={
                            <Form.Control type="text" {...register('address.full_address')} isInvalid={!!errors.address}/>
                        }
                        errorElement={
                            <Form.Control.Feedback type="invalid">
                                {errors.address?.full_address?.message }
                            </Form.Control.Feedback>
                        }
                    />
    
                </Col>            
            </Row>
        </Form>
    )
}
