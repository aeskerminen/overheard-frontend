import { useEffect, useState } from "react"
import { FaAngleDown, FaAngleUp } from "react-icons/fa"
import { MdModeComment } from "react-icons/md"

const Post = (props) => {
    const [post, setPost] = useState(undefined)

    useEffect(() => {
        setPost(props.post)
    }, [props.post])

    if (post === undefined)
        return <div>Loading...</div>
    else {
        return (
            <div className="mr-2 ml-2 p-2 shadow-lg self-center rounded flex flex-row gap-4" style={{ backgroundColor: '#3D3D3D', minWidth: '25rem', maxWidth: '25rem', minHeight: '10rem', maxHeight: '15rem' }}>
                <div className="flex flex-col p-2 gap-2 grow">
                    <div className="flex items-center gap-2 text-white">
                        <p style={{backgroundColor: '#252525'}} className="p-1 rounded-xl text-sm">@{post.channel}</p>
                        <p>{post.location}</p>
                        <p>{post.createdAt}</p>
                    </div>
                    <p className="text-md" style={{ color: post.color, width: 'calc(100%)', textOverflow: 'ellipsis', overflow: 'hidden' }}>{post.content}</p>
                    <MdModeComment className="self-start mt-auto m-0" size={25} fill="#AFAFAF"></MdModeComment>
                </div>
                <div className="flex flex-col items-center mr-2">
                    <p className="text-2xl text-white">...</p>
                    <div className="text-2xl mt-auto mb-auto flex flex-col items-center">
                        <button><FaAngleUp fill="white"></FaAngleUp></button>
                        <p className="text-center text-white">0</p>
                        <button><FaAngleDown fill="white"></FaAngleDown></button>
                    </div>
                </div>
            </div>
        )
    }

}

export default Post