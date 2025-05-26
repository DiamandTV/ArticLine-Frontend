import { PaddingView } from "@views/PaddingView"
import { useEffect, useState } from "react"
import { Tab, Tabs } from "react-bootstrap"
import { createSearchParams, useNavigate } from "react-router"
import { OrderDeliveryBatchListPage } from "./OrderDeliveryBatchListPage"
import { OrderDeliveryBatch } from "../compositions/OrderDeliveyBatch"

type OrderDeliveryBatchTabEventKeyType = 'PROGRESS' | 'FINISHED'
export function OrderDeliveryBatchPage(){
    const navigator = useNavigate()
    const [eventKey,setEventKey] = useState<OrderDeliveryBatchTabEventKeyType>('PROGRESS')

    useEffect(()=>{
        switch(eventKey){
            case 'PROGRESS':
              navigator({
                    pathname:'',
                    search:createSearchParams({
                        not_status__in:'COMPLETED'
                    }).toString()
                })
                break  
            case 'FINISHED':
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
        <PaddingView className="block px-0">
            <OrderDeliveryBatch.CreateButton/>
            <Tabs fill activeKey={eventKey} onSelect={(k)=>setEventKey(k as OrderDeliveryBatchTabEventKeyType)}>
                <Tab
                    eventKey='PROGRESS'
                    title='In Preparation'
                >
                    <OrderDeliveryBatchListPage/>
                </Tab>
                <Tab
                    eventKey='FINISHED'
                    title='Completed'
                >

                </Tab>
                <OrderDeliveryBatchListPage/>
            </Tabs>
        </PaddingView>
    )
}