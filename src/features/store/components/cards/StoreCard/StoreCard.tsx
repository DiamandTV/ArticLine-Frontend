import { Store } from "../../../compositions/Store"

type StoreBusinessCardProps = React.HTMLAttributes<HTMLElement>
export function StoreBusinessCard({...attr}:StoreBusinessCardProps){
    return(
      <Store>
        <Store.Card {...attr}>
            <Store.Image/>
            <Store.Favourite/>
            <Store.Body className="py-1 gap-1">
                <Store.Title/>
                <div className=" flex justify-between text-sm text-gray-600">
                    <Store.Rating />
                    <Store.Views />
                    <Store.Distance />
                </div>
            </Store.Body>
        </Store.Card>
      </Store>
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