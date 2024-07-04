import { useEffect, useState } from "react"
import Home from "./components/Home";
import { Route, Router, Routes } from "react-router-dom";
import AuthProvider from "./hooks/AuthProvider";
import Login from "./components/Login";
import PrivateRoute from "./hooks/PrivateRoute";

const App = () => {
  <Router>
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route element={<PrivateRoute></PrivateRoute>}>
          <Route path="/home" element={Home}></Route>
        </Route>
      </Routes>
    </AuthProvider>
  </Router>
}

export default App