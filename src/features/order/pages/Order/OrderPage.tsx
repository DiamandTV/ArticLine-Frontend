import { PaddingView } from "@views/PaddingView";
import { Tab, Tabs } from "react-bootstrap";
import { createSearchParams, useNavigate } from "react-router";
import { OrderListPage } from "./OrderListPage";
import { useEffect, useState } from "react";

type OrderTabEventKeyType = 'PROGRESS' | 'FINISHED' 
export function OrderPage(){
    const [eventKey,setEventKey] = useState<OrderTabEventKeyType>('PROGRESS')
    const navigator = useNavigate()

    useEffect(()=>{
        switch(eventKey){
            case 'PROGRESS':
                navigator({
                    pathname:'',
                    search:createSearchParams({
                        not_status__in:'DELIVERED,CANCELED'
                    }).toString()
                })
                break
            case 'FINISHED':
                navigator({
                    pathname:'',
                    search:createSearchParams({
                        status__in:'DELIVERED,CANCELED'
                    }).toString()
                })
                break
        }
    },[eventKey])

    return(
        <PaddingView className="block px-0">
            <Tabs fill activeKey={eventKey} onSelect={(k)=>setEventKey(k as OrderTabEventKeyType)}>
                <Tab 
                    eventKey="PROGRESS"
                    title="In Progress"
                >
                    <OrderListPage/>
                </Tab>
                <Tab 
                    eventKey="FINISHED"
                    title="Finished"
                >
                    <OrderListPage/>
                </Tab>
            </Tabs>
        </PaddingView>
    )
}