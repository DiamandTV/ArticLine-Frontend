import { FieldsProvider } from "@features/autentication/context/FieldsProvider/FieldsProvider";
import { FieldsProps } from "@features/autentication/models/Fields/FieldsProps";
import { FieldsProviderProps } from "@features/autentication/models/Fields/FieldsProviderProps";
import { passwordChangeFieldsSchema, PasswordChangeFieldsType } from "@features/autentication/models/PasswordChange/PasswordChangeFields";
import { tailwindMerge } from "@lib/tsMerge/tsMerge";
import { Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { useFormContext } from "react-hook-form";

export function PasswordChangeFieldsProvider(props:FieldsProviderProps<PasswordChangeFieldsType>){
    return(
        <FieldsProvider<PasswordChangeFieldsType> 
            schema={passwordChangeFieldsSchema}
            {...props}
        >
            {props.children}
        </FieldsProvider>
    )
}


export function PasswordChangeFields(props:FieldsProps){
    const className = tailwindMerge("w-full flex flex-col items-center justify-center gap-2 ",props.className)
    const {register,formState:{errors},getValues} = useFormContext<PasswordChangeFieldsType>()
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