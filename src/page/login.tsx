import Logo from '../assets/images/NoBG.png'
import { BlurCard } from "../components/cards/BlurCard";
import { UserLogin } from '../components/loginSteps/UserLogin';
export function LogIn(){
    
    return (   
        <div className="bg-slate-900 w-screen h-full min-h-screen flex flex-col items-center justify-center px-6"> 
            <div className='w-52 h-52 md:w-64 md:h-64 lg:w-80 lg:h-80'>
                <img src={Logo} alt="" />
            </div>
                <BlurCard className='max-w-3xl transition-all duration-300 bg-slate-300'>
                    <div className='w-full py-2'>
                        <UserLogin/>
                    </div>
                </BlurCard>
        </div>
        )
}