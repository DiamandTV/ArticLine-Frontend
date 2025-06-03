import { Product } from "@features/store/compositions/Product";
import { PaddingView } from "@views/PaddingView";


export function BusinessStoreProductPage() {
  return (
    <PaddingView className="md:w-[400px]">
      {/* Immagine del prodotto */}

    <Product.Image className="w-full h-64 overflow-hidden rounded-lg shadow "/>
    
      <div className="flex flex-col w-full gap-2 ">
        <div className="flex flex-col w-full gap-1 py-2">
          <div className="flex flex-row items-center justify-between w-full">
            <Product.Title className="text-3xl font-medium "/>
            <Product.Category/>
          </div>
          
          <div>
            <Product.Description/>
          </div>
        </div>
        <div className="flex flex-row items-center justify-end w-full gap-2 ">
          <Product.TemperatureRange/>
        </div>
    </div>
    <div>
        <h1></h1>
    </div>
    <hr className="w-full px-4 pt-3 mt-3"/>
    <Product.AddItem/>
    </PaddingView>
  );
}
