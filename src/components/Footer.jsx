import { useState } from "react";

import { TiHome } from "react-icons/ti";
import { FaSearch } from "react-icons/fa";
import { GoBellFill } from "react-icons/go";
import { IoPerson } from "react-icons/io5";


const Footer = () => {
    // home, channels, inbox, me
    const [tab, setTab] = useState("home")

    return (
        <div className="flex flex-row justify-center items-center p-1 text-white" style={{ backgroundColor: '#3D3D3D' }}>
            <div className="flex justify-center items-center gap-4">
                <div className="p-2 text-lg flex flex-col justify-center items-center gap-1 text-gray-300 hover:text-gray-50">
                    <div className="pl-4 pr-4 pt-1 pb-1 rounded-full flex justify-center items-center" style={tab === "home" ? { backgroundColor: 'orangered' } : {}} onClick={() => setTab("home")}>
                        <TiHome size={20}></TiHome>
                    </div>
                    <p className="text-md">Home</p>
                </div>
                <div className="p-2 text-lg flex flex-col justify-center items-center gap-1 text-gray-300 hover:text-gray-50" >
                    <div className="pl-4 pr-4 pt-1 pb-1 rounded-full flex justify-center items-center" style={tab === "channels" ? { backgroundColor: 'orangered' } : {}} onClick={() => setTab("channels")}>
                        <FaSearch size={20}></FaSearch>
                    </div>
                    <p className="text-md">Channels</p>
                </div>
                <div className="p-2 text-lg flex flex-col justify-center items-center gap-1 text-gray-300 hover:text-gray-50" >
                    <div className="pl-4 pr-4 pt-1 pb-1 rounded-full flex justify-center items-center" style={tab === "inbox" ? { backgroundColor: 'orangered' } : {}} onClick={() => setTab("inbox")}>
                        <GoBellFill size={20}></GoBellFill>
                    </div>
                    <p className="text-md">Inbox</p>
                </div>
                <div className="p-2 text-lg flex flex-col justify-center items-center gap-1 text-gray-300 hover:text-gray-50" >
                    <div className="pl-4 pr-4 pt-1 pb-1 rounded-full flex justify-center items-center" style={tab === "me" ? { backgroundColor: 'orangered' } : {}} onClick={() => setTab("me")}>
                        <IoPerson size={20}></IoPerson>
                    </div>
                    <p className="text-md">Me</p>
                </div>
            </div>
        </div>
    )
}

export default Footer