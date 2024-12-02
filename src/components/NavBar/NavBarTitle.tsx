import Title from '../../assets/images/Title.png'
//import { Iconbutton } from '../../components/buttons/Iconbutton';
import { PiUserLight } from "react-icons/pi";
import { SearchBar } from '../SearchBar/SearchBar';
import { FaHeart } from "react-icons/fa6";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
export function NavBarTitle(){
    return (
        <div className='w-full grid grid-cols-4 justify-between items-center p-2 ' >
            
            <div className='w-40 relative top-1'>
                <img src={Title} alt="" />
            </div>
            <div className='w-full col-span-2'>
                <SearchBar
                placeholder='SEARCH...'
                />
            </div>
            <div className='w-full flex flex-row justify-end items-end gap-x-2'>
                <div className='max-w-max p-3 rounded-xl justify-self-end hover:cursor-pointer border-2 border-gray-700'>
                    <IoMdNotificationsOutline
                        size={30}
                        color='white'
                    />
                </div>
                <div className='max-w-max p-3 rounded-xl justify-self-end hover:cursor-pointer border-2 border-gray-700'>
                    <CiHeart
                        size={30}
                        color='white'
                    />
                </div>
            </div>   
        </div>
    )
}