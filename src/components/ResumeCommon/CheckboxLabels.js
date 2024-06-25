import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {styled} from "@mui/material/styles";

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
    // 체크박스와 라벨 사이의 간격 조정
    marginLeft: theme.spacing(-1),
    '& .MuiFormControlLabel-label': {
        marginLeft: theme.spacing(0), // 라벨에 대한 추가적인 조정
    },
}));

export default function CheckboxLabels({option, checked, onChange}) {
    return (
        <FormGroup>
            <StyledFormControlLabel control={<Checkbox size="small" checked={checked} onChange={onChange}/>} label={option}/>
            {/*<FormControlLabel required control={<Checkbox />} label="Required" />
            <FormControlLabel disabled control={<Checkbox />} label="Disabled" />*/}
        </FormGroup>
    );
}