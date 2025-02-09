import { Tab } from "@mui/material";
import { TabsProvider } from "../../components/Tabs/TabProvider";
import { TabPanel, TabsApp } from "../../components/Tabs/Tabs";
import { PaginationProvider } from "../../components/Pagination/PaginationProvider";
import { OrderBatchCompanyActive } from "../../components/OrderCompanyBatch/OrderBatchCompanyActive";
import { OrderBatchCompanyNoActive } from "../../components/OrderCompanyBatch/OrderBatchCompanyNoActive";

export function OrdersCompanyChunck(){

    return (
        <TabsProvider>
            <div className="w-full flex flex-col gap-y-2">
                <TabsApp>
                    <Tab label="ACTIVE ORDERS BATCH"/>
                    <Tab label="INACTIVE ORDERS BATCH"/>
                </TabsApp>
                <TabPanel index={0}>
                    <PaginationProvider>
                        <OrderBatchCompanyActive/>
                    </PaginationProvider>
                </TabPanel>
                <TabPanel index={1}>
                    <PaginationProvider>
                        <OrderBatchCompanyNoActive/>
                    </PaginationProvider>
                </TabPanel>
            </div>
        </TabsProvider>
    )   
}