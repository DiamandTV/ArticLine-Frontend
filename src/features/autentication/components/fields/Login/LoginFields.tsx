import { FieldsProvider } from "@features/autentication/context/FieldsProvider/FieldsProvider";
import { FieldsProps } from "@features/autentication/models/Fields/FieldsProps";
import { FieldsProviderProps } from "@features/autentication/models/Fields/FieldsProviderProps";
import { loginFieldsSchema, LoginFieldsType } from "@features/autentication/models/LoginFields/LoginFieldsType";
import { tailwindMerge } from "@lib/tsMerge/tsMerge";
import { Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { useFormContext } from "react-hook-form";

export function LoginFieldsProvider(props:FieldsProviderProps<LoginFieldsType>){
    return(
        <FieldsProvider<LoginFieldsType> {...props} schema={loginFieldsSchema}>
            {props.children}
        </FieldsProvider>
    )
} 


export function LoginFields(props:FieldsProps){
    const className = tailwindMerge("w-full flex items-center justify-center gap-2 "+props.className)
    const {register,/*handleSubmit,*/formState:{errors}} = useFormContext<LoginFieldsType>()
    
    
    // const onSubmit:SubmitHandler<LoginFieldsType> = (fields)=>{
    // }

    return(
        <Form
            {...props}
            className={className}
        >
            <Row className="w-full gap-2" >
                <Col className="p-0" xs={12} md={6}>
                    <FloatingLabel label="EMAIL">
                        <Form.Control type="email" {...register('email')} isInvalid={!!errors.email}/>
                        <Form.Control.Feedback type="invalid">
                            {errors.email?.message}
                        </Form.Control.Feedback>
                    </FloatingLabel>
                </Col >

                <Col className="p-0" >
                    <FloatingLabel label="PASSWORD">
                        <Form.Control type="password" {...register('password')} isInvalid={!!errors.password}/>
                        <Form.Control.Feedback type="invalid">
                            {errors.password?.message}
                        </Form.Control.Feedback>
                    </FloatingLabel>
                </Col>
            </Row>
        </Form>
    )
}