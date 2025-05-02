import { useGetCategoryQuery } from "@features/home/hook/useGetCategoryQuery/useGetCategoryQuery";
import { CategoryInterface } from "@features/home/model/Category/CategoryInterface";
import { StoreContext } from "@features/store/context/StoreContext/StoreContext";
import { tailwindMerge } from "@lib/tsMerge/tsMerge";
import { useContext, useState } from "react";
import { Accordion, Card } from "react-bootstrap";
import { AiFillHeart, AiFillStar, AiOutlineHeart } from "react-icons/ai";
import { FiEye } from "react-icons/fi";
import { GoLocation } from "react-icons/go";
import { IoMdInformationCircleOutline } from "react-icons/io";


interface StoreHeaderProps extends React.HTMLAttributes<HTMLElement>{
    children:React.ReactNode
}
export function StoreHeader({children,...attr}:StoreHeaderProps){
    const className = tailwindMerge("border-none "+attr.className)
    return(
        <Card {...attr} className={className}>
            {children}
        </Card>
    )
}

StoreHeader.Body = function Body({children}:{children:React.ReactNode}){
    return(
        <Card.Body >
            {children}
        </Card.Body>
    )
}

StoreHeader.Footer = function Footer({children}:{children:React.ReactNode}){
    return (
        <Card.Footer>
            {children}
        </Card.Footer>
    )
}

StoreHeader.Image = function Image(){
   
    const {store} = useContext(StoreContext)
    if(!store) return null
    return(
        <div
            className="relative h-48 w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${store.image})` }}
        />
    )
}

StoreHeader.Favourite = function Favourite(){
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

StoreHeader.Title = function Title(){
    const {store} = useContext(StoreContext)
    if(!store) return null
    const title = store.title
    return(
         <h1 className=" text-2xl font-normal font-sans truncate m-0 p-0">{title}</h1>
    )
}

StoreHeader.Categories = function Categories(){
    const {store} = useContext(StoreContext)
    const {data,isLoading,isSuccess} = useGetCategoryQuery()
    if(!store ||  isLoading || !isSuccess) return null
    
    // todo: use Memo
    const storeCategories:Array<CategoryInterface> = store.categories.map((categoryID)=>{
        return data.find((category)=>category.id === categoryID)
    }).filter((category)=>!!category)

    return(
        <>
            {storeCategories.map((category)=>{
                return(
                    <div className="bg-surface-a20 w-max h-max px-4 py-1 rounded-full font-sans font-light text-base">
                        {category.name}
                    </div>
                )
            })}
        </>
    )   
}

StoreHeader.Info = function Info(){
    const {store} = useContext(StoreContext)
    if(!store) return
    const description = store.description
    
    return(
        <Accordion defaultActiveKey={"1"} flush>
            <Card>
                <Accordion.Item eventKey="0" >
                    <Accordion.Header>

                        <div className="w-full flex flex-row justify-start items-center gap-2" >
                            <IoMdInformationCircleOutline size={25} className="text-surface-a30"/>
                            <h1>INFORMATION</h1>
                        </div>

                    </Accordion.Header>
                
                    <Accordion.Body >
                        <p>
                            {description}
                        </p>
                    </Accordion.Body>
                </Accordion.Item>
            </Card>
        </Accordion>
    )
}

StoreHeader.Rating = function Rating() {
    const { store } = useContext(StoreContext);
    if (!store) return null;

    const rating = 3.6; // rating da 0 a 5
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return (
        <div className="flex items-center gap-1 text-base">
            {[...Array(5)].map((_, index) => {
                if (index < fullStars) {
                    return <AiFillStar key={index} className="text-yellow-500" size={20} />;
                } else if (index === fullStars && hasHalfStar) {
                    return <AiFillStar key={index} className="text-yellow-500/50" size={20} />;
                } else {
                    return <AiFillStar key={index} className="text-gray-300" size={20} />;
                }
            })}
            {
                //<span className="ml-1">{rating.toFixed(1)}</span>
            }
        </div>
    );
};


StoreHeader.Views = function Views(){
    const {store} = useContext(StoreContext)
    if(!store) return null
    const views = "500+"
    return (
        <div className="flex items-center gap-2 text-base">
            <FiEye className="text-blue-500" size={20} />
            <span>{views}</span>
        </div>
    )
}

StoreHeader.Reviews = function Reviews() {
    const { store } = useContext(StoreContext);
    if (!store) return null;

    const reviewCount =  125;

    return (
        <div className="flex items-center gap-2 text-base">
            <AiFillStar className="text-yellow-500" size={20} />
            <span>{reviewCount} recensioni</span>
        </div>
    );
};

StoreHeader.Distance = function Distance() {
    const { store } = useContext(StoreContext);
    if (!store) return null;

    const address = store.address ?? "Indirizzo non disponibile";
    const distance =  "10 km";

    return (
        <div className="flex flex-col text-base">
            <div className="flex items-center gap-2">
                <GoLocation className="text-green-500" size={20} />
                <span>{address.full_address}</span>
            </div>
            <span className="text-sm text-gray-500 ml-6">Distanza: {distance}</span>
        </div>
    );
};


type StoreBusinessHeaderProps = React.HTMLAttributes<HTMLElement> 
export function StoreBusinessHeader({...attr}:StoreBusinessHeaderProps){
    return(
        <StoreHeader {...attr}>
            <StoreHeader.Image/>
            <StoreHeader.Favourite/>
            <Card.Body className="w-full flex flex-col gap-2 pb-0">
                <StoreHeader.Title/>
                
                <div className="w-full flex flex-row justify-between">
                    <div className="w-full flex flex-col gap-y-2">
                        <StoreHeader.Rating/>
                        <StoreHeader.Views/>
                        <StoreHeader.Distance/>
                        <StoreHeader.Reviews/>
                    </div>
                    <StoreHeader.Categories/>
                </div>
                <StoreHeader.Info/>
            </Card.Body>
        </StoreHeader>
    )
}

