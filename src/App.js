import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // React Router를 사용하여 라우팅 설정
import LoginPage from "./pages/Auth/LoginPage"; // 로그인 페이지 컴포넌트
import SignupPage from "./pages/Auth/SignupPage"; // 회원가입 페이지 컴포넌트
import BoardListPage from "./pages/Boards/BoardListPage"; // 게시판 목록 페이지 컴포넌트
import BoardDetailPage from "./pages/Boards/BoardDetailPage"; // 게시글 상세 페이지 컴포넌트
import CreatePostPage from "./pages/Boards/CreatePostPage"; // 게시글 작성 페이지 컴포넌트
import EditPostPage from "./pages/Boards/EditPostPage"; // 게시글 수정 페이지 컴포넌트

function App() {
  return (
    // Router로 앱 전체의 라우팅을 관리
    <Router>
      <Routes>
        {/* 라우트 별로 렌더링할 컴포넌트를 정의 */}
        <Route path="/" element={<LoginPage />} /> {/* 루트 경로는 로그인 페이지 */}
        <Route path="/login" element={<LoginPage />} /> {/* 로그인 페이지 */}
        <Route path="/signup" element={<SignupPage />} /> {/* 회원가입 페이지 */}
        <Route path="/boards" element={<BoardListPage />} /> {/* 게시판 목록 페이지 */}
        <Route path="/boards/:id" element={<BoardDetailPage />} /> {/* 게시글 상세 페이지 (동적 id 사용) */}
        <Route path="/boards/create" element={<CreatePostPage />} /> {/* 게시글 작성 페이지 */}
        <Route path="/boards/edit/:id" element={<EditPostPage />} /> {/* 게시글 수정 페이지 (동적 id 사용) */}
      </Routes>
    </Router>
  );
}

export default App; // App 컴포넌트를 기본 내보내기로 설정
