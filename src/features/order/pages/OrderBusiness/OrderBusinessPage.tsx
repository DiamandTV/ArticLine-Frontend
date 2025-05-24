import { PaddingView } from "@views/PaddingView";
import { Tab, Tabs } from "react-bootstrap";
import { OrderBusinessListPage } from "./OrderBusinessListPage";
import { createSearchParams, useNavigate } from "react-router";

export function OrderBusinessPage(){
    const navigator = useNavigate()
    return(
        <PaddingView className="block px-0 ">
            <Tabs fill >
                <Tab 
                    eventKey="new"
                    title="New Orders"  
                    onEnter={()=>{
                        navigator({
                            pathname:'',
                            search:createSearchParams({
                                status:'NOT ACCEPTED'
                            }).toString()
                        })
                    }}>
                    {/* Newly placed orders, not yet accepted */}
                    <OrderBusinessListPage/>
                </Tab>
                <Tab 
                    eventKey="progress"
                    title="In Preparation" 
                    onEnter={()=>{
                        navigator({
                            pathname:'',
                            search:createSearchParams({
                                not_status__in:'NOT ACCEPTED,DELIVERED'
                            }).toString()
                        })
                    }}
                >
                    {/* Orders being prepared */}
                    <OrderBusinessListPage/>
                </Tab>
                <Tab 
                    eventKey="delivered"
                    title="Delivered" 
                    onEnter={()=>{
                        navigator({
                            pathname:'',
                            search:createSearchParams({
                                status:'DELIVERED'
                            }).toString()
                        })
                    }}
                >
                    {/* Delivered or cancelled orders */}
                    <OrderBusinessListPage/>
                </Tab>
            </Tabs>
        </PaddingView>

    )
}