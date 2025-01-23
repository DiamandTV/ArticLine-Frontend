import { Step, StepLabel, Stepper, SxProps } from "@mui/material";
import { OrderStatus, STATUS_INDEX } from "../../models/Order";
import { AiOutlineCloseCircle, AiOutlineCheckCircle, AiOutlineSync } from 'react-icons/ai';
import { FiSend } from 'react-icons/fi';
import { FaBoxOpen } from 'react-icons/fa';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getStepperStyle():SxProps{

    return  {

        "& .Mui-active":{
            "&.MuiStepIcon-root":{
                color:"rgb(14 165 233)",
            },
            "&.MuiStepLabel-label":{
                color:"white"
            }
        },
        "& .Mui-completed":{
            "&.MuiStepIcon-root":{
                color:"rgb(14 165 233)"
            },
            //{ Questo si applica al componente attivo }
            "&.MuiStepLabel-label":{
                color: "white"
            }
        },        
        //{  Questo cerca un figlio con la classe Mui-active },
        "& .MuiStepLabel-label":{
            color:"rgb(163 163 163)",
        }
    } 
}



function OrderStatusProgressBarIcon({ status }: { status :unknown}) {
    switch (status) {
        case 'NOT ACCEPTED':
            return <AiOutlineCloseCircle size={24}/>;
        case 'ACCEPTED':
            return <AiOutlineCheckCircle size={24}/>;
        case 'WORKING ON':
            return <AiOutlineSync size={24}/>;
        case 'SENDED':
            return <FiSend size={24}/>;
        case 'DELIVERED':
            return <FaBoxOpen size={24}/>;
        default:
            return <AiOutlineCloseCircle size={24} color="gray"/>;
    }
}

export function StatusProgressBar({status,STATUS}:{status:string,STATUS:Record<string,number>}){
    return ( 
        <div className="w-1/2">
            <Stepper activeStep={STATUS[status]! as number}  orientation="vertical" >
                {
                    Object.keys(STATUS).map((state)=>{
                        return(
                            <Step key={state} sx={getStepperStyle()}>
                                {/*<StepLabel icon={<OrderStatusProgressBarIcon status={state}/>}>*/}
                                <StepLabel>    
                                    {state}
                                </StepLabel>
                            </Step>
                        )
                    })
                }
            </Stepper>
        </div>
    )
}

export function OrderStatusProgressBar({status,STATUS}:{status:OrderStatus,STATUS:Record<string,number>}){
    
    return(
        <>
            <StatusProgressBar status={status} STATUS={STATUS}/>
        </>
    )
}
