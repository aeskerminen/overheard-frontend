import React, { useEffect, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { MdModeComment } from "react-icons/md";
import {
  upvotePost,
  downvotePost,
  unvotePost,
  addComment,
} from "../services/serviceHandler";
import { getHowLongAgo } from "../utils/time";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ForumView = () => {
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);

  const [votes, setVotes] = useState(0);

  const [commentContent, setCommentContent] = useState("");

  const { id } = useParams();
  console.log(id);
  const post = useSelector((state) => {
    console.log(state);
    return state.posts.find((p) => p.identifier === id);
  });

  useEffect(() => {
    if (post !== undefined) {
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
  }, []);

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

  if (post === null || post === undefined) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-end h-full">
      <div
        className="p-2 shadow-lg self-center flex flex-row gap-4"
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
          <MdModeComment
            className="self-start mt-auto m-0"
            size={25}
            fill="#AFAFAF"
          ></MdModeComment>
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
      <div
        className="m-auto bg-white p-2"
        style={{
          backgroundColor: "#3D3D3D",
          minWidth: "20rem",
          maxWidth: "25rem",
        }}
      >
        <form className="p-2" onSubmit={(e) => handleComment(e)}>
          <input
            type="text"
            name="content"
            placeholder="Comment..."
            onChange={(e) => setCommentContent(e.target.value)}
          ></input>
          <button type="submit">Add comment</button>
        </form>
        <div className="p-2 bg-slate-300">
          {post.forum.comments.map((c, i) => {
            return (
              <div key={i}>
                {c.num} / {c.content}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ForumView;
