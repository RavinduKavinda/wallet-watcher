import React from "react";
import { auth, provider } from "../../config/firebase-config"
import { signInWithPopup } from "firebase/auth";

export const Auth = () => {

  //google sign in
  const signInWithGoogle = async () => {
    const results = await signInWithPopup(auth, provider);
    console.log(results);
  };

  return (
    <div className="login-page">
      <p className="">Sign In With Google to Continue</p>

      <button className="login-with-google-btn" onClick={signInWithGoogle}>
        Sign In with Google
      </button>
    </div>
  );
};
