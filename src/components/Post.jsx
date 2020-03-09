import React from "react";
import { Card } from "react-bootstrap";

const Post = props => {
  const { src } = props;
  return (
    <div className="my-3">
      <Card style={{ width: "20rem" }}>
        <Card.Img src={src} />
      </Card>
    </div>
  );
};

export default Post;
