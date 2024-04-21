import React from "react";
import { Link } from "react-router-dom";

const Subtotal = ({ cart }) => {
    const subtotal = cart.reduce((acc, item) => {
        return acc + item.price;
    }, 0);
    let deliveryFee = 0;
    if (subtotal) {
        deliveryFee = 25;
    }

    return (
        <>
            <div className="h-full py-10 md:pt-16 md:pb-48 px-3 md:px-28 md:w-9/12 ">
                <h1 className="text-2xl font-semibold">Order Summary</h1>
                <ul className="">
                    <div className="grid grid-cols-2 py-2">
                        <li>Subtotal</li>
                        <li>&#8369; {subtotal}</li>
                    </div>
                    <hr className="md:w-7/12" />
                    <div className="grid grid-cols-2 py-2">
                        <li>Delivery Fee</li>
                        <li>&#8369; {deliveryFee}</li>
                    </div>
                    <hr className="md:w-7/12" />
                    <div className="grid grid-cols-2 py-2">
                        <li className="font-bold text-xl">Total</li>
                        <li className="font-bold text-xl">
                            &#8369; {subtotal + deliveryFee}
                        </li>
                    </div>
                    <hr className="md:w-7/12" />
                </ul>
                <div className="md:py-10 py-5">
                    <Link
                        to="/checkout"
                        className="bg-transparent hover:bg-red-500 hover:border-0 p-3 border-3 border-red-600 ease-in-out duration-75 hover:text-white rounded-md md:px-20 text-sm"
                    >
                        Proceed To Checkout
                    </Link>
                </div>
            </div>
        </>
    );
};

export default function Cart({ cart, setCart }) {
    const aggregatedItems = cart.reduce((acc, item) => {
        if (item._id in acc) {
            acc[item._id].count++;
        } else {
            acc[item._id] = { ...item, count: 1 };
        }
        return acc;
    }, {});
    const uniqueItems = Object.values(aggregatedItems);
    const handleDelete = (itemId) => {
        const updatedCart = cart.filter((item) => item._id !== itemId);
        setCart(updatedCart);
        const updatedCartJSON = JSON.stringify(updatedCart);
        localStorage.setItem("cart", updatedCartJSON);
    };

    const handleDecrement = (itemId) => {
        const indexToRemove = cart.findIndex((item) => item._id === itemId);
        if (indexToRemove === -1) {
            return;
        }
        const newCart = [
            ...cart.slice(0, indexToRemove),
            ...cart.slice(indexToRemove + 1),
        ];
        setCart(newCart);
        const updatedCartJSON = JSON.stringify(newCart);
        localStorage.setItem("cart", updatedCartJSON);
    };

    const handleIncrement = (itemId) => {
        const indexToUpdate = cart.findIndex((item) => item._id === itemId);
        if (indexToUpdate === -1) {
            return;
        }
        const objectAtIndex = cart[indexToUpdate];
        setCart([...cart, objectAtIndex]);
        localStorage.setItem("cart", JSON.stringify([...cart, objectAtIndex]));
    };

    return (
        <>
            <div className="md:w-11/12 p-3 mx-auto">
                <div className="p-0 bg-transparent py-2 md:py-10 flex items-center gap-4">
                    <Link
                        to="/"
                        className="bg-transparent hover:scale-110 ease-in-out duration-300 hidden md:block "
                    >
                        <span>
                            <img src="/back.png" width={40} />
                        </span>
                    </Link>
                    <span className="font-semibold text-medium">
                        Back to Menu
                    </span>
                </div>
                <div className="w-11/12 mx-auto ">
                    <ul>
                        <div className="grid grid-cols-5 gap-4 font-semibold ">
                            <li>Order preview</li>
                            <li>Order name</li>
                            <li>Price</li>
                            <li>Quantity</li>
                            <li className="hidden md:block">Remove</li>
                        </div>

                        {uniqueItems.length < 1 ? (
                            <div className="p-6 flex items-center">
                                <img src="/jollyride.svg" className="w-56" />{" "}
                                <span className="text-4xl">No items added</span>
                            </div>
                        ) : (
                            uniqueItems.map((item, index) => (
                                <div key={index}>
                                    <div className="items-start grid grid-cols-5 gap-4 py-6 md:py-3 relative md:static ">
                                        <li className="">
                                            <img width={100} src={item.image} />
                                        </li>
                                        <li className="text-xs md:text-medium">
                                            {item.name}
                                        </li>
                                        <li>&#8369;{item.price}</li>
                                        <li>
                                            <div className="w-28 items-center justify-between bg-slate-100 flex ">
                                                <div
                                                    className="hover:cursor-pointer bg-slate-200 text-white flex items-center"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleDecrement(
                                                            item._id
                                                        );
                                                    }}
                                                >
                                                    <img
                                                        src="/decrement.svg"
                                                        className="w-8"
                                                    />
                                                </div>
                                                <span className="text-sm flex justify-center">
                                                    {item.count}
                                                </span>
                                                <div
                                                    className="hover:cursor-pointer bg-slate-300 flex items-center"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleIncrement(
                                                            item._id
                                                        );
                                                    }}
                                                >
                                                    <img
                                                        src="/add.svg"
                                                        className="w-8"
                                                    />
                                                </div>
                                            </div>
                                        </li>
                                        <li
                                            className="cursor-pointer flex items-center absolute md:static top-14 right-6"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleDelete(item._id);
                                            }}
                                        >
                                            <img
                                                src="/remove.svg"
                                                className="w-8"
                                            />
                                        </li>
                                    </div>
                                    <hr className="w-11/12" />
                                </div>
                            ))
                        )}
                    </ul>
                </div>
            </div>
            <Subtotal cart={cart} />
        </>
    );
}
