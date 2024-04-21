import React, { useContext, useEffect, useState } from "react";
import { Card, CardBody, CardFooter, Chip } from "@nextui-org/react";
import UserContext from "../../UserContext";
import Swal from "sweetalert2";

const ProductCard = ({ category, setCart, cart }) => {
    const [products, setProducts] = useState([]);

    const isProductInCart = (productId) => {
        return cart.some((item) => item._id === productId);
    };
    const { user } = useContext(UserContext);
    const loginFirst = () => {
        Swal.fire({
            title: "Login first",
            text: "It'll just take a few seconds.",
            icon: "info",
        });
    };

    useEffect(() => {
        fetch(`http://localhost:4000/products/active`)
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
            });
    }, []);

    return (
        <>
            {products.map((product) => {
                if (product.category === category) {
                    return (
                        <Card
                            key={product._id}
                            shadow="sm"
                            isPressable
                            className="Card__Product"
                        >
                            <CardBody className="overflow-visible p-0 relative">
                                <div className="image-wrapper">
                                    <img
                                        shadow="sm"
                                        radius="lg"
                                        width="100%"
                                        className="w-full object-cover product-image"
                                        src={product.image}
                                        alt=""
                                    />
                                </div>
                                {user.id !== null ? (
                                    <>
                                        {" "}
                                        <div
                                            className={`absolute h-6 w-6 rounded-full bg-slate-700 bottom-3 left-5 hover:scale-110 ease-in-out duration-200 shadow-inner ${
                                                isProductInCart(product._id)
                                                    ? "Added__Items"
                                                    : ""
                                            }`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setCart((prevCart) => {
                                                    const updatedCart = [
                                                        ...prevCart,
                                                        product,
                                                    ];
                                                    localStorage.setItem(
                                                        "cart",
                                                        JSON.stringify(
                                                            updatedCart
                                                        )
                                                    );
                                                    return updatedCart;
                                                });
                                            }}
                                        >
                                            <span
                                                className={`material-symbols-outlined text-white `}
                                            >
                                                add
                                            </span>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        {" "}
                                        <div
                                            className={`absolute h-6 w-6 rounded-full bg-slate-700 bottom-3 left-5 hover:scale-110 ease-in-out duration-200 shadow-inner ${
                                                isProductInCart(product._id)
                                                    ? "Added__Items"
                                                    : ""
                                            }`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                loginFirst();
                                            }}
                                        >
                                            <span
                                                className={`material-symbols-outlined text-white `}
                                            >
                                                add
                                            </span>
                                        </div>
                                    </>
                                )}

                                <div className="absolute bottom-2 left-2 text-xs">
                                    {isProductInCart(product._id) ? (
                                        <Chip
                                            color="danger"
                                            variant="solid"
                                            startContent={
                                                <img
                                                    src="/circle.png"
                                                    width={20}
                                                />
                                            }
                                        >
                                            Added to cart
                                        </Chip>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </CardBody>
                            <CardFooter className="text-sm md:text-xs lg:text-sm md:justify-between block Card__Footer text-start text-white lg:h-24">
                                <b>{product.name}</b>
                                <div className="md:mx-2 p-2 w-16 md:w-auto text-start font-extrabold text-yellow-300 text-large ">
                                    <span>&#8369;{product.price}</span>
                                </div>
                            </CardFooter>
                        </Card>
                    );
                } else {
                    return null;
                }
            })}
        </>
    );
};
export default function Products({ category, setCart, cart }) {
    return (
        <div>
            <div className=" gap-2 md:gap-10 grid grid-cols-2 sm:grid-cols-4 ">
                <ProductCard
                    category={category}
                    setCart={setCart}
                    cart={cart}
                />
            </div>
        </div>
    );
}
