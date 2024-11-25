import apiClient from "./apiClient"; // Axios 인스턴스 사용

const BOARD_API = "/boards"; // 게시판 API 기본 경로

// 게시글 생성 API 호출
export const createPost = async (data) => {
    const response = await apiClient.post(BOARD_API, data);
    return response.data; // 생성된 게시글 데이터 반환
};

// 게시글 삭제 API 호출
export const deletePost = async (id) => {
    const response = await apiClient.delete(`${BOARD_API}/${id}`);
    return response.data; // 삭제 결과 반환
};

// 게시글 수정 API 호출
export const updatePost = async (id, data) => {
    const response = await apiClient.patch(`${BOARD_API}/${id}`, data);
    return response.data; // 수정된 게시글 데이터 반환
};

// 게시글 데이터 가져오기 API 호출
export const getPost = async (id) => {
    const response = await apiClient.get(`${BOARD_API}/${id}`);
    return response.data; // 게시글 데이터 반환
};

// 게시글 목록 가져오기 API 호출
export const getPostList = async (page, size) => {
    const response = await apiClient.get(BOARD_API, {
        params: { page, size }, // 페이지 및 크기 설정
    });
    return response.data; // 게시글 목록 데이터 반환
};

// 카테고리 데이터 가져오기 API 호출
export const getCategories = async () => {
    const response = await apiClient.get(`${BOARD_API}/categories`);
    return response.data; // 카테고리 데이터 반환
};
