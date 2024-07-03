import { useEffect, useState } from "react"

import { MdModeComment } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";

const testPost = {
  location: 'here',
  channel: 'main',
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel dapibus dui. Donec sed turpis eu nulla pulvinar pulvinar. Donec in tortor tempus, egestas diam eget, consequat dui. Cras elit libero, euismod id malesuada in, tempus sed justo. Aenean ut interdum massa. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
  createdAt: '1h',
}

const Post = (props) => {
  const [post, setPost] = useState(undefined)

  useEffect(() => {
    setPost(props.post)
  }, [props.post])

  if (post === undefined)
    return <div>Loading...</div>
  else {
    return (
      <div className="mr-2 ml-2 p-2 bg-gray-300 shadow-lg self-center rounded flex flex-row gap-4" style={{ minWidth: '5rem', maxWidth: '35rem', maxHeight: '15rem' }}>
        <div className="flex flex-col justify-between p-2 gap-2">
          <div className="flex items-center gap-2">
            <p className="p-1 bg-slate-800 text-white rounded-xl text-sm">@{post.channel}</p>
            <p>{post.location}</p>
            <p>{post.createdAt}</p>
          </div>
          <p className="text-md" style={{ width: 'calc(100%)', textOverflow: 'ellipsis', overflow: 'hidden' }}>{post.content}</p>
          <MdModeComment className="self-start m-0" size={30}></MdModeComment>
        </div>
        <div className="flex flex-col items-center mr-2">
          <p className="text-2xl">...</p>
          <div className="text-2xl mt-auto mb-auto flex flex-col items-center">
            <button><FaAngleUp></FaAngleUp></button>
            <p className="text-center">0</p>
            <button><FaAngleDown></FaAngleDown></button>
          </div>
        </div>
      </div>
    )
  }

}

const App = () => {
  const [posts, setPosts] = useState([1, 2, 3, 4, 5, 6])

  return (
    <div className="bg-white h-full flex flex-col justify-center ">
        <div className="flex flex-row justify-center items-center p-2 bg-gray-400">
          <h1>Helsinki</h1>
        </div>
        <div className="flex flex-col  flex-nowrap gap-2 overflow-y-scroll">
          <div className="bg-gray-400 p-2 flex gap-2 justify-center">
            <button className="p-2 bg-gray-500 rounded-full text-gray-200 border-2 border-orange-400">Newest</button>
            <button className="p-2 bg-gray-500 rounded-full text-gray-200 border-2 border-orange-400">Most commented</button>
            <button className="p-2 bg-gray-500 rounded-full text-gray-200 border-2 border-orange-400">Most liked</button>
          </div>
          
          {posts.map((p, i) =>
            <Post key={i} post={testPost}></Post>
          )}
        </div>
    </div>
  )
}

export default App