import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // 동적 라우팅 및 페이지 이동을 위한 React Router
import { getPost } from "../../services/boardService"; // 게시글 데이터를 가져오는 API 호출
import "./BoardDetailPage.scss"; // BoardDetailPage 스타일 정의

const BoardDetailPage = () => {
    const { id } = useParams(); // URL에서 게시글 ID를 추출
    const navigate = useNavigate(); // 페이지 이동을 위한 네비게이트 훅
    const [post, setPost] = useState(null); // 게시글 데이터를 관리하는 상태 변수

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await getPost(id); // API 호출로 게시글 데이터 가져오기
                setPost(data); // 상태에 데이터 설정
            } catch (error) {
                console.error("게시물 로드 실패:", error); // 에러 로그 출력
            }
        };
        fetchPost(); // 컴포넌트 마운트 시 데이터 가져오기
    }, [id]); // ID가 변경될 때마다 데이터 재요청

    if (!post) return <p>로딩 중...</p>; // 데이터를 가져오는 동안 로딩 메시지 표시

    return (
        <div className="board-detail-page">
            <h1>{post.title}</h1> {/* 게시글 제목 */}
            {post.imageUrl && (
                <img src={post.imageUrl} alt={post.title} className="post-image" />
            )} {/* 이미지가 있을 경우 표시 */}
            <p className="category">카테고리: {post.boardCategory}</p> {/* 게시글 카테고리 */}
            <p className="created-at">
                작성일: {new Date(post.createdAt).toLocaleString()}
            </p> {/* 작성일 */}
            <p>{post.content}</p> {/* 게시글 내용 */}

            <div className="actions">
                <button className="back-button" onClick={() => navigate(-1)}>
                    뒤로 가기
                </button> {/* 뒤로가기 버튼 */}
                <button className="edit-button" onClick={() => navigate(`/boards/edit/${id}`)}>
                    수정
                </button> {/* 수정 버튼 */}
            </div>
        </div>
    );
};

export default BoardDetailPage; // BoardDetailPage 컴포넌트를 기본 내보내기로 설정
