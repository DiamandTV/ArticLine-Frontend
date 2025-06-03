import { useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router";
import { ProfilePage } from "./ProfilePage";
import { EntityAddressPage } from "./EntityAddressPage";
import { AuthPage } from "./AuthPage";

type AccountTabParamType = 'profile' | 'address' | 'security'
const accountTabParams:Array<AccountTabParamType> = ['profile','address','security']
export function AccountPage(){
  const {tab} = useParams()
  const navigator = useNavigate()
  
  useEffect(()=>{
    if (!tab) {
      navigator(`/account/profile/`)
      return
    }
    if(accountTabParams.includes(tab as AccountTabParamType)){
      navigator(`/account/${tab}/`)
    } else {
        // redirect to 404
    }
  },[tab])

  return(
      <Outlet/>
  )
}


const tabClasses = (active: boolean) =>
  `px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300 
   ${active 
      ? 'bg-blue-600 text-white shadow-md' 
      //? 'bg-primary-a40 text-white shadow-md' 
      : 'bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700'}`;


const AccountTabMapParamPage:Record<AccountTabParamType,React.ReactNode> = {
  'profile':<ProfilePage/>,
  'address':<EntityAddressPage/>,
  'security':<AuthPage/>
}
export function InternAccountPage(){
    const { tab } = useParams()
    const navigator = useNavigate()

    
    const navigateTo = (to:AccountTabParamType)=>{
       if(to && accountTabParams.includes(to)){
          navigator(`/account/${to}/`)
       }
      
    }

    if(!tab || !accountTabParams.includes(tab as AccountTabParamType)) {
      // todo: redirect to 404 page
      return null
    }

    return(
        <div className="h-full mx-mb-df my-mb-df">
          <div className="flex flex-row flex-wrap justify-center gap-2 mb-6 ">
              {(['profile','address','security'] as AccountTabParamType[]).map((key) => (
                <button
                  key={key}
                  onClick={() => navigateTo(key)}
                  className={tabClasses(tab  === key)}
                >
                  {{
                    profile:'Profile',
                    address:'Entity Address',
                    security:'Security'
                  }[key]}
                </button>
              ))}
            </div>
            
            {
              AccountTabMapParamPage[tab as AccountTabParamType]
            }           
        </div>
    )
}