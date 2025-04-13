import { ImageInput } from "@components/inputs/ImageInput";
import { ProfileInfoFieldsType } from "@features/autentication/models/ProfileInfoFields/ProfileInfoFieldsType";
import { tailwindMerge } from "@lib/tsMerge/tsMerge";
//import { tailwindMerge } from "@lib/tsMerge/tsMerge";
import {  Col, FloatingLabel, Form, FormControl, Row, } from "react-bootstrap";
import { useFormContext } from "react-hook-form";

interface ProfileInfoFieldsProps extends React.HTMLAttributes<HTMLElement>{
    onChange?:()=>void,
}

// export function ProfileInfoFields(props:ProfileInfoFieldsProps){
//     const className = tailwindMerge("w-full grid grid-col-1 items-center justify-center gap-2 "+props.className)
//     return(
//         <Form 
//             {...props}    
//             className={"w-full grid grid items-center justify-center gap-2"}
            
//             >
//             <ImageInput/>
//             <Form.Group className="w-full pl-0">
//                 <FloatingLabel label="FIRST NAME">
//                     <Form.Control type="text" />
//                 </FloatingLabel>
//             </Form.Group >

//             <Form.Group className="w-full pr-0">
//                 <FloatingLabel label="SECOND NAME">
//                     <Form.Control type="text"/>
//                 </FloatingLabel>
//             </Form.Group >
    
//             <Form.Group className="w-full pl-0">
//                 <FloatingLabel label="USERNAME NAME">
//                     <Form.Control type="text"/>
//                 </FloatingLabel>
//             </Form.Group>

//             <Form.Group className="w-full pr-0">
//                 <FloatingLabel label="DATE OF BIRTH">
//                     <Form.Control type="date"/>
//                 </FloatingLabel>
//             </Form.Group>
        
//             <Form.Group className="w-full" >
//                 <FloatingLabel label="DATE OF BIRTH">
//                     <Form.Control type="text"/>
//                 </FloatingLabel>
//             </Form.Group>            
//         </Form>
//     )
// }


export function ProfileInfoFields(props:ProfileInfoFieldsProps){
    const className = tailwindMerge("w-full items-center justify-center gap-2 "+props.className)
    const {register,watch,formState:{errors},getValues,resetField} = useFormContext<ProfileInfoFieldsType>()
    console.log(errors)
    console.log(getValues())
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
                    <FloatingLabel label="USERNAME NAME">
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
