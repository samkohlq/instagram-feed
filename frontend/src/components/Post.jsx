import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";
import * as firebase from "firebase";
import React from "react";

const Post = props => {
  const username = firebase.auth().currentUser.displayName;
  const { src } = props;
  return (
    <div>
      <Card style={{ maxWidth: "500px", maxHeight: "500px", margin: 4 }}>
        <CardMedia component="img" alt="some image" width="180" image={src} />
        <CardContent>
          <Typography
            align="left"
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {username}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Post;
