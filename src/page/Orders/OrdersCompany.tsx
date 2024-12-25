import { Tab } from "@mui/material";
import { OrderCompanyActive } from "../../components/OrderCompany/OrderCompanyActive";
import { PaginationProvider } from "../../components/Pagination/PaginationProvider";
import { TabPanel, TabsApp } from "../../components/Tabs/Tabs";
import { TabsProvider } from "../../components/Tabs/TabProvider";
import { OrderCompanyNoActive } from "../../components/OrderCompany/OrderCompanyNotActive";

export function OrdersCompany(){
    return(
        <TabsProvider>
            <div className="w-full flex flex-col gap-y-2">
                <TabsApp>
                    <Tab label="ACTIVE ORDERS"/>
                    <Tab label="INACTIVE ORDERS"/>
                </TabsApp>
                <TabPanel index={0}>
                    <PaginationProvider>
                        <OrderCompanyActive/>
                    </PaginationProvider>
                </TabPanel>
                <TabPanel index={1}>
                    <PaginationProvider>
                        <OrderCompanyNoActive/>
                    </PaginationProvider>
                </TabPanel>
            </div>
        </TabsProvider>
    )
}