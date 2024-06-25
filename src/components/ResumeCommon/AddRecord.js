import React from "react";
import styled from "styled-components";

const AddButton = styled.button`
    width: 25px;
    height: 25px;
    background-color: rgba(90, 214, 169, 1);
    color: white;
    border-radius: 50%;
    border: none;
    font-size: 17px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`

const AddRecord = ({fieldName, onClick}) => {
    return (
        <div style={{display:"flex", alignItems:"center"}}>
            <AddButton onClick={onClick}>+</AddButton>
            <span style={{marginLeft: 10, fontWeight: 600}}>{fieldName} 추가</span>
        </div>
    );
}

export default AddRecord;