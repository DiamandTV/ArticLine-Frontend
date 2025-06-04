import { TabsProvider } from "@context/Tabs/TabsProvider";
import { TabsContext } from "@context/Tabs/TabsContext";
import { Container, Tab, Tabs } from "react-bootstrap";
import { PasswordActualForm } from "../../forms/PasswordChangeForm/PasswordActualForm";
import { PasswordChangeForm } from "../../forms/PasswordChangeForm/PasswordChangeForm";
import { PasswordActualProvider } from "@features/autentication/context/PasswordActualContext/PasswordActualProvider";

export function AuthPasswordCard(){
    
    return(
        <div className="p-2 rounded-lg bg-surface-a0">
            <Container className="rounded-lg bg-surface-a0 p-mb-df">
                <h1 className="pb-2 text-base font-medium">PASSWORD CHANGE</h1>
                <PasswordActualProvider>
                    <TabsProvider defaultKey={'actual_password'}>
                        <TabsContext.Consumer>
                            {
                                ({key})=>{
                                    return(
                                        <Tabs className="hidden" activeKey={key}>
                                            <Tab eventKey="actual_password" title="ACTUAL PASSWORD">
                                                <div className="flex flex-col w-full gap-2">
                                                    <h3 className="text-sm font-light">To change your password, please enter your current one to verify your identity. 🔐👤</h3>
                                                    <PasswordActualForm/>
                                                </div>
                                            </Tab>
                                            <Tab eventKey="change_password" title="CHANGE PASSWORD">
                                                <PasswordChangeForm/>
                                            </Tab>
                                        </Tabs>
                                    )
                                }
                            }
                        </TabsContext.Consumer>
                    </TabsProvider>
                </PasswordActualProvider>
            </Container>
        </div>
    )
}