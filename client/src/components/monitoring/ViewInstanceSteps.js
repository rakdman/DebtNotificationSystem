import React,{useContext, useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
// import swal from 'sweetalert';
// import HomeHeader from '../home/HomeHeader';


// import { FormControl,TextField,InputLabel, TextareaAutosize, Button,Typography,ButtonGroup,Table,TableRow,TableBody,TableCell,TableContainer} from '@material-ui/core';
import { FormControl,Typography,Table,TableRow,TableBody,TableCell} from '@material-ui/core';
import Container from '@material-ui/core/Container';




import {AuthContext} from '../app-context/AuthContext';


function ViewInstanceSteps () 
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

// let nameInput, textInput,message;

// read data
console.log('Before calling readoneinstancebyid API'+idd);

function getData () {
   
    // axios.get("http://localhost:9090/api/instances/readoneinstancebyid/",{params:{idd:idd}}).then(
    //     res => {console.log('This is firstName from getData function:'+res.data.firstName)
    //     setFirstName(res.data.firstName);
    //     setLastName(res.data.lastName);

    // }
    axios.get(`http://${process.env.REACT_APP_SERVER_IP_PORT}/api/instances/readoneinstancebyid/`,{params:{idd:idd}}).then(
        res => {console.log('This is firstName from getData function:'+res.data.firstName)
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setWfSteps(res.data.wfsteps);
        setWfName(res.data.wfname);
        console.log(res.data.wfsteps);
        console.log('response of the api:'+res.data.firstName);
        }

    
    );
}

let saveHandler;

useEffect(()=> getData(),[]);

// update data
//  saveHandler = event => {
//     event.preventDefault();
//     console.log("SMS Save submitHandler");

//     console.log("templateName:"+templateName);
//     console.log("templateText:"+templateText);

//     const payload = JSON.stringify({tname:templateName, text:templateText });
//     axios.patch(`http://localhost:9090/api/template/updatetemplate`,{idd:idd, tname:templateName,text:templateText}).then(res => { console.log(res.data); });

//     console.log('payload:'+payload);

//     swal({
//         title:"info",
//         text:"SMS template created successfully!",
//         icon: "success",
//     });

//     setIdd(null);

//     usehistory.push("/");
// }



// const closeHandler = event => {
//     event.preventDefault();
//     console.log("View Close submitHandler");
//     usehistory.push("/");
// }



return(

    
    <React.Fragment>
        {/* <HomeHeader/> */}
        <Container maxWidth="xl">
        
        <FormControl onSubmit={submitHandler} size="medium">
        
            
            {/* <Typography variant="h6">Instance Processing Detail</Typography> */}
            <Typography variant="h6">WFName:{wfName}</Typography>
            <Typography variant="h6">Id:{idd}</Typography>
        
            <Table >
                <TableBody>
                            <TableRow>
                                {/* <TableCell>StepId</TableCell>  */}
                                <TableCell width="55%">Step Message</TableCell>
                                <TableCell width="20%">Scheduled DateTime</TableCell>
                                <TableCell width="20%">Execution DateTime</TableCell>
                                <TableCell>Status</TableCell> 
                             </TableRow>
                   
                            {wfsteps && wfsteps.map((item,index) => {
                            
                                return (
                                <TableRow>
                                    {/* <TableCell>{item._id}</TableCell> */}
                                    <TableCell>{item.sName}</TableCell>
                                    <TableCell>{item.sscheduledDateTime&&item.sscheduledDateTime.slice(0,10)+ ' ' + item.sscheduledDateTime.slice(11,19)}</TableCell>
                                    <TableCell>{item.sexecutionDateTime&&item.sexecutionDateTime.slice(0,10)+ ' ' + item.sexecutionDateTime.slice(11,19)}</TableCell>
                                    <TableCell>{item.sstatus}</TableCell> 
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

export default ViewInstanceSteps;