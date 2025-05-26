import { ModalContext } from "@context/Modal/ModalContext";
import { ModalProvider } from "@context/Modal/ModalProvider";
import classNames from "classnames";
import { useRef } from "react";
import { FloatingLabel, Form, Modal } from "react-bootstrap";
import Datetime from 'react-datetime';
import { Controller, useFormContext } from "react-hook-form";

interface DateTimeProps{
    id:string,
    label:string
}
export function DateTimeInput({id,label}:DateTimeProps){
    const ref = useRef(null)
     const {
        control,
        formState: { errors },
      } = useFormContext();
      const errorMessage = errors?.[id]?.message as string | undefined;
      console.log(errors)
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
                                  <div className="w-full datetime-custom-articline">
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
                                        {errorMessage}
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
