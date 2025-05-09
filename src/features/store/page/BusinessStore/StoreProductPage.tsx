import { Product } from "@features/store/compositions/Product";
import { PaddingView } from "@views/PaddingView";


export function BusinessStoreProductPage() {
  return (
    <PaddingView>
      {/* Immagine del prodotto */}

    <Product.Image className="w-full h-64 rounded-lg overflow-hidden shadow "/>
    
      <div className="w-full flex flex-col gap-2 ">
        <div className="w-full flex flex-col gap-1 py-2">
          <div className="w-full flex flex-row justify-between items-center">
            <Product.Title className="text-3xl font-medium "/>
            <Product.Category/>
          </div>
          
          <div>
            <Product.Description/>
          </div>
        </div>
        <div className="w-full flex flex-row justify-end items-center gap-2 ">
          <Product.TemperatureRange/>
        </div>
    </div>
    <div>
        <h1></h1>
    </div>
    <hr className="w-full px-4 mt-3 pt-3"/>
    <Product.AddItem/>
    </PaddingView>
  );
}
