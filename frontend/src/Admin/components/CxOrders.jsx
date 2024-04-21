import React, { useState, useEffect } from "react";
import { ScrollShadow } from "@nextui-org/react";

export default function CxOrders() {
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(
                    "http://localhost:4000/users/allUsers"
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }
                const data = await response.json();
                setUserData(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <ScrollShadow hideScrollBar className="w-full h-[600px]">
            <div className="user-data px-5">
                <h1 className="text-2xl font-semibold mb-3">
                    Ordered Products
                </h1>
                <ul>
                    <div className="hidden lg:grid grid-cols-5 font-semibold mb-2 sticky top-0">
                        <li>Trasaction date</li>
                        <li>Product ID</li>
                        <li>Product Name</li>
                        <li className="text-center">Quantity</li>
                        <li className="text-center">Total Amount</li>
                    </div>
                    {userData.map((user) => (
                        <div key={user._id}>
                            {user.orderedProduct.map((order) => (
                                <div
                                    key={`${user._id}-${order.products[0]._id}`}
                                >
                                    <div className="lg:grid grid-cols-5 py-2">
                                        <li>
                                            <span className="lg:hidden font-semibold">
                                                Transaction date:
                                            </span>{" "}
                                            {order.purchasedOn}
                                        </li>
                                        <li>
                                            <span className="lg:hidden font-semibold">
                                                Product ID:
                                            </span>{" "}
                                            {order.products[0].productId}
                                        </li>
                                        <li>
                                            <span className="lg:hidden font-semibold">
                                                Name:
                                            </span>{" "}
                                            {order.products[0].productName}
                                        </li>
                                        <li className="lg:text-center">
                                            <span className="lg:hidden font-semibold">
                                                Quantity:
                                            </span>{" "}
                                            {order.products[0].quantity}
                                        </li>
                                        <li className="lg:text-center">
                                            <span className="lg:hidden font-semibold">
                                                Total Amount:
                                            </span>{" "}
                                            {order.totalAmount}
                                        </li>
                                    </div>
                                    <hr className="border-1" />
                                </div>
                            ))}
                        </div>
                    ))}
                </ul>
            </div>
        </ScrollShadow>
    );
}
