import firebase from "firebase";
import "firebase/storage";
import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
import config from "../firebase-config";
import AddPost from "./AddPost";
import PostsList from "./PostsList";

firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <Container>
        <Row className="mt-5">
          <AddPost />
        </Row>
        <Row>
          <PostsList />
        </Row>
      </Container>
    );
  }
}

export default App;
