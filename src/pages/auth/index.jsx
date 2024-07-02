import React from "react";
import { auth, provider } from "../../config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

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
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('assest/background.png')" }}
    >
      <div className="card-wrapper">
        <div className="card-content ">
          <h1 className="dm-sans-font text-[32px] font-[700] text-center leading-tight pb-6">
            Welcome To
            <br />
            <span className="text-cyan-500	text-[40px]">Wallet Watcher !</span>
          </h1>
          <div className="flex justify-center ">
            <button
              className="flex items-center bg-blue-500 border border-blue-500 text-white rounded-lg text-[16px] font-semibold gap-2 pr-3 hover:bg-blue-700 transition"
              onClick={signInWithGoogle}
            >
              <FcGoogle className=" bg-white text-[40px] rounded-l-lg p-2" />{" "}
              Sign In With Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
