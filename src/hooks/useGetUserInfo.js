import React from 'react'

export const useGetUserInfo = () => {
  
    const {userID, name, profilePhoto, isAuth} = JSON.parse(
        localStorage.getItem("auth") 
    ) || {};

    return { userID, name, profilePhoto, isAuth };
}
