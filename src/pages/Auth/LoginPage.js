import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 React Router
import { login } from "../../services/authService"; // 로그인 API 호출
import { authStore } from "../../stores/AuthStore"; // 인증 관련 MobX 스토어
import "./LoginPage.scss"; // LoginPage 스타일 정의

const LoginPage = () => {
    const [form, setForm] = useState({ username: "", password: "" }); // 폼 상태 관리
    const navigate = useNavigate(); // 페이지 이동을 위한 네비게이트 훅

    const handleChange = (e) => {
        // 폼 필드 변경 시 상태 업데이트
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // 기본 폼 제출 동작 방지
        try {
            const response = await login(form); // 로그인 API 호출

            console.log("로그인 요청 데이터:", form); // 디버깅용 로그
            console.log("로그인 응답 데이터:", response);

            authStore.setToken(response.accessToken); // 액세스 토큰 저장
            authStore.setUser({
                name: response.name,
                username: response.username,
            });

            alert("로그인 성공!");
            navigate("/boards"); // 게시판 페이지로 이동
        } catch (error) {
            console.error("로그인 실패:", error.response?.data || error.message);
            alert(error.response?.data?.message || "로그인 실패. 다시 시도해주세요.");
        }
    };

    return (
        <div className="login-page">
            <h1>로그인</h1> {/* 페이지 제목 */}
            <form onSubmit={handleSubmit}>
                {/* 이메일 입력 필드 */}
                <input
                    name="username"
                    placeholder="이메일"
                    type="email"
                    onChange={handleChange}
                />
                {/* 비밀번호 입력 필드 */}
                <input
                    name="password"
                    type="password"
                    placeholder="비밀번호"
                    onChange={handleChange}
                />
                <button type="submit">로그인</button> {/* 로그인 버튼 */}
            </form>
            <div className="signup-redirect">
                <p>계정이 없으신가요?</p>
                <button onClick={() => navigate("/signup")}>회원가입</button> {/* 회원가입 페이지로 이동 */}
            </div>
        </div>
    );
};

export default LoginPage; // LoginPage 컴포넌트를 기본 내보내기로 설정
