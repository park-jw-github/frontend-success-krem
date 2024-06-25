import React, {useState} from 'react';
import AddRecord from "../../ResumeCommon/AddRecord";
import SectionContainer from "../../ResumeCommon/SectionContainer";
import ActivityRecord from "./ActivityRecord";

const Activity = () => {

    const [activities, setActivities] = useState([
        <ActivityRecord key={0} onRemove={() => removeActivity(0)} />
    ]);

    const addActivity = () => {
        setActivities(prev => [
            ...prev,
            <ActivityRecord key={prev.length} onRemove={() => removeActivity(prev.length)} />
        ]);
    };

    const removeActivity = (index) => {
        setActivities(prev => prev.filter((_, idx) => idx !== index));
    };

    return (
        <SectionContainer title="Activity">
            {activities}
            <div style={{height: 10}}></div>
            <AddRecord fieldName="대외활동 이력" onClick={addActivity}></AddRecord>
        </SectionContainer>
    );
};

export default Activity;