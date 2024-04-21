import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./UserContext";
import "./App.css";

import Navbars from "./components/Header/Navbars";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Contact from "./components/Footer/Contact";
import Logout from "./components/User/Logout";
import Dashboard from "./Admin/pages/Dashboard";
import Checkout from "./pages/Checkout";

export default function App() {
    const [user, setUser] = useState({
        id: null,
        isAdmin: null,
    });

    const unsetUser = () => {
        setUser({
            id: null,
            isAdmin: null,
        });
        localStorage.clear();
    };

    useEffect(() => {
        fetch(`http://localhost:4000/users/${user.id}/userDetails`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setUser({
                    id: data._id,
                    isAdmin: data.isAdmin,
                });
            });
    }, []);
    const [cart, setCart] = useState(() => {
        const storedCart = localStorage.getItem("cart");
        return storedCart ? JSON.parse(storedCart) : [];
    });
    const [cartLength, setCartLength] = useState(0);

    useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        setCartLength(storedCart ? JSON.parse(storedCart).length : 0);
    }, [cart, setCart, cartLength]);

    return (
        <>
            <UserProvider value={{ user, setUser, unsetUser }}>
                <BrowserRouter>
                    <div className="">
                        <Navbars cartLength={cartLength} />

                        {user.isAdmin === true ? (
                            <>
                                <Routes>
                                    <Route path="/" element={<Dashboard />} />
                                </Routes>
                            </>
                        ) : (
                            <Routes>
                                <Route
                                    path="/"
                                    element={
                                        <Home cart={cart} setCart={setCart} />
                                    }
                                />
                                <Route
                                    path="/cart"
                                    element={
                                        <Cart cart={cart} setCart={setCart} />
                                    }
                                />
                                <Route path="/logout" element={<Logout />} />
                                <Route
                                    path="/checkout"
                                    element={<Checkout cart={cart} />}
                                />
                            </Routes>
                        )}

                        {user.isAdmin === true ? <></> : <Contact />}
                    </div>
                </BrowserRouter>
            </UserProvider>
        </>
    );
}
