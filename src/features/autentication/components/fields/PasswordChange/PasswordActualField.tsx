import { FieldsProvider } from "@features/autentication/context/FieldsProvider/FieldsProvider"
import { FieldsProps } from "@features/autentication/models/Fields/FieldsProps"
import { FieldsProviderProps } from "@features/autentication/models/Fields/FieldsProviderProps"
import { passwordActualFieldSchema, PasswordActualFieldType } from "@features/autentication/models/PasswordChange/PasswordChangeFields"
import { tailwindMerge } from "@lib/tsMerge/tsMerge"
import { Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { useFormContext } from "react-hook-form";

export function PasswordActualFieldProvider(props:FieldsProviderProps<PasswordActualFieldType>){
    return(
        <FieldsProvider<PasswordActualFieldType> 
            {...props}
            schema={passwordActualFieldSchema}
        >
            {props.children}
        </FieldsProvider>
    )   
}

export function PasswordActualField(props:FieldsProps){
    const className = tailwindMerge("w-full flex items-center justify-center gap-2 ",props.className)
    const {register,formState:{errors}} = useFormContext<PasswordActualFieldType>()
    return(
        <Form
            {...props}
            className={className}
        >
            <Row className="w-full gap-2">
                <Col className="p-0" >
                    <FloatingLabel label="ACTUAL PASSWORD">
                        <Form.Control type="password" {...register('actual_password')} isInvalid={!!errors.actual_password}/>
                        <Form.Control.Feedback type="invalid">
                            {errors.actual_password?.message}
                        </Form.Control.Feedback>
                    </FloatingLabel>
                </Col>
            </Row>
        </Form>
    )
}