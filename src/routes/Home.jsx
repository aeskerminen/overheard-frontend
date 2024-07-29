import { useEffect, useState } from "react";
import Post from "../components/Post";

import { useDispatch, useSelector } from "react-redux";
import { switchModal } from "../reducers/creationModalSlice";
import { sortPosts } from "../reducers/postsSlice";

const Home = () => {
  const posts = useSelector((state) => state.posts);

  const [filter, setFilter] = useState("newest");

  const dispatch = useDispatch();

  useEffect(() => {
    switch (filter) {
      case "newest":
        dispatch(sortPosts("newest"));
        break;
      case "mcomments":
        dispatch(sortPosts("mcomments"));
        break;
      case "mvotes":
        dispatch(sortPosts("mvotes"));
        break;
    }
  }, [filter, dispatch]);

  if (posts === null)
    return (
      <div
        style={{ backgroundColor: "#151515" }}
        className="grow text-white text-xl flex justify-center items-center"
      >
        <p>Loading...</p>
      </div>
    );

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
            onClick={() => setFilter("mcomments")}
            style={{
              backgroundColor: "#5F5F5F",
              color: "#9F9F9F",
              borderColor: "#FF9703",
            }}
            className={`p-2 font-bold rounded-full text-gray-200 ${
              filter === "mcomments" ? "border-2" : "border-none"
            }`}
          >
            Most commented
          </button>
          <button
            onClick={() => setFilter("mvotes")}
            style={{
              backgroundColor: "#5F5F5F",
              color: "#9F9F9F",
              borderColor: "#FF9703",
            }}
            className={`p-2 font-bold rounded-full text-gray-200 ${
              filter === "mvotes" ? "border-2" : "border-none"
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

              id: p.identifier,
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
