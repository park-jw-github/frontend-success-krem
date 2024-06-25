import React, { useState, useEffect } from 'react';

// CategoryList.js: 이력서의 각 섹션(예: About Me, Skill 등)의 상태를 관리하고, 사용자가 선택한 섹션을 표시함.

// 섹션 목록 정의
const sections = [
    { name: 'About Me', detail: '프로필', isOpen: false },
    { name: 'Skill', detail: '기술 스택', isOpen: false },
    { name: 'Education', detail: '학력', isOpen: false },
    { name: 'Career', detail: '경력', isOpen: false },
    { name: 'Project', detail: '프로젝트', isOpen: false },
    { name: 'Training', detail: '교육 이수', isOpen: false },
    { name: 'Activity', detail: '대외 활동', isOpen: false },
    { name: 'Award', detail: '수상 이력', isOpen: false },
    { name: 'Certificate', detail: '자격증', isOpen: false },
    { name: 'Language', detail: '어학', isOpen: false }
];

const CategoryList = ({ onSectionChange }) => {
    // 섹션 상태 관리
    const [sectionStates, setSectionStates] = useState(sections);

    // 컴포넌트가 마운트될 때 로컬 스토리지에서 섹션 상태 불러오기
    useEffect(() => {
        const savedSections = JSON.parse(localStorage.getItem('sectionStates'));
        if (savedSections) {
            setSectionStates(savedSections);
            onSectionChange(savedSections.filter(section => section.isOpen).map(section => section.name));
        }
    }, []);

    // 섹션 상태가 변경될 때마다 로컬 스토리지에 저장
    useEffect(() => {
        localStorage.setItem('sectionStates', JSON.stringify(sectionStates));
    }, [sectionStates]);

    // 섹션 토글 함수
    const toggleSection = (index) => {
        const newSections = [...sectionStates];
        newSections[index].isOpen = !newSections[index].isOpen;
        setSectionStates(newSections);
        onSectionChange(newSections.filter(section => section.isOpen).map(section => section.name));
    };

    return (
        <div className="category-list">
            {sectionStates.map((section, index) => (
                <div key={section.name} className="category-list-item">
                    <span style={{ width: 100, fontWeight: 'bold' }}>{section.name}</span>
                    <span style={{ width: 80, textAlign: 'left' }}>{section.detail}</span>
                    <button
                        className={section.isOpen ? 'button-plus' : 'button-minus'}
                        onClick={() => toggleSection(index)}
                    >
                        {section.isOpen ? '-' : '+'}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default CategoryList;
