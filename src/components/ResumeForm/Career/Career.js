import React, { useEffect, useState } from 'react';
import SectionContainer from "../../ResumeCommon/SectionContainer";
import AddRecord from "../../ResumeCommon/AddRecord";
import CareerRecord from "./CareerRecord";

const Career = ({ careers, setCareers, resumeId }) => {
    // 컴포넌트가 마운트될 때 local storage 에서 이전에 입력된 데이터들을 불러옴
    useEffect(() => {
        const savedCareers = JSON.parse(localStorage.getItem('careers'));
        if (savedCareers) {
            setCareers(savedCareers);
        } else {
            setCareers([{ id: null, company: '', department: '', startDate: '', endDate: '', isCurrent: false, techStack: '', description: '' }]);
        }
    }, [setCareers]);

    // 입력 데이터가 변경될 때마다 local storage 에 저장
    useEffect(() => {
        localStorage.setItem('careers', JSON.stringify(careers));
    }, [careers]);

    // 추가 함수
    const addCareer = () => {
        setCareers(prev => [
            ...prev,
            { id: prev.length, company: '', department: '', startDate: '', endDate: '', isCurrent: false, techStack: '', description: '' }
        ]);
    };

    // 삭제 함수
    const removeCareer = (index) => {
        setCareers(prev => prev.filter((_, idx) => idx !== index));
    };

    // 업데이트 함수
    const updateCareer = (index, field, value) => {
        setCareers(prev => prev.map((career, idx) => idx === index ? { ...career, [field]: value } : career));
    };

    return (
        <SectionContainer title="Career">
            {careers.map((career, index) => (
                <CareerRecord
                    key={index}
                    index={index}
                    career={career}
                    onRemove={() => removeCareer(index)}
                    onUpdate={updateCareer}
                    resumeId={resumeId}
                />
            ))}
            <div style={{ height: 10 }}></div>
            <AddRecord fieldName="경력" onClick={addCareer}></AddRecord>
        </SectionContainer>
    );
};

export default Career;
