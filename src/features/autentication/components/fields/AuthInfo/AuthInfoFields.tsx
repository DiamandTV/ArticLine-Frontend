import { FieldsProvider } from "@features/autentication/context/FieldsProvider/FieldsProvider";
import { authInfoFieldsSchema, AuthInfoFieldsType } from "@features/autentication/models/Auth/AuthInfoFields/AuthInfoFieldsType";
import { FieldsProps } from "@features/autentication/models/Fields/FieldsProps";
import { FieldsProviderProps } from "@features/autentication/models/Fields/FieldsProviderProps";
import { tailwindMerge } from "@lib/tsMerge/tsMerge";
import { Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { useFormContext } from "react-hook-form";

export function AuthInfoFieldsProvider(props:FieldsProviderProps<AuthInfoFieldsType>){
    return (
        <FieldsProvider<AuthInfoFieldsType> {...props} schema={authInfoFieldsSchema}>
            {props.children}
        </FieldsProvider>
    )
} 

export function AuthInfoFields(props:FieldsProps){
    const className = tailwindMerge("w-full items-center justify-center gap-2 "+props.className)
    const {register,formState:{errors}} = useFormContext<AuthInfoFieldsType>()
    console.log(errors)
    return(
        <Form
            {...props}
            className={className}
        >
            <Row className="w-full gap-2" >
                <Col  className="p-0" xs={12} md={6}>
                    <FloatingLabel label="PHONE NUMBER">
                        <Form.Control type="text" {...register('phone_number')} isInvalid={!!errors.phone_number}/>
                        <Form.Control.Feedback type="invalid">
                            {errors.phone_number?.message}
                        </Form.Control.Feedback>
                    </FloatingLabel>
                </Col >

                <Col  className="p-0" >
                    <FloatingLabel label="EMAIL">
                        <Form.Control type="email" {...register('email')} isInvalid={!!errors.email}/>
                        <Form.Control.Feedback type="invalid">
                            {errors.email?.message}
                        </Form.Control.Feedback>
                    </FloatingLabel>
                </Col>
            </Row>

            <Row className="w-full gap-2" >
                <Col  className="p-0" xs={12} md={6}>
                    <FloatingLabel label="PASSWORD">
                        <Form.Control type="password" {...register('password')} isInvalid={!!errors.password}/>
                        <Form.Control.Feedback type="invalid">
                            {errors.password?.message}
                        </Form.Control.Feedback>
                    </FloatingLabel>
                </Col >

                <Col  className="p-0" >
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