import { API_BASE_URL } from "../app-config";
const ACCESS_TOKEN = "ACCESS_TOKEN";

// API 호출 함수
export function call(api, method, request, authRequired = true) {
  let headers = new Headers({
    "Content-Type": "application/json", 
    "Accept": "application/json", 
  });

  if (authRequired) {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (accessToken && accessToken !== "null") {
      headers.append("Authorization", "Bearer " + accessToken);
    }
  }

  let options = {
    headers: headers,
    url: API_BASE_URL + api,
    method: method, 
  };

  if (request) {
    options.body = JSON.stringify(request);
  }

  return fetch(options.url, options)
    .then(response => {
      if (!response.ok) {
        return response.json().then(error => Promise.reject(error));
      }
      return response.json(); 
    })
    .catch(error => {
      console.error("Fetch error:", error);
      if (error.status === 403) {
        window.location.href = "/login";
      }
      return Promise.reject(error);
    });
}

// 로그인 처리 함수
export function signin(userDTO) {
  return call("/auth/signin", "POST", userDTO).then((response) => {
    if (response.token) {
      localStorage.setItem(ACCESS_TOKEN, response.token); // 토큰을 로컬 스토리지에 저장
      window.location.href = "/resumes"; // 이력서 생성 페이지로 리디렉트
    }
  });
}

// 로그아웃 처리 함수
export function signout() {
  localStorage.setItem(ACCESS_TOKEN, null); // 토큰 삭제
  window.location.href = "/login"; // 로그인 페이지로 리디렉트
}

// 회원가입 처리 함수
export function signup(userDTO) {
  return call("/auth/signup", "POST", userDTO, false); // 회원가입 요청 시 authRequired를 false로 설정
}
