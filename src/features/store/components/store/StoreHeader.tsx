import { SimpleBottomSheetModal } from "@components/modal/BottomSheetModal/SimpleBottomSheetModal";
import { BottomSheetModalContext } from "@context/BottomSheetModal/BottomSheetModalContext";
import { BottomSheetModalProvider } from "@context/BottomSheetModal/BottomSheetModalProvider";
import { useGetCategoryQuery } from "@features/home/hook/useGetCategoryQuery/useGetCategoryQuery";
import { CategoryInterface } from "@features/home/model/Category/CategoryInterface";
import { StoreContext } from "@features/store/context/StoreContext/StoreContext";
import { tailwindMerge } from "@lib/tsMerge/tsMerge";
import { PaddingView } from "@views/PaddingView";
import { useContext, useRef, useState } from "react";
import { Accordion, Card } from "react-bootstrap";
import { AiFillHeart, AiFillStar, AiOutlineHeart } from "react-icons/ai";
import { FiEye, FiSettings } from "react-icons/fi";
import { GoLocation } from "react-icons/go";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { StoreForm } from "../forms/Store/StoreForm";
import { ActionMenu } from "@components/ActionMenu/ActionMenu";
import { EditLabelButton } from "@components/buttons/EditButton/EditButton";
import { DeleteLabelButton } from "@components/buttons/DeleteButton/DeleteLabelButtont";
import { ModalProvider } from "@context/Modal/ModalProvider";
import { useStoreContext } from "@features/store/context/StoreContext/StoreProvider";
import { Can, CaslSubject } from "src/config/permissions/can";
import { getKey } from "@lib/kegGenerator/keyGenerator";
import { DivRefProvider } from "@context/DivRefContext/DivRefProvider";
import { BottomSheetModalSetter } from "@context/BottomSheetModal/BottomSheetModalSetter";


interface StoreHeaderProps extends React.HTMLAttributes<HTMLElement>{
    children:React.ReactNode
}
export function StoreHeader({children,...attr}:StoreHeaderProps){
    const className = tailwindMerge("border-none ",attr.className)
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

StoreHeader.Image = function Image(attr:React.HTMLAttributes<HTMLElement>){
   
    const {store} = useContext(StoreContext)
    if(!store) return null
    return(
        <div
            {...attr}
            className={tailwindMerge("relative min-h-48 h-full w-full bg-cover bg-center",attr.className)}
            style={{ backgroundImage: `url(${store.image})` ,...attr.style}}
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
        className="absolute p-1 transition rounded-full top-2 right-2 bg-black/50 hover:bg-black/70"
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
         <h1 className="p-0 m-0 font-sans text-2xl font-normal truncate ">{title}</h1>
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
                    <div key={getKey()} className="px-4 py-1 font-sans text-base font-light rounded-full bg-surface-a20 w-max h-max">
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

                        <div className="flex flex-row items-center justify-start w-full gap-2" >
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
    const { store } = useStoreContext();
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
    const { store } = useStoreContext();
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
    const { store } = useStoreContext();
    if (!store) return null;

    const address = store.address ?? "Indirizzo non disponibile";
    const distance =  "10 km";

    return (
        <div className="flex flex-col text-base">
            <div className="flex items-center gap-2">
                <GoLocation className="text-green-500" size={20} />
                <span>{address.full_address}</span>
            </div>
            <span className="ml-6 text-sm text-gray-500">Distanza: {distance}</span>
        </div>
    );
};

StoreHeader.OnSettings = function OnSettings(){
    const { isOpen, setOpen } = useContext(BottomSheetModalContext);

   return (
        <ActionMenu
            isOpen={isOpen}
            setClose={() => setOpen(false)}
            items={[
            {
                action: <EditLabelButton text="EDIT" className="w-full md:w-[350px] lg:w-[600px]"/>,
                render: (onClose) => (
                    <BottomSheetModalSetter isOpen setOpen={onClose}>
                        <SimpleBottomSheetModal detent="content-height">
                            <PaddingView className="w-full md:w-[350px] lg:w-[600px]">
                                <StoreForm.Update />
                            </PaddingView>
                        </SimpleBottomSheetModal>
                    </BottomSheetModalSetter>
                ),
            },
            {
                action: <DeleteLabelButton text="DELETE" />,
                render: (onClose) => (
                <ModalProvider isOpen={true} setOpen={()=>onClose()}>
                    <StoreForm.Delete/>
                </ModalProvider>
                ),
            },
            ]}
        />
        );
}

StoreHeader.Settings = function Settings(){
    const {store} = useStoreContext()
    return (
        <Can I="settings" this={CaslSubject(store,'Store')}>
            <BottomSheetModalProvider>
                <BottomSheetModalContext.Consumer>
                    {
                        ({setOpen})=>{
                            return(
                                <>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setOpen(true)
                                        }}
                                        className="absolute top-0 left-0 p-1 m-2 transition rounded-full bg-black/50 hover:bg-black/70"
                                        >
                                        <FiSettings className="text-white" size={22} />
                                    </button>
                                    <StoreHeader.OnSettings/>
                                </>
                            )
                        }
                    }
                </BottomSheetModalContext.Consumer>
            </BottomSheetModalProvider>
        </Can>
      );
}

type StoreBusinessHeaderProps = React.HTMLAttributes<HTMLElement> 

export function StoreBusinessHeader({...attr}:StoreBusinessHeaderProps){
    const divRef = useRef<HTMLDivElement|null>(null)
    return(
        <div className="flex flex-row w-full gap-2">
            <StoreHeader {...attr} className={tailwindMerge("w-full flex flex-col gap-2 lg:grid lg:grid-cols-[35%_65%] lg:mx-df")}>
                <div className="relative">
                    <StoreHeader.Image className="h-[350px] rounded-none  md:rounded-md" />
                    <DivRefProvider divRef={divRef}>
                        <StoreHeader.Settings/>
                    </DivRefProvider>
                    <StoreHeader.Favourite/>
                </div>
                <Card.Body className="flex flex-col w-full gap-2 py-0">
                    <StoreHeader.Title/>
                    <div className="flex flex-row justify-between w-full">
                        <div className="flex flex-col w-full gap-y-2">
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
            <div ref={divRef} className="w-max scrollbar-hide"></div>
        </div>
    )
}


