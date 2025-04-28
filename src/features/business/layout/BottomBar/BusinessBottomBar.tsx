import { cloneElement, useState } from "react";
import { BottomNavigation as ButtonNavigationComponent } from "src/layout/BottomBar/component/BottomBar";
import { IoHome, IoCart, IoLayers, IoAddCircle,IoCompass } from "react-icons/io5";
import { getKey } from "@lib/kegGenerator/keyGenerator";

const ICONS = [
    <IoHome />,    // Home
    <IoCart />,    // Ordini
    <IoLayers />,  // Order Batch
    <IoAddCircle /> // Aggiungi Store
];

export function BusinessBottomNavigation() {
    const [state, setState] = useState(0);

    return (
        <ButtonNavigationComponent 
            state={state}
            setState={setState}
        >
            {ICONS.map((icon, index) => {
                const iconClassName = `transition-all ease-linear duration-150 ${state === index ? 'text-3xl' : 'text-xl'}`;
                
                return (
                    <>
                        {ICONS.length / 2 === index ? (
                            <ButtonNavigationComponent.ImportantItem
                                key={getKey()}
                                index={4} // l'importante sarà al centro (index 4)
                                icon={<IoCompass className="transition-all ease-linear duration-150 text-4xl" />}
                                onClick={() => {
                                    // Qui puoi gestire il ritorno alla Home principale
                                    window.location.href = '/'; 
                                    // oppure usare la navigazione del tuo router!
                                }}
                            />
                        ) : null}

                        <ButtonNavigationComponent.Item
                            key={getKey()}
                            index={index}
                            icon={cloneElement(icon, {})}
                            className={iconClassName}
                        />
                    </>
                );
            })}
        </ButtonNavigationComponent>
    );
}