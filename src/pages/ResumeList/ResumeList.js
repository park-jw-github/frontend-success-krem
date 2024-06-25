import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

function ResumeList({ baseUrl }) {
  const [resumes, setResumes] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const navigate = useNavigate();

  // Resume 목록 조회 & 새로고침
  const fetchResumes = useCallback(async () => {
    try {
      const token = localStorage.getItem("ACCESS_TOKEN"); // 추가된 부분: 로컬 스토리지에서 토큰 가져오기
      const response = await fetch(`${baseUrl}/api/resumes`, {
        headers: {
          'Authorization': `Bearer ${token}`, // 추가된 부분: 인증 헤더에 토큰 추가
          'Content-Type': 'application/json',
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const formattedResumes = data.map(resume => ({
        id: resume.id,
        title: resume.title,
        createdAt: resume.createdAt
      }));
      setResumes(formattedResumes);
    } catch (error) {
      console.error('Failed to fetch resumes', error);
    }
  }, [baseUrl]);

  useEffect(() => {
    fetchResumes();
  }, [fetchResumes]);

  // Resume 생성
  const createResume = useCallback(async () => {
    try {
      const token = localStorage.getItem("ACCESS_TOKEN"); // 추가된 부분: 로컬 스토리지에서 토큰 가져오기
      const response = await fetch(`${baseUrl}/api/resumes`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // 추가된 부분: 인증 헤더에 토큰 추가
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTitle), // 수정된 부분: JSON 형식으로 전송
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      fetchResumes();
      setNewTitle(); // Title 입력값 초기화
    } catch (error) {
      console.error('Failed to create resume', error);
    }
  }, [baseUrl, fetchResumes, newTitle]);

  // Resume 삭제
  const deleteResume = useCallback(async (resumeId) => {
    try {
      const token = localStorage.getItem("ACCESS_TOKEN"); // 추가된 부분: 로컬 스토리지에서 토큰 가져오기
      const response = await fetch(`${baseUrl}/api/resumes/${resumeId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`, // 추가된 부분: 인증 헤더에 토큰 추가
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      fetchResumes();
    } catch (error) {
      console.error('Failed to delete resume', error);
    }
  }, [baseUrl, fetchResumes]);

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true
    });
  };

  return (
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <h2>새 이력서 생성</h2>
        <div style={{ marginBottom: '1rem' }}>
          <input
              type="text"
              placeholder="이력서의 제목을 입력하세요."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              style={{ fontSize: '1rem', padding: '0.5rem' }}
          />
          <button onClick={createResume} style={{ fontSize: '1rem', padding: '0.5rem' }}>생성</button>
        </div>
        <h2>작성한 이력서 목록</h2>
        <table style={{ width: '80%', margin: '0 auto', borderCollapse: 'collapse' }}>
          <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#f2f2f2' }}>이력서 제목</th>
            <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#f2f2f2' }}>생성 일자</th>
            <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#f2f2f2' }}>삭제</th>
          </tr>
          </thead>
          <tbody>
          {resumes.map((resume) => (
              <tr key={resume.id}>
                <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
                  <button onClick={() => navigate(`/resumes/${resume.id}`)} style={{
                    fontSize: '1.3rem',
                    padding: '0.5rem',
                    width: '100%',
                    textAlign: 'center',
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    color: 'rgba(0, 30, 89, 1)',
                    textDecoration: 'underline'
                  }}>
                    {resume.title}
                  </button>
                </td>
                <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
                  {resume.createdAt ? formatDateTime(resume.createdAt) : 'N/A'}
                </td>
                <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
                  <button onClick={() => deleteResume(resume.id)} style={{ fontSize: '1rem', padding: '0.5rem' }}>X
                  </button>
                </td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  );
}

export default ResumeList;
