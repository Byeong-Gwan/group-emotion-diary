import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useUserStore } from "../../app/store/auth";
import UserInfo from "../../components/UserInfo/UserInfo";

const LoginPage = () => {
  const { setUserInfo, setIsLoggedIn, isLoggedIn, userInfo, setUserName } =
    useUserStore();

  const [isShowInfo, setIsShowInfo] = useState(false);

  const handleLoginS = (response) => {
    console.log("login");
    const userCredential = response.credential;
    const user = jwtDecode(userCredential); // JWT 토큰 디코딩
    setUserInfo(user);
    setIsLoggedIn(true);
    setUserName(user.name);
    console.log("성공");
  };

  const handleLoginF = (error) => {
    console.error("로그인 실패:", error);
  };

  const toggleInfo = () => {
    setIsShowInfo(prevState => !prevState);
  };

  return (
    <div className="d-flex align-items-center">
      {!isLoggedIn ? (
        <div>
          <GoogleLogin
            onSuccess={handleLoginS}
            onError={handleLoginF}
            theme="outline" // "filled_blue", "filled_black", "outline"
            size="medium" // "large", "medium", "small"
            shape="pill" // "rectangular", "pill", "circle"
          ></GoogleLogin>
        </div>
      ) : (
        <div>
          <img
            src={userInfo.picture}
            alt="Profile"
            width="35"
            style={{ borderRadius: "50%", cursor: "pointer" }}
            onClick={toggleInfo}
          />
          {isShowInfo && <UserInfo onClick={toggleInfo} />}
        </div>
      )}
    </div>
  );
};

export default LoginPage;
