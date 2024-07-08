import ReactDOM from 'react-dom/client'
import './index.css'

import Login from './routes/Login.jsx'
import Home from './routes/Home.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/*",
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
