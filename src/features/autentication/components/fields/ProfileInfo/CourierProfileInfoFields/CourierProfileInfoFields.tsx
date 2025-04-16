import { tailwindMerge } from "@lib/tsMerge/tsMerge";
//import { ProfileInfoFieldsProvider } from "../GenericProfileInfoFields/GenericProfileInfoFieldsProvider";
import { courierProfileInfoFieldsSchema, CourierProfileInfoFieldsType } from "@features/autentication/models/Profile/InfoFields/CourierProfileInfoFields/CourierProfileInfoFieldsType";
import { useFormContext } from "react-hook-form";
import { ImageInput } from "@components/inputs/ImageInput";
import { Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { FieldsProps } from "@features/autentication/models/Fields/FieldsProps";
import { FieldsProvider } from "@features/autentication/context/FieldsProvider/FieldsProvider";
import { FieldsProviderProps } from "@features/autentication/models/Fields/FieldsProviderProps";

export function CourierProfileInfoFieldsProvider(props:FieldsProviderProps<CourierProfileInfoFieldsType>){
    return(
        <FieldsProvider<CourierProfileInfoFieldsType> {...props} schema={courierProfileInfoFieldsSchema}>
            {props.children}
        </FieldsProvider>
    )
}

// interface CourierProfileInfoFieldsProps extends React.HTMLAttributes<HTMLElement>{
//     onChange?:()=>void
// }

export function CourierProfileInfoFields(props:FieldsProps){
    const className = tailwindMerge("w-full items-center justify-center gap-2 "+props.className)
    const {register,watch,formState:{errors},getValues,resetField} = useFormContext<CourierProfileInfoFieldsType>()
    console.log(errors)
    console.log(getValues('image'))
    return(
        <Form
            {...props}
            className={className}
            >
            <ImageInput
                className="w-full md:w-[400px]"
                image={watch('image')}
                onDelete={()=>{
                    resetField('image')
                }}
                isInvalid={!!errors.image}
                inputElement={
                    <Form.Control {...register('image')} isInvalid={!!errors.image} type="file" accept="image/*" hidden/>
                }
                errorElement={
                    <Form.Control.Feedback type="invalid">
                        {errors.image?.message}
                    </Form.Control.Feedback>
                }

            />
            <Row className="w-full gap-2" >
                <Col  className="p-0" xs={12} md={6}>
                    <FloatingLabel label="FIRST NAME">
                        <Form.Control type="text" {...register('first_name')} isInvalid={!!errors.first_name }/>
                        <Form.Control.Feedback type="invalid" >
                            {errors.first_name?.message}
                        </Form.Control.Feedback>
                    </FloatingLabel>
                </Col >

                <Col  className="p-0" >
                    <FloatingLabel label="SECOND NAME">
                        <Form.Control type="text" {...register('last_name')} isInvalid={!!errors.last_name}/>
                        <Form.Control.Feedback type="invalid">
                            {errors.last_name?.message}
                        </Form.Control.Feedback>
                    </FloatingLabel>
                </Col>
            </Row>

            <Row className="w-full gap-2" >
                <Col className="p-0" xs={12} md={6}>
                    <FloatingLabel label="USERNAME">
                        <Form.Control type="text" {...register('username')} isInvalid={!!errors.username}/>
                        <Form.Control.Feedback type="invalid">
                            {errors.username?.message}
                        </Form.Control.Feedback>
                    </FloatingLabel>
                </Col>

                <Col className="p-0">
                    <FloatingLabel label="DATE OF BIRTH">
                        <Form.Control type="date" {...register('birth_of_date')} isInvalid={!!errors.birth_of_date}/>
                        <Form.Control.Feedback type="invalid">
                            {errors.birth_of_date?.message}
                        </Form.Control.Feedback>
                    </FloatingLabel>
                </Col>
            </Row>

            <Row className="w-full">
                <Col as={Col} className="p-0" >
                    <FloatingLabel label="ADDRESS">
                        <Form.Control type="text" {...register('address')} isInvalid={!!errors.address}/>
                        <Form.Control.Feedback type="invalid">
                            {errors.address?.message}
                        </Form.Control.Feedback>
                    </FloatingLabel>
                </Col>            
            </Row>
        </Form>
    )
}
