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

    useEffect(() => {
        getPosts().then(result => {
            console.log(result.data)
            setPosts(result.data)
        })
    }, [])

    const handleCreatePost = (e) => {
        e.preventDefault()

        createPost(content, channel).then(result => {
            console.log(result)
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div className="bg-white h-full w-full flex flex-col justify-center ">
            <div className="flex flex-row justify-center items-center p-2 bg-gray-400">
                <h1>{location}</h1>
            </div>
            <div className="flex flex-col grow flex-nowrap gap-2 pb-2 overflow-y-scroll">
                <div className="bg-gray-400 p-2 flex gap-2 justify-center">
                    <button className="p-2 bg-gray-500 rounded-full text-gray-200 border-2 border-orange-400">Newest</button>
                    <button className="p-2 bg-gray-500 rounded-full text-gray-200 border-2 border-orange-400">Most commented</button>
                    <button className="p-2 bg-gray-500 rounded-full text-gray-200 border-2 border-orange-400">Most liked</button>
                </div>

                {posts.map((p, i) =>
                    <Post key={i} post={{
                        location: 'here',
                        channel: 'main',
                        content: p.content,
                        createdAt: '1h',
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
                                <input className="p-2 text-lg bg-gray-100 hover:bg-gray-200 active:bg-gray-300 self-center rounded-sm" type="submit" name="submit" value="Post..."></input>
                            </form>
                        </div>
                </div>
            }
            <div className="absolute p-2 flex justify-center items-center w-full" style={{ top: '90%' }}>
                <button onClick={() => setCreationModal(true)} className="p-3 bg-white hover:bg-slate-50 active:bg-slate-100 rounded-full aspect-square flex items-center text-2xl">+</button>
            </div>
        </div>
    )
}

export default Home