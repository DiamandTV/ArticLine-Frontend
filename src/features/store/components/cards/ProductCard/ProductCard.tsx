import { ProductContext } from "@features/store/context/ProductContext/ProductContext";
import { tailwindMerge } from "@lib/tsMerge/tsMerge";
import { useContext, useState } from "react";
import { Card } from "react-bootstrap";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaTemperatureLow, FaTemperatureHigh } from "react-icons/fa";

interface ProductProps extends React.HTMLAttributes<HTMLElement>{
  children:React.ReactNode
}
export function Product({ children,...attr }: ProductProps) {
    const className = tailwindMerge("shadow-md rounded-xl overflow-hidden ",attr.className)
    return <Card {...attr} className={className} >{children}</Card>;
}

Product.Image = function Image(attr:React.HTMLAttributes<HTMLElement>) {
  const { product } = useContext(ProductContext);
  if (!product) return null;
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
  const { product } = useContext(ProductContext);
  if (!product) return null;

  const className = tailwindMerge("text-lg font-semibold truncate",attr.className)
  return <h3 className={className}>{product.name}</h3>;
};

Product.Description = function Description(attr:React.HTMLAttributes<HTMLElement>) {
  const { product } = useContext(ProductContext);
  if (!product) return null;

  return <p className="w-full h-10 text-sm text-wrap text-gray-600 truncate ">{product.description}</p>;
};

Product.Category = function Category(attr:React.HTMLAttributes<HTMLElement>) {
  const { product } = useContext(ProductContext);
  if (!product) return null;

  return (
    <span className="w-max h-max flex flex-row justify-center items-center text-xs text-white bg-blue-500 px-2 py-0.5 rounded-full">
      {product.store_category.name}
    </span>
  );
};

import { FaMoneyBillWave } from "react-icons/fa";

Product.Price = function Price(attr:React.HTMLAttributes<HTMLElement>) {
  const { product } = useContext(ProductContext);
  if (!product) return null;
  const className = tailwindMerge("flex items-center gap-1 text-base font-semibold text-green-600",attr.className)
  return (
    <div className={className}>
      <FaMoneyBillWave className="text-green-500" />
      <span>€{product.price}</span>
    </div>
  );
};



Product.TemperatureStart = function TemperatureStart(attr:React.HTMLAttributes<HTMLElement>) {
  const { product } = useContext(ProductContext);
  if (!product?.temperature_start_range) return null;

  return (
    <div className="flex items-center gap-2 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium w-max">
      <FaTemperatureLow size={16} />
      <span>Min: {product.temperature_start_range}°C</span>
    </div>
  );
};

Product.TemperatureEnd = function TemperatureEnd(attr:React.HTMLAttributes<HTMLElement>) {
  const { product } = useContext(ProductContext);
  if (!product?.temperature_end_range) return null;

  return (
    <div className="flex items-center gap-2 px-2 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium w-max">
      <FaTemperatureHigh size={16} />
      <span>Max: {product.temperature_end_range}°C</span>
    </div>
  );
};

Product.TemperatureRange = function TemperatureRange(attr:React.HTMLAttributes<HTMLElement>) {
  const { product } = useContext(ProductContext);
  if (
    product?.temperature_start_range === undefined ||
    product?.temperature_end_range === undefined
  ) return null;

  return (
    <div className="flex items-center gap-2 px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium w-max">
      <FaTemperatureLow size={14} className="text-blue-500" />
      <span>{product.temperature_start_range}°C</span>
      <span>-</span>
      <span>{product.temperature_end_range}°C</span>
      <FaTemperatureHigh size={14} className="text-red-500" />
    </div>
  );
};


import { FaPlus, FaMinus, FaShoppingCart } from "react-icons/fa";

Product.Add = function Add(attr:React.HTMLAttributes<HTMLElement>) {
  const {product} = useContext(ProductContext)
  const [quantity, setQuantity] = useState(1);

  if(!product) return
  const increase = () => setQuantity((prev) => prev + 1);
  const decrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    // TODO: implementa logica per aggiungere al carrello
    console.log(`Aggiunto al carrello: ${quantity} pezzi`);
  };

  return (
    <div className="w-full grid grid-cols-2 items-center justify-between gap-2">
      {/* Selettore quantità */}
      <div className="h-full flex items-center border border-gray-300 rounded overflow-hidden">
        <button onClick={decrease} className="px-3 py-1 text-gray-600 hover:bg-gray-100">
          <FaMinus />
        </button>
        <span className="px-4">{quantity}</span>
        <button onClick={increase} className="px-3 py-1 text-gray-600 hover:bg-gray-100">
          <FaPlus />
        </button>
      </div>

      {/* Pulsante aggiungi al carrello */}
      <button
        onClick={handleAddToCart}
        className="w-full flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
      >
        <FaShoppingCart />
        <span>Aggiungi</span>
      </button>
    </div>
  );
};


export function ProductCard({...attr}:React.HTMLAttributes<HTMLElement>) {
    return (
      <Product {...attr}>
        <div className="w-full relative">
          <Product.Image />
          <Product.Favourite />
        </div>
        <Card.Body className="px-2 py-1 flex flex-col ">
            <Product.Title />
            <div className="w-full flex flex-row justify-between items-center gap-2">
              <Product.Price />
              <Product.Category />
            </div>
        </Card.Body>
      </Product>
    );
  }
  