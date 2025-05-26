import { FieldsProvider } from "@features/autentication/context/FieldsProvider/FieldsProvider";
import { FieldsProps } from "@features/autentication/models/Fields/FieldsProps";
import { FieldsProviderProps } from "@features/autentication/models/Fields/FieldsProviderProps";
import { orderDelayTimeFieldsSchema, OrderDelayTimeFieldsType } from "@features/order/models/Order/Field/OrderField";
import { tailwindMerge } from "@lib/tsMerge/tsMerge";
import { Col, FloatingLabel, Form, Row } from "react-bootstrap";
import DurationPicker from 'react-duration-picker'
import { Controller, useFormContext } from "react-hook-form";

export function OrderDelayTimeInfoFieldsProvider(props:FieldsProviderProps<OrderDelayTimeFieldsType>){
    return(
        <FieldsProvider<OrderDelayTimeFieldsType>
            {...props}
            schema={orderDelayTimeFieldsSchema}
            >
            {props.children}
        </FieldsProvider>
    )
}

export function OrderDelaytimeInfoFields(props:FieldsProps){
    const className = tailwindMerge("w-full flex flex-col items-center justify-center gap-2 ",props.className)
    const {control,formState:{errors}} = useFormContext<OrderDelayTimeFieldsType>()
    const error = errors.delay_time?.message
    console.log(error)
    return(
        <Form
            {...props}
            className={className}
         >
            <Row className="w-full">
                <Col as={Col} className="p-0" >
                    <Controller
                        control={control}
                        name="delay_time"
                        render={({field})=>{
                            return(
                                <FloatingLabel label>
                                    <DurationPicker
                                        initialDuration={{hours:0,minutes:0,seconds:0}}
                                        maxHours={24*7}
                                        {...field}
                                    />
                                    <Form.Control  isInvalid={!!error} hidden/>
                                    <Form.Control.Feedback type="invalid" >
                                        {error}
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            )
                        }}
                    />
                </Col>            
            </Row>
        </Form>
    )
}