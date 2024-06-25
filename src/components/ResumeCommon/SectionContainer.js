import React from 'react';
import styled from "styled-components";

const Container = styled.div`
    border: 2px solid rgb(177, 205, 253); /* 하늘색 테두리 */
    padding: 20px;
    margin-bottom: 40px;
    border-radius: 5px;
    width: 700px;
`
const SectionTitle = styled.div`
    color: black;
    background-color: rgba(239, 245, 255, 1);  /* 하늘색 배경 */
    border-radius: 5px 5px 0 0;
    width: 160px;
    height: 50px;
    margin-left: 10px;
    font-size: 21px;
    display: flex;
    align-items: center;
    padding-left: 25px;
    font-weight: 500;
`

const SectionContainer = ({ title, children }) => (
    <div>
        <SectionTitle>{title}</SectionTitle>
        <Container>
            {children}
        </Container>
    </div>
);

export default SectionContainer;