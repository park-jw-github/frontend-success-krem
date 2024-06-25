import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    height: 45px;
    margin-left: 20px;
    margin-right: 20px;
    display: flex;
    justify-content: space-between;
    width: 1470px;
`;

const LogoLabel = styled.div`
    height: 40px;
    width: 120px;
    font-size: 24px;
    font-weight: bold;
    color: white;
    padding-left: 15px;
    padding-top: 5px;
    border-radius: 5px 5px 0 0;
    background-color: rgba(0, 30, 89, 1);
`;

const NavButton = styled.button`
    height: 45px;
    width: 100px;
    font-size: 18px;
    font-weight: bold;
    padding: 10px;
    border-radius: 5px 5px 0 0;
    background-color: white;
    color: rgba(0, 30, 89, 1);
    border-color: rgba(0, 30, 89, 1);
    margin-left: 10px;
    cursor: pointer;
    &:first-child {
        margin-left: 0;
    }
`;

const ResumeNav = ({ defaultActive }) => {
    const [activeButton, setActiveButton] = useState(defaultActive);
    const navigate = useNavigate();

    const handleButtonClick = (button) => {
        setActiveButton(button);
        if (button === '목록') {
            navigate("/resumes");
        } else if (button === '로그아웃') {
            localStorage.removeItem("ACCESS_TOKEN"); // 토큰 삭제
            navigate("/login");
        }
    };

    return (
        <Container>
            <LogoLabel>DevDoc</LogoLabel>
            <div>
                <NavButton onClick={() => handleButtonClick('목록')} active={activeButton === '목록'}>목록</NavButton>
                <NavButton onClick={() => handleButtonClick('로그아웃')} active={activeButton === '로그아웃'}>로그아웃</NavButton>
            </div>
        </Container>
    );
};

export default ResumeNav;
