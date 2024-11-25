import axios from "axios"; // Axios 라이브러리 사용

const API_BASE = "https://front-mission.bigs.or.kr/auth"; // 인증 API 기본 URL

// 회원가입 API 호출
export const signup = async (userData) => {
    const response = await axios.post(`${API_BASE}/signup`, userData, {
        headers: {
            "Content-Type": "application/json", // 요청 헤더 설정
        },
    });
    return response.data; // 응답 데이터 반환
};

// 로그인 API 호출
export const login = async (userData) => {
    try {
        console.log("전송 데이터:", userData); // 디버깅 로그
        const response = await axios.post(`${API_BASE}/signin`, userData, {
            headers: {
                "Content-Type": "application/json", // 요청 헤더 설정
            },
        });
        console.log("로그인 API 응답:", response.data); // 응답 로그 출력
        return response.data; // 응답 데이터 반환
    } catch (error) {
        console.error("로그인 API 호출 실패:", error.response?.data || error.message); // 에러 로그
        throw error; // 에러
    }
};

// 토큰 갱신 API 호출
export const refresh = async (token) => {
    const response = await axios.post(`${API_BASE}/refresh`, { refreshToken: token });
    return response.data; // 갱신된 토큰 반환
};
