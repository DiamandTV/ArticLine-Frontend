import { tailwindMerge } from "@lib/tsMerge/tsMerge";
import { Button, Card } from "react-bootstrap";
import { useCartContext } from "@features/cart/context/CartContext/CartProvider";
import { IoCart } from "react-icons/io5";
import { useNavigate } from "react-router";
import { StoreProvider } from "@features/store/context/StoreContext/StoreProvider";
import { Store } from "@features/store/compositions/Store";
import { Badge } from "@components/Badge/Badge";

export const Cart = () => null;

interface CartProps extends React.HTMLAttributes<HTMLElement> {
    children?: React.ReactNode;
}

Cart.Card = function _Cart({ children, ...attr }: CartProps) {
    const className = tailwindMerge("rounded-xl shadow-md", attr.className);
    return <Card {...attr} className={className}>{children}</Card>;
};

Cart.Icon = function Icon({ ...attr }: Omit<CartProps,'children'>) {
    const className = tailwindMerge("text-gray-500 text-4xl ", attr.className);
    return (
        <div {...attr} className={className}>
            <IoCart  className={className}/>
        </div>
    )
};

Cart.Title = function Title({ className, ...attr }: CartProps) {
    const { cart } = useCartContext();
    const title = cart ? `CART #${cart.id}` : "CART";

    return (
        <h1 {...attr} className={tailwindMerge("text-xl font-semibold", className)}>
            {title}
        </h1>
    );
};

Cart.ItemsCount = function ItemsCount(){
    const { cart } = useCartContext()
    if(!cart) return
    //const text = `You have ${itemCount} items in your cart`
    const text = `${cart.cartItems_count} items`
    return(
        <span className="text-base font-semibold text-surface-a40">{text}</span>
    )
}

// Cart.StoreCompany = function StoreCompany({...attr}:CartProps){
//     const { cart } = useCartContext()
//     if(!cart) return null
//     const company = cart.store.company_profile
//     return(
//         <div className={className}>
//             <div>STORE: {cart.store.title}</div>
//             <div>
//                 USER: {cart.profile?.first_name} {cart.profile?.last_name}
//             </div>
//         </div>
//     )
// }

// Cart.Store = function StoreCompany({...attr}:CartProps){
//     const { cart } = useCartContext()
//     if(!cart) return null
//     const store = cart.store
//     return(
//         <StoreProvider store={store}>
//             <StoreIntroCard/>
//         </StoreProvider>
//     )
// }



// Cart.Profile = function FromProfile({...attr}:CartProps){
//     const { cart } = useCartContext()
//     if(!cart) return null
//     const className = tailwindMerge('text-sm text-gray-600',attr.className)
//     return(
        
//             <div>
//                 USER: {cart.profile?.first_name} {cart.profile?.last_name}
//             </div>
//         </div>
//     )
// }

Cart.Header = function Header({ className,children, ...attr }: CartProps & {children:React.ReactNode}) {
    const { cart } = useCartContext();

    if (!cart) return null;

    return (
        <Card.Header {...attr} className={tailwindMerge("p-4", className)}>
            {children}
        </Card.Header>
    );
};


Cart.Body = function Body({ className,children, ...attr }: CartProps & {children:React.ReactNode}) {
    const { cart } = useCartContext();

    if (!cart) return null;

    return (
        <Card.Body {...attr} className={tailwindMerge("p-4", className)}>
            {children}
        </Card.Body>
    );
};

Cart.Footer = function Footer({ className,children, ...attr }: CartProps) {
    return (
        <Card.Footer {...attr} className={tailwindMerge("p-3 bg-gray-100 text-right", className)}>
            {children}    
        </Card.Footer>
    );
};

Cart.SubTotalCost = function SubTotal(attr:React.HTMLAttributes<HTMLElement>){
    const {cart} = useCartContext()
    if(!cart) return null
    const subtotal = cart.subtotal_cost.toFixed(2)
    return(
        <div {...attr} className={tailwindMerge("w-full flex flex-row items-center justify-between",attr.className)}>
            <span >Subtotal</span>
            <span>{`€ ${subtotal}`}</span>
        </div>
    )
}

Cart.ShippingCost = function Shipping(attr:React.HTMLAttributes<HTMLElement>){
    const {cart} = useCartContext()
    if(!cart) return null
    const shipping = cart.shipping_cost.toFixed(2)
    return(
        <div {...attr} className={tailwindMerge("w-full flex flex-row items-center justify-between",attr.className)}>
            <span>Shipping</span>
            <span>{`€ ${shipping}`}</span>
        </div>
    )
}

Cart.TotalCost = function Total(attr:React.HTMLAttributes<HTMLElement>){
    const {cart} = useCartContext()
    if(!cart) return null
    const total = (cart.subtotal_cost + cart.shipping_cost).toFixed(2)
    return(
        <div {...attr} className={tailwindMerge("w-full flex flex-row items-center justify-between",attr.className)}>
            <span>Total(incl. taxes)</span>
            <span>{`€ ${total}`}</span>
        </div>
    )
}

Cart.PriceDetails = function PriceDetails(){
    return(
        <div className="w-full flex flex-col gap-0.5 text-sm font-medium">
            <Cart.SubTotalCost/>
            <Cart.ShippingCost/>
            <Cart.TotalCost/>
        </div>
    )
}

Cart.Price = function Price(attr:React.HTMLAttributes<HTMLElement>){
    const {cart} = useCartContext()
    const total = cart!.subtotal_cost + cart!.shipping_cost
    return(
        <span {...attr} className={tailwindMerge("text-sm font-medium",attr.className)}>{`€ ${total}`}</span>
    )
}

Cart.Checkout = function Checkout(){
    const navigator = useNavigate()
    const {cart} = useCartContext()
    if(!cart) return
    return(
        <Button 
            className="w-full" 
            onClick={()=>{
                navigator(`/company/${cart?.store.company_profile}/store/${cart?.store.id}/cart/${cart?.id}/checkout/`)
            }}>
            <h1 className="text-sm font-medium">CHECKOUT</h1>
        </Button>
    )
}

Cart.StoreImage = function StoreImage(){
    const store = useCartContext().cart?.store
    if(!store) return
    return(
        <StoreProvider store={store}>
            <Store.Image/>
        </StoreProvider>
    )
}

Cart.StoreTitle = function StoreTitle(){
    const store = useCartContext().cart?.store
    if(!store) return
    return(
        <StoreProvider store={store}>
            <Store.Title/>
        </StoreProvider>
    )
}

Cart.CartBadge = function CartBadge(attr:React.HTMLAttributes<HTMLElement>){
    const {cart} = useCartContext()
    if(!cart) return null
    const cartItem = cart.cartItems_count
    return(
        <Badge
            badgeContent={cartItem.toString()}
            {...attr}
        >
            <IoCart/>
        </Badge>
    )
}