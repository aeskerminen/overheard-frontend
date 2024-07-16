import { useEffect, useState } from "react";
import Post from "../components/Post";

import { getPosts } from "../services/serviceHandler";
import { useDispatch } from "react-redux";
import { switchModal } from "../reducers/creationModalSlice";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const [filter, setFilter] = useState("newest");

  const dispatch = useDispatch();

  useEffect(() => {
    getPosts().then((result) => {
      console.log(result.data);
      setPosts(result.data);
    });
  }, []);

  return (
    <div
      style={{ backgroundColor: "#151515" }}
      className="grow overflow-y-scroll"
    >
      <div className="flex flex-col grow flex-nowrap gap-2 mb-2 overflow-y-scroll w-full">
        <div
          style={{ backgroundColor: "#3D3D3D" }}
          className="p-2 flex gap-2 justify-center"
        >
          <button
            onClick={() => setFilter("newest")}
            style={{
              backgroundColor: "#5F5F5F",
              color: "#9F9F9F",
              borderColor: "#FF9703",
            }}
            className={`p-2 font-bold rounded-full text-gray-200 ${
              filter === "newest" ? "border-2" : "border-none"
            }`}
          >
            Newest
          </button>
          <button
            onClick={() => setFilter("mcommented")}
            style={{
              backgroundColor: "#5F5F5F",
              color: "#9F9F9F",
              borderColor: "#FF9703",
            }}
            className={`p-2 font-bold rounded-full text-gray-200 ${
              filter === "mcommented" ? "border-2" : "border-none"
            }`}
          >
            Most commented
          </button>
          <button
            onClick={() => setFilter("mliked")}
            style={{
              backgroundColor: "#5F5F5F",
              color: "#9F9F9F",
              borderColor: "#FF9703",
            }}
            className={`p-2 font-bold rounded-full text-gray-200 ${
              filter === "mliked" ? "border-2" : "border-none"
            }`}
          >
            Most liked
          </button>
        </div>

        {posts.map((p, i) => (
          <Post
            key={i}
            post={{
              location: "here",
              channel: p.channel,
              content: p.content,
              color: p.color,
              createdAt: p.createdAt,
              identifier: p.identifier,
            }}
          ></Post>
        ))}
      </div>
      <div
        className="absolute p-2 flex justify-center items-center w-full"
        style={{ top: "85%" }}
      >
        <button
          onClick={() => {
            dispatch(switchModal());
          }}
          style={{ backdropFilter: "brightness(50%)" }}
          className="p-3 border-4 rounded-full aspect-square flex items-center text-2xl text-white absolute"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Home;
