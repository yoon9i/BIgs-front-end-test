import axios from "axios"; // Axios 라이브러리 사용

// Axios 인스턴스 생성
const apiClient = axios.create({
    baseURL: "https://front-mission.bigs.or.kr", // API 기본 URL 설정
    headers: {
        "Content-Type": "application/json", // 요청 헤더의 Content-Type을 JSON으로 설정
    },
});

// 요청 인터셉터 설정
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken"); // 로컬 스토리지에서 토큰 가져오기
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Authorization 헤더에 토큰 설정
        }
        return config; // 수정된 요청 반환
    },
    (error) => Promise.reject(error) // 요청 에러 처리
);

// 디버깅용 인터셉터 (토큰 로그 출력)
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        console.log("액세스 토큰:", token); // 디버깅 로그 출력
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default apiClient; // apiClient 인스턴스를 기본 내보내기로 설정
