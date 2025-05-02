import { StoreContext } from "@features/store/context/StoreContext/StoreContext"
import { tailwindMerge } from "@lib/tsMerge/tsMerge"
import { useContext, useState } from "react"
import { Card } from "react-bootstrap"
import { AiFillHeart, AiFillStar, AiOutlineHeart } from "react-icons/ai"
import { FiEye } from "react-icons/fi"
import { GoLocation } from "react-icons/go"

interface StoreCardProps extends React.HTMLAttributes<HTMLElement>{
    children:React.ReactNode
}

export function StoreCard({ children,className, ...attr }: StoreCardProps) {
  const { store } = useContext(StoreContext)
  if (!store) return null

  const mergedClass = tailwindMerge("rounded-md overflow-hidden shadow-md bg-white "+ className)

  return (
    <Card {...attr} className={mergedClass}>
        {children}
    </Card>
  )
}

StoreCard.Image = function Image(){
    const {store} = useContext(StoreContext)
    if(!store) return
    return(
        <div
            className="h-40 w-full bg-cover bg-center transition-transform duration-300 hover:scale-105"
            style={{ backgroundImage: `url(${store.image})` }}
        />
    )
}

StoreCard.Body = function Body({children}:{children:React.ReactNode}){
    return(
        <Card.Body className="p-2 flex flex-col ">
           {children}
        </Card.Body>
    )
}

StoreCard.Title = function Title(){
    const {store} = useContext(StoreContext)
    if(!store) return
    return(
        <h3 className="text-xl font-semibold font-sans truncate">{store.title}</h3>
    )
}

StoreCard.Favourite = function Favourite() {
    const [liked, setLiked] = useState(false)
  
    const onLike = (event:React.MouseEvent)=>{
        event.stopPropagation()
        setLiked(!liked)
    }

    return (
      <button
        onClick={onLike}
        className="absolute top-2 right-2 p-1 rounded-full bg-black/50 hover:bg-black/70 transition"
      >
        {liked ? (
          <AiFillHeart className="text-red-500" size={22} />
        ) : (
          <AiOutlineHeart className="text-white" size={22} />
        )}
      </button>
    )
  }

StoreCard.Rating = function Rating() {
  return (
    <div className="flex items-center gap-1 text-base" >
      <AiFillStar className="text-yellow-500" size={20}/>
      <span >4.6</span>
    </div>
  )
}

StoreCard.Views = function Views() {
  return (
    <div className="flex items-center gap-1 text-base">
      <FiEye className="text-blue-500" size={20} />
      <span>1.2k</span>
    </div>
  )
}

StoreCard.Distance = function Distance() {
  return (
    <div className="flex items-center gap-1 text-base">
      <GoLocation className="text-green-500" size={20} />
      <span>1.4 km</span>
    </div>
  )
}

type StoreBusinessCardProps = React.HTMLAttributes<HTMLElement>
export function StoreBusinessCard({...attr}:StoreBusinessCardProps){
    return(
        <StoreCard {...attr}>
            <StoreCard.Image/>
            <StoreCard.Favourite/>
            <StoreCard.Body>
                <StoreCard.Title/>
                <div className=" flex justify-between text-sm text-gray-600">
                    <StoreCard.Rating />
                    <StoreCard.Views />
                    <StoreCard.Distance />
                </div>
            </StoreCard.Body>
        </StoreCard>
    )
}

/*
 <Card {...attr} className={mergedClass}>
      <div
        className="h-40 w-full bg-cover bg-center transition-transform duration-300 hover:scale-105"
        style={{ backgroundImage: `url(${store.image})` }}
      />
      <StoreCard.Favourite/>
      <Card.Body className="p-2 flex flex-col ">
        <h3 className="text-xl font-semibold font-sans truncate">{store.title}</h3>
        <div className=" flex justify-between text-sm text-gray-600">
          <StoreCard.Rating />
          <StoreCard.Views />
          <StoreCard.Distance />
        </div>
      </Card.Body>
    </Card>
 */