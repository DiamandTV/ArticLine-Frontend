import { Form } from "react-bootstrap";
import { Controller, useFormContext } from "react-hook-form"
import Select from "react-select";
import classNames from "classnames";
import { useGetDeviceListQuery } from "@features/device/hooks/useGetDeviceListQuery/useGetDeviceListQuery";
import { createSearchParams } from "react-router";
import { useRef, useState } from "react";

interface DeviceSelectProps{
    id:string,
    label:string
}
export function DeviceSelect({id,label}:DeviceSelectProps){
    // todo : set a timer to wait user stop writing before doing the server serach
    const {
        control,
        formState:{errors},
    } = useFormContext()

    const [inputText,setInputText] = useState<string>('')
    const timer = useRef(null)

    const errorMessage = errors?.[id]?.message as string | undefined;
    
    const {
        data: devices,
        isLoading,
        isSuccess,
      } = useGetDeviceListQuery({
        params:createSearchParams({
            search:inputText
        })
    });
    
    if (isLoading || !isSuccess) return null;
    
      const formattedCategories = devices.map((device) => ({
        value: device.id,
        label: device.name,
      }));
    
      return (
        <div className="form-floating">
          <Controller
            control={control}
            name={id}
            render={({ field }) => (
              <Select
                {...field}
                inputId={id}
                options={formattedCategories}
                inputValue={inputText}
                onInputChange={(value,actionMeta)=>{
                    if(actionMeta.action == 'input-change'){
                        setInputText(value)
                    }
                }}
                isSearchable
                className={classNames("react-select", { "is-invalid": errorMessage })}
                classNamePrefix="react-select"
                styles={{
                  control: (base, state) => ({
                    ...base,
                    borderColor: errorMessage
                      ? "#dc3545"
                      : state.isFocused
                      ? "#86b7fe"
                      : "#ced4da",
                    boxShadow: state.isFocused
                      ? "0 0 0 0.25rem rgba(13, 110, 253, 0.25)"
                      : undefined,
                    minHeight: "3.5rem", // importante per l'altezza flottante
                    paddingTop: "1.5rem", // spazio per il label
                  }),
                //   valueContainer: (base) => ({
                //     ...base,
                //     paddingTop: "0rem",
                //   }),
                  menu:(base)=>({
                    ...base,
                    zIndex:'20'
                  })
                }}
              />
            )}
          />
          <label htmlFor={id} className="py-2 text-[13px] font-normal ">{label}</label>
          {errorMessage && (
            <Form.Control.Feedback type="invalid" className="d-block">
              {errorMessage}
            </Form.Control.Feedback>
          )}
        </div>
      );
}