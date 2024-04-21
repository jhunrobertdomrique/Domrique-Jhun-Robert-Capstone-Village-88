import React from "react";

const Social = () => {
    return (
        <div className="card Social__Wrapper flex gap-2 justify-center md:justify-start">
            <a
                className="socialContainer containerOne"
                href="https://www.instagram.com/jollibee/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
            >
                <img src="/instagram.svg" className="p-2" />
            </a>

            <a
                className="socialContainer containerTwo"
                href="https://www.facebook.com/JollibeePhilippines/"
                target="_blank"
                rel="noopener noreferrer"
            >
                <img src="/facebook.svg" className="p-2" />
            </a>

            <a
                className="socialContainer containerThree"
                href="https://twitter.com/jollibee?lang=en"
                target="_blank"
                rel="noopener noreferrer"
            >
                <img src="/twitter.svg" className="p-2 " />
            </a>
        </div>
    );
};

export default function Contact() {
    return (
        <>
            <div
                id="Contact__Container"
                className="Contact__Container mt-10 p-5"
            >
                <div className="md:flex justify-around">
                    <div className="text-white md:px-10 md:pt-7 py-2 md:py-0">
                        <h1 className="md:text-3xl Contact__Title text-center md:text-start">
                            Stay-up-to-date
                        </h1>
                        <p className="text-center md:text-start">
                            Don't miss out on exclusive online offers!
                        </p>
                        <Social />
                    </div>

                    <div className="px-1 py-8 md:px-10 md:py-10 ">
                        <h1 className="md:text-lg text-white font-semibold text-center md:text-start">
                            Download our app!
                        </h1>
                        <div className="flex md:justify-start justify-center md:gap-7 ">
                            <a
                                href="https://play.google.com/store/apps/details?id=com.tillster.jb_ph&pli=1"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src="/Google-Play-Badge.png"
                                    className="w-40 h-12 cursor-pointer"
                                />
                            </a>
                            <a
                                href="https://apps.apple.com/ph/app/jollibee-philines/id1508056939"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src="/Apple-Store-Badge.png"
                                    className="w-40 h-12 cursor-pointer"
                                />
                            </a>
                        </div>
                    </div>
                </div>
                <p className="text-white text-center md:text-start py-2 md:py-0 md:mx-52">
                    Copyright © 2024 Jollibee. All Rights Reserved.
                </p>
            </div>
        </>
    );
}
