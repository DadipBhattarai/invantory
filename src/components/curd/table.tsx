import React from 'react'
import styled from 'styled-components'
import { colors, shades } from '../../theme/color'
import { ColumnType, RowType } from './crud'


interface propTypes {
    column: ColumnType[],
    row: any[]
}

const TableContainer = styled.table`
    border-collapse: collapse;
    background-color: white;
    width: 100%;
    text-align: center;

    margin-bottom: 4rem;

`
const TableHeader = styled.thead`
    
    & > tr {
        background-color: #EAEAEA;
    }

    & th {
        padding: 0.7rem;
    }
`
const TableBody = styled.tbody`

    & tr:hover {
        background-color: ${shades.blue2};
    }
    & tr > td {
        padding: 0.5rem;
    }
`

function Table(props: propTypes) {
    return (
        <TableContainer>
            <TableHeader>
                <tr>
                    {
                        props.column.map((val: ColumnType, index: number) => (
                            <TableHeaderItem key={index} item={val.title} />
                        ))
                    }
                </tr>
            </TableHeader>
            <TableBody>
                {
                    props.row.map((val: any, index: any) =>
                    (
                        <TableRow key={index} item={val} headerCol={props.column} />
                    ))
                }
            </TableBody>
        </TableContainer>
    )
}


export default Table


const TableHeaderItem = ({ item }: any) => <th>{item}</th>;

const TableRow = ({ item, headerCol }: any) => (
    <tr>
        {
            headerCol.map((val: any, index: number) => (
                <td key={index}>
                    <>
                        check
                        {
                            // console.log("vallll", val)
                            console.log("vallll", item)

                        }
                        {/* {item[objectKey]} */}
                    </>
                </td>
            ))
        }
        {/* {
            Object.keys(item).map((objectKey, index) => (
                <td key={index}>
                    {item[objectKey]}
                </td>
            ))
        } */}
    </tr>
);