import ReactDOM from "react-dom/client";
import "./index.css";

import Login from "./routes/Login.jsx";
import Home from "./routes/Home.jsx";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import CreationModal from "./components/CreationModal.jsx";

import { store } from "./store";
import { Provider } from "react-redux";
import ForumView from "./components/ForumView.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/*",
    element: (
      <div className="flex flex-col justify-center h-full">
        <Navbar></Navbar>
        <CreationModal></CreationModal>
        <Outlet></Outlet>
        <Footer></Footer>
      </div>
    ),
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "home/:id",
        element: <ForumView/>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
  </Provider>
);
