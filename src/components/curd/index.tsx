import { useState } from 'react'
import styled from 'styled-components'
import Button from '../button'
import { ColumnType } from './crud'
import Table from './table'

interface propTypes {
    // children: JSX.Element
}

const CrudContainer = styled.div`
    /* margin: 1rem; */
    padding: 1rem;
    border-radius: 10px;
    /* background-color: white; */

`

const ButtonAndFilterContainer = styled.div`
    width: 100%;
    background-color: white;
    padding: 0.5rem 0rem;

    display: flex;
    justify-content: flex-end;
    align-content: center;
`

const column: ColumnType[] = [
    {
        title: "UserName",
    },
    {
        title: "Name",
    },
    {
        title: "Role",
    },
    {
        title: "Email",
    },
    {
        title: "Contact",
    },
]


function Crud(props: propTypes) {

    const [showform, setShowForm] = useState<boolean>(false)

    const [row, setRow] = useState<any[]>([])

    const addnew = () => {
        setShowForm(true)
    }

    const check = (val: any) => {
        console.log("vallue is ", val);

        setRow([...row, val])
    }

    return (
        <CrudContainer>
            <ButtonAndFilterContainer>
                <Button label='AddNew' onClick={addnew} styleType="primary"></Button>
            </ButtonAndFilterContainer>
            <Table column={column} row={row} ></Table>

        </CrudContainer>
    )
}

export default Crud