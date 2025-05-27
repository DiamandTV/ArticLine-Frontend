import { DateTimeInput } from "@components/inputs/DateTimeInput";
import { CourierSelect } from "@features/autentication/components/select/CourierSelect";
import { FieldsProvider } from "@features/autentication/context/FieldsProvider/FieldsProvider";
import { FieldsProps } from "@features/autentication/models/Fields/FieldsProps";
import { FieldsProviderProps } from "@features/autentication/models/Fields/FieldsProviderProps";
import { DeviceSelect } from "@features/device/components/select/DeviceSelect";
import { OrderMultiSelect } from "@features/order/components/multiSelect/OrderMultiSelect";
import { orderDeliveryBatchFieldsSchema, OrderDeliveryBatchFieldsType } from "@features/orderDeliveryBatch/models/OrderDeliveryBatch/Field/OrderDeliveryBatchField";
import { tailwindMerge } from "@lib/tsMerge/tsMerge";
import { Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { useFormContext } from "react-hook-form";

export function OrderDeliveryBatchInfoFieldsProvider(props:FieldsProviderProps<OrderDeliveryBatchFieldsType>){
    return(
        <FieldsProvider<OrderDeliveryBatchFieldsType> 
            {...props}
            schema={orderDeliveryBatchFieldsSchema}
        >   
            {props.children}
        </FieldsProvider>
    )
}

export function OrderDeliveryBatchInfoFields(props:FieldsProps){
    const className = tailwindMerge("w-full flex flex-col items-center justify-center gap-2 ",props.className)
    const {register,formState:{errors}} = useFormContext<OrderDeliveryBatchFieldsType>()
    return(
        <Form
            {...props}
            className={className}
         >
            <Row className="w-full">
                <Col as={Col} className="p-0" >
                    <FloatingLabel label="TITLE">
                        <Form.Control {...register('title')} type="text" isInvalid={!!errors?.title}/>
                        <Form.Control.Feedback type="invalid">
                            {errors?.title?.message}
                        </Form.Control.Feedback>
                    </FloatingLabel>
                </Col>            
            </Row>
            
            <Row className="w-full " >
                <Col className="p-0 flex flex-col gap-2">
                    {
                        // COURIER LIST
                    }
                    <OrderMultiSelect
                        id="orders"
                        label="ORDERS"
                    />
                </Col>
            </Row>

            <Row className="w-full " >
                <Col className="p-0 flex flex-col gap-2">
                    {
                        // COURIER LIST
                    }
                    <CourierSelect
                        id="courier"
                        label="COURIER"
                    />
                </Col>
            </Row>

            <Row className="w-full">
                <Col  className="p-0" >
                    {
                        // DEVICE LIST
                        <DeviceSelect
                            id="device"
                            label="DEVICE"
                        />  
                    }
                </Col>
            </Row>

            <Row className="w-full">
                <Col  className="p-0" >
                    {
                        // PICKUP TIME
                        <DateTimeInput
                            id="pickup_time"
                            label="PICK UP TIME"
                        />
                    }
                </Col>
            </Row>
        </Form>
    )
}