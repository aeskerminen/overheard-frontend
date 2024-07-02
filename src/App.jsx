import {useState} from "react"

const Post = () => {
  return (
    <div className="p-2 bg-white shadow-lg rounded self-center flex flex-row gap-4" style={{minWidth: '35rem', maxWidth: '35rem', maxHeight: '30rem'}}>
      <div className="flex flex-col justify-between p-2 gap-2">
        <div className="flex items-center gap-2">
          <p className="p-1 bg-slate-800 text-white rounded-xl text-md">@main</p>
          <p>here</p>
          <p>1min</p>
        </div>
        <div className="">
          <p className="text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel dapibus dui. Donec sed turpis eu nulla pulvinar pulvinar. Donec in tortor tempus, egestas diam eget, consequat dui. Cras elit libero, euismod id malesuada in, tempus sed justo. Aenean ut interdum massa. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
        </div>
        <div>
          Comments...
        </div>
      </div>
      <div className="flex flex-col items-center mr-2">
        <p className="text-2xl">...</p>
        <div className="text-2xl mt-auto mb-auto">
          <button>U</button>
          <p>0</p>
          <button>D</button>
        </div>
      </div>
    </div>
  )
}

const App = () => {
  const [posts, setPosts] = useState([1,2,3,4,5,6])
  
  return(
    <div className="bg-white w-full h-full flex justify-center ">
      <div className=" bg-slate-600 p-4 flex flex-col flex-nowrap gap-4 overflow-y-scroll">
        {posts.map(p => 
            <Post></Post>
        )}
      </div>
    </div>
  )
}

export default App