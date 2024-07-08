import ReactDOM from 'react-dom/client'
import './index.css'

import Login from './routes/Login.jsx'
import Home from './routes/Home.jsx'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Footer from './components/Footer.jsx'
import Navbar from './components/Navbar.jsx'

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/*",
        element: <div className="flex flex-col justify-center h-full"><Navbar></Navbar><Outlet></Outlet><Footer></Footer></div>,
        children: [
            {
                path: "home",
                element: <Home />
            },
        ]
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}></RouterProvider>
)
