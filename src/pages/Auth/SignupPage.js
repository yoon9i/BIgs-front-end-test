import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 React Router
import { signup } from "../../services/authService"; // 회원가입 API 호출
import "./SignupPage.scss"; // SignupPage 스타일 정의

const SignupPage = () => {
    const [form, setForm] = useState({
        username: "",
        name: "",
        password: "",
        confirmPassword: "",
    }); // 폼 상태 관리
    const navigate = useNavigate(); // 페이지 이동을 위한 네비게이트 훅

    const handleChange = (e) => {
        // 폼 필드 변경 시 상태 업데이트
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // 기본 폼 제출 동작 방지

        if (form.password !== form.confirmPassword) {
            // 비밀번호 확인
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        try {
            const { confirmPassword, ...userData } = form; // 확인 비밀번호 제외
            console.log("회원가입 요청 데이터:", userData); // 디버깅용 로그

            await signup(userData); // 회원가입 API 호출
            alert("회원가입 성공!");
            navigate("/login"); // 성공 시 로그인 페이지로 이동
        } catch (error) {
            console.error("회원가입 에러:", error.response?.data || error.message);
            alert(`회원가입 실패: ${error.response?.data?.message || "다시 시도해주세요."}`);
        }
    };

    return (
        <div className="signup-page">
            <h1>회원가입</h1> {/* 페이지 제목 */}
            <form onSubmit={handleSubmit}>
                {/* 이메일 입력 필드 */}
                <input name="username" placeholder="이메일" onChange={handleChange} />
                {/* 이름 입력 필드 */}
                <input name="name" placeholder="이름" onChange={handleChange} />
                {/* 비밀번호 입력 필드 */}
                <input
                    name="password"
                    type="password"
                    placeholder="비밀번호"
                    onChange={handleChange}
                />
                {/* 비밀번호 확인 필드 */}
                <input
                    name="confirmPassword"
                    type="password"
                    placeholder="비밀번호 확인"
                    onChange={handleChange}
                />
                <button type="submit">회원가입</button> {/* 회원가입 버튼 */}
            </form>
        </div>
    );
};

export default SignupPage; // SignupPage 컴포넌트를 기본 내보내기로 설정
