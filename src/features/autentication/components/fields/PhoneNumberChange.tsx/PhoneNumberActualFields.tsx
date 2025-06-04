import { PhoneInput } from "@components/inputs/PhoneInput";
import { FieldsProvider } from "@features/autentication/context/FieldsProvider/FieldsProvider";
import { FieldsProps } from "@features/autentication/models/Fields/FieldsProps";
import { FieldsProviderProps } from "@features/autentication/models/Fields/FieldsProviderProps";
import { phoneNumberActualFieldsSchema, PhoneNumberActualFieldsType } from "@features/autentication/models/PhoneNumberChange/PhoneNumberChange";
import { tailwindMerge } from "@lib/tsMerge/tsMerge";
import { Col, Form, Row } from "react-bootstrap";
import { useFormContext } from "react-hook-form";

export function PhoneNumberActualFieldsProvider(props:FieldsProviderProps<PhoneNumberActualFieldsType>){
    return(
        <FieldsProvider<PhoneNumberActualFieldsType> 
            {...props}
             schema={phoneNumberActualFieldsSchema}
        >
            {props.children}
        </FieldsProvider>
    )
}


export function PhoneNumberActualFields(props:FieldsProps){
    const className = tailwindMerge("w-full flex flex-col items-center justify-center gap-2 ",props.className)
    const {register,formState:{errors},getValues} = useFormContext<PhoneNumberActualFieldsType>()
    console.log(getValues())
    return(
        <Form
            {...props}
            className={className}
        >
            {
                // <Row className="w-full gap-2">
                //     <Col className="p-0 " >
                //         <FloatingLabel label="ACTUAL PASSWORD">
                //             <Form.Control type="text" {...register('actual_password')} isInvalid={!!errors.actual_password}/>
                //             <Form.Control.Feedback type="invalid">
                //                 {errors.actual_password?.message}
                //             </Form.Control.Feedback>
                //         </FloatingLabel>
                //     </Col>
                // </Row>
            }

            <Row className="w-full gap-2">
                <Col className="p-0" >
                    <PhoneInput
                        inputElement={
                            <Form.Control readOnly className="pb-2 mb-0" type="text" {...register('actual_phone_number')} isInvalid={!!errors.actual_phone_number}/>
                            
                        }
                        errorElement={
                            <Form.Control.Feedback type="invalid">
                                {errors.actual_phone_number?.message}
                            </Form.Control.Feedback>
                        }
                    />
                </Col>
            </Row>
        </Form>
    )
}