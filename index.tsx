import React from "react";
import ReactDOM from "react-dom/client";
import App from "./src/App";
import { AuthProvider } from "./src/context/AuthContext";


const getRootElement = (): HTMLElement | null => {
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    throw new Error("Root element not found");
  }
  return rootElement;
};

const root = ReactDOM.createRoot(getRootElement() as HTMLElement);


root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
