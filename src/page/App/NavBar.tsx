import Logo from '../../assets/images/NoBG_Complete.png'
//import { Iconbutton } from '../../components/buttons/Iconbutton';
import { PiUserLight } from "react-icons/pi";
export function NavBar(){
    return (
        <div className='w-full grid grid-cols-1 justify-evenly items-center p-2 bg-transparent'>
            <div className='max-w-max p-3  rounded-xl justify-self-end bg-slate-200 bg-opacity-30 backdrop-blur-lg'>
                <PiUserLight
                    size={30}
                    color='white'
                />
            </div>
    
            
        </div>
    )
}