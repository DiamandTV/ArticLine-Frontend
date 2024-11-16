import { AnimationPlaceholderInput } from "../inputs/AnimationPlaceholderInput";
import cityJson from "../../assets/gi_db_comuni/json/gi_comuni_cap.json";
import provinceJson from "../../assets/gi_db_comuni/json/gi_province.json";
import countryJson from "../../assets/gi_db_comuni/json/gi_country.json";
import { FixedSizeDropdown } from "../inputs/Dropdown/FixedSizeDropdown";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  recipient_name: z.string(),
  street: z.string().min(5),
  city: z.string(),
  zip: z.string(),
  province: z.string(),
  country: z.string(),
});

type UserAddressFields = z.infer<typeof schema>;

export function UserAddress() {
  const { register, getValues, setValue,formState:{errors},handleSubmit } = useForm<UserAddressFields>({
    resolver: zodResolver(schema),
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
  

  const onSubmit : SubmitHandler<UserAddressFields> = (userInfo)=>{
    console.log(userInfo)
}

  return (
    <form className="w-full grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-y-8 gap-x-4" onSubmit={handleSubmit(onSubmit)}>
      <AnimationPlaceholderInput
        labelName="RECIPIENT NAME"
        type="text"
        name="recipient_name"
        register={register("recipient_name")}
        error={errors.recipient_name}
      />

      <AnimationPlaceholderInput
        labelName="ADDRESS"
        type="text"
        name="street"
        register={register("street")}
        error={errors.street}
      />

      <FixedSizeDropdown
        labelName="CITY"
        name="city"
        list={cityJson}
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
      register={register("zip")}
      error={errors.zip}
    />  
      <FixedSizeDropdown
        labelName="PROVINCE"
        name="province"
        list={provinceJson}
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
        showFunction={(item) => (item as typeof countryJson[0]).name}
        setValue={(value) => setValue("country", value)}
        filterFunction={() => handleFilter(getValues("country"), countryJson, "name")}
        register={register("country")}
        error={errors.country}
      />

        <button>click</button>
    </form>
  );
}