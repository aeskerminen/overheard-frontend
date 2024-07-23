import React, { useEffect, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { MdModeComment } from "react-icons/md";
import {
  upvotePost,
  downvotePost,
  getVotes,
  unvotePost,
} from "../services/serviceHandler";
import { getHowLongAgo } from "../utils/time";
import { useSelector } from "react-redux";

const Post = (props) => {
  const post = useSelector((state) =>
    state.posts.find((p) => p.identifier === props.post.id)
  );

  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);

  const [votes, setVotes] = useState(0);

  const [forumOpen, setForumOpen] = useState(false);

  useEffect(() => {
    getVotes(props.post.id).then((result) => {
      setVotes(result.data[0].votes);
    });

    const voteState =
      post.votes.voters[window.sessionStorage.getItem("userid")];
    if (voteState !== undefined) {
      if (voteState === "up") {
        setUpvoted(true);
      } else if (voteState === "down") {
        setDownvoted(true);
      }
    }
  }, [props.post, post]);

  const handleForum = () => {
    setForumOpen(!forumOpen);
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

  if (post === undefined) return <div>Loading...</div>;
  else {
    return (
      <React.Fragment>
        <div
          className="mr-2 ml-2 p-2 shadow-lg self-center rounded flex flex-row gap-4"
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
              onClick={handleForum}
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
        {forumOpen && <div className="m-auto bg-white p-2">FORUM</div>}
      </React.Fragment>
    );
  }
};

export default Post;
