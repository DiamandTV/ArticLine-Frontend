import { FieldsProvider } from "@features/autentication/context/FieldsProvider/FieldsProvider";
import { FieldsProps } from "@features/autentication/models/Fields/FieldsProps";
import { FieldsProviderProps } from "@features/autentication/models/Fields/FieldsProviderProps";
import { orderDeliveryTimeFieldsSchema, OrderDeliveryTimeFieldsType } from "@features/order/models/Order/Field/OrderField";
import { tailwindMerge } from "@lib/tsMerge/tsMerge";
import { Col, Form, Row } from "react-bootstrap";
import { DeliveryTimeInput } from "../../inputs/DeliveryInput/DeliveryTimeInput";

export function OrderDeliveryTimeInfoFieldsProvider(props:FieldsProviderProps<OrderDeliveryTimeFieldsType>){
    return(
        <FieldsProvider<OrderDeliveryTimeFieldsType>
            {...props}
            schema={orderDeliveryTimeFieldsSchema}
            >
                {props.children}
        </FieldsProvider>
    )
}

export function OrderDeliverytimeInfoFields(props:FieldsProps){
    const className = tailwindMerge("w-full flex flex-col items-center justify-center gap-2 ",props.className)
    return(
        <Form
            {...props}
            className={className}
         >
            <Row className="w-full">
                <Col as={Col} className="p-0" >
                    <DeliveryTimeInput
                        label="DELIVERY_TIME"
                        id="delivery_time"
                    />
                </Col>            
            </Row>
        </Form>
    )
}