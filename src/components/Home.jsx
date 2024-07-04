import { useEffect, useState } from "react";
import Post from "./Post";

import { IoMdClose } from "react-icons/io";

import { createPost, getPosts } from "../services/serviceHandler";

const Home = () => {
    const [posts, setPosts] = useState([])
    const [location, setLocation] = useState("Locating...");

    const [creationModal, setCreationModal] = useState(false)
    
    const [content, setContent] = useState("")
    const [channel, setChannel] = useState("")
    const [color, setColor] = useState("#000000")

    const [filter, setFilter] = useState("newest")

    useEffect(() => {
        getPosts().then(result => {
            console.log(result.data)
            setPosts(result.data)
        })
    }, [])

    const handleCreatePost = (e) => {
        e.preventDefault()

        createPost(content, channel, color).then(result => {
            console.log(result)
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div style={{backgroundColor: '#151515'}} className="h-full w-full flex flex-col justify-center ">
            <div className="flex flex-row justify-center items-center p-2 text-white" style={{backgroundColor: '#3D3D3D'}}>
                <h1>{location}</h1>
            </div>
            <div className="flex flex-col grow flex-nowrap gap-2 pb-2 overflow-y-scroll">
                <div style={{backgroundColor: '#3D3D3D'}} className=" p-2 flex gap-2 justify-center">
                    <button onClick={() => setFilter("newest")} style={{backgroundColor: '#5F5F5F', color: '#9F9F9F', borderColor: '#FF9703'}} className={`p-3 font-bold rounded-full text-gray-200 ${filter === 'newest' ? "border-2" : "border-none"}`}>Newest</button>
                    <button onClick={() => setFilter("mcommented")} style={{backgroundColor: '#5F5F5F', color: '#9F9F9F', borderColor: '#FF9703'}} className={`p-3 font-bold rounded-full text-gray-200 ${filter === 'mcommented' ? "border-2" : "border-none"}`}>Most commented</button>
                    <button onClick={() => setFilter("mliked")} style={{backgroundColor: '#5F5F5F', color: '#9F9F9F', borderColor: '#FF9703'}} className={`p-3 font-bold rounded-full text-gray-200 ${filter === 'mliked' ? "border-2" : "border-none"}`}>Most liked</button>
                </div>

                {posts.map((p, i) =>
                    <Post key={i} post={{
                        location: 'here',
                        channel: p.channel,
                        content: p.content,
                        color: p.color,
                        createdAt: '1h',
                        identifier: p.identifier
                      }}></Post>
                )}
            </div>
            {creationModal &&
                <div style={{zIndex: 999, backdropFilter: 'blur(3px)'}} className="absolute rounded w-full h-full flex justify-center items-center">
                        <div className="bg-white rounded shadow-lg flex flex-col p-4">
                            <button onClick={() => setCreationModal(false)} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 active:bg-gray-300 self-start"><IoMdClose size={25}></IoMdClose></button>
                            <form className="flex gap-2 mt-4" onSubmit={handleCreatePost}>
                                <input placeholder="What have you heard...?" className="p-2 text-2xl bg-gray-100 rounded-md" type="text" name="content" onChange={e => setContent(e.target.value)} value={content}></input>
                                <input placeholder="Choose a channel..." className="p-2 text-2xl bg-gray-100 rounded-md" type="text" name="channel" onChange={e => setChannel(e.target.value)} value={channel}></input>
                                <div className="p-2 bg-gray-100 rounded-md flex justify-center items-center">
                                    <input type="button" onClick={() => setColor('#000000')} className="p-6 rounded-full bg-black border-4 border-white"></input>
                                    <input type="button" onClick={() => setColor('#F97316')} className="p-6 rounded-full bg-orange-500 border-4 border-white"></input>
                                    <input type="button" onClick={() => setColor('#22C55E')} className="p-6 rounded-full bg-green-500 border-4 border-white"></input>
                                    <input type="button" onClick={() => setColor('#A855F7')} className="p-6 rounded-full bg-purple-500 border-4 border-white"></input>
                                </div>
                                <input className="p-2 text-lg bg-gray-100 hover:bg-gray-200 active:bg-gray-300 self-center rounded-sm" type="submit" name="submit" value="Post..."></input>
                            </form>
                        </div>
                </div>
            }
            <div className="absolute p-2 flex justify-center items-center w-full" style={{ top: '90%' }}>
                <button onClick={() => setCreationModal(true)} style={{backdropFilter: 'brightness(50%)'}} className="p-3 border-4 rounded-full aspect-square flex items-center text-2xl text-white">+</button>
            </div>
        </div>
    )
}

export default Home