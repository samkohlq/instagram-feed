import { Grid } from "@material-ui/core";
import * as firebase from "firebase";
import "firebase/storage";
import * as firebaseui from "firebaseui";
import React from "react";
import "../firebase-config";
import AddPost from "./AddPost";
import "./App.css";
import PostsList from "./PostsList";

const ui = new firebaseui.auth.AuthUI(firebase.auth());

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signedInUserName: null,
      signedInUserId: null
    };
  }

  componentDidMount() {
    var uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: authResult => {
          this.setState({
            ...this.state,
            signedInUserName: authResult.user.displayName,
            signedInUserId: authResult.user.uid
          });
        }
      },
      signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
    };

    ui.start("#firebaseui-auth-container", uiConfig);
  }

  render() {
    // only renders user's feed if a user has signed in
    const feed = firebase.auth().currentUser ? (
      <div>
        <AddPost />
        <PostsList />
      </div>
    ) : null;
    return (
      <Grid
        container
        spacing={1}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <Grid item xs={12}>
          <div id="firebaseui-auth-container"></div>
          {feed}
        </Grid>
      </Grid>
    );
  }
}

export default App;
