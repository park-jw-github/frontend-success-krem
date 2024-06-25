import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import styled from "styled-components";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        maxWidth: '500px',
        height: 'auto',
        maxHeight: '80vh'
    }
};

const GridDiv = styled.div`
    overflow-y: scroll;
    min-height: 100px;
    max-height: 200px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
    gap: 10px;
`

const Input = styled.input`
    height: 20px;
    padding: 5px 5px 5px 15px;
    border-style: solid;
    border-color: darkgrey;
    border-radius: 5px;
`

Modal.setAppElement('#root');

const SkillSelectorModal = ({ isOpen, closeModal, selectSkill, skillsData }) => {
    const [searchTerm, setSearchTerm] = useState("");
    useEffect(() => {
        if (!isOpen) {
            setSearchTerm("");
        }
    }, [isOpen]);

    const filteredSkills = skillsData.filter(skill => skill.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
            <div style={{display:"flex", justifyContent:"center"}}>
                <Input type="text" placeholder="Search skills"
                       onChange={e => setSearchTerm(e.target.value)}
                       value={searchTerm}/>
            </div>
            <GridDiv style={{marginTop: 10}}>
                {filteredSkills.map(skill => (
                    <div key={skill.id}
                         onClick={() => selectSkill(skill)}
                         style={{ padding: '10px', cursor: 'pointer', textAlign: 'center' }}>
                        <img src={skill.icon} alt={skill.name} style={{ width: 40, height: 40 }} />
                    </div>
                ))}
            </GridDiv>
            <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: 10}}>
                <button onClick={closeModal} style={{ cursor: "pointer", padding: 8, backgroundColor:"grey", color:"white", border: "none", borderRadius: 5}}>Close</button>
            </div>
        </Modal>
    );
};

export default SkillSelectorModal;
