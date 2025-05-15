import { AddressCard } from "@components/cards/AddressCard/AddressCard";
import { AddressInput } from "@components/inputs/AddressInput";
import { FieldsProvider } from "@features/autentication/context/FieldsProvider/FieldsProvider";
import { FieldsProps } from "@features/autentication/models/Fields/FieldsProps";
import { FieldsProviderProps } from "@features/autentication/models/Fields/FieldsProviderProps";
import { orderInfoFieldsSchema, OrderInfoFieldsType } from "@features/order/models/Order/Field/OrderField";
import { tailwindMerge } from "@lib/tsMerge/tsMerge";
import { Button, ButtonGroup, Col, FloatingLabel, Form, FormCheck, Row } from "react-bootstrap";
import { useFormContext } from "react-hook-form";

export function OrderInfoFieldsProvider(props:FieldsProviderProps<OrderInfoFieldsType>){
    return(
        <FieldsProvider<OrderInfoFieldsType>
            {...props}
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
            <Form.Check type="radio" className="w-full flex flex-row gap-4 justify-center items-center border-1 rounded-lg px-3">
                <Form.Check.Input type={"radio"} isValid />
                <AddressCard className="border-none px-0 gap-3" address="Via Monte Sabotino , 10 , Bovisio Masciago" isHome/>
            </Form.Check>
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
                <Col className="p-0">
                    <FloatingLabel label="DELIVERY DAYTIME">
                        <Form.Control type="date" {...register('delivery_time')} isInvalid={!!errors.delivery_time}/>
                        <Form.Control.Feedback type="invalid">
                            {errors.delivery_time?.message}
                        </Form.Control.Feedback>
                    </FloatingLabel>
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