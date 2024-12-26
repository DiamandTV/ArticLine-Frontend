import { BlurCard } from '../components/Cards/BlurCard'
import Logo from '../assets/images/NoBG_Complete.png'

export function StartViewNoBlur({children}:{children:React.ReactNode}){
    return (   
        <div className="bg-slate-900 w-screen h-full min-h-screen flex flex-col items-center justify-start px-8 py-8"> 
            <div className='w-52 h-52 md:w-64 md:h-64 lg:w-80 lg:h-80'>
                <img src={Logo} alt="" />
            </div>
            {children}
        </div>
        )
}

export function StartView({children}:{children:React.ReactNode}){
        return (   
        <StartViewNoBlur>
            <BlurCard className='max-w-3xl transition-all duration-300 bg-slate-300'>
                <div className='w-full flex flex-col justify-center items-center gap-y-8'>
                    {children}
                </div>
            </BlurCard>
        </StartViewNoBlur>
        )
}