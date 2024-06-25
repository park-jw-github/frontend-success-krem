/*
// 백엔드 API 기본 URL 설정

let backendHost;

const hostname = window && window.location && window.location.hostname;

if (hostname === "localhost") {
  backendHost = "http://localhost:8080";
}

export const API_BASE_URL = `${backendHost}`;
*/


const API_BASE_URL = process.env.REACT_APP_API_URL;
console.log('API_BASE_URL in app-config.js:', API_BASE_URL);

export { API_BASE_URL };
