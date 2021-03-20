import React, { useContext, useState } from "react";
import { MDBBtn, MDBContainer, MDBIcon } from "mdbreact";
import "./Form.css";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../FirebaseConfig/FirebaseConfig";
import { UserContext } from "../../App";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const Form = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  const [user, setUser] = useState({
    isSignedIn: false,
    newUser: false,
    name: "",
    email: "",
    photo: "",
    password: "",
  });

  const updateUserName = (name) => {
    const user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: name,
    });
  };
  const handleSubmit = (event) => {
    if (user.newUser && user.email && user.password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then(() => {
          updateUserName(user.name);
          const signedInUser = {
            isSignedIn: true,
            newUser: false,
            name: user.name,
            email: user.email,
            photo: user.photoURL,
          };
          setUser(signedInUser);
          setLoggedInUser(signedInUser);
          history.replace(from);
        });
    } else if (!user.newUser && user.email && user.password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((result) => {
          const { displayName, photoURL, email } = result.user;
          const signedInUser = {
            isSignedIn: true,
            newUser: false,
            name: displayName,
            email: email,
            photo: photoURL,
          };
          setUser(signedInUser);
          setLoggedInUser(signedInUser);
          history.replace(from);
        });
    }
    event.preventDefault();
  };
  const handleBlur = (event) => {
    let isFieldValid = true;
    if (event.target.name === "email") {
      isFieldValid = /\S+@\S+.\S+/.test(event.target.value);
    }
    if (event.target.name === "password") {
      isFieldValid = /\d{1}/.test(event.target.value);
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  };
  const handleGoogleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((result) => {
        const { displayName, photoURL, email } = result.user;
        const signedInUser = {
          isSignedIn: true,
          newUser: false,
          name: displayName,
          email: email,
          photo: photoURL,
        };
        setUser(signedInUser);
        setLoggedInUser(signedInUser);
        history.replace(from);
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const handleFacebookSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        const { displayName, photoURL, email } = result.user;
        const signedInUser = {
          isSignedIn: true,
          newUser: false,
          name: displayName,
          email: email,
          photo: photoURL,
        };
        setUser(signedInUser);
        setLoggedInUser(signedInUser);
        history.replace(from);
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const handleNewUserButton = () => {
    const newUserInfo = user.newUser ? false : true;
    const userInfo = {
      isSignedIn: false,
      newUser: newUserInfo,
      name: "",
      email: "",
      photo: "",
      password: "",
    };
    setUser(userInfo);
  };
  return (
    <MDBContainer className="mt-5 mb-5 pt-5 pb-5 form align-items-center">
      <form onSubmit={handleSubmit}>
        {user.newUser ? (
          <p className="form-title">Sign up</p>
        ) : (
          <p className="form-title">Sign in</p>
        )}
        {user.newUser && (
          <input
            className="input"
            onBlur={handleBlur}
            name="name"
            required
            type="text"
            placeholder="Enter your name"
          />
        )}
        <input
          className="input"
          onBlur={handleBlur}
          name="email"
          type="email"
          required
          placeholder="Enter your email"
        />
        <input
          className="input"
          onBlur={handleBlur}
          name="password"
          type="password"
          required
          placeholder="Enter your password"
        />
        <MDBBtn outline className="submit-button" type="submit">
          {user.newUser ? <p>Sig nup</p> : <p>Sign in</p>}
        </MDBBtn>
      </form>
      <p onClick={handleNewUserButton}>New user?</p>
      <div>
        <MDBBtn onClick={handleGoogleSignIn} color="deep-orange">
          <MDBIcon
            fab
            icon="google-plus"
            className="pr-3"
            style={{ fontSize: "20px" }}
          ></MDBIcon>
          <span> Continue with google</span>
        </MDBBtn>
        <br />
        <MDBBtn onClick={handleFacebookSignIn} color="primary">
          <MDBIcon fab icon="facebook" style={{ fontSize: "20px" }}></MDBIcon>
          <span> Continue with facebook</span>
        </MDBBtn>
      </div>
    </MDBContainer>
  );
};
export default Form;
