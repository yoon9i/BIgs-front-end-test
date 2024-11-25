import React from "react";
import { Link } from "react-router-dom"; // 페이지 이동을 위한 React Router

const PostCard = ({ post }) => {
    return (
        <div className="post-card">
            <h2>{post.title}</h2> {/* 게시글 제목 */}
            <p>{post.content}</p> {/* 게시글 내용 */}
            {/* 게시글 상세 페이지로 이동하는 링크 */}
            <Link to={`/boards/${post.id}`}>자세히 보기</Link>
        </div>
    );
};

export default PostCard; // PostCard 컴포넌트를 기본 내보내기로 설정
