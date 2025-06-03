import { useStoreContext } from "@features/store/context/StoreContext/StoreProvider"
import { tailwindMerge } from "@lib/tsMerge/tsMerge"
import {  useState } from "react"
import { Card } from "react-bootstrap"
import { AiFillHeart, AiFillStar, AiOutlineHeart } from "react-icons/ai"
import { FiEye } from "react-icons/fi"
import { GoLocation } from "react-icons/go"

interface StoreCardProps extends React.HTMLAttributes<HTMLElement>{
    children:React.ReactNode
}

export function Store({children}:StoreCardProps){
  return (
    <>
      {children}
    </>  
  )
}

Store.Card = function _Card({ children,className, ...attr }: StoreCardProps) {
  const mergedClass = tailwindMerge("rounded-md overflow-hidden shadow-md bg-white ",className)
  return (
    <Card {...attr} className={mergedClass}>
        {children}
    </Card>
  )
}

Store.Image = function Image(attr:Omit<StoreCardProps,'children'>){
    const {store} = useStoreContext()
    const className = tailwindMerge("h-40 w-full bg-cover bg-center transition-transform duration-300 hover:scale-105",attr.className)
    return(
        <div
            className={className}
            style={{ backgroundImage: `url(${store.image})` }}
        />
    )
}

Store.Body = function Body({children,...attr}:{children:React.ReactNode}&React.HTMLAttributes<HTMLElement>){
    return(
        <Card.Body {...attr} className={tailwindMerge("p-2 flex flex-col ",attr.className)}>
           {children}
        </Card.Body>
    )
}

Store.Title = function Title(attr:Omit<StoreCardProps,'children'>){
  const {store} = useStoreContext()
  const className = tailwindMerge('text-xl font-semibold font-sans truncate',attr.className)
  return(
      <h3 className={className}>{store.title}</h3>
  )
}

Store.Favourite = function Favourite() {
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

Store.Rating = function Rating() {
  return (
    <div className="flex items-center gap-1 text-base" >
      <AiFillStar className="text-yellow-500" size={20}/>
      <span >4.6</span>
    </div>
  )
}

Store.Views = function Views() {
  return (
    <div className="flex items-center gap-1 text-base">
      <FiEye className="text-blue-500" size={20} />
      <span>1.2k</span>
    </div>
  )
}

Store.Distance = function Distance() {
  return (
    <div className="flex items-center gap-1 text-base">
      <GoLocation className="text-green-500" size={20} />
      <span>1.4 km</span>
    </div>
  )
}