import React from "react";
import Post from "./Post";

const PostsList = posts => {
  return (
    <div>
      {posts.map(post => {
        return <Post post={post} />;
      })}
      <Post />
    </div>
  );
};

export default PostsList;
