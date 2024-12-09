import { FaStar } from "react-icons/fa6"
import { MdKeyboardArrowRight } from "react-icons/md"
export interface RatingCardProps{
    average_rating:number,
    ratings:number
}

const getRatingDetails = (average_rating:number):{colorTW:string,color:string,label:string}=>  {
    switch (true){
        case (average_rating > 0 && average_rating < 0.5):
            return {
                color:'red',
                colorTW:"text-red-600",
                label:"WORST"
            }
        case (average_rating < 1):
            return {
                color:'red',
                colorTW:"text-red-600",
                label:"WORST"
            }
        case (average_rating < 2):
            return {
                color:'orange-red',
                colorTW:'text-orange-red',
                label:"BAD"
            }
        case (average_rating < 3):
            return {
                color:'color: rgb(161 98 7)',
                colorTW:'text-yellow-700',
                label:'NOT GOOD'
            }
        case (average_rating < 4):
            return {
                color:'color: rgb(161 98 7)',
                colorTW:'text-yellow-700',
                label:'NOT GOOD'
            }
        case (average_rating < 4.5):
            return {
                color:'color: rgb(22 163 74)',
                colorTW:'text-green-200',
                label:'GOOD'
            }
        default:
            return {
                color:'color: rgb(22 101 52)',
                colorTW:'text-green-400',
                label:'EXCELLENT'
            }
    }
}

export function RatingCard({average_rating,ratings}:RatingCardProps){
    const {color,colorTW,label} = getRatingDetails(average_rating)
    return(
        <div className="flex flex-row justify-start items-center gap-2 ">
            <div className="flex flex-col justify-start gap-1">
                <div className={"flex flex-row items-center gap-x-2 "+colorTW}>
                    <FaStar size={25} color={color}/>
                    <span className="text-base">{average_rating} {label}</span>
                </div>
                <span className="text-xs self-end">TOTAL {ratings} RATINGS</span>
                
            </div>
            <MdKeyboardArrowRight size={32.5}/>

        </div>
    )
}