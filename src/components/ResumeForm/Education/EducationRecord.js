import MenuListComposition from "../../ResumeCommon/MenuListComposition";
import React, {useState} from "react";
import styled from "styled-components";
import UseRadioGroup from "../../ResumeCommon/UseRadioGroup";

const Border = styled.div`
    border-style: solid;
    border-width: 2px;
    border-radius: 10px;
    border-color: rgba(18, 73, 156, 50%);
    margin-bottom: 10px;
    padding-left: 20px;
    padding-bottom: 20px;
`

const Input = styled.input`
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 15px;
    width: 150px;
`;

const EducationRecord = ({onRemove}) => {
    const [selectedRadio, setSelectedRadio] = useState('first'); // 기본값 설정
    const menuItems1 = ["고등학교", "대학교 (2,3년)", "대학교 (4년)", "대학원 (석사)", "대학원 (박사)"];

    const radioOptions = [
        { value: 'first', label: '재학' },
        { value: 'second', label: '휴학' },
        { value: 'third', label: '중퇴' }
    ];
    const handleRadioChange = (event) => {
        setSelectedRadio(event.target.value);
    };

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [error, setError] = useState('');

    const validateDate = (date) => {
        return /^\d{4}\.\d{2}$/.test(date);
    };

    const handleDateChange = (setDate, value) => {
        setDate(value);
        if (validateDate(value) || value === '') {
            setError('');
        } else {
            setError('날짜 형식을 확인해 주세요.');
        }
    };

    return (
        <Border>
            <div style={{display: "flex", justifyContent: "flex-end"}}>
                <button style={{
                    cursor: "pointer",
                    borderRadius: "0px 8px 0px 3px",
                    width: 30,
                    height: 20,
                    backgroundColor: "rgba(18, 73, 156, 50%)",
                    color: "white",
                    border: "none"
                }} onClick={onRemove}>-
                </button>
            </div>
            <div style={{display: "flex", gap: 5}}>
                <MenuListComposition menuTitle="학력 구분" menuItems={menuItems1}></MenuListComposition>
                <Input placeholder="학교명"/>
                <Input placeholder="전공"/>
            </div>
            <div style={{display: "flex", gap: 5, alignItems: "center", marginTop: 5}}>
                <Input style={{width: 70}} placeholder="YYYY.MM" value={startDate}
                       onChange={(e) => handleDateChange(setStartDate, e.target.value)}/>
                <span>-</span>
                <Input style={{width: 70, marginRight:10}} placeholder="YYYY.MM"
                       value={endDate}
                       onChange={(e) => handleDateChange(setEndDate, e.target.value)}
                       disabled={selectedRadio === 'first'}/>
                <UseRadioGroup options={radioOptions} value={selectedRadio} onChange={handleRadioChange}/>
            </div>
            {error && <div style={{fontSize: 13, color: 'rgba(202, 5, 5, 1)'}}>{error}</div>}
        </Border>
    );
};

export default EducationRecord;