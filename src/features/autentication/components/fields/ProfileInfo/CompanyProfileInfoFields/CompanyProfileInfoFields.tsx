import { companyInfoFieldsSchema, CompanyProfileInfoFieldsType } from "@features/autentication/models/Profile/InfoFields/CompanyProfileInfoFields/CompanyProfileInfoFieldsType";
import { tailwindMerge } from "@lib/tsMerge/tsMerge";
import { useFormContext } from "react-hook-form";
import { Col, FloatingLabel, Form, FormControl, Row } from "react-bootstrap";
import { ImageInput } from "@components/inputs/ImageInput";
import { FieldsProps } from "@features/autentication/models/Fields/FieldsProps";
import { FieldsProvider } from "@features/autentication/context/FieldsProvider/FieldsProvider";
import { FieldsProviderProps } from "@features/autentication/models/Fields/FieldsProviderProps";
import { AddressInput } from "@components/inputs/AddressInput";

export function CompanyProfileInfoFieldsProvider(props:FieldsProviderProps<CompanyProfileInfoFieldsType>){
    return(
        <FieldsProvider<CompanyProfileInfoFieldsType> {...props} schema={companyInfoFieldsSchema}>
            {props.children}
        </FieldsProvider>
    )
}
// interface CompanyProfileInfoFieldsProps extends React.HTMLAttributes<HTMLElement>{
//     onChange?:()=>void
// }

export function CompanyProfileInfoFields(props:FieldsProps){
    const className = tailwindMerge("w-full items-center justify-center gap-2 "+props.className)
    const {register,watch,formState:{errors},resetField} = useFormContext<CompanyProfileInfoFieldsType>()
    console.log(errors)
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
                    <FormControl.Feedback type="invalid">
                        {errors.image?.message}
                    </FormControl.Feedback>
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
                    <FloatingLabel label="COMPANY NAME">
                        <Form.Control type="text" {...register('company_name')} isInvalid={!!errors.company_name}/>
                        <Form.Control.Feedback type="invalid">
                            {errors.company_name?.message}
                        </Form.Control.Feedback>
                    </FloatingLabel>
                </Col>

                <Col className="p-0">
                    <FloatingLabel label="DATE OF FOUNDATION">
                        <Form.Control type="date" {...register('date_of_foundation')} isInvalid={!!errors.date_of_foundation}/>
                        <Form.Control.Feedback type="invalid">
                            {errors.date_of_foundation?.message}
                        </Form.Control.Feedback>
                    </FloatingLabel>
                </Col>
            </Row>

           <Row className="w-full">
                <Col as={Col} className="p-0" >
                    <AddressInput
                        label="ADDRESS"
                        inputElement={
                            <Form.Control type="text" {...register('address.full_address')} isInvalid={!!errors.address}/>
                        }
                        errorElement={
                            <Form.Control.Feedback type="invalid">
                                {errors.address?.full_address?.message }
                            </Form.Control.Feedback>
                        }
                    />
        
                </Col>            
            </Row>
        </Form>
    )    

}