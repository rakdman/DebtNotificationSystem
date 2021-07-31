import React,{useContext, useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';



import { FormControl,TextField, TextareaAutosize, Button,Typography,ButtonGroup,
Table,TableBody,TableRow,TableCell,Paper} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Autocomplete from '@material-ui/lab/Autocomplete';
// import NewRow from './NewRow';
import { useForm } from "react-hook-form";

import {AuthContext} from '../app-context/AuthContext';

function WorkflowTemplate () 
{

const usehistory =useHistory();

let submitHandler;

const [wfname,setWfName] = useState();
// const [templateText,setTemplateText] = useState();
// const [newWFStep,setNewWFtep] = useState([]);
// const [templateValues, setTemplateValues] = useState([])

const {isLoggedIn} = useContext(AuthContext);



console.log("In Workflow Template");
console.log(isLoggedIn);

if (!isLoggedIn)
{
     usehistory.push("/");
}

// let nameInput, textInput,message;


const saveHandler = event => {
    event.preventDefault();
    console.log("Workflow Save submitHandler");

    // const payload = JSON.stringify({tname:templateName, text:templateText });
    // var steps=[{NWait:number1,NName:select1},{NWait:number2,NName:select2},{NWait:number3,NName:select3},{NWait:number4,NName:select4},{NWait:number5,NName:select5}]

    var steps=[]

    if (number1 && select1)
        steps.push({NWait:number1,NName:select1})
    
    if (number2 && select2 && steps)
    steps.push({NWait:number2,NName:select2})

    if (number3 && select3 && steps)
    steps.push({NWait:number3,NName:select3})

    if (number4 && select4 && steps)
    steps.push({NWait:number4,NName:select4})

    if (number5 && select5 && steps)
    steps.push({NWait:number5,NName:select5})

       
    // axios.post(`http://localhost:9090/api/workflow/create`,{wfname:wfname,wfsteps:[{NWait:number1,NName:select1},{NWait:number2,NName:select2},{NWait:number3,NName:select3},{NWait:number4,NName:select4},{NWait:number5,NName:select5}]})
    axios.post(`http://localhost:9090/api/workflow/create`,{wfname:wfname,wfsteps:steps})
    .then(res => { console.log(res.data);
                   console.log("Response from workflow create API");  
                  });

    swal({
        title:"Success",
        text:"Workflow template created successfully!",
        icon: "success",
    });

    usehistory.push("/");
}


const cancelHandler = event => {
    event.preventDefault();
    console.log("Workflow Cancel submitHandler");
    usehistory.push("/");
}


const addNewHandler = event => {
    console.log('In addNewHandler');
 }

 const [number1,setNumber1]  = useState(null);
 const [select1,setSelect1]  = useState(null);
 const [template1,setTemplate1]  = useState(null);


 const [number2,setNumber2]  = useState(null);
 const [select2,setSelect2]  = useState(null);


 const [number3,setNumber3]  = useState(null);
 const [select3,setSelect3]  = useState(null);
 

 const [number4,setNumber4]  = useState(null);
 const [select4,setSelect4]  = useState(null);


 const [number5,setNumber5]  = useState(null);
 const [select5,setSelect5]  = useState(null);



 const [templateArray,setTemplateArray]  = useState();




    const [smsTemp, setBooks] =  useState(null);
    const apiURL = "http://localhost:9090/api/template/readalltemplates";
    const fetchData = async () => {
      const response = await axios.get(apiURL)
      console.log(response.data)
      setBooks(response.data)

    }
    
    // const TempalteList = smsTemp.map((item,index)=>{console.log(item.tname)})

        useEffect(() => {
      fetchData();
    },[]);

    var array= [];

    // useEffect(() => {
    //     console.log(smsTemp);
    //     smsTemp && smsTemp.map((item,index)=> {array.push(item.tname.toString())});
    //     console.log(array);
    //     setTemplateArray(array);
    // }, [])
    
   var val;

   const { register, handleSubmit, formState :{errors} } = useForm();

return(

    
    <React.Fragment>
      
        <br/><br/><br/><br/><br/>
        <Container maxWidth="md">
        
        <FormControl onSubmit={submitHandler} size="medium">
        
            
            <Typography variant="h6">Workflow Template</Typography>
            <br/>
           
            <TextField label= "Workflow Name" variant="outlined" type="Text" value={wfname} onChange={ (event) => {setWfName(event.target.value)}}></TextField>
            <br/>
           <Paper elevation={2}>
           <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <Typography variant="h6">Trigger After Duration</Typography>
                        </TableCell>
                        <TableCell>
                        <Typography variant="h6">Notification Template</Typography>
                        </TableCell>
                    </TableRow>
                    {/* {smsTemp && smsTemp.map((item,index)=> {array.push(item.tname)})} */}
                    {smsTemp && smsTemp.map((item,index)=> {array.push(item.text)})}
                    <TableRow>
                        <TableCell>
                            <TextField label= "Number" value={number1} onChange={(e)=>{setNumber1(e.target.value)}}></TextField>
                           { console.log("number1:"+number1+" select1:"+select1)}
                        </TableCell>
                        <TableCell>
                            <Autocomplete 
                                onChange= {(event,select1)=> setSelect1(select1)}
                                options={array}
                                renderInput={(params) => <TextField {...params} label="Select Template" variant="outlined" />}
                            />
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell>
                            <TextField label= "Number" value={number2} onChange={(e)=>{setNumber2(e.target.value)}}></TextField>
                            {console.log("number2:"+number2+" select2"+select2)}
                        </TableCell>
                        <TableCell>
                            <Autocomplete 
                                onChange= {(event,select2)=>setSelect2(select2)}
                                options={array}
                                renderInput={(params) => <TextField {...params} label="Select Template" variant="outlined" />}

                            />
                        </TableCell>
                    </TableRow>
  
        
                    <TableRow>
                        <TableCell>
                            <TextField label= "Number" value={number3} onChange={(e)=>{setNumber3(e.target.value)}}></TextField>
                            {console.log("number3:"+number3+" select3"+select1)}
                        </TableCell>
                        <TableCell>
                            <Autocomplete 
                                onChange= {(event,select3)=>setSelect3(select3)}
                                options={array}
                                renderInput={(params) => <TextField {...params} label="Select Template" variant="outlined" />}

                            />
                        </TableCell>
                    </TableRow>
  
                    <TableRow>
                        <TableCell>
                            <TextField label= "Number" value={number4} onChange={(e)=>{setNumber4(e.target.value)}}></TextField>
                           { console.log("number4:"+number4+" select4"+select1)}
                        </TableCell>
                        <TableCell>
                            <Autocomplete 
                                onChange= {(event,select4)=>setSelect4(select4)}
                                options={array}
                                renderInput={(params) => <TextField {...params} label="Select Template" variant="outlined" />}

                            />
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell>
                            <TextField label= "Number" value={number5} onChange={(e)=>{setNumber5(e.target.value)}}></TextField>
                            {console.log("number5"+number5+" select5"+select5)}
                        </TableCell>
                        <TableCell>
                            <Autocomplete 
                                onChange= {(event,select5)=>setSelect5(select5)}
                                options={array}
                                renderInput={(params) => <TextField {...params} label="Select Template" variant="outlined" />}

                            />
                        </TableCell>
                    </TableRow>


                </TableBody>
           
            </Table>
            {/* <Button variant="contained" onClick= {addNewHandler} >Add New</Button> */}
           </Paper>
           <br/>
           <Button variant="contained" fullWidth="false" onClick= {saveHandler} >Save</Button>
        </FormControl>
        
  
    </Container>
</React.Fragment>

);
}

export default WorkflowTemplate;