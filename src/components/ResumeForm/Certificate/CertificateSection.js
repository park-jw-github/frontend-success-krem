import React, { useEffect } from 'react';
import { call } from "../../../service/ApiService";
import Certificate from "./Certificate";

const CertificateSection = ({ certificates, setCertificates, resumeId }) => {
    useEffect(() => {
        // 비동기 함수 fetchData : 서버로부터 데이터를 가져옴
        const fetchData = async () => {
            try {
                const response = await call(`/api/resumes/${resumeId}/certificates`, 'GET', null);
                setCertificates(response); // 상태 업데이트
            } catch (error) {
                console.error("Failed to fetch certificates", error);
            }
        };
        fetchData();
    }, [resumeId, setCertificates]);

    return <Certificate certificates={certificates} setCertificates={setCertificates} resumeId={resumeId} />;
};

export default CertificateSection;

