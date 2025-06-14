import { Badge } from "@components/Badge/Badge";
import { IoIosSend } from "react-icons/io";
interface ChatButtonProps extends React.HTMLAttributes<HTMLElement>{
    newMsgNumbers?:number
}
export function ChatButton({newMsgNumbers,...props}:ChatButtonProps){
    return(
        <Badge
            {...props}
            badgeContent={newMsgNumbers?.toString()}
            
        >
           <IoIosSend className="text-2xl md:text-4xl text-surface-a30"/>
        </Badge>
    )
}