import React,{useContext, useState,useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import HomeHeader from '../home/HomeHeader';
import EditEmailTemplate from './EditEmailTemplate';
import swal from 'sweetalert';



import { FormControl,TextField,InputLabel, TextareaAutosize, Button,Typography,ButtonGroup,
Table,TableRow,TableBody,TableCell,TableContainer} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Modal from '@material-ui/core/Modal';

import {AuthContext} from '../app-context/AuthContext';




import Dialog  from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function  EmailTemplateView () 
{

//let userAction;


const [templateName,setTemplateName] = useState();
const [templateText,setTemplateText] = useState();

const [modeldata, setModeldata] = React.useState();

const {isLoggedIn,idd,setIdd} = useContext(AuthContext);

let usehistory = useHistory();

// console.log("in EmailTemplateView ");
// console.log(isLoggedIn);

if (!isLoggedIn)
{
  usehistory.push("/");
}

const [smsTemp, setBooks] =  useState(null);
const apiURL = "http://"+process.env.REACT_APP_SERVER_IP_PORT+"/api/template/emailtemplates";
const fetchData = async () => {
  const response = await axios.get(apiURL)
  setBooks(response.data) 
}

useEffect(() => {
  fetchData();
},[]);


const closeHandler = event => {
  usehistory.push("/loginform");
}

//const edit = event => {
//  console.log("In Edit function");
//}

async function deletion(_id)   {
  // console.log('Inside deletion function idd:'+idd);
  if(_id){
      // await axios.delete(`http://localhost:9090/api/template/deleteemailtemplate`,{params:{idd:idd}}).then(
        await axios.delete(`http://${process.env.REACT_APP_SERVER_IP_PORT}/api/template/deleteemailtemplate`,{params:{idd:_id}}).then(
        res => {console.log('Deletion done for idd:');
        
        swal({
          title:"info",
          text:"Email template deleted successfully!",
          icon: "success",
      });
      usehistory.push("/loginform");

   
    
    }
  );
  }
  // else
  // console.log('Inside deletion function Idd is nulll:'+idd);
  
}






//Dialog start


const [open, setOpen] = React.useState(false);

const editRowHandler = event => {
  // console.log('From editRowHandler ');
  setOpen(true);
  
}


const handleClose = (e) => {
  setOpen(false);
};

const body = (
  <Container>
  <Dialog open='open' onClose={handleClose} >
    <DialogContent>

    <EditEmailTemplate />
  
    </DialogContent>

  </Dialog>
  </Container>

 
);



//Dialog end



return(
  
  <React.Fragment>
        {/* <HomeHeader/> */}
        <br/>
        <Container maxWidth="md">
        
        <FormControl>
           <Typography variant="h6">Email Template View</Typography>
   
           
           <Table>
             <TableBody>

             <TableRow>              
              <TableCell size="medium"> <Typography variant="subtitle1" color="red">Name</Typography> </TableCell>
              <TableCell size="medium"> <Typography variant="subtitle1">Messgae</Typography> </TableCell>
              </TableRow>

               {smsTemp && smsTemp.map((item,index)=> {



               return ( 
               <TableRow key={item._id} > 
                  <TableCell size="medium"> {item.tname} </TableCell>
                  <TableCell size="medium"> {item.text} </TableCell>
                  <TableCell> 
                    <ButtonGroup>                  
                        <Button color="primary"  size= "small"  variant="contained" onClick={()=>{
                            // console.log('From editRowHandler ');
                            setOpen(true);
                            setIdd(item._id);
                            // console.log('It is from client EmailTemplateView: item._id:'+item._id);
                            // console.log('It is from client EmailTemplateView id:'+idd);
                            }
                          } fullWidth='false'>Edit
                        </Button>  
                        <Modal
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="simple-modal-title"
                          aria-describedby="simple-modal-description"
                        >
                          {body}
                        </Modal>
                        <Button  size= "small"  color="primary" variant="contained" onClick={ ()=>
                              {
                               
                                // console.log('Indo deletion onclick ');
                                // setIdd(item._id);
                                // console.log('idd '+idd);
                                deletion(item._id);
                               
                              
                              }
                            }>Delete</Button>           
                     </ButtonGroup>
                  </TableCell>
               </TableRow>);
               })}
             </TableBody>
             <br/>
              <Button  size= "small"  variant="contained" color="primary" onClick={closeHandler} fullWidth='false'>Close</Button> 
              <br/><br/>
           </Table>
        </FormControl>



    </Container>
</React.Fragment>



)

}
export default EmailTemplateView;