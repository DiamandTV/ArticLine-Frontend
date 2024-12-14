import { useFormContext } from "react-hook-form"
import { AnimationPlaceholderInput } from "../AnimationPlaceholderInput"
import { FixedSizeDropdown } from "../Dropdown/FixedSizeDropdown"
import cityJson from "../../../assets/gi_db_comuni/json/gi_comuni_cap.json";
import provinceJson from "../../../assets/gi_db_comuni/json/gi_province.json";
import countryJson from "../../../assets/gi_db_comuni/json/gi_country.json";
import { useState } from "react";
export function AddressInput(){
    const [lastFocus,setLastFocus] = useState(false)
    const control = useFormContext()
    const {register,getValues,setValue,formState:{errors},setFocus,setError} = control
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
            province = dataObj?.denominazione_provincia as string
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
        // also need to focus the input which i'm gonna put the value dinamically
        // const newRecord = [...record]
        // newRecord[stepperIndex] = {
        //   ...getValues(),
        //   address:{
        //     province:province,
        //     city:city,
        //     postal_code:postal_code
        //   }
        // }
        setFocus('address.postal_code')
        setValue('address.postal_code',postal_code)
        //register('address.postal_code').onBlur?.({target:{value:postal_code,name:'address.postal_code'}})
    
        setFocus('address.province')
        setValue('address.province',province)
        //register('address.province').onBlur?.({target:{value:province,name:'address.province'}})
    
        setFocus('address.city')
        setValue('address.city',city)
        //register('address.city').onBlur?.({target:{value:city,namse:'address.city'}})
    
    
        return {province,city,postal_code}
      }
    

    
    return(
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
        onFocus={()=>{setLastFocus(true)}}
        onBlur={()=>{
          if(lastFocus){
            sinkAddress('POSTAL CODE',getValues('address.postal_code'))
            setLastFocus(false)
          }
        }}
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
    )
}