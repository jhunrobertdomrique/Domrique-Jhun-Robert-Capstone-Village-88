import React, { useEffect, useRef, useState } from "react";
import { ScrollShadow } from "@nextui-org/react";

const Categories_Images = ({ border, setBorder, setCategory }) => {
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

    return Object.entries(categories).map(([key, value], index) => (
        <div
            key={index}
            className="Categories__Map text-center "
            onClick={(e) => {
                e.preventDefault();
                setBorder(key);
                setCategory(key);
            }}
        >
            <img
                src={value.imgSrc}
                className={`md:max-w-36 md:min-w-36 md:min-h-36 md:max-h-36 max-w-14 min-w-14 min-h-14 max-h-14 flex items-center rounded-full Image__Background  mx-auto border-solid  drop-shadow-xl hover:cursor-pointer  hover:scale-105 ease-in-out duration-200 ${
                    border === key
                        ? "border-red-600 border-4 Background__Category"
                        : ""
                }`}
                alt={value.category}
            />
            <p className="md:my-1 text-sm md:text-xl font-semibold">
                {value.category}
            </p>
        </div>
    ));
};

export default function Categories({ setCategory }) {
    const [border, setBorder] = useState("bestSellers");
    const scrollRef = useRef(null);

    useEffect(() => {}, [border]);

    const handleScroll = (scrollOffset) => {
        if (scrollRef.current) {
            const scrollContainer = scrollRef.current;
            const newScrollLeft = scrollContainer.scrollLeft + scrollOffset;
            scrollContainer.scrollTo({
                left: newScrollLeft,
                behavior: "smooth",
            });
        }
    };

    return (
        <div id="Categories__Title">
            <h1 className="Categories__Title font-extrabold text-2xl md:text-4xl text-red-600 md:py-10 px-10 py-6">
                Categories
            </h1>
            <div className="flex items-center justify-between">
                <button
                    onClick={() => handleScroll(-200)}
                    className="px-4 py-2 rounded-md hidden md:block"
                >
                    {
                        <span className="material-symbols-outlined text-red-600">
                            arrow_back_ios
                        </span>
                    }
                </button>

                <ScrollShadow
                    ref={scrollRef}
                    hideScrollBar
                    orientation="horizontal"
                    className="max-w-full max-h-[400px] sides py-2 ps-1"
                >
                    <div className="flex gap-6">
                        <Categories_Images
                            border={border}
                            setBorder={setBorder}
                            setCategory={setCategory}
                        />
                    </div>
                </ScrollShadow>
                <button
                    onClick={() => handleScroll(200)}
                    className="px-4 py-2 rounded-md hidden md:block"
                >
                    {
                        <span className="material-symbols-outlined text-red-600">
                            arrow_forward_ios
                        </span>
                    }
                </button>
            </div>
        </div>
    );
}
