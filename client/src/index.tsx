import React from 'react';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { createRoot } from "react-dom/client";
import { appTheme } from './appTheme';
import {  provideEnv, store } from "./redux/store";
import { Provider } from "react-redux";


(async () => provideEnv(process.env))()
  .then(() => {
    const rootElement = document.getElementById("root");
    if (rootElement === null) throw new Error("Root element is null");
    createRoot(rootElement).render(
      <Provider store={store}>
        <React.StrictMode>
          <ThemeProvider theme={appTheme}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ThemeProvider>
        </React.StrictMode>
      </Provider>
    );
  })
  .catch((err) => console.log(err));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
