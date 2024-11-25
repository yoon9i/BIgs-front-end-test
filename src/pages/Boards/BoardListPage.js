import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 React Router
import { getPostList, deletePost } from "../../services/boardService"; // 게시글 관련 API 호출
import { boardStore } from "../../stores/BoardStore"; // 게시판 관련 MobX 스토어
import { authStore } from "../../stores/AuthStore"; // 인증 관련 MobX 스토어
import { observer } from "mobx-react-lite"; // MobX 상태를 관찰하는 컴포넌트
import "./BoardListPage.scss"; // BoardListPage 스타일 정의

const BoardListPage = observer(() => {
    const navigate = useNavigate(); // 페이지 이동을 위한 네비게이트 훅
    const [page, setPage] = useState(0); // 현재 페이지 번호를 관리하는 상태 변수

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const posts = await getPostList(page, 10); // 현재 페이지의 게시글 데이터 가져오기
                boardStore.setPosts(posts.content); // MobX 스토어에 게시글 데이터 설정
            } catch (error) {
                console.error("게시글 데이터 로드 실패:", error.response?.data || error.message);
            }
        };
        fetchPosts(); // 컴포넌트 마운트 시 데이터 요청
    }, [page]); // 페이지 번호가 변경될 때마다 데이터 재요청

    const handleCreatePost = () => {
        navigate("/boards/create"); // 게시글 작성 페이지로 이동
    };

    const handleDeletePost = async (id) => {
        if (window.confirm("정말로 이 게시물을 삭제하시겠습니까?")) {
            // 삭제 확인
            try {
                await deletePost(id); // 게시글 삭제 API 호출
                alert("게시물이 삭제되었습니다.");
                const posts = await getPostList(page, 10); // 삭제 후 목록 새로고침
                boardStore.setPosts(posts.content); // MobX 스토어에 새 데이터 설정
            } catch (error) {
                console.error("게시글 삭제 실패:", error.response?.data || error.message);
                alert("게시글 삭제에 실패했습니다.");
            }
        }
    };

    const handleLogout = () => {
        authStore.clearAuth(); // 인증 정보 초기화
        alert("로그아웃되었습니다.");
        navigate("/login"); // 로그인 페이지로 이동
    };

    const handleNextPage = () => setPage((prev) => prev + 1); // 다음 페이지
    const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 0)); // 이전 페이지

    return (
        <div className="board-list-page">
            <header className="board-header">
                <h1>게시판</h1> {/* 게시판 제목 */}
                <div className="user-controls">
                    {/* 로그인된 사용자 정보 */}
                    {authStore.isAuthenticated && authStore.user ? (
                        <p>
                            사용자: {authStore.user.name} ({authStore.user.username})
                        </p>
                    ) : (
                        <p>로그인된 사용자 정보가 없습니다.</p>
                    )}
                    <button className="logout-button" onClick={handleLogout}>
                        로그아웃
                    </button> {/* 로그아웃 버튼 */}
                </div>
            </header>

            <button className="create-post-button" onClick={handleCreatePost}>
                새 게시글 작성
            </button> {/* 게시글 작성 버튼 */}

            <div className="post-list">
                {boardStore.posts.map((post) => (
                    <div className="post-card" key={post.id}>
                        <h2>{post.title}</h2> {/* 게시글 제목 */}
                        <p className="post-author">
                            작성자: {post.authorName || "알 수 없음"}
                        </p> {/* 작성자 정보 */}
                        <p className="post-content">
                            {post.content || "내용이 없습니다."}
                        </p> {/* 게시글 내용 */}
                        <div className="actions">
                            <button
                                className="view-button"
                                onClick={() => navigate(`/boards/${post.id}`)}
                            >
                                자세히 보기
                            </button> {/* 게시글 상세 보기 버튼 */}
                            <button
                                className="delete-button"
                                onClick={() => handleDeletePost(post.id)}
                            >
                                삭제
                            </button> {/* 게시글 삭제 버튼 */}
                        </div>
                    </div>
                ))}
            </div>

            <div className="pagination">
                <button onClick={handlePrevPage} disabled={page === 0}>
                    이전
                </button> {/* 이전 페이지 버튼 */}
                <button onClick={handleNextPage}>다음</button> {/* 다음 페이지 버튼 */}
            </div>
        </div>
    );
});

export default BoardListPage; // BoardListPage 컴포넌트를 기본 내보내기로 설정
