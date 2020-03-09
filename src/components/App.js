import * as firebase from "firebase";
import "firebase/storage";
import * as firebaseui from "firebaseui";
import React from "react";
import { Container, Row } from "react-bootstrap";
import config from "../firebase-config";
import AddPost from "./AddPost";
import PostsList from "./PostsList";

firebase.initializeApp(config);
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
    const posts = firebase.auth().currentUser ? (
      <Row>
        <PostsList />
      </Row>
    ) : null;
    return (
      <Container>
        <div id="firebaseui-auth-container"></div>
        <Row className="mt-5">
          <AddPost
            signedInUserName={this.state.signedInUserName}
            signedInUserId={this.state.signedInUserId}
          />
        </Row>
        {posts}
      </Container>
    );
  }
}

export default App;
