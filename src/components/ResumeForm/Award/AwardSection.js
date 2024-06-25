import React, { useEffect } from 'react';
import Award from "./Award";
import { call } from "../../../service/ApiService";

const AwardSection = ({ awards, setAwards, resumeId }) => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await call(`/api/resumes/${resumeId}/awards`, 'GET', null);
                setAwards(response);
            } catch (error) {
                console.error("Failed to fetch awards", error);
            }
        };

        fetchData();
    }, [resumeId, setAwards]);

    return <Award awards={awards} setAwards={setAwards} resumeId={resumeId} />;
};

export default AwardSection;

