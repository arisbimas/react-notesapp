import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import reportWebVitals from "./reportWebVitals";

// 1. Import the extendTheme function
import { extendTheme, ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./redux/globalReducer";

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    50: "#F5E8C7",
    100: "#DEBA9D",
    200: "#B89B84",
    300: "#9C826D",

    400: "#ba9c9c",
    500: "#9E7777",
    600: "#704D5C",
  },
};

const theme = extendTheme({ colors });
const rootCombineReducer = combineReducers({
  rootReducer,
});
//Store Redux
const storeRedux = configureStore({ reducer: rootReducer });

// 3. Pass the `theme` prop to the `ChakraProvider`

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Provider store={storeRedux}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
