import React from "react";
import "./App.css";
import logo from "./assets/main-logo.png"; // 로고 이미지 경로
import { Button } from "@mui/material";

class App extends React.Component {
    // 컴포넌트 생성자
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: !!localStorage.getItem("ACCESS_TOKEN"), // 로그인 상태 확인
        };
    }

    // 버튼 클릭 시 페이지 이동 처리
    handleButtonClick = () => {
        const token = localStorage.getItem("ACCESS_TOKEN"); // 로컬 스토리지에서 토큰 가져오기
        if (token) {
            window.location.href = "/resumes"; // 로그인 상태면 이력서 페이지로 이동
        } else {
            window.location.href = "/login"; // 로그아웃 상태면 로그인 페이지로 이동
        }
    };

    // 렌더링
    render() {
        return (
            <div className="App">
                <div className="container">
                    <div className="left-panel"></div> {/* 왼쪽 패널 */}
                    <div className="right-panel">
                        <img src={logo} style={{ width: 300, height: 300 }} alt="logo" /> {/* 로고 이미지 */}
                        <p style={{ marginTop: '20px', fontSize: '17px', fontWeight: 'bold' }}>이력서를 작성하시겠어요?</p> {/* 텍스트 */}
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleButtonClick}
                            style={{ marginTop: '10px' }}>
                            이력서 작성 시작 👉 {/* 버튼 */}
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
