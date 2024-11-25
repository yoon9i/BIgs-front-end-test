## 게시판 웹 애플리케이션
사용자 인증 및 게시글 관리를 제공하는 게시판 웹 애플리케이션입니다. 회원가입, 로그인, 게시글 생성, 수정, 삭제 및 목록 조회 기능을 포함하고 있습니다.

## 목차
1. 프로젝트 소개
2. 기능 설명
3. 이슈
4. 기술 스택
5. 프로젝트구조
6. 설치 및 실행 방법


## 프로젝트 소개
이 프로젝트는 다음과 같은 주요 목표를 가지고 설계되었습니다:

- React를 사용한 컴포넌트 기반의 웹 애플리케이션 개발
- MobX를 활용한 상태 관리
- React Router를 통한 페이지 이동과 URL 관리
- Axios를 사용한 REST API 호출 및 클라이언트-서버 통신

## 기능 설명
사용자 인증
- 회원가입: 사용자 정보를 입력받아 계정을 생성합니다.
- 로그인: 이메일과 비밀번호를 통해 인증하고 토큰을 저장합니다.
- 로그아웃: 저장된 인증 정보를 삭제합니다.

게시판 관리
- 게시글 목록: 모든 게시글을 페이징 처리하여 조회할 수 있습니다.
- 게시글 상세: 특정 게시글의 상세 내용을 확인할 수 있습니다.
- 게시글 작성: 제목, 내용, 카테고리를 입력받아 게시글을 생성합니다.
- 게시글 수정: 기존 게시글을 수정할 수 있습니다.
- 게시글 삭제: 게시글을 삭제할 수 있습니다.

## 이슈
(Known Issues)
현재 프로젝트에서 아래와 같은 기능이 정상적으로 작동하지 않고 있습니다:

1. 사용자 이름 표시

문제: 
로그인 후 사용자 이름이 헤더에 표시되지 않습니다.

원인: 
authStore의 사용자 정보(user)가 제대로 설정되지 않거나, API 응답에서 사용자 정보를 받아오는 과정에 문제가 있을 수 있습니다.

해결 계획: 
로그인 API 응답에서 사용자 정보를 정확히 설정하는지 확인합니다.
authStore.setUser() 호출이 적절한 위치에서 실행되는지 검토합니다.

2. 게시물 등록

문제: 
게시물 등록 요청 시, 등록이 실패하거나 아무 반응이 없습니다.

원인: 
createPost API 호출이 실패하거나, 폼 데이터 전달 형식이 잘못되었을 가능성이 있습니다.

해결 계획: 
createPost 함수 호출 시 전달되는 데이터 형식을 API 명세와 비교하여 검증합니다.
API 호출 실패 시 반환되는 에러 메시지를 디버깅합니다.

3. 게시물 수정

문제: 
게시물 수정 요청이 실패하거나, 수정된 내용이 적용되지 않습니다.

원인: 
updatePost API 호출에서 게시물 ID 또는 데이터가 제대로 전달되지 않을 가능성이 있습니다.

해결 계획: 
updatePost 함수 호출 시 id와 데이터가 올바르게 전달되고 있는지 확인합니다.
API 호출 응답에서 에러 메시지를 확인하고 디버깅합니다.

## 디버깅 진행 상황
현재 아래와 같은 작업을 통해 문제를 분석 중입니다:

1. 사용자 이름 표시

authStore.setUser()가 호출되는 시점과 데이터를 확인하기 위해 디버깅 로그를 추가하였습니다.
API 응답 데이터 형식이 authStore.setUser() 함수에 필요한 형식인지 확인 중입니다.

2. 게시물 등록

createPost 함수 호출 전에 form 데이터가 올바르게 설정되어 있는지 확인하기 위해 콘솔 로그를 추가하였습니다.
API 서버가 요청을 제대로 수신하고 있는지 확인 중입니다.

3. 게시물 수정
   
updatePost 함수에 전달되는 id와 데이터가 정확한지 확인 중입니다.
API 서버에서 수정 요청에 대한 에러 응답을 분석 중입니다.

## 기술 스택
프론트엔드:
- React
- React Router
- MobX (상태 관리)
- Axios (API 호출)
- SCSS (스타일링)
  
백엔드:
- REST API (사전 구현된 API 호출)

## 프로젝트 구조
![image](https://github.com/user-attachments/assets/cf78a33c-e35e-4732-b1dd-6d6626134333)


## 설치 및 실행방법
1. 프로젝트 클론

   git clone https://github.com/username/project-name.git
   cd project-name

2. 필요한 패키지 설치

   npm install

3. 환경 변수 설정

   REACT_APP_API_BASE_URL=https://front-mission.bigs.or.kr

4. 프로젝트 실행

   npm start

- 브라우저에서 ``http://localhost:3000`` 으로 접속할 수 있습니다.

