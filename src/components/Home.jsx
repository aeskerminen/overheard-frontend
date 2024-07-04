import Post from "./Post";

const testPost = {
    location: 'here',
    channel: 'main',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel dapibus dui. Donec sed turpis eu nulla pulvinar pulvinar. Donec in tortor tempus, egestas diam eget, consequat dui. Cras elit libero, euismod id malesuada in, tempus sed justo. Aenean ut interdum massa. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
    createdAt: '1h',
  }

const Home = () => {
    const [posts, setPosts] = useState([1, 2, 3, 4, 5, 6])
    const [location, setLocation] = useState("Locating...");

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
                    <Post key={i} post={testPost}></Post>
                )}
            </div>
            <div className="absolute p-2 flex justify-center items-center w-full" style={{ top: '90%' }}>
                <button className="p-3 bg-white hover:bg-slate-50 active:bg-slate-100 rounded-full aspect-square flex items-center text-2xl">+</button>
            </div>
        </div>
    )
}

export default Home