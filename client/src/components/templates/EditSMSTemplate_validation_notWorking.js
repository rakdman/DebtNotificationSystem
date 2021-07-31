import React,{useContext, useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import HomeHeader from '../home/HomeHeader';


import { FormControl,TextField,InputLabel, TextareaAutosize, Button,Typography,ButtonGroup} from '@material-ui/core';
import Container from '@material-ui/core/Container';



import {AuthContext} from '../app-context/AuthContext';
import {useForm} from 'react-hook-form'


function EditSMSTemplate () 
{

const usehistory =useHistory();

//let userAction;
let submitHandler;

const [templateName,setTemplateName] = useState();
const [templateText,setTemplateText] = useState();

const {isLoggedIn,idd,setIdd} = useContext(AuthContext);

const { register, handleSubmit, formState :{errors} } = useForm()

console.log("in SMS Template before move to home");
console.log(isLoggedIn);

if (!isLoggedIn)
{
     usehistory.push("/");
}

let nameInput, textInput,message;

// read data

function getData () {
   
    axios.get(`http://localhost:9090/api/template/readonetemplate`,{params:{idd:idd}}).then(
        res => {console.log('This is tname from getData function:'+res.data.tname)
        setTemplateName(res.data.tname);
        setTemplateText(res.data.text);

    }
    );
}

let saveHandler;

useEffect(()=> getData(),[]);

// update data
 const onSubmit = event => {
    event.preventDefault();
    console.log("SMS Save submitHandler");

    console.log("templateName:"+event.templateName);
    console.log("templateText:"+event.templateText);

    const payload = JSON.stringify({tname:event.templateName, text:event.templateText });
    axios.patch(`http://localhost:9090/api/template/updatetemplate`,{idd:idd, tname:event.templateName,text:event.templateText}).then(res => { console.log(res.data); });

    console.log('payload:'+payload);

    swal({
        title:"info",
        text:"SMS template created successfully!",
        icon: "success",
    });

    setIdd(null);

    usehistory.push("/");
}



const cancelHandler = event => {
    event.preventDefault();
    console.log("SMS Cancel submitHandler");
    usehistory.push("/");
}



return(

    
    <React.Fragment>
        <HomeHeader/>
        <br/><br/><br/><br/><br/>
        <Container maxWidth="md">
        
        <FormControl onSubmit={submitHandler} size="medium">
        
            
            <Typography variant="h6">SMS Template</Typography>
            <br/>
           
            {/* <TextField variant="outlined" type="Text" value={templateName} onChange={ event => {setTemplateName(event.target.value)}}></TextField> */}
            <TextField variant="outlined" type="Text"  value={templateName} {...register("templateName",{required: "Input required"})}/>
            {errors.templateName && errors.templateName.message }        
            <br/>
           
            {/* <TextareaAutosize placeholder= "Template Text" value={templateText} onChange={ event => {setTemplateText(event.target.value)}} rows="5" cols="40"></TextareaAutosize> */}
            <TextareaAutosize placeholder= "Template Text" {...register("templateText",{required: "Input required"})}/>
            {errors.templateText && errors.templateText.message }  
            <br/>
            <ButtonGroup> 
            {/* <Button variant="contained" onClick={saveHandler}>Save</Button> */}
            <Button variant="contained" onClick={handleSubmit(onSubmit)}>Save</Button>
   
            {/* <Button variant="contained" type="submit" onClick={cancelHandler}>Cancel</Button> */}
            <Button variant="contained" type="submit" onClick={cancelHandler}>Cancel</Button>
            </ButtonGroup>

        </FormControl>
        
  
    </Container>
</React.Fragment>

);
}

export default EditSMSTemplate;