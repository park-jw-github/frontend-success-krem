import React, { useEffect, useState } from 'react';
import SectionContainer from "../../ResumeCommon/SectionContainer";
import ProjectRecord from "./ProjectRecord";
import AddRecord from "../../ResumeCommon/AddRecord";

const Project = ({ projects, setProjects, resumeId }) => {
    // 컴포넌트가 마운트될 때 local storage 에서 이전에 입력된 데이터들을 불러옴
    useEffect(() => {
        const savedProjects = JSON.parse(localStorage.getItem('projects'));
        if (savedProjects) {
            setProjects(savedProjects);
        } else {
            setProjects([{ id: null, title: '', startDate: '', endDate: '', isCurrent: false, intro: '', techStack: '', description: '' }]);
        }
    }, [setProjects]);

    // 입력 데이터가 변경될 때마다 local storage 에 저장
    useEffect(() => {
        localStorage.setItem('projects', JSON.stringify(projects));
    }, [projects]);

    // 프로젝트 추가 함수
    const addProject = () => {
        setProjects(prev => [
            ...prev,
            { id: prev.length, title: '', startDate: '', endDate: '', isCurrent: false, intro: '', techStack: '', description: '' }
        ]);
    };

    // 프로젝트 제거 함수
    const removeProject = (index) => {
        setProjects(prev => prev.filter((_, idx) => idx !== index));
    };

    // 프로젝트 업데이트 함수
    const updateProject = (index, field, value) => {
        setProjects(prev => prev.map((project, idx) => idx === index ? { ...project, [field]: value } : project));
    };

    return (
        <SectionContainer title="Project">
            {projects.map((project, index) => (
                <ProjectRecord
                    key={index}
                    index={index}
                    project={project}
                    onRemove={() => removeProject(index)}
                    onUpdate={updateProject}
                    resumeId={resumeId}
                />
            ))}
            <div style={{ height: 10 }}></div>
            <AddRecord fieldName="프로젝트" onClick={addProject}></AddRecord>
        </SectionContainer>
    );
};

export default Project;
