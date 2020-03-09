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
    if (!this.state.signedInUserName) {
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
  }

  render() {
    return (
      <Container>
        <div id="firebaseui-auth-container"></div>
        <Row className="mt-5">
          <AddPost
            signedInUserName={this.state.signedInUserName}
            signedInUserId={this.state.signedInUserId}
          />
        </Row>
        <Row>
          <PostsList
            signedInUserName={this.state.signedInUserName}
            signedInUserId={this.state.signedInUserId}
          />
        </Row>
      </Container>
    );
  }
}

export default App;
