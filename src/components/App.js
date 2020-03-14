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
    const username = this.state.signedInUserName;
    const feed = firebase.auth().currentUser ? (
      <div>
        <h1
          align="center"
          style={{
            padding: "10px",
            color: "#4254bd"
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
