import React,{useState} from 'react';
import { TextField,Table,TableBody,TableRow,TableCell,Paper,Typography} from '@material-ui/core';

function NewRow (props) 
{
    const number  = props.number
    const setNumber = props.setNumber

    const select  = props.select
    const setSelect = props.setSelect

    return(
        <TableRow>
            <TableCell>
                <TextField label= "Number" value={number} onChange={(e)=>{setNumber(e.target.value)}}></TextField>
            </TableCell>
            <TableCell>
                <TextField label= "Select" value={select} onChange={(e)=>{setSelect(e.target.value)}}></TextField>
            </TableCell>
        </TableRow>
    );

}

export default NewRow;