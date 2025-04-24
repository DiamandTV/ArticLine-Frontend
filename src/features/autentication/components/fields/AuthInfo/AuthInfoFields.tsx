import { PhoneInput } from "@components/inputs/PhoneInput";
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

    return(
        <Form
            {...props}
            className={className}
        >
            <Row className="w-full gap-2" >
                
                <Col className="p-0" xs={12} md={6}>
                    <FloatingLabel label="EMAIL">
                        <Form.Control type="email" {...register('auth.email')} isInvalid={!!errors.auth?.email}/>
                        <Form.Control.Feedback type="invalid">
                            {errors.auth?.email?.message}
                        </Form.Control.Feedback>
                    </FloatingLabel>
                </Col>
            
                <Col  className="p-0" >
                    <PhoneInput
                        inputElement={
                            <Form.Control className="pb-2 mb-0" type="text" {...register('auth.phone_number')} isInvalid={!!errors.auth?.phone_number}/>
                            
                        }
                        errorElement={
                            <Form.Control.Feedback type="invalid">
                                {errors.auth?.phone_number?.message}
                            </Form.Control.Feedback>
                        }
                    />
                </Col >
            </Row>

            <Row className="w-full gap-2" >
                <Col  className="p-0" xs={12} md={6}>
                    <FloatingLabel label="PASSWORD">
                        <Form.Control type="password" {...register('auth.password')} isInvalid={!!errors.auth?.password}/>
                        <Form.Control.Feedback type="invalid">
                            {errors.auth?.password?.message}
                        </Form.Control.Feedback>
                    </FloatingLabel>
                </Col >

                <Col  className="p-0" >
                    <FloatingLabel label="CONFERM PASSWORD">
                        <Form.Control type="password" {...register('auth.conferm_password')} isInvalid={!!errors.auth?.conferm_password}/>
                        <Form.Control.Feedback type="invalid">
                            {errors.auth?.conferm_password?.message}
                        </Form.Control.Feedback>
                    </FloatingLabel>
                </Col>
            </Row>
        </Form>
    )
}