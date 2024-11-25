import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 React Router
import { createPost } from "../../services/boardService"; // 게시글 생성 API 호출
import "./CreatePostPage.scss"; // CreatePostPage 스타일 정의

const CATEGORY_OPTIONS = {
    NOTICE: "공지",
    FREE: "자유",
    QNA: "Q&A",
    ETC: "기타",
}; // 게시글 카테고리 옵션

const CreatePostPage = () => {
    const [form, setForm] = useState({ title: "", content: "", category: "NOTICE" }); // 폼 데이터 상태 관리
    const navigate = useNavigate(); // 페이지 이동을 위한 네비게이트 훅

    const handleChange = (e) => {
        // 입력 필드 변경 시 상태 업데이트
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // 기본 폼 제출 동작 방지
        try {
            await createPost(form); // 게시글 생성 API 호출
            alert("게시글 작성 성공!");
            navigate("/boards"); // 성공 시 게시판으로 이동
        } catch (error) {
            console.error("게시글 작성 실패:", error.response?.data || error.message);
            alert("게시글 작성 실패. 다시 시도해주세요.");
        }
    };

    const handleGoBack = () => {
        navigate("/boards"); // 뒤로가기
    };

    return (
        <div className="create-post-page">
            <h1>새 게시글 작성</h1> {/* 페이지 제목 */}
            <form onSubmit={handleSubmit}>
                <input
                    name="title"
                    placeholder="제목"
                    onChange={handleChange}
                    value={form.title}
                /> {/* 제목 입력 필드 */}
                <textarea
                    name="content"
                    placeholder="내용"
                    onChange={handleChange}
                    value={form.content}
                /> {/* 내용 입력 필드 */}
                <select
                    name="category"
                    onChange={handleChange}
                    value={form.category}
                >
                    {Object.entries(CATEGORY_OPTIONS).map(([value, label]) => (
                        <option key={value} value={value}>
                            {label}
                        </option>
                    ))}
                </select> {/* 카테고리 선택 */}
                <div className="form-actions">
                    <button type="submit">작성하기</button> {/* 작성 버튼 */}
                    <button type="button" onClick={handleGoBack}>
                        뒤로 가기
                    </button> {/* 뒤로 가기 버튼 */}
                </div>
            </form>
        </div>
    );
};

export default CreatePostPage; // CreatePostPage 컴포넌트를 기본 내보내기로 설정
