import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";
import React from "react";
import * as firebase from "firebase";

const Post = props => {
  const username = firebase.auth().currentUser.displayName;
  const { src } = props;
  return (
    <div>
      <Card style={{ margin: 4 }}>
        <CardMedia component="img" alt="some image" width="180" image={src} />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {username}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Post;
