import { PaddingView } from "@views/PaddingView";
import { Tab, Tabs } from "react-bootstrap";
import { createSearchParams, useNavigate } from "react-router";
import { OrderListPage } from "./OrderListPage";

export function OrderPage(){
    const navigator = useNavigate()
    return(
        <PaddingView className="block px-0">
            <Tabs fill>
                <Tab 
                    eventKey="progress"
                    title="In Progress"
                    onEnter={()=>{
                        navigator({
                            pathname:'',
                            search:createSearchParams({
                                not_status__in:'DELIVERED,CANCELED'
                            }).toString()
                        })
                    }}
                >
                    <OrderListPage/>
                </Tab>
                <Tab 
                    eventKey="finished"
                    title="Finished"
                    onEnter={()=>{
                        navigator({
                            pathname:'',
                            search:createSearchParams({
                                status__in:'DELIVERED,CANCELED'
                            }).toString()
                        })
                    }}
                >
                    <OrderListPage/>
                </Tab>
            </Tabs>
        </PaddingView>
    )
}