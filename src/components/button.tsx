import styled from 'styled-components'
import { colors, shades } from '../theme/color'

interface propTypes {
    label: string
    type?: "submit" | "reset"
    styleType?: "primary" | "dashed"
    icon?: JSX.Element
    width?: string
    onClick?: () => void
    backgroundColor?: string
    border?: string
}

const ButtonWrapper = styled.button<{ buttontype?: "primary" | "dashed", width?: string, bgColor: string, border: string } >`
        background-color: ${props => props.buttontype === "primary" ? colors.primaryColor : "white"};
        background-color: ${props => props.bgColor};
        padding: 0.5rem;
        border-radius: 5px;
        cursor: pointer;
        border: ${props => props.border};
        display: flex;
        justify-content: center;
        align-items: center;
        color: ${props => props.buttontype === "primary" ? "white" : colors.primaryColor} ;
        width: ${props => props.width || "100px"};
        height: 35px;

        transition: all 0.3s ease;
        
        &:hover {
            border-color: ${shades.blue2};
        }
        &:hover > span {
            filter: invert(52%) sepia(53%) saturate(590%) hue-rotate(103deg) brightness(105%) contrast(88%);
        }
        
        & > span {
            transition: all 0.3s ease;
            margin-right: 0.3rem;

        }
    `

const IconWrapper = styled.span`
        width: 1.5rem;
        height: 1.5rem;

    `

function Button(props: propTypes) {
    return (
        <ButtonWrapper onClick={props.onClick} buttontype={props.styleType} type={props.type} width={props.width} bgColor={props.backgroundColor || ""} border={props.border || `2px solid ${colors.primaryColor}`} >
            {/* {props.icon && <IconWrapper> <Image src={props.icon}></Image></IconWrapper>} */}
            {props.label}
        </ButtonWrapper>
    )
}

export default Button