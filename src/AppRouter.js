// 주요 기능: 앱 라우터 설정

import React from "react";
import App from "./App";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import { Routes, Route, Navigate } from "react-router-dom";
import ResumeList from "./pages/ResumeList/ResumeList";
import ResumePage from "./pages/ResumePage/ResumePage";
import ResumePreview from "./pages/ResumePreview/ResumePreview";

// 인증된 사용자만 접근 가능하도록 함
function PrivateRoute({ element, ...rest }) {
    const isAuthenticated = !!localStorage.getItem("ACCESS_TOKEN");
    return isAuthenticated ? element : <Navigate to="/login" />;
}

class AppRouter extends React.Component {
    render() {
        return (
            <div>
                <Routes>
                    {/* 로그인 페이지 라우트 */}
                    <Route path="/login" element={<Login />} />
                    {/* 회원가입 페이지 라우트 */}
                    <Route path="/signup" element={<SignUp />} />
                    {/* 인증된 사용자만 접근 가능한 이력서 목록 페이지 라우트 */}
                    <Route
                        exact
                        path="/resumes"
                        element={<PrivateRoute element={<ResumeList baseUrl={this.props.baseUrl} />} />}
                    />
                    {/* 인증된 사용자만 접근 가능한 특정 이력서 페이지 라우트 */}
                    <Route
                        exact
                        path="/resumes/:resumeId"
                        element={<PrivateRoute element={<ResumePage baseUrl={this.props.baseUrl} />} />}
                    />
                    {/* 인증된 사용자만 접근 가능한 이력서 미리보기 페이지 라우트 */}
                    <Route
                        exact
                        path="/resumes/:resumeId/preview"
                        element={<PrivateRoute element={<ResumePreview baseUrl={this.props.baseUrl} />} />}
                    />
                    {/* 기본 페이지 라우트 */}
                    <Route path="/" element={<App />} />
                </Routes>
            </div>
        );
    }
}

export default AppRouter;