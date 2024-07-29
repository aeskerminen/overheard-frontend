import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {loginHandler, registerHandler} from '../services/serviceHandler.js'

const Login = () => {
    const [curUsername, setCurUsername] = useState("")
    const [curPassword, setCurPassword] = useState("")

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        let form = new FormData()
        form.append("username", curUsername);
        form.append("password", curPassword)

        loginHandler(curUsername, curPassword).then(resp => {
            window.sessionStorage.setItem("userid", resp.data.id);
            navigate("/home")
        })
    }

    const handleRegister = (e) => {
        e.preventDefault();

        let form = new FormData()
        form.append("username", curUsername);
        form.append("password", curPassword)
        
        registerHandler(curUsername, curPassword).then(resp => {
            console.log(resp)
        })
    }

    return (
        <div style={{backgroundColor: "#151515"}} className=" h-full w-full flex flex-col justify-center items-center">
            <div style={{backgroundColor: "#3D3D3D"}} className="flex flex-col justify-center gap-2 p-4 rounded">
                <h1 className="self-center text-4xl m-4 text-white">OVERHEARD</h1>
                <form style={{backgroundColor: "#5F5F5F"}} className="p-2 flex gap-2" onSubmit={handleLogin} encType="multipart(form-data" method="POST">
                    <input className="p-2 text-lg border-0 bg-transparent border-b-2" type="email" placeholder="Enter your email..." name="email" onChange={e => setCurUsername(e.target.value)}></input>
                    <input className="p-2 text-lg border-0 bg-transparent border-b-2" type="password" placeholder="Enter your password..." name="password" onChange={e => setCurPassword(e.target.value)}></input>
                    <input className="rounded grow p-2 text-lg hover:bg-gray-100 active:bg-gray-200" type="submit" value="Login"></input>
                </form>
                <form style={{backgroundColor: "#5F5F5F"}} className="p-2 flex gap-2" onSubmit={handleRegister} encType="multipart(form-data" method="POST">
                    <input className="p-2 text-lg border-0 bg-transparent border-b-2" type="email" placeholder="Enter your email..." name="email" onChange={e => setCurUsername(e.target.value)}></input>
                    <input className="p-2 text-lg border-0 bg-transparent border-b-2" type="password" placeholder="Enter your password..." name="password" onChange={e => setCurPassword(e.target.value)}></input>
                    <input className="rounded grow p-2 text-lg hover:bg-gray-100 active:bg-gray-200" type="submit" value="Register"></input>
                </form>
            </div>
        </div>
    )
}

export default Login