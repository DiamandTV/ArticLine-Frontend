import { AddressInput } from "@components/inputs/AddressInput";
import { PhoneInput } from "@components/inputs/PhoneInput";
import { FieldsProvider } from "@features/autentication/context/FieldsProvider/FieldsProvider";
import { entityAddressInfoFieldsSchema, EntityAddressInfoFieldsType } from "@features/autentication/models/EntityAddress/Field/EntityAddressFields";
import { FieldsProps } from "@features/autentication/models/Fields/FieldsProps";
import { FieldsProviderProps } from "@features/autentication/models/Fields/FieldsProviderProps";
import { tailwindMerge } from "@lib/tsMerge/tsMerge";
import { Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { useFormContext } from "react-hook-form";

export function EntityAddressInfoFieldsProvider(props:FieldsProviderProps<EntityAddressInfoFieldsType>){
    return(
        <FieldsProvider<EntityAddressInfoFieldsType> 
            {...props}
            schema={entityAddressInfoFieldsSchema}
        >
            {props.children}
        </FieldsProvider>
    )
}

export function EntityAddressInfoFields(props:FieldsProps){
    const className = tailwindMerge("w-full flex flex-col items-center justify-center gap-2",props.className)
    const {register,formState:{errors}} = useFormContext<EntityAddressInfoFieldsType>()
    return(
        <Form
            {...props}
            className={className}
            >
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

            <Row className="w-full gap-2" >
                
                <Col className="p-0" xs={12}>
                    <FloatingLabel label="DENOMINATION">
                        <Form.Control type="email" {...register('denomination')} isInvalid={!!errors.denomination}/>
                        <Form.Control.Feedback type="invalid">
                            {errors.denomination?.message}
                        </Form.Control.Feedback>
                    </FloatingLabel>
                </Col>
            
                <Col  className="p-0" xs={12} >
                    <PhoneInput
                        inputElement={
                            <Form.Control className="pb-2 mb-0" type="text" {...register('phone_number')} isInvalid={!!errors.phone_number}/>
                            
                        }
                        errorElement={
                            <Form.Control.Feedback type="invalid">
                                {errors.phone_number?.message}
                            </Form.Control.Feedback>
                        }
                    />
                </Col >
            </Row>

            <Row className="w-full">
                <Col  className="p-0" >
                    <FloatingLabel label="EXTRA INFO">
                        <Form.Control type="text" {...register('extra_info')} isInvalid={!!errors.extra_info}/>
                        <Form.Control.Feedback type="invalid">
                            {errors.extra_info?.message}
                        </Form.Control.Feedback>
                    </FloatingLabel>
                </Col>
            </Row>

        </Form>
    
    )
}