import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Input,
    Select,
    SelectItem,
    ScrollShadow,
    Textarea,
    RadioGroup,
    Radio,
} from "@nextui-org/react";
const categories = {
    bestSellers: {
        imgSrc: "/best-sellers.png",
        category: "Best Seller",
    },
    newProducts: {
        imgSrc: "/new-products.png",
        category: "New Products",
    },
    familyMeals: {
        imgSrc: "/family-meals.png",
        category: "Family Meals",
    },
    breakfast: {
        imgSrc: "/breakfast.png",
        category: "Breakfast",
    },
    chickenJoy: {
        imgSrc: "/chickenjoy.png",
        category: "Chickenjoy",
    },
    chickenNuggets: {
        imgSrc: "/chicken-nuggets.png",
        category: "Chicken Nuggets",
    },
    burger: {
        imgSrc: "/burger.png",
        category: "Burgers",
    },
    jollySpaghetti: {
        imgSrc: "/jolly-spaghetti.png",
        category: "Jolly Spaghetti",
    },
    burgerSteak: {
        imgSrc: "/burger-steak.png",
        category: "Burger Steak",
    },
    superMeals: {
        imgSrc: "/super-meals.png",
        category: "Super Meals",
    },
    chickenSandwich: {
        imgSrc: "/chicken-sandwich.png",
        category: "Chicken Sandwich",
    },
    jollyHotdogAndPies: {
        imgSrc: "/jolly-hotdog-and-pies.png",
        category: "Jolly Hotdog and Pies",
    },
    palabok: {
        imgSrc: "/palabok.png",
        category: "Palabok",
    },
    friesAndSide: {
        imgSrc: "/fries-and-side.png",
        category: "Fries and Sides",
    },
    desserts: {
        imgSrc: "/desserts.png",
        category: "Desserts",
    },
    beverages: {
        imgSrc: "/beverages.png",
        category: "Beverages",
    },

    jollibeeKidsMeal: {
        imgSrc: "/jollibee-kids-meal.png",
        category: "Jollibee Kids Meal",
    },
};
const CreateProduct = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const navigate = useNavigate();

    const [category, setCategory] = useState("");
    const [name, setname] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");

    function addNewProduct(e) {
        e.preventDefault();

        fetch(`http://localhost:4000/products/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
                category: category,
                name: name,
                description: description,
                price: price,
                image: image,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data === true) {
                    Swal.fire({
                        title: "New product added!",
                        icon: "success",
                        text: name,
                    });
                    setname("");
                    setCategory("");
                    setDescription("");
                    setPrice("");
                    setImage("");
                    navigate("/");
                } else {
                    Swal.fire({
                        title: "Something wrong",
                        icon: "error",
                        text: "Please try again.",
                    });
                }
            });
    }

    useEffect(() => {}, [name, description, price, category]);

    return (
        <>
            <Button className="w-32" onPress={onOpen} color="danger">
                Add product
            </Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <form onSubmit={(e) => addNewProduct(e)}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">
                                    Add product
                                </ModalHeader>
                                <ModalBody>
                                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                        <Select
                                            label="Select category"
                                            className="max-w-xs"
                                            value={category}
                                            onChange={(e) =>
                                                setCategory(e.target.value)
                                            }
                                        >
                                            {Object.entries(categories).map(
                                                ([key, value]) => (
                                                    <SelectItem
                                                        key={key}
                                                        value={key}
                                                    >
                                                        {value.category}
                                                    </SelectItem>
                                                )
                                            )}
                                        </Select>
                                    </div>
                                    <Input
                                        autoFocus
                                        label="Add image URL"
                                        variant="bordered"
                                        type="text"
                                        value={image}
                                        onChange={(e) =>
                                            setImage(e.target.value)
                                        }
                                        required
                                    />
                                    <Input
                                        autoFocus
                                        label="Product Name"
                                        variant="bordered"
                                        type="text"
                                        value={name}
                                        onChange={(e) =>
                                            setname(e.target.value)
                                        }
                                        required
                                    />

                                    <Input
                                        autoFocus
                                        label="Price"
                                        variant="bordered"
                                        type="number"
                                        value={price}
                                        onChange={(e) =>
                                            setPrice(e.target.value)
                                        }
                                        required
                                    />
                                    <Input
                                        autoFocus
                                        label="Description"
                                        variant="bordered"
                                        type="text"
                                        value={description}
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                        required
                                    />
                                </ModalBody>
                                <ModalFooter>
                                    <Button
                                        color="danger"
                                        variant="flat"
                                        onPress={onClose}
                                    >
                                        Close
                                    </Button>
                                    <Button
                                        color="primary"
                                        type="submit"
                                        onPress={onClose}
                                    >
                                        Confirm
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </form>
            </Modal>
        </>
    );
};

function ModalEditing({ product, onClose }) {
    const productId = product._id;
    const [category, setCategory] = useState(product.category);
    const [image, setImage] = useState(product.image);
    const [name, setName] = useState(product.name);
    const [description, setDescription] = useState(product.description);
    const [price, setPrice] = useState(product.price);
    const [selected, setSelected] = React.useState(product.isActive);

    const update = (e) => {
        e.preventDefault();
        fetch(`http://localhost:4000/products/${productId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
                category: category,
                name: name,
                description: description,
                price: price,
                image: image,
                isActive: selected,
            }),
        })
            .then((res) => {
                res.json();
            })
            .then((data) => {
                if (!data) {
                    setName("");
                    setDescription("");
                    setPrice("");
                    Swal.fire({
                        title: "Success!",
                        icon: "success",
                        text: `${name} is updated.`,
                    });
                    onClose();
                } else {
                    Swal.fire({
                        title: "Something wrong",
                        icon: "error",
                        text: "Please try again.",
                    });
                }
            });
    };

    useEffect(() => {}, [name, description, price, image, category]);

    return (
        <div className="Modal__Editing top-16 left-4 lg:top-14 lg:left-5 border-4 border-indigo-200 border-x-indigo-500 px-5 md:py-5 md:px-10  ">
            <form onSubmit={(e) => update(e)}>
                <h1 className="font-bold py-4">ID: {product._id}</h1>
                <div className="mb-3 flex gap-10 items-center">
                    <Select
                        label={category}
                        sizes="sm"
                        className="max-w-xs"
                        value={category}
                        onChange={(e) => {
                            setCategory(e.target.value);
                        }}
                    >
                        {Object.entries(categories).map(([key, value]) => (
                            <SelectItem key={key} value={key}>
                                {value.category}
                            </SelectItem>
                        ))}
                    </Select>
                    <div className="flex flex-col gap-3">
                        <RadioGroup
                            label="Product status settings"
                            value={selected}
                            onValueChange={setSelected}
                        >
                            <div className="flex gap-5">
                                <Radio value={true}>Activate</Radio>
                                <Radio value={false}>Archived</Radio>
                            </div>
                        </RadioGroup>
                    </div>
                </div>
                <div className="mb-3">
                    <Input
                        size="sm"
                        type="text"
                        label="Image URL"
                        value={image}
                        onChange={(e) => {
                            setImage(e.target.value);
                        }}
                    />
                </div>
                <div className="mb-3 flex gap-5">
                    <Input
                        size="sm"
                        type="text"
                        label="Product Name"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                    <Input
                        size="sm"
                        type="number"
                        label="Price"
                        value={price}
                        onChange={(e) => {
                            setPrice(e.target.value);
                        }}
                    />
                </div>
                <div>
                    <Textarea
                        label="Description"
                        className="w-full  p Text__Area overflow-scroll"
                        name="description"
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                    />
                </div>
                <div></div>
                <div className="flex gap-2 py-3 justify-start">
                    <Button
                        className="bg-slate-200"
                        type="button"
                        onClick={onClose}
                    >
                        Close
                    </Button>
                    <Button className="bg-warning-300" type="submit">
                        Update
                    </Button>
                </div>
            </form>
        </div>
    );
}

const SeeAllProduct = () => {
    const [product, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleEdit = (product) => {
        setSelectedProduct(product);
    };

    const handleCloseModal = () => {
        setSelectedProduct(null);
    };
    useEffect(() => {
        fetch(`http://localhost:4000/products/all`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
            });
    }, [product]);

    const handleDelete = (productId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:4000/products/${productId}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                })
                    .then((res) => {
                        if (!res.ok) {
                            throw new Error("Network response was not ok");
                        }
                        return res.json();
                    })
                    .then((data) => {
                        if (data.success) {
                            setProducts(
                                products.filter(
                                    (product) => product._id !== productId
                                )
                            );
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success",
                            });
                        } else {
                            Swal.fire({
                                title: "Deleted!",
                                text: `Product has been deleted!`,
                                icon: "success",
                            });
                        }
                    })
                    .catch((error) => {
                        console.error("Error deleting product:", error);
                        Swal.fire({
                            title: "Error",
                            icon: "error",
                            text: "Something went wrong. Please try again later.",
                        });
                    });
            }
        });
    };

    return (
        <>
            <ul className="All_Product__Component">
                <div className="md:grid grid-cols-8 gap-5 font-bold pt-5 py-2  hidden">
                    <li>Status</li>
                    <li>Image</li>
                    <li className="hidden md:block">Id</li>
                    <li>Category</li>
                    <li>Name</li>
                    <li>Price</li>
                    <li className="hidden md:block">Description</li>
                    <li className="text-center">Action</li>
                </div>
                {product.map((product) => (
                    <div key={product._id}>
                        <div className="md:grid grid-cols-8 gap-5 text-start md:text-start">
                            {product.isActive ? (
                                <>
                                    <div className="font-semibold hidden md:block">
                                        🟢Active{" "}
                                        <span className="md:hidden">
                                            Status
                                        </span>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="font-semibold hidden md:block">
                                        🔴Archived
                                    </div>
                                </>
                            )}
                            <li className="truncate">
                                <img
                                    src={product.image}
                                    className="md:w-24 w-40 mx-auto md:mx-0"
                                />
                            </li>{" "}
                            {product.isActive ? (
                                <>
                                    <div className="font-semibold md:hidden">
                                        🟢Active{" "}
                                        <span className="md:hidden">
                                            Status
                                        </span>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="font-semibold md:hidden">
                                        🔴Archived
                                    </div>
                                </>
                            )}
                            <li className="truncate">
                                <span className="md:hidden font-semibold">
                                    Product ID:
                                </span>{" "}
                                {product._id}
                            </li>
                            <li className="truncate">
                                {" "}
                                <span className="md:hidden font-semibold">
                                    Category:
                                </span>{" "}
                                {product.category}
                            </li>
                            <li className="">
                                {" "}
                                <span className="md:hidden font-semibold">
                                    Name:
                                </span>{" "}
                                {product.name}
                            </li>
                            <li>
                                {" "}
                                <span className="md:hidden font-semibold">
                                    Price:
                                </span>{" "}
                                {product.price}
                            </li>
                            <li className="truncate ">{product.description}</li>
                            <li className="flex items-start justify-center gap-2">
                                <button
                                    className="px-3 py-2 bg-slate-100 hover:bg-yellow-300 rounded-md hover:scale-105 ease-in-out duration-100"
                                    color="warning"
                                    onClick={() => handleEdit(product)}
                                >
                                    <span className="material-symbols-outlined">
                                        edit_square
                                    </span>
                                </button>
                                <button
                                    className="px-3 py-2 bg-slate-100 hover:bg-red-300 rounded-md hover:scale-105 ease-in-out duration-100"
                                    color="danger"
                                    onClick={() => handleDelete(product._id)}
                                >
                                    <span className="material-symbols-outlined">
                                        disabled_by_default
                                    </span>
                                </button>
                            </li>
                        </div>
                        <hr className="my-3" />
                    </div>
                ))}
            </ul>
            {selectedProduct && (
                <ModalEditing
                    product={selectedProduct}
                    onClose={handleCloseModal}
                />
            )}
        </>
    );
};
export default function AllProducts() {
    return (
        <>
            <div className="px-10 text-lg flex items-center justify-between sticky top-0 z-10 bg-white">
                <h1>All products</h1>
                <CreateProduct />
            </div>
            <ScrollShadow hideScrollBar className="w-full h-[560px]">
                <div className="px-10 py-4 ">
                    <SeeAllProduct />
                </div>
            </ScrollShadow>
        </>
    );
}
