import { FieldsProvider } from "@features/autentication/context/FieldsProvider/FieldsProvider";
import { FieldsProps } from "@features/autentication/models/Fields/FieldsProps";
import { FieldsProviderProps } from "@features/autentication/models/Fields/FieldsProviderProps";
import { passwordResetFieldsSchema, PasswordResetFieldsType } from "@features/autentication/models/PasswordReset/PasswordResetFields";
import { tailwindMerge } from "@lib/tsMerge/tsMerge";
import { Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { useFormContext } from "react-hook-form";

export function PasswordResetFieldsProvider(props:FieldsProviderProps<PasswordResetFieldsType>){
    return(
        <FieldsProvider<PasswordResetFieldsType> {...props} schema={passwordResetFieldsSchema}>
            {props.children}
        </FieldsProvider>
    )
}

export function PasswordResetFields(props:FieldsProps){
    const className = tailwindMerge("w-full flex items-center justify-center gap-2 "+props.className)
    const {register,formState:{errors}} = useFormContext<PasswordResetFieldsType>()
    return(
        <Form
            {...props}
            className={className}
        >
            <Row className="w-full gap-2">
                <Col className="p-0" xs={12} md={6}>
                    <FloatingLabel label="NEW PASSWORD">
                        <Form.Control type="password" {...register('password')} isInvalid={!!errors.password}/>
                        <Form.Control.Feedback type="invalid">
                            {errors.password?.message}
                        </Form.Control.Feedback>
                    </FloatingLabel>
                </Col>

                <Col className="p-0" >
                    <FloatingLabel label="CONFERM PASSWORD">
                        <Form.Control type="password" {...register('conferm_password')} isInvalid={!!errors.conferm_password}/>
                        <Form.Control.Feedback type="invalid">
                            {errors.conferm_password?.message}
                        </Form.Control.Feedback>
                    </FloatingLabel>
                </Col>
            </Row>
        </Form>
    )
}