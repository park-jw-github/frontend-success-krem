// index.js: 애플리케이션 초기화 및 렌더링

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppRouter from './AppRouter';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";

// 환경변수를 사용해 API URL 설정
const BASE_URL = process.env.REACT_APP_API_URL;
console.log('BASE_URL:', BASE_URL);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <AppRouter baseUrl={BASE_URL} /> {/* 라우터 컴포넌트 */}
            {/* <ApiService baseUrl={API_BASE_URL} /> */}
        </BrowserRouter>
    </React.StrictMode>
);

reportWebVitals(); // 성능 측정