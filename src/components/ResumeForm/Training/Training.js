import React, {useState} from 'react';
import AddRecord from "../../ResumeCommon/AddRecord";
import SectionContainer from "../../ResumeCommon/SectionContainer";
import TrainingRecord from "./TrainingRecord";

const Training = () => {

    const [trainings, setTrainings] = useState([
        <TrainingRecord key={0} onRemove={() => removeTraining(0)} />
    ]);

    const addTraining = () => {
        setTrainings(prev => [
            ...prev,
            <TrainingRecord key={prev.length} onRemove={() => removeTraining(prev.length)} />
        ]);
    };

    const removeTraining = (index) => {
        setTrainings(prev => prev.filter((_, idx) => idx !== index));
    };

    return (
        <SectionContainer title="Training">
            {trainings}
            <div style={{height: 10}}></div>
            <AddRecord fieldName="교육 이력" onClick={addTraining}></AddRecord>
        </SectionContainer>
    );
};

export default Training;
