import { FloatingLabel, Form, Modal } from "react-bootstrap"
import { Controller, useFormContext } from "react-hook-form"
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import classNames from "classnames";
import { useRef } from "react";
import { ModalContext } from "@context/Modal/ModalContext";
import { ModalProvider } from "@context/Modal/ModalProvider";
interface DeliveryTimeInputProps{
    id:string,
    label:string
}
// export function DeliveryTimeInput(){
//     const {register,formState:{errors}} = useFormContext()
//     return(
//         <FloatingLabel label="Date">
//             <Datetime className="h-[58px]"/>
//             <Form.Control.Feedback type="invalid">
                
//             </Form.Control.Feedback>

//         </FloatingLabel>   
//     )
// }

export function DeliveryTimeInput({id,label}:DeliveryTimeInputProps){
    const ref = useRef(null)
     const {
        control,
        formState: { errors },
      } = useFormContext();
    
      const errorMessage = errors?.[id]?.message as string | undefined;
    
      return (
        <div ref={ref}>
          <Controller
            control={control}
            name={id}
            render={({ field }) => (
              <ModalProvider>
                <Datetime
               
                  {...field}
                  renderView={(mode,renderDefault)=>{
                    console.log(renderDefault)
                    return(
                      <div className="w-0 h-0 p-0 m-0 overflow-hidden">
                        <ModalContext.Consumer>
                          {
                            ({isOpen,setOpen})=>{
                              return(
                                <Modal 
                                  show={isOpen}
                                  onHide={()=>setOpen(false)} 
                                  container={ref} 
                                  centered
                                  >
                                  <div className="w-full">
                                    {renderDefault()}
                                  </div>
                                </Modal>
                              )
                            }
                          }
                        </ModalContext.Consumer>
                      </div>
                    )
                  }}
                  
                
                  className={classNames("", { "is-invalid": errorMessage })}
                  renderInput={(props)=>{
                    console.log(props)
                      return(
                        <ModalContext.Consumer>
                          {
                            ({isOpen,setOpen})=>{
                         
                              return(
                                <FloatingLabel label={label}>
                                    <Form.Control {...props} onClick={(e)=>{
                                      setOpen(!isOpen)        
                                      props.onClick(e)
                                      }}  
                                    type="text" readOnly isInvalid={!!errorMessage}/>
                                    <Form.Control.Feedback type="invalid">
                                        errorMessage
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                              )
                            }
                          }
                        </ModalContext.Consumer>
                      )
                  }}
                />
              </ModalProvider>
            )}
          />
          
        </div>
         
      );
}

