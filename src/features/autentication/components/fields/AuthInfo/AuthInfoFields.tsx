import { AuthInfoFieldsType } from "@features/autentication/models/AuthInfoFields/AuthInfoFieldsType";
import { tailwindMerge } from "@lib/tsMerge/tsMerge";
import { Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { useFormContext } from "react-hook-form";

interface AuthInfoFieldsProps extends React.HTMLAttributes<HTMLElement>{
    onChange?:()=>void,
}

export function AuthInfoFields(props:AuthInfoFieldsProps){
    const className = tailwindMerge("w-full items-center justify-center gap-2 "+props.className)
    const {register,formState:{errors}} = useFormContext<AuthInfoFieldsType>()
    
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