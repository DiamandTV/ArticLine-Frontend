import { AnimationPlaceholderInput } from "../inputs/AnimationPlaceholderInput";
import cityJson from "../../assets/gi_db_comuni/json/gi_comuni_cap.json";
import provinceJson from "../../assets/gi_db_comuni/json/gi_province.json";
import countryJson from "../../assets/gi_db_comuni/json/gi_country.json";
import { FixedSizeDropdown } from "../inputs/Dropdown/FixedSizeDropdown";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { StepperButtons } from "../stepper/StepperButtons";
import { useContext, useRef } from "react";
import { StepperContext } from "../stepper/StepperContext";

const schema = z.object({
  address:z.object({
    /*
    recipient_name: z.string().min(1).max(255),
    street: z.string().min(1).max(255),
    city: z.string().min(1).max(255),
    postal_code: z.string(),
    province: z.string().min(1).max(255),
    country: z.string().min(1).max(255),
    */
    recipient_name: z.string(),
    street: z.string(),
    city: z.string(),
    postal_code: z.string(),
    province: z.string(),
    country: z.string(),
  })
});

export type AddressFields = z.infer<typeof schema>;

export function AddressForm() {
  
  const formRef = useRef<HTMLFormElement | null>(null)
  const {stepper:{state,setState,maxStep,onFinish},record:{record,setRecord},error:{errorStepper,setErrorStepper}} = useContext(StepperContext)
  const { register, getValues, setValue,formState:{errors},handleSubmit } = useForm<AddressFields>({
    defaultValues:record[state],
    resolver: zodResolver(schema),
    errors:errorStepper
  });

  const handleFilter = (
    value: string,
    data: Array<Record<string, string>>,
    key: string,
  ) => {
    const regex = new RegExp(value, "i");
    if (value.trim() === "") return data;
    return data.filter((item) => `${item[key]}`.match(regex));
  };
  // sincronize the province,city,postal code with one of the value
  const sinkAddress = (action:string,value:string)=>{
    let province:string = "";
    let city:string = "";
    let postal_code:string = "";
    let dataObj;
    switch(action){
      case "CITY":
        city = value
        dataObj = cityJson.find((data)=>data.denominazione_ita === value)
        postal_code = dataObj?.cap as string
        province = dataObj?.denominazione_provincia
        break
      case "POSTAL CODE":
        dataObj = cityJson.find((data)=>data.cap === value)
        console.log(dataObj)
        city = dataObj?.denominazione_ita as string
        province = dataObj?.denominazione_provincia as string
        postal_code = value
        break;
      default:
        throw new Error("This action is not allowed")
    }
    setValue('address.province',province)
    setValue('address.city',city)
    setValue('address.postal_code',postal_code)
    return {province,city,postal_code}
  }

  const onSubmit : SubmitHandler<AddressFields> = async (address)=>{
    console.log(address)
    
    // the form has been validated, so go to the next step
    if(state == maxStep){
      // to the onFinish function
      
      setErrorStepper(await onFinish(record))
    } else if(state < maxStep - 1){
      setState(state+1)
      const newRecord = record
      newRecord[state] = address

      setRecord(newRecord)
    }
  }
  
  return (
    <form 
      ref={formRef}
      className="w-full"
      onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-y-8 gap-x-4  pb-8" >
        <AnimationPlaceholderInput
          labelName="RECIPIENT NAME"
          type="text"
          name="address.recipient_name"
          defaultValue={getValues('address.recipient_name')}
          register={register("address.recipient_name")}
          error={errors.address?.recipient_name}
        />

        <AnimationPlaceholderInput
          labelName="ADDRESS"
          type="text"
          name="address.street"
          defaultValue={getValues('address.street')}
          register={register("address.street")}
          error={errors.address?.street}
        />

        <FixedSizeDropdown
          labelName="CITY"
          name="address.city"
          list={cityJson}
          defaultValue={getValues('address.city')}
          showFunction={(item) => (item as typeof cityJson[0]).denominazione_ita}
          setValue={(value) => setValue("address.city", value)}
          filterFunction={() => handleFilter(getValues("address.city"), cityJson, "denominazione_ita")}
          register={register("address.city")}
          error={errors.address?.city}
          onItemClick={()=>sinkAddress('CITY',getValues('address.city'))}
        />
        <AnimationPlaceholderInput
        labelName="ZIP"
        type="text"
        name="address.postal_code"
        
        defaultValue={getValues('address.postal_code')}
        register={register("address.postal_code")}
        error={errors.address?.postal_code}
        onBlur={()=>sinkAddress('POSTAL CODE',getValues('address.postal_code'))}
      />  
        <FixedSizeDropdown
          labelName="PROVINCE"
          name="address.province"
          list={provinceJson}
          defaultValue={getValues('address.province')}
          showFunction={(item) => (item as typeof provinceJson[0]).denominazione_provincia}
          setValue={(value) => setValue("address.province", value)}
          filterFunction={() =>
            handleFilter(getValues("address.province"), provinceJson, "denominazione_provincia")
          }
          register={register("address.province")}
          error={errors.address?.province}
        />

        <FixedSizeDropdown
          labelName="COUNTRY"
          name="address.country"
          list={countryJson}
          defaultValue={getValues('address.country')}
          showFunction={(item) => (item as typeof countryJson[0]).name}
          setValue={(value) => setValue("address.country", value)}
          filterFunction={() => handleFilter(getValues("address.country"), countryJson, "name")}
          register={register("address.country")}
          error={errors.address?.country}
          
        />
      </div>
      <StepperButtons
        onNextClick={()=>formRef.current!.requestSubmit()}
        onPreviousClick={()=>state > 0 ? setState(state-1) : null}
      />
    </form>
  );
}