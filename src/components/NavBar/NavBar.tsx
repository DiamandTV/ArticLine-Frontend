import { NavBarLogo } from "./NavBarLogo"
import { NavBarTitle } from "./NavBarTitle"
import { NavBarTitleOnly } from "./NavBarTitleOnly"
import { NavBarType } from "./NavBarTypes"

export interface NavBarProps{
    type:NavBarType
}
export function NavBar({type=NavBarType.TITLE_AND_LOGO}:NavBarProps){
    switch (type){
        case NavBarType.ONLY_TITLE:
            return <NavBarTitle/>
        case NavBarType.TITLE_AND_LOGO:
            return <NavBarLogo/>
        case NavBarType.ONLY_TITLE_IN_LINE:
            return <NavBarTitleOnly/>
        default: return <div></div>
    }
}