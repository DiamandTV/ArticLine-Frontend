import { PaddingView } from "@views/PaddingView";
import { createSearchParams, useNavigate } from "react-router";
import { OrderListPage } from "./OrderListPage";
import { useEffect, useState } from "react";

type OrderTabEventKeyType = 'PENDING' | 'PROGRESS' | 'DELIVERED' | 'CANCELED' 
const tabClasses = (active: boolean) =>
  `px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300 
   ${active 
      ? 'bg-blue-600 text-white shadow-md' 
      //? 'bg-primary-a40 text-white shadow-md' 
      : 'bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700'}`;

export function OrderPage(){
    const [eventKey,setEventKey] = useState<OrderTabEventKeyType>('PROGRESS')
    const navigator = useNavigate()

    useEffect(()=>{
        switch(eventKey){
            case 'PENDING':
                navigator({
                    pathname:'',
                    search:createSearchParams({
                        status:'NOT ACCEPTED'
                    }).toString()
                })
                break
            case 'PROGRESS':
                navigator({
                    pathname:'',
                    search:createSearchParams({
                        not_status__in:'DELIVERED,CANCELED'
                    }).toString()
                })
                break
            case 'DELIVERED':
                navigator({
                    pathname:'',
                    search:createSearchParams({
                        status:'DELIVERED'
                    }).toString()
                })
                break
            case 'CANCELED':
                navigator({
                    pathname:'',
                    search:createSearchParams({
                        status:'CANCELED'
                    }).toString()
                })
                break
        }
    },[eventKey])

    return(
        <PaddingView className="block h-full px-0 ">
            <div className="flex flex-row flex-wrap justify-center gap-2 mb-6 ">
                {(['PENDING','PROGRESS','DELIVERED','CANCELED'] as OrderTabEventKeyType[]).map((key)=>{
                    return(
                         <button
                            key={key}
                            onClick={() => setEventKey(key)}
                            className={tabClasses(eventKey === key)}
                        >
                            {{
                                PENDING: 'Pending',
                                PROGRESS: 'In Preparation',
                                DELIVERED: 'Delivered',
                                CANCELED : 'Canceled'
                                }[key]}
                        </button>
                    )
                })}
            </div>
            <div>
                {eventKey === 'PENDING' && <OrderListPage />}
                {eventKey === 'PROGRESS' && <OrderListPage />}
                {eventKey === 'DELIVERED' && <OrderListPage />}
                {eventKey === 'CANCELED' && <OrderListPage/>}
            </div>
        </PaddingView>
    )
}