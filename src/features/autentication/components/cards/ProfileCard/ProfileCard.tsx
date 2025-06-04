import { Profile } from "@features/autentication/compositions/Profile";
import { tailwindMerge } from "@lib/tsMerge/tsMerge";
type ProfileCardProps = React.HTMLAttributes<HTMLElement>

export function ProfileCard({...attr}:ProfileCardProps){
    return (
        <div {...attr} className={tailwindMerge('w-full h-full flex flex-col md:flex-row gap-2 md:!gap-8 justify-center  items-center rounded-lg p-mb-df',attr.className)}>
            <Profile.Image className="w-40 rounded-full"/>
            <div className="max-w-[400px] flex flex-col gap-4">
                <div className="w-full flex flex-col justify-center items-center md:items-start">
                    <Profile.Name className="text-2xl font-bold"/>
                    <Profile.SecondName className="text-lg font-semibold"/>
                    <Profile.Email className="text-base font-light"/>
                </div>
                <Profile.Address/>
            </div>
        </div>
    )
}
// export function ProfileCard({profile,...attr}:ProfileCardProps){
//     const completeName = `${profile?.first_name} ${profile?.last_name}`
//     return(
//         <Card className="w-max h-16 relative flex flex-row justify-evenly p-0 box-content">
//             {/* STORE ICON */}
//             <IoStorefront className="absolute -right-4 -top-4 text-2xl bg-primary-a30 p-2 box-content rounded-full"/>
//             <div
//                 className={'w-20 h-16 rounded-l-lg bg-contain'}
//                 style={{ backgroundImage: `url(${profile?.image})` }}
//             />
            
//             <Card.Header className="w-32 py-2 flex flex-col justify-between items-start">
//                 <h1 className="text-base font-medium truncate">{completeName}</h1>
                             
//             </Card.Header>

//             <Card.Body className="py-2 flex flex-col justify-end items-end">
                
//             </Card.Body>
//         </Card>
//     )
// }