import { useState } from "react"
import { AnimationPlaceholderInput } from "../inputs/AnimationPlaceholderInput"
import { Dropdown } from "../inputs/Dropdown/Dropdown"
import { DropdownItem } from "../inputs/Dropdown/DropdownItems"
import cityJson from "../../assets/gi_db_comuni/json/gi_comuni_cap.json"
import provinceJson from "../../assets/gi_db_comuni/json/gi_province.json"
import countryJson from "../../assets/gi_db_comuni/json/gi_country.json"
import { v4 as uuidv4 } from 'uuid';
import { FixedSizeList } from "react-window"
export function UserAddress(){
    const [city,setCity] = useState(cityJson)
    const [province,setProvince] = useState(provinceJson)
    const [country,setCountry] = useState(countryJson)
    const [userAddress,setUser] = useState({
        'recipient_name':'',
        'street':'',
        'city':'',
        'province':'',
        'postal_code':'',
        'country':''
    })
    // Function triggered when a value of the input changess
    const setValue = (name:string,value:string)=>{
   
        const regex = new RegExp(value,'i')
        switch (name){
            case 'city':
                // filter only the city names with has the value string in them
                if(value.replace(/\s\s+/g, ' ') == '') setCity(cityJson)
                    else {
                        setCity(cityJson.filter((city)=>{
                            const title = `${city.denominazione_ita} - (${city.sigla_provincia})`   
                            return title.match(regex) 
                        })) 
                    }
                break;
            case 'province':
                if(value.replace(/\s\s+/g, ' ') == '') setProvince(provinceJson)
                else {
                    setProvince(provinceJson.filter((province)=>{
                        const title = `${province.denominazione_provincia} - (${province.sigla_provincia})`
                        return title.match(regex)
                }))
            }
                break;
            case 'country':
                if (value.replace(/\s\s+/g, ' ') == '') setCountry(countryJson)
                else {
                    setCountry(countryJson.filter((country)=>{
                        const title = `${country.name}`
                        return title.match(regex)
                    }))
                }
                break;
            
        }


        setUser((oldUserInfo)=>{
            return {...oldUserInfo,[name]:value}
        })
    }
    

    return(
        <div className="w-full grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-y-8 gap-x-4 ">
            <AnimationPlaceholderInput
                labelName="RECIPIENT NAME"
                type="text"
                name="recipient_name"
                value={userAddress.recipient_name}
                setValue={setValue}
            />
            {/* Street with number*/}  
            <AnimationPlaceholderInput
                labelName="ADDRESS"
                type="text"
                name="street"
                value={userAddress.street}
                setValue={setValue}
            />
            
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
                
            
            <AnimationPlaceholderInput
                labelName="ZIP"
                type="text"
                name="street"
                maxLength={5}
                value={userAddress.street}
                setValue={setValue}
            />  
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
        </div>
    )
}