import * as firebase from "firebase";
import "firebase/storage";
import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import "../firebase-config";
import AddPost from "./AddPost";
import "./App.css";
import PostsList from "./PostsList";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signedInUserName: null,
      signedInUserId: null,
    };
  }

  render() {
    var uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: (authResult) => {
          this.setState({
            ...this.state,
            signedInUserName: authResult.user.displayName,
            signedInUserId: authResult.user.uid,
          });
        },
      },
      signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    };

    // only renders user's feed if a user has signed in
    const username = this.state.signedInUserName;
    const feed = firebase.auth().currentUser ? (
      <div>
        <h1
          align="center"
          style={{
            padding: "10px",
            color: "#4254bd",
          }}
        >
          Hello, {username}!
        </h1>
        <AddPost />
        <PostsList />
      </div>
    ) : null;
    return (
      <div>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
        <div
          align="center"
          id="firebaseui-auth-container"
          style={{ padding: "100px" }}
        >
          {feed}
        </div>
      </div>
    );
  }
}

export default App;
