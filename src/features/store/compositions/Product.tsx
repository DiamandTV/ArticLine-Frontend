import { SimpleBottomSheetModal } from "@components/modal/BottomSheetModal/SimpleBottomSheetModal";
import { BottomSheetModalContext } from "@context/BottomSheetModal/BottomSheetModalContext";
import { tailwindMerge } from "@lib/tsMerge/tsMerge";
import { PaddingView } from "@views/PaddingView";
import { useContext, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaTemperatureLow, FaTemperatureHigh } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
//import { FaMinus, FaShoppingCart } from "react-icons/fa";
import { ProductForm } from "../components/forms/Product/ProductForm";
import { FiSettings } from "react-icons/fi";
import { BottomSheetModalProvider } from "@context/BottomSheetModal/BottomSheetModalProvider";
import { ActionMenu } from "@components/ActionMenu/ActionMenu";
import { EditLabelButton } from "@components/buttons/EditButton/EditButton";
import { DeleteLabelButton } from "@components/buttons/DeleteButton/DeleteLabelButtont";
import { ModalProvider } from "@context/Modal/ModalProvider";
import { useProductContext } from "@features/store/context/ProductContext/ProductProvider";

interface ProductProps extends React.HTMLAttributes<HTMLElement>{
  children:React.ReactNode
}

export const Product = ()=>null
Product.Card = function _Card({ children,...attr }: ProductProps) {
    const className = tailwindMerge("shadow-md rounded-xl overflow-hidden ",attr.className)
    return <Card {...attr} className={className} >{children}</Card>;
}

Product.Image = function Image(attr:React.HTMLAttributes<HTMLElement>) {
  const { product } = useProductContext()
  const mergeClassName = tailwindMerge("w-full h-32 bg-cover bg-center ",attr.className)
  return (
    <div
      className={mergeClassName}
      style={{ backgroundImage: `url(${product.image})` }}
    />
  );
};

Product.Favourite = function Favourite(attr:React.HTMLAttributes<HTMLElement>) {
  const [liked, setLiked] = useState(false);

  const toggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(!liked);
  };

  const className = tailwindMerge("absolute top-2 right-2 p-1 rounded-full bg-black/40 hover:bg-black/60 transition",attr.className)
  return (
    <button
      onClick={toggleLike}
      className={className}
    >
      {liked ? (
        <AiFillHeart className="text-red-500" size={20} />
      ) : (
        <AiOutlineHeart className="text-white" size={20} />
      )}
    </button>
  );
};


Product.Title = function Title(attr:React.HTMLAttributes<HTMLElement>) {
  const { product } = useProductContext()
  const className = tailwindMerge("text-lg font-semibold truncate",attr.className)
  return <h3 className={className}>{product.name}</h3>;
};

Product.Description = function Description(/*attr:React.HTMLAttributes<HTMLElement>*/) {
  const { product } = useProductContext()
  return <p className="w-full h-10 text-sm text-gray-600 truncate text-wrap ">{product.description}</p>;
};

Product.Category = function Category(attr:React.HTMLAttributes<HTMLElement>) {
  const { product } = useProductContext()
  const className = tailwindMerge("w-max h-max flex flex-row justify-center items-center text-xs text-white bg-blue-500 px-2 py-0.5 rounded-full",attr.className)
  return (
    <span className={className}>
      {product.store_category.name}
    </span>
  );
};

import { FaMoneyBillWave } from "react-icons/fa";
import { Card } from "react-bootstrap";
import { useParams } from "react-router";
import { Can, CaslSubject } from "src/config/permissions/can";
import { CartItemForm } from "@features/cart";
import { CartItemQueryProvider } from "@features/cart/context/CartItemContext/CartItemProvider";
import { BottomSheetModalSetter } from "@context/BottomSheetModal/BottomSheetModalSetter";

Product.Price = function Price(attr:React.HTMLAttributes<HTMLElement>) {
  const { product } = useProductContext()
  const className = tailwindMerge("flex items-center gap-1 text-base font-semibold text-green-600",attr.className)
  return (
    <div className={className}>
      <FaMoneyBillWave className="text-green-500" />
      <span>€{product.price}</span>
    </div>
  );
};



Product.TemperatureStart = function TemperatureStart(/*attr:React.HTMLAttributes<HTMLElement>*/) {
  const { product } = useProductContext()
  if (!product?.temperature_start_range) return null;

  return (
    <div className="flex items-center gap-2 px-2 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-full w-max">
      <FaTemperatureLow size={16} />
      <span>Min: {product.temperature_start_range}°C</span>
    </div>
  );
};

Product.TemperatureEnd = function TemperatureEnd(/*attr:React.HTMLAttributes<HTMLElement>*/) {
  const { product } = useProductContext()
  if (!product.temperature_end_range) return null;

  return (
    <div className="flex items-center gap-2 px-2 py-1 text-sm font-medium text-red-700 bg-red-100 rounded-full w-max">
      <FaTemperatureHigh size={16} />
      <span>Max: {product.temperature_end_range}°C</span>
    </div>
  );
};

Product.TemperatureRange = function TemperatureRange(/*attr:React.HTMLAttributes<HTMLElement>*/) {
  const { product } = useProductContext()
  if (
    product.temperature_start_range === undefined ||
    product.temperature_end_range === undefined
  ) return null;

  return (
    <div className="flex items-center gap-2 px-2 py-1 text-sm font-medium text-gray-800 bg-gray-100 rounded-full w-max">
      <FaTemperatureLow size={14} className="text-blue-500" />
      <span>{product.temperature_start_range}°C</span>
      <span>-</span>
      <span>{product.temperature_end_range}°C</span>
      <FaTemperatureHigh size={14} className="text-red-500" />
    </div>
  );
};


Product.AddItem = function AddItem(){
  return (
    <CartItemQueryProvider>
      <CartItemForm.Add/>
    </CartItemQueryProvider>
  )
}

// Product.AddItem = function AddItem(/*attr:React.HTMLAttributes<HTMLElement>*/) {
//   const [quantity, setQuantity] = useState(1);

//   const increase = () => setQuantity((prev) => prev + 1);
//   const decrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

//   const handleAddToCart = () => {
//     // TODO: implementa logica per aggiungere al carrello
//     console.log(`Aggiunto al carrello: ${quantity} pezzi`);
//   };

//   return (
//     <div className="grid items-center justify-between w-full grid-cols-2 gap-2">
//       {/* Selettore quantità */}
//       <div className="flex items-center h-full overflow-hidden border border-gray-300 rounded">
//         <button onClick={decrease} className="px-3 py-1 text-gray-600 hover:bg-gray-100">
//           <FaMinus />
//         </button>
//         <span className="px-4">{quantity}</span>
//         <button onClick={increase} className="px-3 py-1 text-gray-600 hover:bg-gray-100">
//           <FaPlus />
//         </button>
//       </div>

//       {/* Pulsante aggiungi al carrello */}
//       <button
//         onClick={handleAddToCart}
//         className="flex items-center justify-center w-full gap-2 px-4 py-2 text-white transition bg-green-600 rounded hover:bg-green-700"
//       >
//         <FaShoppingCart />
//         <span>Aggiungi</span>
//       </button>
//     </div>
//   );
// };

Product.BusinessAddButton = function BusinessAddButton({...attr}:React.HTMLAttributes<HTMLElement>){
  const {setOpen} = useContext(BottomSheetModalContext)
  const companyId = Number(useParams()['company-id'])
  const className = tailwindMerge("min-h-44 max-h-52 rounded-lg w-full h-full flex flex-col justify-center items-center text-surface-tonal-a10 text-4xl bg-primary-a50 hover:bg-primary-a40 ",attr.className)
  return(
    <Can  I="create" this={CaslSubject({store_category:{store:{company_profile:companyId}}},'Product Create')} >
      <div 
        onClick={()=>{setOpen(true)}}
        className={className}>    
          <FaPlus />
      </div>
        <SimpleBottomSheetModal detent="content-height" >
          <PaddingView >
            <ProductForm.Create/>
          </PaddingView>
        </SimpleBottomSheetModal>
    </Can>
  )
}

Product.OnSettings = function OnSettings(){
  const { isOpen, setOpen } = useContext(BottomSheetModalContext);
  
  return (
    <ActionMenu
      isOpen={isOpen}
      setClose={() => setOpen(false)}
      items={[
        {
          action: <EditLabelButton text="EDIT" className="w-full md:w-[400px]"/>,
          render: (onClose) => (
            <BottomSheetModalSetter isOpen={true} setOpen={onClose}>
              <SimpleBottomSheetModal detent="content-height">
                <PaddingView className="w-full md:w-[400px]">
                  <ProductForm.Update />
                </PaddingView>
              </SimpleBottomSheetModal>
            </BottomSheetModalSetter>
          ),
        },
        {
          action: <DeleteLabelButton text="DELETE" />,
          render: (onClose) => (
            <ModalProvider isOpen={true} setOpen={()=>onClose()}>
              <ProductForm.Delete/>
            </ModalProvider>
          ),
        },
      ]}
    />
  );
}

Product.Settings = function Settings(){
  const {product} = useProductContext()
  return (
    <Can I='settings'  this={CaslSubject(product,'Product')}>
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
                  <Product.OnSettings/>
                </>
              )
            }
          }
        </BottomSheetModalContext.Consumer>
      </BottomSheetModalProvider>
    </Can>
  );
}


