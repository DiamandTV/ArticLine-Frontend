import { Card } from "react-bootstrap";
import { Product } from "../../../compositions/Product";

export function ProductCard({...attr}:React.HTMLAttributes<HTMLElement>) {
    return (
      <Product.Card {...attr}>
        <div className="w-full relative">
          <Product.Image />
          <Product.Favourite />
          <Product.Settings/>
        </div>
        <Card.Body className="px-2 py-1 flex flex-col ">
            <Product.Title />
            <div className="w-full flex flex-row justify-between items-center gap-2">
              <Product.Price />
              <Product.Category />
            </div>
        </Card.Body>
      </Product.Card>
    );
  }
  