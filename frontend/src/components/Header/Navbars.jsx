import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Navbar, useDisclosure } from "@nextui-org/react";
import SignIn from "../User/SignIn";
import SignUp from "../User/SignUp";
import UserContext from "../../UserContext";
import Swal from "sweetalert2";

const SignInButton = ({ onOpen }) => {
    return (
        <button className="animated-button" onClick={onOpen}>
            <svg
                viewBox="0 0 24 24"
                className="arr-2"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
            </svg>
            <span className="text">Login</span>
            <span className="circle"></span>
            <svg
                viewBox="0 0 24 24"
                className="arr-1"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
            </svg>
        </button>
    );
};

const SignUpButton = ({ onOpen }) => {
    return (
        <button className="animated-button" onClick={onOpen}>
            <svg
                viewBox="0 0 24 24"
                className="arr-2"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
            </svg>
            <span className="text">Register</span>
            <span className="circle"></span>
            <svg
                viewBox="0 0 24 24"
                className="arr-1"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
            </svg>
        </button>
    );
};

export default function Navbars({
    // isActive,
    // setActive,
    cartLength,
}) {
    const { user, setUser, unsetUser } = useContext(UserContext);
    const signInModal = useDisclosure();
    const signUpModal = useDisclosure();
    function handleLogout() {
        Swal.fire({
            title: "Are you sure you want to logout?",
            icon: "https://res.cloudinary.com/dv3x7qoak/image/upload/v1679811139/carrot_msxkvy.png",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, logout!",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire("You are now logged out!", "", "success");
                setUser(
                    setUser({
                        id: null,
                        isAdmin: null,
                    })
                );
                unsetUser();
            }
        });
    }
    return (
        <>
            <SignIn
                isOpen={signInModal.isOpen}
                onOpen={signInModal.onOpen}
                onOpenChange={signInModal.onOpenChange}
            />
            <SignUp
                isOpen={signUpModal.isOpen}
                onOpen={signUpModal.onOpen}
                onOpenChange={signUpModal.onOpenChange}
            />
            <Navbar
                shouldHideOnScroll
                id="Navbar__Container"
                className="h-unit-20 md:h-24 w-full shadow-md flex justify-evenly items-center z-50"
            >
                <div className="flex gap-5 mx-5 lg:relative -left-36 md:left-0">
                    <div className="inline-flex items-center gap-3">
                        <div>
                            <img
                                src="/jollibee-logo-white.png"
                                className="md:w-44 w-32 hover:cursor-pointer"
                            />
                        </div>
                        <div>
                            {user.isAdmin === true ? (
                                <div className="flex items-center gap-1">
                                    <img src="/admin.png" width={50} />
                                    <span className="text-white font-semibold text-xs md:text-sm">
                                        Admin Dashboard
                                    </span>
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                </div>
                {user.isAdmin === true ? (
                    <></>
                ) : (
                    <ul className="md:flex gap-14 hidden md:text-nowrap">
                        <a href="#Categories__Title">
                            <li>Menu</li>
                        </a>

                        <a href="#Contact__Container">
                            <li>Contact Us</li>
                        </a>
                    </ul>
                )}

                {user.id !== null ? (
                    <div
                        onClick={handleLogout}
                        className="hover:cursor-pointer hover:scale-105"
                    >
                        <span className="material-symbols-outlined text-white">
                            logout
                        </span>
                    </div>
                ) : (
                    <div className="flex gap-4 items-center w-56 ">
                        <div className="hidden relative text-xs md:right-10 xl:-right-36 md:flex md:text-nowrap gap-2">
                            <SignInButton onOpen={signInModal.onOpen} />
                            <SignUpButton onOpen={signUpModal.onOpen} />
                        </div>
                        <div className="md:hidden text-medium text-white flex md:text-nowrap gap-3 ms-10 md:ms-0">
                            <p onClick={signInModal.onOpen}>Login</p>
                            <p onClick={signInModal.onOpen}>Register</p>
                        </div>
                    </div>
                )}
            </Navbar>
            {user.isAdmin === true ? (
                ""
            ) : (
                <div className="Search__Outside px-8 py-5 md:mt-0 md:px-20  sticky top-0 z-40">
                    <div className="flex items-center justify-between md:justify-end">
                        <Link
                            to="/"
                            className="bg-transparent hover:scale-110 ease-in-out duration-300 flex gap-1 md:hidden items-center"
                        >
                            <span>
                                <img src="/fork.png" className="w-8" />
                            </span>
                            <span className="text-xs text-white">
                                Back to menu
                            </span>
                        </Link>
                        {user.id !== null ? (
                            <>
                                <Link
                                    to="/cart"
                                    className="relative hover:cursor-pointer "
                                >
                                    <img
                                        src="/shopping-cart.png"
                                        className="w-8 hover:scale-105 ease-in-out duration-300"
                                    />
                                    <div className="absolute font-bold text-red-700 h-6 min-w-6 rounded-full bg-zinc-50 -top-2 left-8 flex items-center p-1 ">
                                        <span className="mx-auto">
                                            {cartLength}
                                        </span>
                                    </div>
                                </Link>
                            </>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
