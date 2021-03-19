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
// import firebaseConfig from "./Firebase.config";
// firebase.initializeApp(firebaseConfig);
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
      <form action="">
        {user.newUser ? (
          <p className="form-title">Sign up</p>
        ) : (
          <p className="form-title">Sign in</p>
        )}
        {user.newUser && (
          <input
            className="input"
            name="name"
            type="text"
            placeholder="Enter your name"
          />
        )}
        <input
          className="input"
          name="email"
          type="email"
          placeholder="Enter your email"
        />
        <input
          className="input"
          name="password"
          type="password"
          placeholder="Enter your password"
        />
        {/* <input */}
        {/*   className="submit-button" */}
        {/*   name="submit" */}
        {/*   type="submit" */}
        {/*   value="Submit" */}
        {/* /> */}
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
