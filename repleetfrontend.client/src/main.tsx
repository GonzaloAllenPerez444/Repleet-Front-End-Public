import React, { useState } from 'react'
import App from './App.tsx'
import './style.css'
import * as ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
    redirect,
} from "react-router-dom";
import ErrorPage from "./errorPage";

import PracticeRouter from './routes/PracticeRouter.tsx';
import SurveyRouter from './routes/SurveyRouter.tsx';



if (localStorage.getItem('formCompleted') !== 'true') {localStorage.setItem('formCompleted','false') }


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
    },
    {
        path: "info",
        element: <SurveyRouter />,
    },
    {
        path: "practice",
        element: <PracticeRouter />
        
    }
        
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
        <RouterProvider router={router} />
  </React.StrictMode>,
)
