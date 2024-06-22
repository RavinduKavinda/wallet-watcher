import React from "react";
import { auth, provider } from "../../config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const Auth = () => {
  const navigate = useNavigate();

  //google sign in
  const signInWithGoogle = async () => {
    const results = await signInWithPopup(auth, provider);
    //console.log(results);

    //store local storage
    const authInfo = {
      userID: results.user.uid,
      name: results.user.displayName,
      profilePhoto: results.user.photoURL,
      isAuth: true,
    };
    localStorage.setItem("auth", JSON.stringify(authInfo));
    navigate("/wallet-watcher"); //when after sign in go to "/wallet-watcher"
  };

  return (
    <div className="container">
      <div className="login-page">
        <h1 className="">Welcome To Wallet Watcher</h1>
        <p className="">Sign In With Google to Continue</p>
        
        <button className="login-with-google-btn" onClick={signInWithGoogle}>
          Sign In with Google
        </button>
      </div>
    </div>
  );
};
