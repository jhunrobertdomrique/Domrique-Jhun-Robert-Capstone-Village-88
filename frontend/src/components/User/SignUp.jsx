import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../UserContext";
import Swal from "sweetalert2";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
} from "@nextui-org/react";

export default function SignUp({ isOpen, onOpenChange }) {
    const { user } = useContext(UserContext);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    const [isActive, setIsActive] = useState(false);

    function registerUser(e) {
        e.preventDefault();

        fetch(`http://localhost:4000/users/checkEmail`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);

                if (data === true) {
                    Swal.fire({
                        title: "Duplicate email found",
                        icon: "error",
                        text: "Kindly provide another email to complete the registration.",
                    });
                } else {
                    fetch(`http://localhost:4000/users/register`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            firstName: firstName,
                            lastName: lastName,
                            email: email,
                            mobileNo: mobileNo,
                            password: password1,
                        }),
                    })
                        .then((res) => res.json())
                        .then((data) => {
                            if (data === true) {
                                setFirstName("");
                                setLastName("");
                                setEmail("");
                                setMobileNo("");
                                setPassword1("");
                                setPassword2("");

                                Swal.fire({
                                    title: "Registration successful",
                                    icon: "success",
                                    text: "Welcome to Jolly Go!",
                                });
                            } else {
                                Swal.fire({
                                    title: "Something wrong",
                                    icon: "error",
                                    text: "Please try again.",
                                });
                            }
                        });
                }
            });
    }

    useEffect(() => {
        if (
            firstName !== "" &&
            lastName !== "" &&
            email !== "" &&
            mobileNo.length === 11 &&
            password1 !== "" &&
            password2 !== "" &&
            password1 === password2
        ) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [firstName, lastName, email, mobileNo, password1, password2]);
    return user.id !== null ? (
        <></>
    ) : (
        <>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <form onSubmit={(e) => registerUser(e)}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">
                                    Register
                                </ModalHeader>
                                <ModalBody>
                                    <Input
                                        autoFocus
                                        label="First Name"
                                        variant="bordered"
                                        type="text"
                                        value={firstName}
                                        onChange={(e) =>
                                            setFirstName(e.target.value)
                                        }
                                        required
                                    />
                                    <Input
                                        autoFocus
                                        label="Last Name"
                                        variant="bordered"
                                        type="text"
                                        value={lastName}
                                        onChange={(e) =>
                                            setLastName(e.target.value)
                                        }
                                        required
                                    />
                                    <Input
                                        autoFocus
                                        endContent={
                                            <span className="material-symbols-outlined text-2xl text-default-400 pointer-events-none flex-shrink-0">
                                                mail
                                            </span>
                                        }
                                        label="Email"
                                        variant="bordered"
                                        type="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        required
                                    />
                                    <Input
                                        autoFocus
                                        endContent={
                                            <span className="material-symbols-outlined text-2xl text-default-400 pointer-events-none flex-shrink-0">
                                                call
                                            </span>
                                        }
                                        label="Mobile Number"
                                        variant="bordered"
                                        type="text"
                                        value={mobileNo}
                                        onChange={(e) =>
                                            setMobileNo(e.target.value)
                                        }
                                        required
                                    />
                                    <Input
                                        endContent={
                                            <span className="material-symbols-outlined text-2xl text-default-400 pointer-events-none flex-shrink-0">
                                                password
                                            </span>
                                        }
                                        label="Password"
                                        type="password"
                                        variant="bordered"
                                        value={password1}
                                        onChange={(e) =>
                                            setPassword1(e.target.value)
                                        }
                                        required
                                    />
                                    <Input
                                        endContent={
                                            <span className="material-symbols-outlined text-2xl text-default-400 pointer-events-none flex-shrink-0">
                                                password
                                            </span>
                                        }
                                        label="Confirm Password"
                                        variant="bordered"
                                        type="password"
                                        value={password2}
                                        onChange={(e) =>
                                            setPassword2(e.target.value)
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
                                        isDisabled={!isActive}
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
