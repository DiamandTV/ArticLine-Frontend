import { FieldsProvider } from "@features/autentication/context/FieldsProvider/FieldsProvider";
import { FieldsProps } from "@features/autentication/models/Fields/FieldsProps";
import { FieldsProviderProps } from "@features/autentication/models/Fields/FieldsProviderProps";
import { passwordResetRequestFieldsSchema, PasswordResetRequestFieldsType } from "@features/autentication/models/PasswordResetRequestFields/PasswordResetRequestFields";
import { tailwindMerge } from "@lib/tsMerge/tsMerge";
import { FloatingLabel, Form } from "react-bootstrap";
import { useFormContext } from "react-hook-form";

export function PasswordResetRequestFieldsProvider(props:FieldsProviderProps<PasswordResetRequestFieldsType>){
    return (
        <FieldsProvider<PasswordResetRequestFieldsType> {...props} schema={passwordResetRequestFieldsSchema}>
            {props.children}
        </FieldsProvider>
    )
}

export function PasswordResetRequestFields(props:FieldsProps){
    const className = tailwindMerge("w-full flex items-center justify-center gap-2 ",props.className)
    const {register,formState:{errors}} = useFormContext<PasswordResetRequestFieldsType>()
    return(
        <Form 
            {...props}
            className={className}
        >
            <FloatingLabel label="EMAIL" className="w-full">
                <Form.Control type="email" {...register('email')} isInvalid={!!errors.email}/>
                <Form.Control.Feedback type="invalid">
                    {errors.email?.message}
                </Form.Control.Feedback>
            </FloatingLabel>
        </Form>
    )
}