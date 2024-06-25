import React, {useEffect, useState} from 'react';
import SectionContainer from "../../ResumeCommon/SectionContainer";
import AddRecord from "../../ResumeCommon/AddRecord";
import CertificateRecord from "./CertificateRecord";
import AwardRecord from "../Award/AwardRecord";

const Certificate = ({certificates, setCertificates, resumeId}) => {

    useEffect(() => {
        const savedCertificates = JSON.parse(localStorage.getItem('certificates'));
        if (savedCertificates) {
            setCertificates(savedCertificates);
        } else {
            setCertificates([{ id: null, certificateName: '', issuer: '', issueDate: ''}]);
        }
    }, [setCertificates]);

    useEffect(() => {
        localStorage.setItem('certificates', JSON.stringify(certificates));
    }, [certificates]);

    const addCertificate = () => {
        setCertificates(prev => [
            ...prev,
            { id: prev.length, certificateName: '', issuer: '', issueDate: ''}
        ]);
    };

    const removeCertificate = (index) => {
        setCertificates(prev => prev.filter((_, idx) => idx !== index));
    };

    const updateCertificate = (index, field, value) => {
        setCertificates(prev => prev
            .map((certificate, idx) => idx === index ? { ...certificate, [field]: value } : certificate));
    };

    return (
        <SectionContainer title="Certificate">
            {certificates.map((certificate, index) => (
                <CertificateRecord
                    key={index}
                    index={index}
                    certificate={certificate}
                    onRemove={() => removeCertificate(index)}
                    onUpdate={updateCertificate}
                    resumeId={resumeId}
                />
            ))}
            <div style={{height: 10}}></div>
            <AddRecord fieldName="자격증" onClick={addCertificate}></AddRecord>
        </SectionContainer>
    );
};

export default Certificate;
