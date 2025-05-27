import { Form } from "react-bootstrap";
import { Controller, useFormContext } from "react-hook-form"
import { AsyncPaginate, } from "react-select-async-paginate";
import { createSearchParams } from "react-router";
import { deviceServices } from "@features/device/services/deviceServices";
import { PaginationInterface } from "@models/ApiResponse/PaginationResponse/PaginationInterface";
import { DeviceInterface } from "@features/device/model/Device/Interface/DeviceInterface";
import classNames from "classnames";
import { GroupBase, OptionsOrGroups } from "react-select";
const TIMEOUT_INPUT_QUERY = 1000
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

  const errorMessage = errors?.[id]?.message as string | undefined;

  const loadOptions = async (inputValue:string,
    loadedOptions:OptionsOrGroups<DeviceInterface,GroupBase<DeviceInterface>>,
    options?:{page:number})=>{
      if(!options) {
        return{
          options:[],
          hasMore:false,
          additional:{
            page:1
          }
        }
      }
      const page = options.page
      const response = await deviceServices.list(Number(page),createSearchParams({search:inputValue}))
      console.log(response)
      const data:PaginationInterface = response.data
      return{
        options:data.results as DeviceInterface[],
        hasMore:data.current_page_number < data.number_of_pages,
        additional:{
          page:data.current_page_number + 1 
        }
      }
  }

  return (
    <div className="form-floating">
      <Controller
        control={control}
        name={id}
        render={({ field }) => (
          <AsyncPaginate
            {...field}
            debounceTimeout={TIMEOUT_INPUT_QUERY}
            inputId={id}
            loadOptions={loadOptions}
            getOptionValue={(option)=>option.id.toString()}
            getOptionLabel={(option)=>option.name}
            additional={{
              page:1
            }}
            reloadOnErrorTimeout={TIMEOUT_INPUT_QUERY*10}
            isSearchable
            className={classNames("react-select", { "is-invalid": errorMessage })}
            classNamePrefix="react-select"
            captureMenuScroll
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