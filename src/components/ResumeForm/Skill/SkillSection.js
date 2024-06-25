import React, { useEffect } from 'react';
import Skill from './Skill';
import { call } from "../../../service/ApiService";

const SkillSection = ({ skills, setSkills, resumeId }) => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await call(`/api/resumes/${resumeId}/skills`, 'GET', null);
                setSkills(response);
            } catch (error) {
                console.error("Failed to fetch skills", error);
            }
        };

        fetchData();
    }, [resumeId, setSkills]);

    return <Skill skills={skills} setSkills={setSkills} resumeId={resumeId} />;
};

export default SkillSection;
