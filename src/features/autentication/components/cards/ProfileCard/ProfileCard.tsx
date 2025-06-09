import { Profile } from "@features/autentication/compositions/Profile";
import { tailwindMerge } from "@lib/tsMerge/tsMerge";
type ProfileCardProps = React.HTMLAttributes<HTMLElement>

export function ProfileCard({...attr}:ProfileCardProps){
    return (
        <div {...attr} className={tailwindMerge('w-full h-full flex flex-col md:flex-row gap-2 md:!gap-8 justify-center  items-center rounded-lg p-mb-df',attr.className)}>
            <div className="relative w-max">
                <Profile.Image className="w-48 h-48 rounded-full"/>
                <Profile.ProfileTypeIcon/>
            </div>
            <div className="max-w-[400px] flex flex-col gap-4">
                <div className="flex flex-col items-center justify-center w-full md:items-start">
                    <Profile.Name className="text-2xl font-bold"/>    
                    <Profile.SecondName className="text-lg font-semibold"/>
                    <Profile.Email className="text-base font-light"/>
                </div>
                <Profile.Address/>
               <Profile.Logout/>
            </div>
        </div>
    )
}
// export function ProfileCard({profile,...attr}:ProfileCardProps){
//     const completeName = `${profile?.first_name} ${profile?.last_name}`
//     return(
//         <Card className="box-content relative flex flex-row h-16 p-0 w-max justify-evenly">
//             {/* STORE ICON */}
//             <IoStorefront className="box-content absolute p-2 text-2xl rounded-full -right-4 -top-4 bg-primary-a30"/>
//             <div
//                 className={'w-20 h-16 rounded-l-lg bg-contain'}
//                 style={{ backgroundImage: `url(${profile?.image})` }}
//             />
            
//             <Card.Header className="flex flex-col items-start justify-between w-32 py-2">
//                 <h1 className="text-base font-medium truncate">{completeName}</h1>
                             
//             </Card.Header>

//             <Card.Body className="flex flex-col items-end justify-end py-2">
                
//             </Card.Body>
//         </Card>
//     )
// }