import LogoNoBG from '@assets/images/logo/log_background.png'

type LogoProps = React.HTMLAttributes<HTMLElement>
export function Logo(props:LogoProps){
    return (
        <div className='w-52 h-52 md:w-64 md:h-64 lg:w-80 lg:h-80' {...props}>
            <img src={LogoNoBG} alt="" />
        </div>
    )
}