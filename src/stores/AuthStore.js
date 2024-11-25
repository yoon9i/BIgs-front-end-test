import { makeAutoObservable } from "mobx"; // MobX 상태 관리

class AuthStore {
    user = null; // 사용자 정보
    token = null; // 인증 토큰

    constructor() {
        makeAutoObservable(this); // MobX 상태로 만들기
        this.token = localStorage.getItem("accessToken") || null; // 로컬 스토리지에서 토큰 가져오기
        const storedUser = localStorage.getItem("user");
        this.user = storedUser ? JSON.parse(storedUser) : null; // 사용자 정보 로드
    }

    setUser(user) {
        this.user = user; // 사용자 정보 설정
        localStorage.setItem("user", JSON.stringify(user)); // 로컬 스토리지에 저장
    }

    setToken(token) {
        this.token = token; // 토큰 설정
        localStorage.setItem("accessToken", token); // 로컬 스토리지에 저장
    }

    get isAuthenticated() {
        return !!this.token && !!this.user?.username; // 인증 여부 확인
    }

    clearAuth() {
        this.user = null; // 사용자 정보 초기화
        this.token = null; // 토큰 초기화
        localStorage.removeItem("accessToken"); // 로컬 스토리지에서 제거
        localStorage.removeItem("user");
    }
}

export const authStore = new AuthStore(); // AuthStore 인스턴스 생성 및 내보내기
