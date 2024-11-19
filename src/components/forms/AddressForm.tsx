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
  recipient_name: z.string().min(1).max(255),
  street: z.string().min(1).max(255),
  city: z.string().min(1).max(255),
  zip: z.string().length(5),
  province: z.string().min(1).max(255),
  country: z.string().min(1).max(255),
});

type AddressFields = z.infer<typeof schema>;

export function AddressForm() {
  const formRef = useRef<HTMLFormElement | null>(null)
  const {stepper:{state,setState,maxStep},record:{record,setRecord}} = useContext(StepperContext)
  const { register, getValues, setValue,formState:{errors},handleSubmit } = useForm<AddressFields>({
    defaultValues:record[state],
    resolver: zodResolver(schema),
  });
  console.log(record)
  const handleFilter = (
    value: string,
    data: Array<Record<string, string>>,
    key: string,
  ) => {
    const regex = new RegExp(value, "i");
    if (value.trim() === "") return data;
    return data.filter((item) => `${item[key]}`.match(regex));
  };
  

  const onSubmit : SubmitHandler<AddressFields> = (address)=>{
    console.log(address)
    
    // the form has been validated, so go to the next step
    if(state == maxStep){
      // to the onFinish function
    } else if(state < maxStep - 1){
      setState(state+1)
      const newRecord = {...record,[state]:address}
      setRecord(newRecord)
    }
  }
  console.log(errors)
  return (
    <form 
      ref={formRef}
      className="w-full"
      onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-y-8 gap-x-4  pb-8" >
        <AnimationPlaceholderInput
          labelName="RECIPIENT NAME"
          type="text"
          name="recipient_name"
          defaultValue={getValues('recipient_name')}
          register={register("recipient_name")}
          error={errors.recipient_name}
        />

        <AnimationPlaceholderInput
          labelName="ADDRESS"
          type="text"
          name="street"
          defaultValue={getValues('street')}
          register={register("street")}
          error={errors.street}
        />

        <FixedSizeDropdown
          labelName="CITY"
          name="city"
          list={cityJson}
          defaultValue={getValues('city')}
          showFunction={(item) => (item as typeof cityJson[0]).denominazione_ita}
          setValue={(value) => setValue("city", value)}
          filterFunction={() => handleFilter(getValues("city"), cityJson, "denominazione_ita")}
          register={register("city")}
          error={errors.city}
        />
        <AnimationPlaceholderInput
        labelName="ZIP"
        type="text"
        name="zip"
        maxLength={5}
        defaultValue={getValues('zip')}
        register={register("zip")}
        error={errors.zip}
      />  
        <FixedSizeDropdown
          labelName="PROVINCE"
          name="province"
          list={provinceJson}
          defaultValue={getValues('province')}
          showFunction={(item) => (item as typeof provinceJson[0]).denominazione_provincia}
          setValue={(value) => setValue("province", value)}
          filterFunction={() =>
            handleFilter(getValues("province"), provinceJson, "denominazione_provincia")
          }
          register={register("province")}
          error={errors.province}
        />

        <FixedSizeDropdown
          labelName="COUNTRY"
          name="country"
          list={countryJson}
          defaultValue={getValues('country')}
          showFunction={(item) => (item as typeof countryJson[0]).name}
          setValue={(value) => setValue("country", value)}
          filterFunction={() => handleFilter(getValues("country"), countryJson, "name")}
          register={register("country")}
          error={errors.country}
        />
      </div>
      <StepperButtons
        onNextClick={()=>formRef.current!.requestSubmit()}
        onPreviousClick={()=>state > 0 ? setState(state-1) : null}
      />
    </form>
  );
}