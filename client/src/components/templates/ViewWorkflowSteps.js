import React,{useContext, useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import HomeHeader from '../home/HomeHeader';


import { FormControl,Table,TableRow,TableBody,TableCell,TableContainer} from '@material-ui/core';
import Container from '@material-ui/core/Container';




import {AuthContext} from '../app-context/AuthContext';


function ViewWorkflowSteps () 
{

const usehistory =useHistory();

//let userAction;
let submitHandler;

const [firstName,setFirstName] = useState();
const [lastName,setLastName] = useState();
const [wfsteps, setWfSteps] = useState();
const [wfName,setWfName] = useState();
const {isLoggedIn,idd,setIdd} = useContext(AuthContext);



console.log("In View SMS steps");
console.log(isLoggedIn);

if (!isLoggedIn)
{
     usehistory.push("/");
}

let nameInput, textInput,message;

// read data
console.log('Before calling readoneWorkflowbyid API'+idd);

function getData () {
    axios.get(`http://${process.env.REACT_APP_SERVER_IP_PORT}/api/workflow/readoneWFtemplate/`,{params:{_id:idd}}).then(
        res => {console.log('This is from readoneWFtemplate API:'+res.data.wfsteps)
        setWfSteps(res.data.wfsteps)
        console.log("In View workflow Step API response");
      
        
        }

    
    );
}

let saveHandler;

useEffect(()=> getData(),[]);

return(

    
    <React.Fragment>
        {/* <HomeHeader/> */}
   
        <Container maxWidth="md">
        
        <FormControl onSubmit={submitHandler} size="medium">
        
      
            <Table>
                <TableBody>
                            <TableRow>
                                <TableCell width="23%">Waiting days</TableCell> 
                                <TableCell>Step Name</TableCell>
                             </TableRow>
                   
                            {wfsteps && wfsteps.map((item,index) => {
                          
                                return (
                                <TableRow>
                                    <TableCell>{item.NWait}</TableCell>
                                    <TableCell>{item.NName}</TableCell>
                                </TableRow>
                                ) 
                            })}
                   
                </TableBody>
            </Table>
        </FormControl>
        
  
    </Container>
</React.Fragment>

);
}

export default ViewWorkflowSteps;