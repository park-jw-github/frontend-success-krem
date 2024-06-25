import React, {useState} from 'react';
import SectionContainer from "../../ResumeCommon/SectionContainer";
import styled from 'styled-components';
import blogIcon from '../../../assets/blog-icon.png'
import githubIcon from '../../../assets/github-icon.png'
import emailIcon from '../../../assets/email-icon.png'
import phoneIcon from '../../../assets/phone-icon.png'
import birthdayIcon from '../../../assets/birthday-icon.png'
import FieldWithToggleButton from "./FieldWithToggleButton";

const Input = styled.input`
    padding: 8px;
    margin-right: 8px; margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    display: block;
    font-size: 15px;
`;

const Button = styled.button`
    width: 25px; height: 25px;
    background-color: ${props => props.active ? 'rgba(175, 175, 175, 1)' : 'rgba(129, 172, 255, 1)'};
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    margin-right: 10px; margin-top: 7px;
`;

const ImagePreview = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
`;

const ImageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-style: dashed;
    border-color: rgba(239, 245, 255, 1);
    padding: 15px 0 15px 0;
`;

// 입력 검증 HOOK
function useInputValidation(initialValue, pattern) {
    const [value, setValue] = useState(initialValue);
    const [isValid, setIsValid] = useState(true);

    function onChange(e) {
        const newValue = e.target.value;
        const valid = pattern.test(newValue);
        setIsValid(valid);
        setValue(newValue);
    }

    return { value, setValue, onChange, isValid, setIsValid };
}

const AboutMe = () => {

    const [isActive, setIsActive] = useState({
        phone: false,
        email: false,
        githubAddress: false,
        blogAddress: false,
        selfIntroduction: false,
        birthday: false
    });

    // 활성화 상태를 토글하는 함수
    const toggleActive = (field, input) => {
        setIsActive(prev => {
            // 현재 필드의 활성화 상태를 토글
            const newState = { ...prev, [field]: !prev[field] }; // field의 활성화 상태만 변경, 나머지는 그대로

            // 비활성화하고 입력이 유효하지 않다면, 초기화
            if (prev[field] && !input.isValid) {
                input.setValue("");  // 입력 초기화
                input.setIsValid(true); // 검증 초기화
            }
            return newState;
        });
    };

    // 입력 검증
    const phoneInput = useInputValidation("", /^\d{3}-\d{4}-\d{4}$/);
    const emailInput = useInputValidation("", /^[a-zA-Z0-9.]+@[a-z]+\.[a-z]+$/);
    //const birthdayInput = useInputValidation("", /^\d{4}-\d{2}-\d{2}$/);
    const birthdayInput = useInputValidation("", /^\d{4}\.\d{2}\.\d{2}$/);
    const githubInput = useInputValidation("", /^https:\/\/github\.com\/([a-zA-Z0-9_-]+\/?[a-zA-Z0-9_-]*\/?)*$/);
    const blogInput = useInputValidation("", /^(https?:\/\/)?([\da-z\\.-]+)\.([a-z\\.]{2,6})([\\/\w \\.-]*)*\/?$/);
    const introInput = useInputValidation("", /^[\s\S]*$/);

    // 이미지 추가
    const [image, setImage] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState('');

    // 이미지 변경 핸들러
    const handleImageChange = (e) => {
        e.preventDefault();

        // 파일 읽기 작업
        let reader = new FileReader();
        let file = e.target.files[0];

        // 파일 읽기 완료 시의 콜백 함수
        reader.onloadend = () => {
            // 상태 변수 업데이트
            setImage(file);
            setImagePreviewUrl(reader.result);
        }

        reader.readAsDataURL(file); // 파일을 브라우저에서 미리보기로 보여주는 역할
    };

    return (
        <SectionContainer title="About Me">

            <div style={{display: "flex", paddingTop: 10}}>
                <div>
                    <Input placeholder="이름" style={{marginLeft: 39}}/>

                    <FieldWithToggleButton
                        icon={birthdayIcon}
                        placeholder="생년월일 (YYYY.MM.DD)"
                        isActive={isActive.birthday}
                        inputProps={birthdayInput}
                        toggleActive={toggleActive}
                        fieldType="birthday"
                        errorMessage="날짜 형식을 확인해 주세요."
                    />

                    <FieldWithToggleButton
                        icon={phoneIcon}
                        placeholder="전화번호 ('-' 포함)"
                        isActive={isActive.phone}
                        inputProps={phoneInput}
                        toggleActive={toggleActive}
                        fieldType="phone"
                        errorMessage="전화번호 형식을 확인해 주세요."
                    />

                    <FieldWithToggleButton
                        icon={emailIcon}
                        placeholder="이메일"
                        isActive={isActive.email}
                        inputProps={emailInput}
                        toggleActive={toggleActive}
                        fieldType="email"
                        errorMessage="이메일 형식을 확인해 주세요."
                    />

                    <FieldWithToggleButton
                        icon={githubIcon}
                        placeholder="깃허브 주소"
                        isActive={isActive.githubAddress}
                        inputProps={githubInput}
                        toggleActive={toggleActive}
                        fieldType="githubAddress"
                        errorMessage="깃허브 주소를 확인해 주세요."
                    />

                    <FieldWithToggleButton
                        icon={blogIcon}
                        placeholder="블로그 주소"
                        isActive={isActive.blogAddress}
                        inputProps={blogInput}
                        toggleActive={toggleActive}
                        fieldType="blogAddress"
                        errorMessage="블로그 주소를 확인해 주세요."
                    />
                </div>
                <div>
                    <ImageContainer style={{marginLeft: 60}}>
                        <input style={{marginLeft: 55}} type="file" onChange={handleImageChange} accept="image/*"/>
                        {/* imagePreviewUrl이 존재하면 */}
                        {imagePreviewUrl && (
                            <ImagePreview style={{marginTop: 10}} src={imagePreviewUrl} alt="Profile Image"/>
                        )}
                    </ImageContainer>
                </div>
            </div>

            <div style={{display: "flex", marginLeft: 39}}>
                <div>
                    <Input style={{width: 600, height: 60, fontFamily:"inherit"}} as="textarea" placeholder="자기소개를 입력하세요."
                           disabled={!isActive.selfIntroduction} {...introInput} isValid={introInput.isValid}/>
                    {(isActive.selfIntroduction && !introInput.isValid) &&
                        <p style={{color: 'rgba(202, 5, 5, 1)', marginTop: -8, marginBottom: 7, fontSize: 13}}>입력을 확인해 주세요.</p>}
                </div>
                <Button onClick={() => toggleActive('selfIntroduction', introInput)} active={isActive.selfIntroduction}>
                    {isActive.selfIntroduction ? '-' : '+'}
                </Button>
            </div>
        </SectionContainer>
    );
};

export default AboutMe;