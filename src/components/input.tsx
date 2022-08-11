
import { useContext, useState } from 'react'
import styled from 'styled-components'
import { colors } from '../theme/color'

import { FormContext } from './form/form'



interface propTypes {
    type: "text" | "email" | "password"
    placeHolder?: string
    label?: string
    name?: string
    width?: string;
    height?: string;
    required?: boolean
}

interface inputProps {
    width?: string
    height?: string
    placeholder?: string
    type?: string
}


const InputWrapper = styled.div`
    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    & > input[type=checkbox] {
        /* align-self : flex-start ; */
    }
`

const IconWrapper = styled.div`
    position: absolute ;
    top: 0.8rem;
    left: 19rem;
    cursor: pointer;

    height: 18px;
    width: 20px;
    filter: invert(83%) sepia(0%) saturate(459%) hue-rotate(185deg) brightness(107%) contrast(85%);
    `
const LabelWrapper = styled.span`
    font-size: 0.9rem;
    font-weight: 600;
    padding-left: 0.3rem;
`

const InputText = styled.input<inputProps>`
    float: right;
    border: 2px solid #D4D4D4;
    outline: none;
    width: ${props => props.width};
    height: ${props => props.height};
    /* height: 2.9rem; */
    border-radius: 5px;
    font-size: 1rem;
    padding: 0.5rem;

    cursor: ${props => props.type == "checkbox" && "pointer"};

        &:focus {
            border: 2px solid ${colors.primaryColor};
        }
    `

export const Input = (props: propTypes) => {

    const setFormContext = useContext(FormContext)

    const [passwordShown, setPasswordShown] = useState(false);

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    const setValue = (e: any) => {
        props.name && setFormContext.setFormItem(props.name, e.target.value)
    }

    return (
        <InputWrapper className={props.type} onBlur={setValue}>
            <LabelWrapper>{props.label}</LabelWrapper>
            <InputText type={passwordShown ? "text" : props.type} placeholder={props.placeHolder} width={props.width} height={props.height} required={props.required} />
            {/* <IconWrapper>{props.type === "password" && <Image src={passwordShown ? slashedEye : Eye} alt="Logo" onClick={togglePassword} />}</IconWrapper> */}
        </InputWrapper>
    )
}