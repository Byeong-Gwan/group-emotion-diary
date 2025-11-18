# Daily Log

## 2025-11-18

- 한일

  - [Google 로그인] 작업

- 상세

  - 내용: React 프로젝트에서 Google OAuth 로그인을 구현하기 위해 @react-oauth/google 라이브러리를 사용하고, JWT 토큰을 디코딩하여 사용자 정보를 상태 관리 라이브러리 Zustand에 저장하는 방식으로 구성했습니다

  사용한 라이브러리

  - @react-oauth/google : 구글 로그인 컴포넌트 제공
  - jwt-decode : JWT 토큰 디코딩
  - zustand : 전역 상태 관리

  환경 변수 설정 : .env 파일에 Google OAuth Client ID를 저장합니다.
  VITE*GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID(vite 환경이라면 VITE* 는 필수)

  LoginPage 컴포넌트 : 구글 로그인 버튼을 표시하고, 로그인 성공 시 JWT를 디코딩하여 사용자 정보를 저장합니다.

  main.jsx 설정 : Google OAuth Provider로 앱 전체를 감싸서 로그인 기능을 사용할 수 있도록 합니다.
