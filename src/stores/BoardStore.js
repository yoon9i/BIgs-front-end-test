import { makeAutoObservable } from "mobx"; // MobX 상태 관리
import { getCategories } from "../services/boardService"; // 카테고리 데이터 가져오기 API

class BoardStore {
    posts = []; // 게시글 목록
    categories = []; // 게시판 카테고리 목록

    constructor() {
        makeAutoObservable(this); // MobX 상태로 만들기
    }

    setPosts(posts) {
        this.posts = posts; // 게시글 목록 설정
    }

    setCategories(categories) {
        this.categories = categories; // 카테고리 목록 설정
    }

    async fetchCategories() {
        try {
            const response = await getCategories(); // 카테고리 데이터 가져오기
            this.setCategories(response); // 상태 업데이트
        } catch (error) {
            console.error("카테고리 로드 실패:", error); // 에러 로그
        }
    }
}

export const boardStore = new BoardStore(); // BoardStore 인스턴스 생성 및 내보내기
