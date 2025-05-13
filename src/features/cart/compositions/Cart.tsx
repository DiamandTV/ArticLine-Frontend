import { tailwindMerge } from "@lib/tsMerge/tsMerge";
import { Card } from "react-bootstrap";
import { useCartContext } from "@features/cart/context/CartContext/CartProvider";

export const Cart = () => null;

interface CartProps extends React.HTMLAttributes<HTMLElement> {
    children?: React.ReactNode;
}

Cart.Card = function _Cart({ children, ...attr }: CartProps) {
    const className = tailwindMerge("rounded-xl shadow-md", attr.className);
    return <Card {...attr} className={className}>{children}</Card>;
};

Cart.Icon = function Icon({ children, ...attr }: CartProps) {
    const className = tailwindMerge("text-gray-500 text-2xl p-2", attr.className);
    return <div {...attr} className={className}>{children}</div>;
};

Cart.Title = function Title({ className, ...attr }: CartProps) {
    const { cart } = useCartContext();
    const title = cart ? `Carrello #${cart.id}` : "Carrello";

    return (
        <Card.Title {...attr} className={tailwindMerge("text-xl font-semibold", className)}>
            {title}
        </Card.Title>
    );
};

Cart.Header = function Header({ className, ...attr }: CartProps) {
    const { cart } = useCartContext();

    if (!cart) return null;

    return (
        <Card.Header {...attr} className={tailwindMerge("p-4", className)}>
            <div className="text-sm text-gray-600">Negozio: {cart.store.title}</div>
            <div className="text-sm text-gray-600">
                Utente: {cart.profile?.first_name} {cart.profile?.last_name}
            </div>
            {cart.is_checkout && (
                <div className="mt-2 text-green-600 font-medium">Checkout completato</div>
            )}
        </Card.Header>
    );
};

Cart.Body = function Body({ className, ...attr }: CartProps) {
    const { cart } = useCartContext();

    if (!cart) return null;

    return (
        <Card.Body {...attr} className={tailwindMerge("p-4", className)}>
            <Cart.Title />
            <div className="text-sm text-gray-600">Negozio: {cart.store.title}</div>
            <div className="text-sm text-gray-600">
                Utente: {cart.profile?.first_name} {cart.profile?.last_name}
            </div>
            {cart.is_checkout && (
                <div className="mt-2 text-green-600 font-medium">Checkout completato</div>
            )}
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
