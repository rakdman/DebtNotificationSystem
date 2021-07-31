import React,{useContext, useState,useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
// import HomeHeader from '../home/HomeHeader';
// import swal from 'sweetalert';



import { FormControl,TextField,Button,Typography,ButtonGroup,
Table,TableRow,TableBody,TableCell,Paper,Grid, TablePagination} from '@material-ui/core';
import Container from '@material-ui/core/Container';


import Modal from '@material-ui/core/Modal';

import {AuthContext} from '../app-context/AuthContext';
import ViewInstanceSteps from './ViewInstanceSteps';

import Dialog  from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';



function MonitoringHome()
{
    let usehistory = useHistory();

 
    const {isLoggedIn,idd,setIdd} = useContext(AuthContext);

    const [firstName,setFirstName] = useState();
    const [lastName,setLastName] = useState();
    const [contactNo,setContactNo] = useState();
    const [emailId,setEmailId] = useState();
    

    const [rows, setRows] =useState([])

    

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(9);
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    if (!isLoggedIn)
    {
    usehistory.push("/");
    }


    const [instanceData, setInstanceData] =  useState(null);
    const apiURL = "http://"+process.env.REACT_APP_SERVER_IP_PORT+"/api/instances/readallinstances";
    const fetchData = async () => {
      const response = await axios.get(apiURL)
      setInstanceData(response.data) 
      setRows(response.data);
    }


    useEffect(() => {
      fetchData();
    },[]);
    


    const searchHandler = event => {
        // axios.get("http://localhost:9090/api/instances/readoneinstancesbyparams",
        // {params:{firstName:"Rakesh"}}).then(res => {
        //     console.log("Output from search API");
        //     console.log( "firstName is is:" + res.data.firstName );
        // });

    // console.log(firstName);
    // console.log(lastName);
    // console.log(contactNo);
    // console.log(emailId);

    var searchCode;
     
    if(firstName) {searchCode = "F"} else {searchCode = "0";}
    if(lastName) {searchCode = searchCode + "L";} else {searchCode = searchCode + "0";}
    if(contactNo) {searchCode = searchCode + "C";} else {searchCode = searchCode + "0";}
    if(emailId) {searchCode = searchCode + "E";} else {searchCode = searchCode + "0";}
    
    // console.log("searchCode:" + JSON.stringify(searchCode));

    const url = "http://"+process.env.REACT_APP_SERVER_IP_PORT+"/api/instances/readoneinstancesbyparams";
    // console.log('firstName:'+ firstName)
    // console.log('lastName:'+ lastName )
    // console.log('contactNo:'+ contactNo)
    // console.log('emailId:'+ emailId)

    axios.get(url,{params:{firstName:firstName,lastName:lastName, contactNo:contactNo,emailId:emailId,searchCode:searchCode }}).then(response=>{
        //  var responsefirstname=response.data.firstName;
        //  console.log("responsefirstname:"+responsefirstname);
        let res = JSON.parse(response.data);
        // console.log(res);
        res.map((item) => 
        console.log(item.firstName)
        );
        setInstanceData(res);
        setRows(res);
    })
    
}


const resetHandler = event => {
  setFirstName();
  setLastName();
  setContactNo();
  setEmailId();
  console.log("From reset handler");
}



// ViewHandler and Modal

const [open, setOpen] = React.useState(false);

const viewHandler = event => {

}

// const editRowHandler = event => {
//     console.log('From ViewHandler ');
//     setOpen(true);
    
//   }
  
  
  const handleClose = () => {
    setOpen(false);
  };
  
  const styles = {
    dialogPaper: {
        minHeight: '80vh',
        maxHeight: '80vh',
    },
};

  const body = (
    // <Grid >
    <Dialog maxWidth='md' open='open'  onClose={handleClose} style = {{
      minHeight: '95vh',
      maxHeight: '95vh'
  }}  >
      <DialogTitle>Notification Steps</DialogTitle>
      <DialogContent>
  
      <ViewInstanceSteps/>
    
      </DialogContent>
  
    </Dialog>
    // </Grid>
   
  );




    return(


<>
     

{/* Search Block Starts */}
<Grid container xs="auto" direction= "row" alignItems="flex-start" >
    <Grid item> 
    {/* <Container maxWidth="md"> */}
    {/* <Paper elevation= {2} variant="outlined" > */}
        <br/>
        <center>
            <FormControl>
                <TextField size="small" label="FirstName" variant= "outlined" type="Text" value={firstName} onChange={event => {setFirstName(event.target.value) }}></TextField>
                <TextField size="small" label="LastName" variant= "outlined" type="Text" value={lastName} onChange={event=> {setLastName(event.target.value)}} ></TextField>
                <TextField size="small" label="ContactNo"  variant= "outlined" type="Text" value={contactNo} onChange={event => {setContactNo(event.target.value) }}></TextField>
                <TextField size="small" label="EmailId" variant= "outlined" type="Text" value={emailId} onChange={event=> {setEmailId(event.target.value)}} ></TextField>
                <center>
                <ButtonGroup>
                    <Button variant="contained"  size= "small"  color="primary" style= {{padding: "5px 28px"}} onClick = {searchHandler}  type="submit">Search</Button>
                    {/* <Button variant="contained" style= {{padding: "5px 28px"}} onClick = {resetHandler}  type="reset">Reset</Button> */}
                    {/* <Button variant="contained" style= {{padding: "5px 28px"}} type="reset">Reset</Button> */}
                </ButtonGroup>
                </center>
                <br/>
            </FormControl>
            </center>
            {/* </Paper> */}
        
        {/* </Container> */}
    </Grid>
{/* Search Block Ends */}

<Grid>
<Container width= "40%"> 
              <Paper elevation= {2} style={{width: "131%"}}>
                <Typography variant="h6">Instance View</Typography>
                <FormControl>
               
                   
                <Table style = {{ width : "100%"}}>
                    <TableBody>
                    <TableRow>  
                    <TableCell size="medium"> <Typography variant="subtitle1">FirstName</Typography> </TableCell>
                    <TableCell size="medium"> <Typography variant="subtitle1">LastName</Typography> </TableCell>
                    <TableCell size="medium"> <Typography variant="subtitle1">ContactNo</Typography> </TableCell>
                    <TableCell size="medium"> <Typography variant="subtitle1">EmailId</Typography> </TableCell>
                    <TableCell size="medium"> <Typography variant="subtitle1">WorkflowName</Typography> </TableCell>
                    <TableCell size="medium"> <Typography variant="subtitle1">BillId</Typography> </TableCell>
                    <TableCell size="medium"> <Typography variant="subtitle1">OpenAmount</Typography> </TableCell>
                    {/* <TableCell size="medium"> <Typography variant="h6">WorkflowSteps</Typography> </TableCell> */}
                    <TableCell size="medium"> <Typography variant="subtitle1">InstanceStatus</Typography> </TableCell>
                    <TableCell size="medium"> <Typography variant="subtitle1">EntryDate</Typography> </TableCell>
                    <TableCell size="medium"> <Typography variant="subtitle1"></Typography> </TableCell>
                    </TableRow>

                    {/* {instanceData && instanceData.map((item,index)=> { */}

                    {/* {console.log(rows)} */}
                    {/* {console.log(instanceData.slice(1,4))} */}
                    {/* {console.log(rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage))} */}
            
            
                    {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item,index)=> {
  
            return ( 
                    <TableRow key={item._id} > 
                        <TableCell size="medium"> {item.firstName} </TableCell>
                        <TableCell size="medium"> {item.lastName} </TableCell>
                        <TableCell size="medium"> {item.contactNo} </TableCell>
                        <TableCell size="medium"> {item.emailID} </TableCell>
                        <TableCell size="medium"> {item.wfname} </TableCell>
                        <TableCell size="medium"> {item.billId} </TableCell>
                        <TableCell size="medium"> {item.openAmount} </TableCell>
                        {/* <TableCell size="medium"> {item.wfsteps} </TableCell> */}
                        <TableCell size="medium"> {item.instanceStatus} </TableCell>
                        <TableCell size="medium"> {item.entrydate.slice(0,10)} </TableCell>
                        {/* <Button variant="outlined"  fullWidth='false' onClick= {viewHandler} >View</Button>  */}
                       
                                          
                                <Button color="primary"   size= "small"  style={{margin: "5px 5px"}} variant="contained" 
                                 onClick={()=>{
                                    // console.log('View Handler Button');
                                    setOpen(true);
                                    setIdd(item._id);
                                    // console.log('Instance view item._id:'+item._id);
                                   
                                    }
                                } fullWidth='false'>View
                                </Button>  
                                <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="simple-modal-title"
                                aria-describedby="simple-modal-description"
                                >
                                 
                                {body}
                                </Modal>
         
                       
                    </TableRow>);
                    })}
                    </TableBody>
                   {/* { console.log(emptyRows)} */}
                                  
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53* emptyRows }}>
                        
                          <TableCell/> 
                        </TableRow>
                      )} 
                            </Table>
                <Table style = {{ width : "100%"}}>
                <TablePagination 
                  // rowsPerPageOptions={[5, 10, 25]}
                  rowsPerPageOptions={[10]}
                  component="div"
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
      />
       </Table>
      </FormControl>
            </Paper>
             </Container>
</Grid>
 
</Grid>  
</>

    )

}

export default MonitoringHome;