import React from 'react';
import LanguageRecord from './LanguageRecord';
import AddRecord from "../../ResumeCommon/AddRecord";
import SectionContainer from "../../ResumeCommon/SectionContainer";

// LanguageSection.js: Language.js와 비슷한 역할. 언어 섹션을 구성

// Language 항목 관리 컴포넌트
const LanguageSection = ({ languages, setLanguages, resumeId }) => {
    // 언어 추가 함수
    const addLanguage = () => {
        setLanguages([...languages, { id: languages.length, language: '', testName: '', score: '', date: '' }]);
    };

    // 언어 제거 함수
    const removeLanguage = (index) => {
        setLanguages(languages.filter((_, idx) => idx !== index));
    };

    // 언어 업데이트 함수
    const updateLanguage = (index, field, value) => {
        setLanguages(languages.map((lang, idx) => idx === index ? { ...lang, [field]: value } : lang));
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
                    resumeId={resumeId}
                />
            ))}
            <div style={{ height: 10 }}></div>
            <AddRecord fieldName="어학 점수" onClick={addLanguage}></AddRecord>
        </SectionContainer>
    );
};

export default LanguageSection;
