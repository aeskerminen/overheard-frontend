import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { switchModal } from "../reducers/creationModalSlice";
import { addPost } from "../reducers/postsSlice";

const CreationModal = () => {
  const [content, setContent] = useState("");
  const [channel, setChannel] = useState("");
  const [color, setColor] = useState("#000000");

  const dispatch = useDispatch();
  const state = useSelector((state) => state.modal);
  const location = useSelector((state) => state.location);

  const handleCreatePost = (e) => {
    e.preventDefault();

    dispatch(addPost(content, channel, color, location.name));
  };

  if (!state.visible) return null;

  return (
    <div
      style={{ zIndex: 999, backdropFilter: "blur(3px)" }}
      className="absolute rounded w-full h-full flex justify-center items-center"
    >
      <div className="absolute bg-white rounded shadow-lg flex flex-col p-4">
        <button
          onClick={() => dispatch(switchModal())}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 active:bg-gray-300 self-start"
        >
          <IoMdClose size={25}></IoMdClose>
        </button>
        <form className="flex gap-2 mt-4" onSubmit={handleCreatePost}>
          <input
            placeholder="What have you heard...?"
            className="p-2 text-2xl bg-gray-100 rounded-md"
            type="text"
            name="content"
            onChange={(e) => setContent(e.target.value)}
            value={content}
          ></input>
          <input
            placeholder="Choose a channel..."
            className="p-2 text-2xl bg-gray-100 rounded-md"
            type="text"
            name="channel"
            onChange={(e) => setChannel(e.target.value)}
            value={channel}
          ></input>
          <div className="p-2 bg-gray-100 rounded-md flex justify-center items-center">
            <input
              type="button"
              onClick={() => setColor("#000000")}
              className="p-6 rounded-full bg-black border-4 border-white"
            ></input>
            <input
              type="button"
              onClick={() => setColor("#F97316")}
              className="p-6 rounded-full bg-orange-500 border-4 border-white"
            ></input>
            <input
              type="button"
              onClick={() => setColor("#22C55E")}
              className="p-6 rounded-full bg-green-500 border-4 border-white"
            ></input>
            <input
              type="button"
              onClick={() => setColor("#A855F7")}
              className="p-6 rounded-full bg-purple-500 border-4 border-white"
            ></input>
          </div>
          <input
            className="p-2 text-lg bg-gray-100 hover:bg-gray-200 active:bg-gray-300 self-center rounded-sm"
            type="submit"
            name="submit"
            value="Post..."
          ></input>
        </form>
      </div>
    </div>
  );
};

export default CreationModal;
