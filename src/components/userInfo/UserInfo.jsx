import React from "react";
import "./userInfo.style.css";
import { useUserStore } from "../../app/store/auth";

const UserInfo = () => {
  const { userInfo, setUserInfo, setIsLoggedIn, setUserName } = useUserStore();

  const handleLogout = ({ onclose }) => {
    setUserInfo(null);
    setIsLoggedIn(false);
    setUserName("");
    if (onclose) onclose();
  };

  return (
    <div className="user-info-box">
      <div>
        <img
          src={userInfo.picture}
          alt="Profile"
          width="35"
          style={{ borderRadius: "59%" }}
        />
        <p>{userInfo.name}</p>
        <p>{userInfo.email}</p>
      </div>
      <div>
        <p>비밀번호 및 자동 완성</p>
        <p>Google 계정 관리</p>
        <p>프로필 맞춤설정</p>
        <p>동기화 사용 중</p>
      </div>
      <div>
        <p>Chrome 프로필 추가</p>
        <p>게스트 프로필 열기</p>
        <p>Chrome 프로필 관리</p>
      </div>
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
};

export default UserInfo;
