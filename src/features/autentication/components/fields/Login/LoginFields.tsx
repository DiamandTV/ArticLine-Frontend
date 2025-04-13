import { LoginFieldsType } from "@features/autentication/models/LoginFields/LoginFieldsType";
import { tailwindMerge } from "@lib/tsMerge/tsMerge";
import { Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { useFormContext } from "react-hook-form";

interface LoginFieldsProps extends React.HTMLAttributes<HTMLElement>{
    onChange?:()=>void
}
export function LoginFields(props:LoginFieldsProps){
    const className = tailwindMerge("w-full items-center justify-center gap-2 "+props.className)
    const {register,formState:{errors}} = useFormContext<LoginFieldsType>()
    return(
        <Form
            {...props}
            className={className}
        >
            <Row className="w-full gap-2" >
                <Col  className="p-0" xs={12} md={6}>
                    <FloatingLabel label="EMAIL">
                        <Form.Control type="email\" {...register('email')} isInvalid={!!errors.email}/>
                        <Form.Control.Feedback type="invalid">
                            {errors.email?.message}
                        </Form.Control.Feedback>
                    </FloatingLabel>
                </Col >

                <Col  className="p-0" >
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