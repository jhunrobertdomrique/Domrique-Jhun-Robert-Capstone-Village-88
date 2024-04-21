import React, { createContext, useState } from "react";
import { productsJollibee } from "../assets/product";

export const ProductContext = createContext(null);

export const ProductContextProvider = (props) => {
    const contextValue = {
        productsJollibee,
    };
    return (
        <ProductContext.Provider value={contextValue}>
            {props.children}
        </ProductContext.Provider>
    );
};
