import { AnimationPlaceholderInput } from "../inputs/AnimationPlaceholderInput"
import { Dropdown } from "../inputs/Dropdown/Dropdown"
import { DropdownItem } from "../inputs/Dropdown/DropdownItems"
import cityJson from "../../assets/gi_db_comuni/json/gi_comuni_cap.json"
import provinceJson from "../../assets/gi_db_comuni/json/gi_province.json"
import countryJson from "../../assets/gi_db_comuni/json/gi_country.json"
import { FixedSizeDropdown } from "../inputs/Dropdown/FixedSizeDropDown"
import { v4 as uuidv4 } from 'uuid';
import { FixedSizeList } from "react-window"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const schema = z.object({
    'recipient_name':z.string(),
    'street':z.string(),
    'city':z.string(),
    'zip':z.string(),
    'province':z.string(),
    'country':z.string(),
})

type UserAddressFields = z.infer<typeof schema>

export function UserAddress(){
    const { register } = useForm<UserAddressFields>({
        resolver:zodResolver(schema)
    })
    return(
        <div className="w-full grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-y-8 gap-x-4 ">
            <AnimationPlaceholderInput
                labelName="RECIPIENT NAME"
                type="text"
                name="recipient_name"
                register={register('recipient_name')}
            />
            {/* Street with number*/}  
            <AnimationPlaceholderInput
                labelName="ADDRESS"
                type="text"
                name="street"
                register={register('street')}
            />
            <FixedSizeDropdown
                labelName="CITY"
                name="city"
                list={cityJson}
                showFunction={(item)=>{

                }}
                filterFunction={()=>{}}
                register={register('city')}
            />

            <FixedSizeDropdown
                labelName="PROVINCE"
                name="province"
                list={provinceJson}
                showFunction={(item:typeof cityJson)=>{

                }}
                filterFunction={()=>{}}
                register={register('province')}
            />
            <FixedSizeDropdown
                labelName="COUNTRY"
                name="country"
                list={countryJson}
                showFunction={(item:typeof cityJson)=>{

                }}
                filterFunction={()=>{}}
                register={register('province')}
            />            
            {
                /*
            <Dropdown
                labelName="CITY"
                name="city"
                value={userAddress.city}
                setValue={setValue}
            >
                {
                    city.length > 0 ? 
                    <FixedSizeList
                    className="scrollbar-hide"
                    innerElementType={'div'}
                    itemCount={city.length}
                    height={city.length > (128 / 40) ? 128 : (40*city.length)}
                    width={'100%'}
                    itemSize={40}
                    >
                    {({index,style})=>{
                        return (
                            <DropdownItem
                                key={uuidv4()}
                                style={style}
                                title={`${city[index].denominazione_ita}`}
                                onClick={
                                    ()=>{setValue('city',city[index].denominazione_ita)}
                                }
                            />
                        )
                    }}
                </FixedSizeList> : <div></div>
                }
            </Dropdown>
                
    */}
            <AnimationPlaceholderInput
                labelName="ZIP"
                type="text"
                name="street"
                maxLength={5}
                register={register('zip')}
            /> 
            {/*
            <Dropdown
                    labelName="PROVINCE"
                    name="province"
                    value={userAddress.province}
                    setValue={setValue}
                >
                    {province.map((province)=>
                        <DropdownItem
                            key={uuidv4()}
                            title={`${province.denominazione_provincia}`}
                            onClick={()=>{setValue('province',province.denominazione_provincia)}}
                        />
                    )}
            </Dropdown>       
            <Dropdown
                labelName="COUNTRY"
                name="country"
                value={userAddress.country}
                setValue={setValue}
            >
                 {
                    country.length > 0 ? 
                    <FixedSizeList
                    className="scrollbar-hide"
                    innerElementType={'div'}
                    itemCount={country.length}
                    height={country.length > (128 / 40) ? 128 : (40*country.length)}
                    width={'100%'}
                    itemSize={40}
                    >
                    {({index,style})=>{
                        return (
                            <DropdownItem
                                key={uuidv4()}
                                style={style}
                                title={`${country[index].name}`}
                                onClick={()=>{setValue('country',country[index].name)}}
                            />
                        )
                    }}
                </FixedSizeList> : <div></div>
                }
            </Dropdown>
            */}
        </div>
    )
}