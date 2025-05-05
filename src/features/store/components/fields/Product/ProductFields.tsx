import { ImageInput } from "@components/inputs/ImageInput";
import { FieldsProvider } from "@features/autentication/context/FieldsProvider/FieldsProvider";
import { FieldsProps } from "@features/autentication/models/Fields/FieldsProps";
import { FieldsProviderProps } from "@features/autentication/models/Fields/FieldsProviderProps";
import { productInfoFieldsSchema, ProductInfoFieldsType } from "@features/store/model/Product/Fields/ProductFields";
import { tailwindMerge } from "@lib/tsMerge/tsMerge";
import { Col, FloatingLabel, Form, InputGroup, Row } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import { FaTemperatureHigh, FaTemperatureLow } from "react-icons/fa";
export function ProductInfoFieldsProvider(props:FieldsProviderProps<ProductInfoFieldsType>){
    return(
        <FieldsProvider<ProductInfoFieldsType> {...props} schema={productInfoFieldsSchema}>
            {props.children}
        </FieldsProvider>
    )
}

export function ProductFields(props:FieldsProps){
    const className = tailwindMerge("w-full flex flex-col items-center justify-center gap-2 ",props.className)
    const {register,formState:{errors},resetField,watch} = useFormContext<ProductInfoFieldsType>()
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
            <Row className="w-full gap-2" >
                <Col className="p-0" xs={12} md={6}>
                    <FloatingLabel label="TITLE" className="bg-surface-a10">
                        <Form.Control type="text" {...register('name')} isInvalid={!!errors.name }/>
                        <Form.Control.Feedback type="invalid" >
                            {errors.name?.message}
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

            <Row className="w-full gap-2" >
                <Col className="p-0" xs={12} md={6}>

                    <InputGroup className="p-0">
                        <InputGroup.Text className="text-2xl font-semibold">€</InputGroup.Text>
                        <FloatingLabel label="PRICE">
                            <Form.Control
                                type="number"
                             
                                {...register('price')}
                                isInvalid={!!errors.price}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.price?.message}
                                </Form.Control.Feedback>
                        </FloatingLabel>
                    </InputGroup>
                </Col >

                <div className="w-full p-0 grid grid-cols-2 gap-2 justify-between items-center" >
                        <InputGroup className="p-0">
                            <InputGroup.Text >
                                <FaTemperatureLow size={22.5}/>
                            </InputGroup.Text>
                            <FloatingLabel label="FROM">
                                <Form.Control
                                    type="number"
                                
                                    {...register('temperature_start_range')}
                                    isInvalid={!!errors.temperature_start_range}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.temperature_start_range?.message}
                                    </Form.Control.Feedback>
                            </FloatingLabel>
                            <InputGroup.Text className="text-xl font-semibold">°C</InputGroup.Text>
                        </InputGroup>

                        <InputGroup className="p-0">
                            <InputGroup.Text>
                                <FaTemperatureHigh size={22.5}/>
                            </InputGroup.Text>
                            <FloatingLabel label="TO">
                                <Form.Control
                                    type="number"
                                
                                    {...register('temperature_end_range')}
                                    isInvalid={!!errors.temperature_end_range}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.temperature_end_range?.message}
                                    </Form.Control.Feedback>
                            </FloatingLabel>
                            <InputGroup.Text className="text-xl font-semibold">°C</InputGroup.Text>
                        </InputGroup>
                  
                </div>
            </Row>
            
        </Form>
    )
}
