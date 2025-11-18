import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import * as jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../app/store/auth";

const LoginPage = () => {
  const navigate = useNavigate();

  const { setUserInfo } = useUserStore();

  const handleLoginS = (response) => {
    console.log("login");
    const userCredential = response.credential;
    const user = jwtDecode(userCredential); // JWT 토큰 디코딩
    setUserInfo(user);
    navigate("/diary");
  };

  const handleLoginF = (error) => {
    console.error("로그인 실패:", error);
  };
  return (
    <div>
      <GoogleLogin
        onSuccess={handleLoginS}
        onError={handleLoginF}
      ></GoogleLogin>
    </div>
  );
};

export default LoginPage;
