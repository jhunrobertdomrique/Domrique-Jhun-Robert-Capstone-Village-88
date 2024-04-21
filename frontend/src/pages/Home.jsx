import React, { useState, useEffect } from "react";
import Cover from "../components/Header/Cover";
import Categories from "../components/Main/Categories";
import Products from "../components/Main/Products";

export default function Home({ setCart, cart }) {
    const [category, setCategory] = useState("bestSellers");

    useEffect(() => {}, [category, setCategory]);
    return (
        <>
            <div className="Main__Container">
                <Cover />
                <div className="lg:px-20 mx-auto">
                    <div className="px-2 md:px-0 md:pb-10">
                        <Categories setCategory={setCategory} />
                    </div>
                </div>
                <div
                    id="Products"
                    className=" lg:px-32 Product__Wrapper md:pb-20"
                >
                    <Products
                        setCart={setCart}
                        category={category}
                        cart={cart}
                    />
                </div>
            </div>
        </>
    );
}
