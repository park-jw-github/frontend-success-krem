import React, { useState } from 'react';
import styled from "styled-components";
import { call } from "../../../service/ApiService";

// LanguageRecord.js: 개별 Language 항목의 입력을 처리하고 관리

const Border = styled.div`
    border-style: solid;
    border-width: 2px;
    border-radius: 10px;
    border-color: rgba(18, 73, 156, 50%);
    margin-bottom: 10px;
    padding-left: 20px;
    padding-bottom: 20px;
`;

const Input = styled.input`
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 15px;
`;

const LanguageRecord = ({ index, language, onRemove, onUpdate, resumeId }) => {
    // 에러 상태 관리
    const [error, setError] = useState('');

    // 입력 값 변경 핸들러
    const handleInputChange = (field, value) => {
        onUpdate(index, field, value);
    };

    // 날짜 형식 검증 함수
    const validateDate = (date) => {
        return /^\d{4}\.\d{2}$/.test(date);
    };

    // 날짜 입력 변경 핸들러
    const handleDateChange = (value) => {
        handleInputChange('date', value);
        if (validateDate(value) || value === '') {
            setError('');
        } else {
            setError('날짜 형식을 확인해 주세요.');
        }
    };

    // 삭제 핸들러
    const handleRemove = async () => {
        try {
            await call(`/api/resumes/${resumeId}/languages/${language.id}`, "DELETE");
            onRemove();
        } catch (error) {
            console.error("Failed to delete language data", error);
        }
    };

    return (
        <Border>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button style={{
                    cursor: "pointer",
                    borderRadius: "0px 8px 0px 3px",
                    width: 30,
                    height: 20,
                    backgroundColor: "rgba(18, 73, 156, 50%)",
                    color: "white",
                    border: "none"
                }} onClick={handleRemove}>-
                </button>
            </div>
            <div style={{ display: "flex", height: 35, marginTop: 5, gap: 5 }}>
                <Input style={{ width: 150 }} placeholder="외국어명" value={language.language} onChange={(e) => handleInputChange('language', e.target.value)} />
                <Input style={{ width: 150 }} placeholder="공인시험명" value={language.testName} onChange={(e) => handleInputChange('testName', e.target.value)} />
                <Input style={{ width: 70 }} placeholder="점수" value={language.score} onChange={(e) => handleInputChange('score', e.target.value)} />
                <div>
                    <Input style={{ width: 70 }} placeholder="YYYY.MM" value={language.date} onChange={(e) => handleDateChange(e.target.value)} />
                    {error && <div style={{ fontSize: 13, color: 'rgba(202, 5, 5, 1)' }}>{error}</div>}
                </div>
            </div>
        </Border>
    );
};

export default LanguageRecord;

