import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import './ResumePage.css';
import ResumeNav from "../../components/ResumeCommon/ResumeNav";
import styled from "styled-components";
import CategoryList from "../../components/ResumeCategory/CategoryList";
import FormContent from "../../components/ResumeForm/FormContent";
import { call } from "../../service/ApiService";

// ResumePage.js: 이력서 작성 페이지(/resumes/{resumeId})를 구성, 데이터 불러오기, 저장하기 등의 기능을 담당

const CategoryContainer = styled.div`
    margin-left: 20px;
    width: 400px;
    height: 600px;
    background-color: rgba(0, 30, 89, 1);
`;

const CategoryContainer2 = styled.div`
    width: 85%;
    height: 90%;
    background-color: white;
    border-radius: 5px;
`;

const Title = styled.h3`
    margin-top: 25px;
    margin-left: 25px;
    margin-bottom: 15px;
    background-color: white;
    color: black;
`;

const Line = styled.div`
    height: 1px;
    margin-left: 20px;
    width: 300px;
    background-color: rgba(0, 30, 89, 1);
`;

const Button = styled.button`
    width: 90px;
    height: 40px;
    background-color: rgba(0, 69, 171, 1);
    color: white;
    font-size: 16px;
    font-weight: bold;
    border-radius: 5px;
    border: none;
    cursor: pointer;
`;

const ResumeTitle = styled.input`
    display: flex;
    align-items: center;
    width: 700px;
    height: 40px;
    font-size: 20px;
    padding: 10px;
    border-radius: 5px;
    border-color: rgba(89, 127, 200, 1);
    border-width: 3px;
    border-style: solid;
    line-height: 1.5;
    box-sizing: border-box;
`;

function ResumePage({ baseUrl }) {
    const navigate = useNavigate();
    const { resumeId } = useParams();
    const [activeSections, setActiveSections] = useState([]);
    const [resumeTitle, setResumeTitle] = useState("");
    const [languages, setLanguages] = useState([]);
    const [awards, setAwards] = useState([]);
    const [skills, setSkills] = useState([]);
    const [careers, setCareers] = useState([]);
    const [projects, setProjects] = useState([]);
    const [certificates, setCertificates] = useState([]);

    // 데이터 불러오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await call(`/api/resumes/${resumeId}`, "GET");
                const { title, languages, awards, skills, careers, certificates, projects } = response;
                setResumeTitle(title || "");
                setLanguages(languages || []);
                setAwards(awards || []);
                setSkills(skills || []);
                setCareers(careers || []);
                setProjects(projects || []);
                setCertificates(certificates || []);
                setActiveSections(['Language', 'Award', 'Skill', 'Career', 'Project', 'Certificate']);  // 항상 섹션을 활성화
            } catch (error) {
                console.error("Failed to fetch resume data", error);
            }
        };
        fetchData();
    }, [resumeId]);

    // 항목 변경
    const handleSectionChange = (sections) => {
        setActiveSections(sections);
    };

    // 제목 변경
    const handleTitleChange = (event) => {
        setResumeTitle(event.target.value);
    };

    // 전체 저장
    const handleSave = async () => {
        try {
            const data = {
                title: resumeTitle,
                languages: languages,
                awards: awards,
                skills: skills,
                careers: careers,
                projects: projects,
                certificates: certificates,
            };

            await call(`/api/resumes/${resumeId}/save`, "POST", data);

            alert('전체 저장이 완료되었습니다.');
            navigate("/resumes"); // 저장 후 /resumes 페이지로 리다이렉트
        } catch (error) {
            console.error("Failed to save resume data", error);
        }
    };

    // PDF 인쇄, 저장, 미리보기
    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="app">
            <div className="nav">
                <ResumeNav defaultActive="작성" />
            </div>
            <div style={{ display: 'flex' }}>
                <div className="category-container">
                    <CategoryContainer style={{ display: "flex", justifyContent: 'center', alignItems: 'center' }}>
                        <CategoryContainer2>
                            <Title>이력서 항목</Title>
                            <Line />
                            <CategoryList onSectionChange={handleSectionChange}></CategoryList>
                        </CategoryContainer2>
                    </CategoryContainer>
                </div>
                <div className="form-container">
                    <div style={{ marginTop: 25, marginRight: 25, display: "flex", justifyContent: 'end', gap: 10 }}>
                        <Button onClick={handleSave}>전체 저장</Button>
                        <Button onClick={handlePrint}>PDF 인쇄</Button>
                    </div>
                    <div id="printContent" style={{ width: '100%', padding: '20px', background: 'white' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 30, marginBottom: 10 }}>
                            <ResumeTitle type="text" value={resumeTitle} onChange={handleTitleChange} placeholder="이력서 제목 (저장용)" />
                        </div>
                        <FormContent activeSections={activeSections} 
                            languages={languages} setLanguages={setLanguages}
                            awards={awards} setAwards={setAwards}
                            skills={skills} setSkills={setSkills}
                            careers={careers} setCareers={setCareers}
                            projects={projects} setProjects={setProjects}
                            certificates={certificates} setCertificates={setCertificates}
                            resumeId={resumeId}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumePage;

