import Title from '../../assets/images/Title.png'
//import { Iconbutton } from '../../components/buttons/Iconbutton';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { CiHeart } from "react-icons/ci";
import { NotificationButtonWithBadge } from '../../components/buttons/NotificationButton';
import { PopupProvider } from '../../components/Popup/PopupProvider';
import { PopupApp } from '../../components/Popup/Popup';
import { NotificationQuery } from '../../components/Notifications/NotificationQuery';
import { NotificationList } from '../../components/Notifications/NotificationList';
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
                <PopupProvider>
                    <NotificationButtonWithBadge/>
                    <NotificationQuery>
                        <PopupApp>
                            <NotificationList/>
                        </PopupApp>
                    </NotificationQuery>
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
