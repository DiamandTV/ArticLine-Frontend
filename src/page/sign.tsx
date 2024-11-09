import Logo from '../assets/images/NoBG.png'
import { Stepper } from '../components/Stepper' 
import { BlurCard } from '../components/cards/BlurCard'
import { UserInfo } from '../components/signSteps/UserInfo'
import { UserAddress } from '../components/signSteps/UserAddress'
export function SignIn(){
    const getStep = (state:number)=>{
        switch(state){
            case 0:
                return <UserInfo/>
            case 1:
                return <UserAddress/>
            default:
                return <div/>
        }
    }
    return (   
    <div className="bg-slate-900 w-screen h-screen flex flex-col items-center justify-center px-6"> 
        <div className='w-52 h-52 md:w-64 md:h-64 lg:w-80 lg:h-80'>
            <img src={Logo} alt="" />
        </div>
                
            <BlurCard className='max-w-3xl'>
                <div className='w-full py-2'>
                    <Stepper 
                        maxStep={3}
                        getStep={getStep}
                    />
                </div>
            </BlurCard>
       
    </div>
    )
}