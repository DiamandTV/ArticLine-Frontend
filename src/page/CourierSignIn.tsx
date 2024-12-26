import { UserInfoForm } from '../components/Forms/UserInfoForm'
import { AccountForm } from '../components/Forms/AccountForm'
import { AddressForm } from '../components/Forms/AddressForm'
import { StartView } from '../views/StartView'
import { StepperForm,StepperGetStepDataProps } from '../components/Stepper/Stepper'
import { AccountFields } from '../components/Forms/AccountForm'
import { AddressFields } from '../components/Forms/AddressForm'
import { UserInfoFields } from '../components/Forms/UserInfoForm'
import { useUserService } from '../services/userService'
import { Finish } from '../views/Finish'
import { useCourierService } from '../services/courierService'
//import { HighlightedTitle } from '../components/Texts/HighlightedTitle'

export type UserSigninStepperType = Array<UserInfoFields | AddressFields | AccountFields>
export function CourierSignIn(){ 
    /*
    useEffect(()=>{
        deleteJWT()
    })
    */
    const getStepData = (state:number):StepperGetStepDataProps=>{
        switch(state){
            case 0:
                return {
                component:<UserInfoForm/>,
                formsKeys:['first_name','last_name','username','date_of_birth']
            }
            case 1:
                return {
                    component:<AddressForm/>,
                    formsKeys:['address']
                }
            case 2:
                return {
                    component:<AccountForm/>,
                    formsKeys:['auth']
                }
            case 3:
                return {
                    component:(
                        <Finish
                            queryKey={['courier-sign']}
                            loader={{
                                message:{
                                    error:"SOMETHING WENT WRONG",
                                    success:"ACCOUNT CREATED"
                                },
                                redirect:({isSuccess}) => {
                                    return isSuccess;
                                },
                            }}
                            
                        />
                    ),
                    formsKeys:[]
                }
            default:
                // this is not used but i put this only for to be sure
                return  {
                    component:<div></div>,
                    formsKeys:[]
                }
        }
    }

    return (   
        <StartView>
            {/*<HighlightedTitle title='USER SIGN IN'/>*/}
            <StepperForm 
                maxStep={4}
                stepLabels={['COURIER INFO','COURIER ADDRESS','COURIER DETAILS',null]}
                getStepData={getStepData}
                onFinish={async (record)=>{
                    console.log("ON FINISH")
                    return await useCourierService.courierSignIn(
                        useUserService.serializeFromStepperData(record as [UserInfoFields, AddressFields, AccountFields])
                    ) 
                }}  
            />
        </StartView>
    )
}