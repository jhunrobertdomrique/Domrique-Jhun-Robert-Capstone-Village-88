import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import App from "./App.jsx";
import "./index.css";
import { ProductContextProvider } from "./Context/ProductContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <NextUIProvider>
            <ProductContextProvider>
                <App />
            </ProductContextProvider>
        </NextUIProvider>
    </React.StrictMode>
);
