import React from "react";
import { Card } from "react-bootstrap";

const Post = props => {
  const { post } = props;
  return (
    <div className="my-3">
      <Card style={{ width: "20rem" }}>
        <Card.Img src={post.imageUrl} />
        <Card.Body>
          <Card.Text>some caption</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Post;
