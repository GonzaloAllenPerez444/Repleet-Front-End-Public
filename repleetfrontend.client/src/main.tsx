import React, { useState } from 'react'
import App from './routes/App.tsx'
import './style.css'
import * as ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
    redirect,
} from "react-router-dom";
import ErrorPage from "./components/errorPage.tsx";

import PracticeRouter from './routes/PracticeRouter.tsx';
import SurveyRouter from './routes/SurveyRouter.tsx';

import SignIn from './routes/SignIn.tsx';
import SignUp from './routes/SignUp.tsx';
import { AuthProvider } from './components/AuthContext.tsx';


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
        
    },
    {
        path: "/signin",
        element: <SignIn />
    },
    {
        path: "/signup",
        element: <SignUp />
    }
        
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
  <AuthProvider>
            <RouterProvider router={router} />
  </AuthProvider>
  </React.StrictMode>,
)
