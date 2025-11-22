import React, { useState, useEffect } from "react";
import { useUserStore } from "../../app/store/auth";
import UserInfo from "../../components/userInfo/UserInfo";
import GoogleLoginButton from "../../components/common/GoogleLoginButton";

const LoginPage = () => {
  const { setUserInfo, setIsLoggedIn, isLoggedIn, userInfo, setUserName } =
    useUserStore();

  const [isShowInfo, setIsShowInfo] = useState(false);

  const handleLoginS = (user) => {
    // user from Google UserInfo API
    setUserInfo(user);
    setIsLoggedIn(true);
    setUserName(user?.name || "");
    localStorage.setItem("user", JSON.stringify(user)); //로그인 유저 프로필 로컬스토리지 저장

  };

  const handleLoginF = (error) => {
    console.error("로그인 실패!:", error);
  };

  const toggleInfo = () => {
    setIsShowInfo(prevState => !prevState);
  };

//로그인 유저 프로필 복원  
useEffect(() => {
  const savedUser = localStorage.getItem("user");
  if (savedUser) {
    const user = JSON.parse(savedUser);
    setUserInfo(user);
    setIsLoggedIn(true);
    setUserName(user?.name || "");
  }
}, []);


  return (
    <div className="d-flex align-items-center">
      {!isLoggedIn ? (
        <div>
          <GoogleLoginButton onSuccess={handleLoginS} onError={handleLoginF} />
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
