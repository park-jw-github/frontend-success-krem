import React, { useEffect } from 'react';
import AddRecord from "../../ResumeCommon/AddRecord";
import SectionContainer from "../../ResumeCommon/SectionContainer";
import LanguageRecord from "./LanguageRecord";

// Language.js: 사용자가 Language 항목 내 입력란에 입력한 데이터들을 관리하고 표시함

// Language 항목 데이터 관리 컴포넌트
const Language = ({ languages, setLanguages }) => {
    // 컴포넌트가 마운트될 때 local storage 에서 이전에 입력된 데이터들을 불러옴
    useEffect(() => {
        const savedLanguages = JSON.parse(localStorage.getItem('languages'));
        if (savedLanguages) {
            setLanguages(savedLanguages);
        } else {
            setLanguages([{ id: null, language: '', testName: '', score: '', date: '' }]);
        }
    }, [setLanguages]);

    // 입력 데이터가 변경될 때마다 local storage 에 저장
    useEffect(() => {
        localStorage.setItem('languages', JSON.stringify(languages));
    }, [languages]);

    // 추가 함수
    const addLanguage = () => {
        setLanguages(prev => [
            ...prev,
            { id: prev.length, language: '', testName: '', score: '', date: '' }
        ]);
    };

    // 삭제 함수
    const removeLanguage = (index) => {
        setLanguages(prev => prev.filter((_, idx) => idx !== index));
    };

    // 업데이트 함수
    const updateLanguage = (index, field, value) => {
        setLanguages(prev => prev.map((lang, idx) => idx === index ? { ...lang, [field]: value } : lang));
    };

    return (
        <SectionContainer title="Language">
            {languages.map((lang, index) => (
                <LanguageRecord
                    key={index}
                    index={index}
                    language={lang}
                    onRemove={() => removeLanguage(index)}
                    onUpdate={updateLanguage}
                />
            ))}
            <div style={{ height: 10 }}></div>
            <AddRecord fieldName="어학 점수" onClick={addLanguage}></AddRecord>
        </SectionContainer>
    );
};

export default Language;