import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [curUsername, setCurUsername] = useState("")
    const [curPassword, setCurPassword] = useState("")

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        let form = new FormData()
        form.append("username", curUsername);
        form.append("password", curPassword)

        tryLogin(curUsername, curPassword).then(resp => {
            navigate("/home")
        })
    }

    const handleRegister = (e) => {
        e.preventDefault();

        let form = new FormData()
        form.append("username", curUsername);
        form.append("password", curPassword)

      
    }

    return (
        <div className="bg-white h-full w-full flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center gap-2 bg-slate-300 p-4 rounded">
                <h1 className="self-center text-2xl">Overheard</h1>
                <form className="p-2 bg-white flex gap-2" onSubmit={handleLogin} encType="multipart(form-data" method="POST">
                    <input className="p-2 text-lg" type="email" placeholder="Add your email..." name="email" onChange={e => setCurUsername(e.target.value)}></input>
                    <input className="p-2 text-lg" type="password" placeholder="Enter your password..." name="password" onChange={e => setCurPassword(e.target.value)}></input>
                    <input className="rounded grow p-2 text-lg hover:bg-gray-100 active:bg-gray-200" type="submit" value="Login"></input>
                </form>
                <form className="p-2 bg-white flex gap-2" onSubmit={handleRegister} encType="multipart(form-data" method="POST">
                    <input className="p-2 text-lg" type="email" placeholder="Add your email..." name="email" onChange={e => setCurUsername(e.target.value)}></input>
                    <input className="p-2 text-lg" type="password" placeholder="Enter your password..." name="password" onChange={e => setCurPassword(e.target.value)}></input>
                    <input className="rounded grow p-2 text-lg hover:bg-gray-100 active:bg-gray-200" type="submit" value="Register"></input>
                </form>
            </div>
        </div>
    )
}

export default Login