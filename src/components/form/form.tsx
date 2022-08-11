import React, { useState } from 'react'
import styled from 'styled-components'

interface propTypes {
    children: JSX.Element[] | JSX.Element
    submit: (from?: any) => void
}

const FormContainer = styled.form`
    background-color: white;
    padding: 2rem 0.5rem;

    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
`

export const FormContext = React.createContext<any>(null);

function Form(props: propTypes) {

    const [formItemList, setFormItemList] = useState<Object>([])

    const setFormItem = (key: keyof Object, value: typeof Object) => {
        if (formItemList.hasOwnProperty(key)) {
            formItemList[key] = value
        } else {
            setFormItemList({ ...formItemList, [key]: value })
        }
    }

    return (
        <FormContext.Provider value={{ setFormItem }}>
            <FormContainer onSubmit={(e: any) => {
                e.preventDefault()
                props.submit(formItemList)
            }}>
                {props.children}
            </FormContainer>
        </FormContext.Provider>
    )
}

export default Form