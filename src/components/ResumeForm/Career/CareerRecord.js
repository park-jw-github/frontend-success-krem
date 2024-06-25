import React, { useState } from "react";
import styled from "styled-components";
import CheckboxLabels from "../../ResumeCommon/CheckboxLabels";
import SkillSearchComponent from "../SearchSkills/SkillSearchComponent";
import { call } from "../../../service/ApiService";

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
    width: 150px;
`;

const CareerRecord = ({ index, career, onRemove, onUpdate, resumeId }) => {
    const checkboxOption = "재직";
    const [isChecked, setIsChecked] = useState(career.isCurrent);

    const [error, setError] = useState('');

    const handleInputChange = (field, value) => {
        onUpdate(index, field, value);
    };

    const validateDate = (date) => {
        return /^\d{4}\.\d{2}$/.test(date);
    };

    const handleStartDateChange = (value) => {
        handleInputChange('startDate', value);
        if (validateDate(value) || value === '') {
            setError('');
        } else {
            setError('날짜 형식을 확인해 주세요.');
        }
    };

    const handleEndDateChange = (value) => {
        handleInputChange('endDate', value);
        if (validateDate(value) || value === '') {
            setError('');
        } else {
            setError('날짜 형식을 확인해 주세요.');
        }
    };

    const handleCheckboxChange = (event) => {
        const checked = event.target.checked;
        setIsChecked(checked);
        onUpdate(index, 'isCurrent', checked);
        if (checked) {
            onUpdate(index, 'endDate', ''); // 현재 재직 중이라면 종료일 제거
        }
    };

    const handleRemove = async () => {
        try {
            await call(`/api/resumes/${resumeId}/careers/${career.id}`, "DELETE");
            onRemove();
        } catch (error) {
            console.error("Failed to delete career data", error);
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
            <div style={{ display: "flex", gap: 5 }}>
                <Input placeholder="회사명" value={career.company} onChange={(e) => onUpdate(index, 'company', e.target.value)} />
                <Input placeholder="부서명/직책" value={career.department} onChange={(e) => onUpdate(index, 'department', e.target.value)} />
            </div>
            <div style={{ display: "flex", height: 35, alignItems: "center", marginTop: 5, gap: 5 }}>
                <Input style={{ width: 70 }} placeholder="YYYY.MM" value={career.startDate} onChange={(e) => handleStartDateChange(e.target.value)} />
                <span>-</span>
                <Input
                    style={{ width: 70 }}
                    placeholder={isChecked ? "N/A" : "YYYY.MM"}
                    disabled={isChecked}
                    value={isChecked ? "N/A" : career.endDate}
                    onChange={(e) => handleEndDateChange(e.target.value)}
                />
                <CheckboxLabels option={checkboxOption} checked={isChecked} onChange={handleCheckboxChange}></CheckboxLabels>
            </div>
            {error && <div style={{ fontSize: 13, color: 'rgba(202, 5, 5, 1)' }}>{error}</div>}
            <div style={{ height: 5 }}></div>
            <SkillSearchComponent 
                    singleSelection={true}
                    selectedSkills={career.techStack || ""}
                    onSkillChange={(careers) => handleInputChange('techStack', careers)}
                />
            <Input as="textarea"
                style={{ marginTop: 5, width: 620, height: 60, fontFamily: "inherit" }}
                placeholder="업무 내용 또는 성과를 입력하세요."
                value={career.description}
                onChange={(e) => onUpdate(index, 'description', e.target.value)}
            />
        </Border>
    );
}

export default CareerRecord;
