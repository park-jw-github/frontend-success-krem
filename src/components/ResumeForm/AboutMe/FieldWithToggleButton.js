import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
    padding: 8px;
    margin-right: 8px; margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    display: block;
    font-size: 15px;
`;

const Button = styled.button`
    width: 25px; height: 25px;
    background-color: ${props => props.active ? 'rgba(175, 175, 175, 1)' : 'rgba(129, 172, 255, 1)'};
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    margin-right: 10px; margin-top: 7px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const FieldWithToggleButton = ({ icon, placeholder, isActive, inputProps, toggleActive, fieldType, errorMessage }) => {
    return (
        <div style={{display: "flex"}}>
            <img src={icon} alt={fieldType} style={{padding: 7, width: 25, height: 25}}/>
            <div>
                <Input placeholder={placeholder} disabled={!isActive} {...inputProps}/>
                {isActive && !inputProps.isValid && (
                    <p style={{color: 'rgba(202, 5, 5, 1)', marginTop: -8, marginBottom: 7, fontSize: 13}}>{errorMessage}</p>
                )}
            </div>
            <Button onClick={() => toggleActive(fieldType, inputProps)} active={isActive}>
                {isActive ? '-' : '+'}
            </Button>
        </div>
    );
};

export default FieldWithToggleButton;