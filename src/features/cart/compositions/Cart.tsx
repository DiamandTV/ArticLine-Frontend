import { tailwindMerge } from "@lib/tsMerge/tsMerge";
import { Button, Card } from "react-bootstrap";
import { useCartContext } from "@features/cart/context/CartContext/CartProvider";
import { IoCart } from "react-icons/io5";
import { useNavigate } from "react-router";

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

Cart.PriceDetails = function PriceDetails(){
    const {cart} = useCartContext()
    if(!cart) return null
    const total = cart.subtotal_cost + cart.shipping_cost
    return(
        <div className="w-full flex flex-col gap-0.5 text-sm font-medium">
            <div className="w-full flex flex-row items-center justify-between">
                <span >Subtotal</span>
                <span>{`€ ${cart.subtotal_cost}`}</span>
            </div>
            <div className="w-full flex flex-row items-center justify-between">
                <span>Shipping</span>
                <span>{`€ ${cart.shipping_cost}`}</span>
            </div>
            <div className="w-full flex flex-row items-center justify-between">
                <span>Total(incl. taxes)</span>
                <span>{`€ ${total}`}</span>
            </div>
        </div>
    )
}


Cart.Checkout = function Checkout(){
    const navigator = useNavigate()
    return(
        <Button 
            className="w-full" 
            onClick={()=>{
                navigator('checkout/')
            }}>
            <h1 className="font-medium text-sm">CHECKOUT</h1>
        </Button>
    )
}

