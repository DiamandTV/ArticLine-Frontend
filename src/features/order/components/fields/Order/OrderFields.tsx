import { FieldsProvider } from "@features/autentication/context/FieldsProvider/FieldsProvider";
import { FieldsProps } from "@features/autentication/models/Fields/FieldsProps";
import { FieldsProviderProps } from "@features/autentication/models/Fields/FieldsProviderProps";
import { orderInfoFieldsSchema, OrderInfoFieldsType } from "@features/order/models/Order/Field/OrderField";
import { tailwindMerge } from "@lib/tsMerge/tsMerge";
import { Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import { DeliveryInput } from "../../inputs/DeliveryInput/DeliveryInput.tsx";
import { OrderAddressInput } from "../../inputs/OrderAddressInput/OrderAddressInput.tsx";

export function OrderInfoFieldsProvider(props:FieldsProviderProps<OrderInfoFieldsType>){
    return(
        <FieldsProvider<OrderInfoFieldsType>
            {...props}
            defaultValues={{
                request_earliest_delivery:true,
                ...props.defaultValues
            }}
            schema={orderInfoFieldsSchema}
            >
                {props.children}
        </FieldsProvider>
    )
}

export function OrderInfoFields(props:FieldsProps){
    const className = tailwindMerge("w-full flex flex-col items-center justify-center gap-2 ",props.className)
    const {register,formState:{errors}} = useFormContext<OrderInfoFieldsType>()
    return(
        <Form
            {...props}
            className={className}
         >
            <Row className="w-full">
                <Col as={Col} className="p-0" >
                    <OrderAddressInput/>
                </Col>            
            </Row>
            
            <Row className="w-full " >
                <Col className="p-0 flex flex-col gap-2">
                    <DeliveryInput/>
                   
                </Col>
            </Row>

            <Row className="w-full">
                <Col  className="p-0" >
                    <FloatingLabel label="DESCRIPTION">
                        <Form.Control type="text" {...register('extra_details')} isInvalid={!!errors.extra_details}/>
                        <Form.Control.Feedback type="invalid">
                            {errors.extra_details?.message}
                        </Form.Control.Feedback>
                    </FloatingLabel>
                </Col>
            </Row>
        </Form>
    )
}