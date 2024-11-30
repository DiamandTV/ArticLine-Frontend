import Title from '../../assets/images/Title.png'
//import { Iconbutton } from '../../components/buttons/Iconbutton';
import { PiUserLight } from "react-icons/pi";



export function NavBarTitle(){
    return (
        <div className='w-full flex flex-row justify-between items-center p-2 bg-transparent'>
            <div className='w-full flex flex-row gap-x-2 justify-center items-center' >
                <div className='w-40 relative top-1'>
                    <img src={Title} alt="" />
                </div>
            </div>
            <div className='max-w-max p-3 rounded-xl justify-self-end bg-slate-200 bg-opacity-30 backdrop-blur-lg'>
                <PiUserLight
                    size={30}
                    color='white'
                />
            </div>   
        </div>
    )
}