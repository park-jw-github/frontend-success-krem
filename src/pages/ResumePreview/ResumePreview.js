import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ResumePreview.css'; // CSS 파일을 가져옵니다.

function ResumePreview() {
    const { resumeId } = useParams();
    const [allData, setAllData] = useState(null);
    const [statusTData, setStatusTData] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("ACCESS_TOKEN");

        // 모든 테이블 데이터 가져오기
        fetch(`/api/resumes/${resumeId}/test`, {
            headers: {
                'Authorization': `Bearer ${token}`, // 인증 토큰 추가
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => setAllData(data))
            .catch(error => console.error('Error fetching all data:', error));

        // Status = T 인 데이터 가져오기
        fetch(`/api/resumes/${resumeId}`, {
            headers: {
                'Authorization': `Bearer ${token}`, // 인증 토큰 추가
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => setStatusTData(data))
            .catch(error => console.error('Error fetching status T data:', error));
    }, [resumeId]);

    const renderTable = (data) => {
        if (!data) return <p>Loading...</p>;

        return (
            <table className="resume-table">
                <thead>
                <tr>
                    <th>Skill ID</th>
                    <th>Resume ID</th>
                    <th>Status</th>
                    <th>Content</th>
                </tr>
                </thead>
                <tbody>
                {data.skills.map(skill => (
                    <tr key={skill.id}>
                        <td>{skill.id}</td>
                        <td>{skill.resumeId}</td>
                        <td className={skill.status ? "highlight" : ""}>{skill.status.toString()}</td>
                        <td>{skill.content}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        );
    };

    return (
        <div className="container">
            <h1 className="title">Preview Test</h1>

            <div>
                <h2 className="subtitle">API URL: /api/resumes/{resumeId}/test</h2>
                <p className="description">ResumeId 조회 : 모든 테이블</p>
                {allData ? renderTable(allData) : 'Loading...'}
            </div>

            <hr style={{ margin: '20px 0' }} />

            <div>
                <h2 className="subtitle">API URL: /api/resumes/{resumeId}</h2>
                <p className="description">ResumeId 조회 : Status = T 인 모든 테이블</p>
                {statusTData ? renderTable(statusTData) : 'Loading...'}
            </div>
        </div>
    );
}

export default ResumePreview;
