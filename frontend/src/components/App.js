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
      signInFlow: "popup",
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

    return (
      <div align="center">
        {firebase.auth().currentUser ? (
          <div>
            <AddPost />
          </div>
        ) : (
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        )}
        <PostsList />
      </div>
    );
  }
}

export default App;
