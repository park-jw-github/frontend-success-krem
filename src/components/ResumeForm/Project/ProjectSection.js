import React, { useEffect } from 'react';
import Project from './Project';
import { call } from "../../../service/ApiService";

const ProjectSection = ({ projects, setProjects, resumeId }) => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await call(`/api/resumes/${resumeId}/projects`, 'GET', null);
                setProjects(response);
            } catch (error) {
                console.error("Failed to fetch projects", error);
            }
        };

        fetchData();
    }, [resumeId, setProjects]);

    return <Project projects={projects} setProjects={setProjects} resumeId={resumeId} />;
};

export default ProjectSection;
