import { GridListTile } from "@material-ui/core";
import React from "react";

const Post = props => {
  const { src } = props;
  return (
    <div>
      <GridListTile width="75%">
        {/* <GridListTile style={{ margin: 5, width: "20rem" }}> */}
        <img src={src} alt={"someimage"} />
      </GridListTile>
    </div>
  );
};

export default Post;
