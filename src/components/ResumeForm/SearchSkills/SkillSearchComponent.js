import React, { useState } from 'react';
import Modal from 'react-modal';
import SkillSelectorModal from "./SkillSelectorModal";
import { icons as skillsData } from '../../../assets/icons';
import styled from "styled-components";

const Button = styled.div`
    min-width: 35px;
    min-height: 35px;
    max-height: 35px;
    max-width: 35px;
    padding: 5px;
    border: none;
    color: white;
    border-radius: 10px;
    font-weight: 600;
    font-size: 16px;
    background-color: rgba(129, 172, 255, 1);
    cursor: pointer;
    text-align: center;
    align-items: center;
    display: flex;
    justify-content: center;
    margin-right: 10px;
`;

const SkillsContainer = styled.div`
    border-style: dashed;
    border-color: rgba(239, 245, 255, 1);
    padding: 5px;
    display: flex;
    align-items: center;
    min-width: 50px;
    min-height: 40px;
    max-height: 40px;
    flex-wrap: wrap;
`;

Modal.setAppElement('#root');

const SkillSearchComponent = ({ singleSelection = false, onSkillChange, selectedSkills = "" }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    const handleSelectSkill = (skill) => {
        let updatedSkills;
        if (singleSelection) {
            updatedSkills = skill.icon;
        } else {
            const skillsArray = selectedSkills ? selectedSkills.split(', ') : [];
            if (!skillsArray.includes(skill.icon)) {
                skillsArray.push(skill.icon);
            }
            updatedSkills = skillsArray.join(', ');
        }
        onSkillChange(updatedSkills);
        closeModal();
    };

    const handleRemoveSkill = (skillIcon) => {
        const skillsArray = selectedSkills.split(', ').filter(icon => icon !== skillIcon);
        onSkillChange(skillsArray.join(', '));
    };

    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <Button onClick={openModal}>검색</Button>
            {selectedSkills && (
                <SkillsContainer>
                    {selectedSkills.split(', ').map((skillIcon, index) => (
                        <div key={index} onClick={() => handleRemoveSkill(skillIcon)} style={{ cursor: 'pointer', width: 40, height: 40, position: 'relative' }}>
                            <img src={skillIcon} alt={`skill-${index}`} style={{ width: '100%', height: '100%' }} />
                        </div>
                    ))}
                </SkillsContainer>
            )}
            <SkillSelectorModal
                isOpen={modalIsOpen}
                closeModal={closeModal}
                selectSkill={handleSelectSkill}
                skillsData={skillsData}
            />
        </div>
    );
};

export default SkillSearchComponent;
