import { ProductContext } from "@features/store/context/ProductContext/ProductContext";
import { useContext, useState } from "react";
import { Card } from "react-bootstrap";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

export function Product({ children }: { children: React.ReactNode }) {
    return <Card className="shadow-md rounded-xl overflow-hidden">{children}</Card>;
}

Product.Image = function Image() {
  const { product } = useContext(ProductContext);
  if (!product) return null;

  return (
    <div
      className="h-40 bg-cover bg-center"
      style={{ backgroundImage: `url(${product.image})` }}
    />
  );
};

Product.Favourite = function Favourite() {
  const [liked, setLiked] = useState(false);

  const toggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(!liked);
  };

  return (
    <button
      onClick={toggleLike}
      className="absolute top-2 right-2 p-1 rounded-full bg-black/40 hover:bg-black/60 transition"
    >
      {liked ? (
        <AiFillHeart className="text-red-500" size={20} />
      ) : (
        <AiOutlineHeart className="text-white" size={20} />
      )}
    </button>
  );
};

Product.Title = function Title() {
  const { product } = useContext(ProductContext);
  if (!product) return null;

  return <h3 className="text-lg font-semibold truncate">{product.name}</h3>;
};

Product.Description = function Description() {
  const { product } = useContext(ProductContext);
  if (!product) return null;

  return <p className="text-sm text-gray-600 truncate">{product.description}</p>;
};

Product.Category = function Category() {
  const { product } = useContext(ProductContext);
  if (!product) return null;

  return (
    <span className="text-xs text-white bg-blue-500 px-2 py-0.5 rounded-full">
      {product.store_category}
    </span>
  );
};

Product.Price = function Price() {
  const { product } = useContext(ProductContext);
  if (!product) return null;

  return <span className="text-base font-bold text-green-600">€{product.price}</span>;
};

Product.TemperatureStart = function TemperatureStart() {
  const { product } = useContext(ProductContext);
  if (!product?.temperature_start_range) return null;

  return <span>Min: {product.temperature_start_range}°C</span>;
};

Product.TemperatureEnd = function TemperatureEnd() {
  const { product } = useContext(ProductContext);
  if (!product?.temperature_end_range) return null;

  return <span>Max: {product.temperature_end_range}°C</span>;
};

Product.TemperatureRange = function TemperatureRange() {
  const { product } = useContext(ProductContext);
  if (!product?.temperature_start_range || !product?.temperature_end_range) return null;

  return (
    <span className="text-sm text-gray-700">
      {product.temperature_start_range}°C - {product.temperature_end_range}°C
    </span>
  );
};

export function ProductCard() {
    return (
      <Product>
        <div className="relative">
          <Product.Image />
          <Product.Favourite />
        </div>
        <Card.Body className="flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <Product.Title />
            <Product.Category />
          </div>
          <Product.Description />
          <div className="flex justify-between items-center">
            <Product.Price />
            <Product.TemperatureRange />
          </div>
        </Card.Body>
      </Product>
    );
  }
  