import React, { useState, useEffect, useContext } from "react";
import { Navigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import UserContext from "../../UserContext";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
} from "@nextui-org/react";
export default function SignIn({ isOpen, onOpenChange }) {
    const { user, setUser } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isActive, setIsActive] = useState(false);

    function authenticate(e) {
        e.preventDefault();

        fetch(`http://localhost:4000/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (typeof data.access !== "undefined") {
                    localStorage.setItem("token", data.access);
                    retrieveUserDetails(data.access);
                    if (data.isAdmin) {
                        Swal.fire({
                            title: "Login Successful",
                            icon: "success",
                            text: "Welcome to Admin dashboard",
                        });
                        return <Navigate to="/dashboard" />;
                    } else {
                        Swal.fire({
                            title: "Login Successful",
                            icon: "success",
                            text: "Bida ang saya!",
                        });
                    }
                } else {
                    Swal.fire({
                        title: "Authentication Failed",
                        icon: "error",
                        text: "Check your login credentials and try again.",
                    });
                }
            });

        setEmail("");
        setPassword("");
    }

    const retrieveUserDetails = (token) => {
        fetch(`http://localhost:4000/users/:userId/userDetails`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setUser({
                    id: data._id,
                    isAdmin: data.isAdmin,
                });
            });
    };

    useEffect(() => {
        if (email !== "" && password !== "") {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [email, password]);

    return user.id !== null ? (
        <></>
    ) : (
        <>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <form onSubmit={(e) => authenticate(e)}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">
                                    Login
                                </ModalHeader>
                                <ModalBody>
                                    <Input
                                        type="email"
                                        autoFocus
                                        endContent={
                                            <span class="material-symbols-outlined text-2xl text-default-400 pointer-events-none flex-shrink-0">
                                                mail
                                            </span>
                                        }
                                        label="Email"
                                        variant="bordered"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        required
                                    />
                                    <Input
                                        endContent={
                                            <span class="material-symbols-outlined text-2xl text-default-400 pointer-events-none flex-shrink-0">
                                                password
                                            </span>
                                        }
                                        label="Password"
                                        type="password"
                                        variant="bordered"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        required
                                    />
                                </ModalBody>
                                <ModalFooter>
                                    <Button
                                        color="default"
                                        variant="flat"
                                        onPress={onClose}
                                    >
                                        Close
                                    </Button>
                                    <Button
                                        color="danger"
                                        onPress={onClose}
                                        type="submit"
                                        id="submitBtn"
                                    >
                                        Sign in
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </form>
            </Modal>
        </>
    );
}
