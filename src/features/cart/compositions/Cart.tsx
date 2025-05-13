import { tailwindMerge } from "@lib/tsMerge/tsMerge";
import { Card } from "react-bootstrap";
import { useCartContext } from "@features/cart/context/CartContext/CartProvider";
import { StoreIntroCard } from "@features/store/components/cards/StoreCard/StoreIntroCard";
import { StoreProvider } from "@features/store/context/StoreContext/StoreProvider";
import { ProfileCard } from "@features/autentication/components/cards/ProfileCard/ProfileCard";
import { IoCart } from "react-icons/io5";

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
        <Card.Title {...attr} className={tailwindMerge("text-xl font-semibold", className)}>
            {title}
        </Card.Title>
    );
};

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

Cart.Store = function StoreCompany({...attr}:CartProps){
    const { cart } = useCartContext()
    if(!cart) return null
    const store = cart.store
    return(
        <StoreProvider store={store}>
            <StoreIntroCard/>
        </StoreProvider>
    )
}

Cart.Profile = function Profile({...attr}:CartProps){
    const {cart} = useCartContext()
    const profile = cart?.profile
    return(
        <ProfileCard profile={profile ?? null}/>
    )   
}

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

Cart.Footer = function Footer({ className, ...attr }: CartProps) {
    return (
        <Card.Footer {...attr} className={tailwindMerge("p-3 bg-gray-100 text-right", className)}>
            <button className="bg-blue-500 text-white px-3 py-1 rounded-md">Gestisci</button>
        </Card.Footer>
    );
};

// Componente completo
Cart.Composition = function Composition() {
    const { cart } = useCartContext();
    if (!cart) return null;

    return (
        <Cart.Card>
            <Cart.Body />
            <Cart.Footer />
        </Cart.Card>
    );
};
