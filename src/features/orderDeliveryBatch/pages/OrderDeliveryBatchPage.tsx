import { PaddingView } from "@views/PaddingView"
import { useEffect, useState } from "react"
import { createSearchParams, useNavigate } from "react-router"
import { OrderDeliveryBatchListPage } from "./OrderDeliveryBatchListPage"
import { OrderDeliveryBatchStatusType } from "../models/OrderDeliveryBatch/Interface/OrderDeliveryBatchInterface"

type OrderDeliveryBatchTabEventKeyType = OrderDeliveryBatchStatusType


const tabClasses = (active: boolean) =>
  `px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300 
   ${active 
      ? 'bg-blue-600 text-white shadow-md' 
      //? 'bg-primary-a40 text-white shadow-md' 
      : 'bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700'}`;


export function OrderDeliveryBatchPage(){
    const navigator = useNavigate()
    const [eventKey,setEventKey] = useState<OrderDeliveryBatchTabEventKeyType>('IN PROGRESS')

    useEffect(()=>{
        switch(eventKey){
            case 'PENDING':
                navigator({
                    pathname:'',
                    search:createSearchParams({
                        status:'PENDING'
                    }).toString()
                })  
                break
            case 'PICKED UP':
                navigator({
                    pathname:'',
                    search:createSearchParams({
                        not_status__in:'PICKED UP'
                    }).toString()
                })
                break
            case 'IN PROGRESS':
              navigator({
                    pathname:'',
                    search:createSearchParams({
                        not_status__in:'COMPLETED'
                    }).toString()
                })
                break  
            case 'COMPLETED':
                navigator({
                    pathname:'',
                    search:createSearchParams({
                        status:'COMPLETED'
                    }).toString()
                })
                break
        }
    },[eventKey])

    return(
      <PaddingView className="block h-full px-0">
            {/* Custom pills nav */}
            <div className="flex flex-row flex-wrap justify-center gap-2 mb-6 ">
              {(['PENDING','PICKED UP','IN PROGRESS','COMPLETED'] as OrderDeliveryBatchTabEventKeyType[]).map((key) => (
                <button
                  key={key}
                  onClick={() => setEventKey(key)}
                  className={tabClasses(eventKey === key)}
                >
                  {{
                    PENDING: 'Pending',
                    'PICKED UP' : 'Picked up',
                    'IN PROGRESS':'In Progress',
                    COMPLETED:'Completed'
                  }[key]}
                </button>
              ))}
            </div>
      
            {/* Tab content */}
            <div>
              {eventKey === 'PENDING' && <OrderDeliveryBatchListPage />}
              {eventKey === 'PICKED UP' && <OrderDeliveryBatchListPage />}
              {eventKey === 'IN PROGRESS' && <OrderDeliveryBatchListPage />}
              {eventKey === 'COMPLETED' && <OrderDeliveryBatchListPage/>}
            </div>
          </PaddingView>
    )
}