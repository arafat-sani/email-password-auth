import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Tailwind or regular CSS
import { createBrowserRouter, RouterProvider } from "react-router";

import { Root } from "./layout/Root.jsx";
import { Home } from "./components/Home/Home.jsx";
import { Register } from "./components/Register/Register.jsx";
import { login } from "./components/login/login.jsx";
import ToyDetails from "./pages/ToyDetails.jsx";
import { ProtectedRoute } from "./ProtectedRoute.jsx";
import OrderHistory from "./pages/OrderHistory.jsx";
import MyProfile from "./pages/MyProfile.jsx";
import { NotFound } from "./pages/NotFound .jsx";
import { ForgetPassword } from "./pages/Forgetpassword.jsx";


// Router setup
const router = createBrowserRouter([
  {
    path: "/",
    Component: Root, // layout wrapper
    children: [
      { index: true, Component: Home },
      { path: "register", Component: Register },
      { path: "login", Component: login },
      { path: "details/:id", element: <ProtectedRoute><ToyDetails /></ProtectedRoute> },
      { path: "orders", element: <ProtectedRoute><OrderHistory /></ProtectedRoute> },
      { path: "profile", element: <ProtectedRoute><MyProfile /></ProtectedRoute> },
      { path: "forgot-password", element:<ForgetPassword></ForgetPassword> },
      { path: "*", element:<NotFound></NotFound> } // catch-all 404
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
