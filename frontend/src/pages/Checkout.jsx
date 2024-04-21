import React, { useEffect, useState, useContext } from "react";
import { Input, Button } from "@nextui-org/react";
import UserContext from "../UserContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Subtotal = ({ cart, product }) => {
    const subtotal = cart.reduce((acc, item) => {
        return acc + item.price;
    }, 0);
    let deliveryFee = 0;
    if (subtotal) {
        deliveryFee = 25;
    }

    return (
        <>
            <div>
                <h1 className="text-2xl font-semibold py-5">Order Summary</h1>
                <ul className="">
                    <div className="grid grid-cols-2 py-2">
                        <li>Subtotal</li>
                        <li className="text-end">&#8369; {subtotal}</li>
                    </div>
                    <hr className="w-full" />
                    <div className="grid grid-cols-2 py-2">
                        <li>Delivery Fee</li>
                        <li className="text-end">&#8369; {deliveryFee}</li>
                    </div>
                    <hr className="w-full" />
                    <div className="grid grid-cols-2 py-2">
                        <li className="font-bold text-xl">Total</li>
                        <li className="font-bold text-xl text-end">
                            &#8369; {subtotal + deliveryFee}
                        </li>
                    </div>
                    <hr className="w-full" />
                </ul>
                <div className="py-3">
                    <Button
                        color="danger"
                        variant="ghost"
                        className="md:w-96 w-full"
                        onClick={() => {
                            product();
                        }}
                    >
                        Place Order
                    </Button>
                </div>
            </div>
        </>
    );
};

const aggregation = (cart) => {
    const aggregatedItems = cart.reduce((acc, item) => {
        if (item._id in acc) {
            acc[item._id].count++;
        } else {
            acc[item._id] = { ...item, count: 1 };
        }
        return acc;
    }, {});
    const uniqueItems = Object.values(aggregatedItems);
    return uniqueItems;
};

export default function Checkout({ cart }) {
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [country, setCountry] = useState("");
    const [address, setAddress] = useState("");

    const handleConcatenateAddress = () => {
        const concatenatedAddress = `${street}, ${city}, ${state}, ${zipCode}, ${country}`;
        setAddress(concatenatedAddress);
    };

    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const userId = user.id;

    let aggregatedCart = aggregation(cart);

    let check = aggregatedCart.map((item) => ({
        productId: item._id,
        userId: userId,
        productName: item.name,
        quantity: item.count,
    }));

    const totalPayment = (cart) => {
        const subtotal = cart.reduce((acc, item) => {
            return acc + item.price;
        }, 0);
        let deliveryFee = 0;
        if (subtotal) {
            deliveryFee = 25;
        }
        let total = subtotal + deliveryFee;
        return total;
    };
    const total = totalPayment(cart);

    const requestBody = {
        check: check,
        total: total,
        address: address,
    };

    const product = () => {
        fetch(`http://localhost:4000/users/checkout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(requestBody),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);

                if (data) {
                    Swal.fire({
                        title: "Checked Out!",
                        icon: "success",
                        text: "Thank you for Purchasing.",
                    });
                    localStorage.removeItem("cart");
                    navigate("/");
                    window.location.reload();
                } else {
                    Swal.fire({
                        title: "Something went wrong",
                        icon: "error",
                        text: "Please try again.",
                    });
                }
            });
    };
    useEffect(() => {
        handleConcatenateAddress();
    }, [street, city, state, zipCode, country, address]);
    return (
        <div className="min-h-unit-8xl md:flex items-center justify-around w-full p-7">
            <div>
                <h1 className="font-bold text-2xl mb-3 md:text-4xl  md:py-5  text-red-600">
                    Delivery Information
                </h1>
                <form className="">
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mb-4">
                        <Input
                            size="sm"
                            type="text"
                            label="Street"
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                        />
                    </div>
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4  mb-4">
                        <Input
                            size="sm"
                            type="text"
                            label="City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                        <Input
                            size="sm"
                            type="text"
                            label="State"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                        />
                    </div>
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4  mb-4">
                        <Input
                            size="sm"
                            type="text"
                            label="Zip code"
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                        />
                        <Input
                            size="sm"
                            type="text"
                            label="Country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        />
                    </div>
                </form>
            </div>
            <div>
                <Subtotal cart={cart} product={product} />
            </div>
        </div>
    );
}
