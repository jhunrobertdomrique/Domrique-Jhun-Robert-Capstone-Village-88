import React from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import AllProducts from "../components/AllProducts";
import CxOrders from "../components/CxOrders";

export default function Dashboard() {
    return (
        <>
            <div className="All_product__Wrapper flex md:w-11/12 mx-auto flex-col p-1 md:p-5 overflow-scroll ">
                <Tabs aria-label="Options">
                    <Tab key="Manage" title="Manage Products">
                        <Card>
                            <CardBody>
                                <AllProducts />
                            </CardBody>
                        </Card>
                    </Tab>
                    <Tab key="Orders" title="Customer's Order">
                        <Card>
                            <CardBody>
                                <CxOrders />
                            </CardBody>
                        </Card>
                    </Tab>
                </Tabs>
            </div>
        </>
    );
}
