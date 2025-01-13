import { OrderStatus } from "../../models/Order";

export function StatusCard({status}:{status:OrderStatus}){
    
    const getData = (): { color: string } => {
        switch (status) {
            case 'NOT ACCEPTED':
                return { color: 'bg-orange-red' }; // Rosso per indicare che non è accettato
            case 'ACCEPTED':
                return { color: 'bg-sky-500' }; // Blu per indicare che è stato accettato
            case 'WORKING ON':
                return { color: 'bg-yellow-600' }; // Giallo per indicare che è in lavorazione
            case 'READY':
                return {color:  'bg-green-400'};
            case 'SENDED':
                return { color: 'bg-orange-400' }; // Arancione per indicare che è stato inviato
            case 'DELIVERED':
                return { color: 'bg-green-600' }; // Verde per indicare che è stato consegnato
            case 'CANCELED':
                return {color: 'bg-red-600'}
            default:
                return { color: 'bg-gray-400' }; // Grigio per gli stati sconosciuti o predefiniti
        }
    };
    
    return(
        <div className={`h-full flex justify-center items-center text-gray-200`}>
            <h6 className={`text-sm p-1.5 rounded-xl max-h-max ${getData().color}`}>{status}</h6>
        </div>
    )
}