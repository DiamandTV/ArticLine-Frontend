import { PaddingView } from "@views/PaddingView";
import { Tab, Tabs } from "react-bootstrap";
import { OrderBusinessListPage } from "./OrderBusinessListPage";
import { createSearchParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";

type OrderBusinessTabEventKeyType = 'NEW' | 'PROGRESS' | 'FINISHED' 

export function OrderBusinessPage(){
    const navigator = useNavigate()
    const [eventKey,setEventKey] = useState<OrderBusinessTabEventKeyType>('NEW')
    
    useEffect(()=>{
        switch(eventKey){
            case 'NEW':
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
                        not_status__in:'NOT ACCEPTED,DELIVERED'
                    }).toString()
                })
                break
            case 'FINISHED':
                navigator({
                    pathname:'',
                    search:createSearchParams({
                        status:'DELIVERED'
                    }).toString()
                })
                break
        }
    },[eventKey])

    return(
        <PaddingView className="block px-0 ">
            <Tabs fill activeKey={eventKey} onSelect={(k) => setEventKey(k as OrderBusinessTabEventKeyType)}
>
                <Tab 
                    eventKey={'NEW'}
                    title="New Orders">
                    {/* Newly placed orders, not yet accepted */}
                    <OrderBusinessListPage/>
                </Tab>
                <Tab 
                    eventKey={'PROGRESS'}
                    title="In Preparation" >
                    {/* Orders being prepared */}
                    <OrderBusinessListPage/>
                </Tab>
                <Tab 
                    eventKey={'FINISHED'}
                    title="Delivered" >
                    {/* Delivered or cancelled orders */}
                    <OrderBusinessListPage/>
                </Tab>
            </Tabs>
        </PaddingView>

    )
}