import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import LandingPage from "./pages/landing.tsx";
import ErrorPage from "./pages/error.tsx";
import DashBoard from "./pages/dashBoard.tsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage/>,
        errorElement: <ErrorPage />
    },
    {
        path: "dashboard/:projectID",
        element: <DashBoard/>,
        errorElement: <ErrorPage />
    },
    {
        path: "*",
        element: <ErrorPage/>
    }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
