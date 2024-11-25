import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // 동적 라우팅 및 페이지 이동을 위한 React Router
import { updatePost, getPost } from "../../services/boardService"; // 게시글 수정 및 데이터 가져오기 API 호출
import "./EditPostPage.scss"; // EditPostPage 스타일 정의

const CATEGORY_OPTIONS = {
    NOTICE: "공지",
    FREE: "자유",
    QNA: "Q&A",
    ETC: "기타",
}; // 게시글 카테고리 옵션

const EditPostPage = () => {
    const { id } = useParams(); // URL에서 게시글 ID 추출
    const navigate = useNavigate(); // 페이지 이동을 위한 네비게이트 훅
    const [form, setForm] = useState({ title: "", content: "", category: "NOTICE" }); // 폼 데이터 상태 관리

    useEffect(() => {
        // 초기 로드 시 게시글 데이터를 가져옴
        const fetchPost = async () => {
            try {
                const post = await getPost(id); // API 호출로 게시글 데이터 가져오기
                setForm({
                    title: post.title,
                    content: post.content,
                    category: post.category,
                }); // 상태 업데이트
            } catch (error) {
                console.error("게시글 데이터 로드 실패:", error); // 에러 로그
            }
        };
        fetchPost(); // 컴포넌트 마운트 시 데이터 요청
    }, [id]); // ID가 변경될 때만 다시 요청

    const handleChange = (e) => {
        // 입력 필드 변경 시 상태 업데이트
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // 기본 폼 제출 동작 방지
        try {
            await updatePost(id, form); // API 호출로 게시글 데이터 업데이트
            alert("수정 완료");
            navigate(`/boards/${id}`); // 수정 완료 후 게시글 상세 페이지로 이동
        } catch (error) {
            console.error("게시글 수정 실패:", error); // 에러 로그
            alert("수정 실패. 다시 시도해주세요.");
        }
    };

    const handleGoBack = () => {
        navigate(-1); // 이전 페이지로 이동
    };

    return (
        <div className="edit-post-page">
            <h1>게시글 수정</h1> {/* 페이지 제목 */}
            <form onSubmit={handleSubmit}>
                {/* 제목 입력 필드 */}
                <input
                    name="title"
                    placeholder="제목"
                    value={form.title}
                    onChange={handleChange}
                />
                {/* 내용 입력 필드 */}
                <textarea
                    name="content"
                    placeholder="내용"
                    value={form.content}
                    onChange={handleChange}
                />
                {/* 카테고리 선택 */}
                <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                >
                    {Object.entries(CATEGORY_OPTIONS).map(([key, value]) => (
                        <option key={key} value={key}>
                            {value}
                        </option>
                    ))}
                </select>
                <div className="form-actions">
                    <button type="submit">수정하기</button> {/* 수정 버튼 */}
                    <button type="button" onClick={handleGoBack}>
                        뒤로 가기
                    </button> {/* 뒤로 가기 버튼 */}
                </div>
            </form>
        </div>
    );
};

export default EditPostPage; // EditPostPage 컴포넌트를 기본 내보내기로 설정
