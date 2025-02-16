import Title from '../../assets/images/Title.png'
//import { Iconbutton } from '../../components/buttons/Iconbutton';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { CiHeart } from "react-icons/ci";
import { NotificationButtonWithBadge } from '../../components/buttons/NotificationButton';
import { PopupProvider } from '../../components/Popup/PopupProvider';
import { PopupApp } from '../../components/Popup/Popup';
import { NotificationList } from '../../components/Notifications/NotificationList';
import { RxHamburgerMenu } from "react-icons/rx";
import { SIDEBAR_ICON_SIZE } from '../../constraints';
import { useContext } from 'react';
import { SiderBarContext } from '../SideBar/context/SiderBarContext';

export function NavBarTitle(){
    const {open,setOpen} = useContext(SiderBarContext)
    return (
        <div className='w-full grid grid-cols-1 lg:grid-cols-4 gap-y-4 justify-between items-center p-2 ' >
            <div className='w-40 relative top-1'>
                <img src={Title} alt="" />
            </div>
            <div className='w-full order-last lg:order-none  col-span-2 flex flex-row justify-center items-center gap-x-4'>
                <RxHamburgerMenu size={SIDEBAR_ICON_SIZE} className='sm:hidden' onClick={()=>{
                    setOpen(!open)
                }}/>
                
                <SearchBar
                    placeholder='SEARCH...'
                    className='w-full mx-0'
                />
                
                
            </div>
            <div className='w-full flex flex-row justify-end items-end gap-x-2'>
                <PopupProvider>
                    <NotificationButtonWithBadge/>
                        <PopupApp>
                            <NotificationList/>
                        </PopupApp>
                </PopupProvider>
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
