import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useUserStore } from "../../app/store/auth";

const LoginPage = () => {
  const { setUserInfo, setIsLoggedIn, isLoggedIn, userInfo, setUserName } = useUserStore();

  const handleLoginS = (response) => {
    console.log("login");
    const userCredential = response.credential;
    const user = jwtDecode(userCredential); // JWT 토큰 디코딩
    setUserInfo(user);
    setIsLoggedIn(true);
    setUserName(user.name)
    console.log("성공");
  };

  const handleLoginF = (error) => {
    console.error("로그인 실패:", error);
  };
  const handleLogout = () => {
    setUserInfo(null);
    setIsLoggedIn(false);
    setUserName("")
  };
  const showUserInfo = () => {
    console.log("유저정보");
  };
  return (
    <div>
      {!isLoggedIn ? (
        <div>
          <GoogleLogin
            onSuccess={handleLoginS}
            onError={handleLoginF}
          ></GoogleLogin>
        </div>
      ) : (<div>
        <img
          src={userInfo.picture}
          alt="Profile"
          width="50"
          style={{ borderRadius: "50%" }}
          onClick={showUserInfo}
        />
        <button onClick={handleLogout}>로그아웃!</button></div>
      )}
    </div>
  );
};

export default LoginPage;
