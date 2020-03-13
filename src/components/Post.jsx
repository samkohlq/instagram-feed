import { GridListTile } from "@material-ui/core";
import React from "react";

const Post = props => {
  const { src } = props;
  return (
    <div className="my-3">
      <GridListTile style={{ width: "20rem" }}>
        <img src={src} alt={"someimage"} />
      </GridListTile>
    </div>
  );
};

export default Post;
