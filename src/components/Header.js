import React from "react";
import { Link, useNavigate } from "react-router-dom"; // 페이지 이동 및 네비게이션을 위한 React Router 도구
import { authStore } from "../stores/AuthStore"; // 인증 관련 MobX 스토어
import "./Header.scss"; // Header 스타일 정의

const Header = () => {
    const navigate = useNavigate(); // 페이지 이동을 위한 네비게이트 훅

    const handleLogout = () => {
        authStore.clearAuth(); // 인증 정보를 MobX 스토어에서 초기화
        alert("로그아웃되었습니다."); // 사용자에게 알림
        navigate("/login"); // 로그인 페이지로 이동
    };

    return (
        <header className="header">
            <nav>
                {/* 네비게이션 링크 */}
                <Link to="/">홈</Link>
                {/* 인증 상태에 따라 다른 링크 제공 */}
                {!authStore.isAuthenticated ? (
                    <>
                        <Link to="/login">로그인</Link>
                        <Link to="/signup">회원가입</Link>
                    </>
                ) : (
                    <>
                        <Link to="/boards">게시판</Link>
                        <button className="logout-button" onClick={handleLogout}>
                            로그아웃
                        </button>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header; // Header 컴포넌트를 기본 내보내기로 설정
