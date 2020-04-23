import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@material-ui/core";
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
} from "@material-ui/icons/";
import * as firebase from "firebase";
import React from "react";

const Post = (props) => {
  const username = firebase.auth().currentUser.displayName;
  const { src } = props;
  return (
    <div>
      <Card style={{ maxWidth: "600px", maxHeight: "600px", margin: 20 }}>
        <CardHeader align="left" subheader={username} />
        <CardMedia component="img" alt="some image" width="180" image={src} />
        <CardContent>
          <Typography align="left" color="textSecondary">
            <FavoriteBorderOutlined />
            <ChatBubbleOutlineOutlined />
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Post;
