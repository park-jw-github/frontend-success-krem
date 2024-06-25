import React, { useState, useEffect } from 'react';
import SectionContainer from "../../ResumeCommon/SectionContainer";
import AddRecord from "../../ResumeCommon/AddRecord";
import SkillRecord from "./SkillRecord";

const Skill = ({ skills, setSkills, resumeId }) => {
    // 컴포넌트가 마운트될 때 local storage 에서 이전에 입력된 데이터들을 불러옴
    useEffect(() => {
        const savedSkills = JSON.parse(localStorage.getItem('skills'));
        if (savedSkills) {
            setSkills(savedSkills);
        } else {
            setSkills([{ id: null, techStack: '', description: '' }]);
        }
    }, [setSkills]);

    // 입력 데이터가 변경될 때마다 local storage 에 저장
    useEffect(() => {
        localStorage.setItem('skills', JSON.stringify(skills));
    }, [skills]);

    // 추가 함수
    const addSkill = () => {
        setSkills(prev => [
            ...prev,
            { id: prev.length, techStack: '', description: '' }
        ]);
    };

    // 삭제 함수
    const removeSkill = (index) => {
        setSkills(prev => prev.filter((_, idx) => idx !== index));
    };

    // 업데이트 함수
    const updateSkill = (index, field, value) => {
        setSkills(prev => prev.map((skill, idx) => idx === index ? { ...skill, [field]: value } : skill));
    };

    return (
        <SectionContainer title="Skills">
            {skills.map((skill, index) => (
                <SkillRecord
                    key={index}
                    index={index}
                    skill={skill}
                    onRemove={() => removeSkill(index)}
                    onUpdate={updateSkill}
                    resumeId={resumeId}
                />
            ))}
            <div style={{ height: 10 }}></div>
            <AddRecord fieldName="기술" onClick={addSkill}></AddRecord>
        </SectionContainer>
    );
};

export default Skill;
