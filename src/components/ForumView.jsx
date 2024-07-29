import { useEffect, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { MdModeComment } from "react-icons/md";
import {
  upvotePost,
  downvotePost,
  unvotePost,
  addComment,
} from "../services/serviceHandler";
import { getHowLongAgo } from "../utils/time";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { IoMdSend } from "react-icons/io";

const Comment = ({ c, color }) => {
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);

  const [votes, setVotes] = useState(0);

  useEffect(() => {
    if (c.votes !== undefined) {
      setVotes(c.votes.votes);

      const voteState = c.votes.voters[window.sessionStorage.getItem("userid")];
      if (voteState !== undefined) {
        if (voteState === "up") {
          setUpvoted(true);
        } else if (voteState === "down") {
          setDownvoted(true);
        }
      }
    }
  }, [c]);

  const handleUpvotePost = () => {
    if (!downvoted) {
      if (upvoted) {
        unvotePost(c._id);
        setUpvoted(false);
        setVotes(votes - 1);
      } else {
        upvotePost(c._id);
        setUpvoted(true);
        setVotes(votes + 1);
      }
    }
  };

  const handleDownvotePost = () => {
    if (!upvoted) {
      if (downvoted) {
        unvotePost(c._id);
        setDownvoted(false);
        setVotes(votes + 1);
      } else {
        downvotePost(c._id);
        setDownvoted(true);
        setVotes(votes - 1);
      }
    }
  };

  return (
    <div className="p-2 border-b-2 border-black self-center flex flex-row w-full ">
      <div className="flex flex-col p-2 gap-2 grow">
        <div className="flex items-center gap-2 text-white">
          <p className="p-1 rounded-xl text-sm">{c.num}</p>
          <p>{getHowLongAgo(c.createdAt)}</p>
        </div>
        <p
          className="text-md"
          style={{
            color: color,
            width: "calc(100%)",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {c.content}
        </p>
      </div>
      <div className="flex flex-col items-center mr-2">
        <p className="text-2xl text-white">...</p>
        <div className="text-2xl mt-auto mb-auto flex flex-col items-center">
          <button
            disabled={downvoted}
            style={downvoted ? { backgroundColor: "transparent" } : {}}
            onClick={() => handleUpvotePost()}
          >
            <FaAngleUp
              stroke="black"
              strokeWidth="15px"
              fill={upvoted ? "gray" : downvoted ? "transparent" : "white"}
            ></FaAngleUp>
          </button>
          <p className="text-center text-white">{votes}</p>
          <button disabled={upvoted} onClick={() => handleDownvotePost()}>
            <FaAngleDown
              stroke="black"
              strokeWidth="15px"
              fill={downvoted ? "gray" : upvoted ? "transparent" : "white"}
            ></FaAngleDown>
          </button>
        </div>
      </div>
    </div>
  );
};

const ForumView = () => {
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);

  const [votes, setVotes] = useState(0);

  const [commentContent, setCommentContent] = useState("");

  const { id } = useParams();
  console.log(id);
  const post = useSelector((state) => {
    if (state.posts === null) return null;
    return state.posts.find((p) => p.identifier === id);
  });

  useEffect(() => {
    if (post !== null) {
      setVotes(post.votes.votes);

      const voteState =
        post.votes.voters[window.sessionStorage.getItem("userid")];
      if (voteState !== undefined) {
        if (voteState === "up") {
          setUpvoted(true);
        } else if (voteState === "down") {
          setDownvoted(true);
        }
      }
    }
  }, [post]);

  const handleComment = (e) => {
    e.preventDefault();
    addComment(commentContent, post._id);
  };

  const handleUpvotePost = () => {
    if (!downvoted) {
      if (upvoted) {
        unvotePost(post.identifier);
        setUpvoted(false);
        setVotes(votes - 1);
      } else {
        upvotePost(post.identifier);
        setUpvoted(true);
        setVotes(votes + 1);
      }
    }
  };

  const handleDownvotePost = () => {
    if (!upvoted) {
      if (downvoted) {
        unvotePost(post.identifier);
        setDownvoted(false);
        setVotes(votes + 1);
      } else {
        downvotePost(post.identifier);
        setDownvoted(true);
        setVotes(votes - 1);
      }
    }
  };

  if (post === null || post === undefined)
    return (
      <div
        className="flex grow justify-center items-center text-white text-xl"
        style={{ backgroundColor: "#151515" }}
      >
        Loading...
      </div>
    );

  return (
    <div
      className="flex flex-col h-full"
      style={{ backgroundColor: "#151515" }}
    >
      {/* POST CONTAINER */}
      <div
        className="p-2 shadow-lg self-center flex flex-row w-full "
        style={{
          backgroundColor: "#3D3D3D",
          minWidth: "20rem",
          maxWidth: "25rem",
          minHeight: "10rem",
          maxHeight: "15rem",
        }}
      >
        <div className="flex flex-col p-2 gap-2 grow">
          <div className="flex items-center gap-2 text-white">
            <p
              style={{ backgroundColor: "#252525" }}
              className="p-1 rounded-xl text-sm"
            >
              @{post.channel}
            </p>
            <p>{post.location}</p>
            <p>{getHowLongAgo(post.createdAt)}</p>
          </div>
          <p
            className="text-md"
            style={{
              color: post.color,
              width: "calc(100%)",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            {post.content}
          </p>
          <div className="flex mt-auto m-0 text-white gap-1">
            <MdModeComment size={25} fill="#AFAFAF"></MdModeComment>
            <p>{post.forum.comments.length}</p>
          </div>
        </div>
        <div className="flex flex-col items-center mr-2">
          <p className="text-2xl text-white">...</p>
          <div className="text-2xl mt-auto mb-auto flex flex-col items-center">
            <button
              disabled={downvoted}
              style={downvoted ? { backgroundColor: "transparent" } : {}}
              onClick={() => handleUpvotePost()}
            >
              <FaAngleUp
                stroke="black"
                strokeWidth="15px"
                fill={upvoted ? "gray" : downvoted ? "transparent" : "white"}
              ></FaAngleUp>
            </button>
            <p className="text-center text-white">{votes}</p>
            <button disabled={upvoted} onClick={() => handleDownvotePost()}>
              <FaAngleDown
                stroke="black"
                strokeWidth="15px"
                fill={downvoted ? "gray" : upvoted ? "transparent" : "white"}
              ></FaAngleDown>
            </button>
          </div>
        </div>
      </div>
      {/* ^ POST CONTAINER */}
      <div
        className="mr-auto ml-auto bg-white grow w-full flex flex-col border-t-2 border-black"
        style={{
          backgroundColor: "#3D3D3D",
          minWidth: "20rem",
          maxWidth: "25rem",
        }}
      >
        {/* COMMENT CONTAINER */}
        <div className="p-2 flex flex-col gap-2">
          {post.forum.comments.map((c, i) => {
            return <Comment key={i} c={c} color={post.color}></Comment>;
          })}
        </div>
        {/* ^ COMMENT CONTAINER */}
        <div className="mt-auto border-t-2 border-black">
          <form
            className="flex items-center p-3 gap-4"
            onSubmit={(e) => handleComment(e)}
          >
            <input
              type="text"
              name="content"
              placeholder="Comment..."
              className="grow border-0 border-b-2 p-1 bg-transparent text-white"
              onChange={(e) => setCommentContent(e.target.value)}
            ></input>
            <button type="submit">
              <IoMdSend fill="white" size={30}></IoMdSend>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForumView;
