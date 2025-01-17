import React from "react";
import { Button } from "@material-ui/core";
import "./Login.css";
import { auth, provider } from "./firebase";
import { actionTypes } from "./reducer";
import { useStateValue } from "./StateProvider";

function Login() {
  const [{}, dispatch] = useStateValue();
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then(result => {
        console.log(result.user);
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user
        });
      })
      .catch(error => alert(error.message));
  };
  return (
    <div className="login">
      <div className="login__container">
        <img
          src="http://www.clker.com/cliparts/5/3/6/e/1480520219570138315whatsapp_icon.med.png"
          alt=""
        />

        <div className="login__text">
          <h1>Sign in to WhatsApp</h1>
        </div>

        <Button onClick={signIn}> sign in with google</Button>
      </div>
    </div>
  );
}

export default Login;
