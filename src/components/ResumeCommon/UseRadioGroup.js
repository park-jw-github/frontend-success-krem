import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';

const StyledFormControlLabel = styled((props) => <FormControlLabel {...props} />)(
    ({ theme, checked }) => ({
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(-1),
        '.MuiFormControlLabel-label': checked && {
            color: theme.palette.primary.main,
        },
        '& .MuiRadio-root': {
            padding: 4, // 라디오 버튼의 패딩 제거
        }
    }),
);

function MyFormControlLabel(props) {
    const radioGroup = useRadioGroup();

    let checked = false;

    if (radioGroup) {
        checked = radioGroup.value === props.value;
    }

    return <StyledFormControlLabel checked={checked} {...props} />;
}

MyFormControlLabel.propTypes = {
    /**
     * The value of the component.
     */
    value: PropTypes.any,
};

export default function UseRadioGroup({options, onChange, value}) {
    return (
        <RadioGroup
            row
            name="use-radio-group"
            defaultValue={options[0].value}
            value={value}
            onChange={onChange}
        >
            {options.map(option => (
                <MyFormControlLabel
                    key={option.value}
                    value={option.value}
                    label={option.label}
                    control={<Radio size="small"/>}
                />
            ))}
        </RadioGroup>
    );
}