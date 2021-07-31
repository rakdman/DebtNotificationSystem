import React,{useContext, useState,useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';




import { FormControl, Button,Typography,ButtonGroup,
Table,TableRow,TableBody,TableCell,Grid,Paper} from '@material-ui/core';
import Container from '@material-ui/core/Container';


import {AuthContext} from '../app-context/AuthContext';



function Configuration()
{
    let usehistory = useHistory();

 
    const {isLoggedIn,idd,setIdd} = useContext(AuthContext);
    const [firstName,setFirstName] = useState();
    const [lastName,setLastName] = useState();
    const [contactNo,setContactNo] = useState();
    const [emailId,setEmailId] = useState();
    const  [username,setUserName] = useState();
    const [approved,setApproved] = useState();

    if (!isLoggedIn)
    {
    usehistory.push("/");
    }


    const [instanceData, setInstanceData] =  useState(null);
    const apiURL = "http://localhost:9090/api/user/readallusers";
    const fetchData = async () => {
      const response = await axios.get(apiURL)
      setInstanceData(response.data) 
     }

     fetchData();
    useEffect( () => {
       fetchData();
    },[]);



  const approveHandler = event => {
    console.log(username)
 
    console.log('Approve button clicked')
    async function abc()
    {await axios.patch(`http://localhost:9090/api/user/updateuser`,{username:username, approved: true}).then(
      res => {console.log(res)}
    ) }
  
    abc()

  }

  const lockHandler = event => {
    console.log(username)
    

    console.log('Lock button clicked')

    async function abc()
    {await axios.patch(`http://localhost:9090/api/user/updateuser`,{username:username, approved: false}).then(
      res => {console.log(res)}
    ) }
  
    abc()

  }

    return(


<>
     
                <br/><br/><br/><br/><br/>

<Grid item item xs= {12} sm= {5}>
         <Container width= "40%"> 
                <Paper elevation= {2} style={{width: "195%"}}>
                <Typography variant="h6">Users</Typography>
                <FormControl>
               
                    <br/>
                
                <Table style = {{ width : "100%"}}>
                    <TableBody>
                    <TableRow>  
                  
                    {/* <TableCell size="medium"> <Typography variant="h7">Id</Typography> </TableCell> */}
                    <TableCell size="medium"> <Typography variant="h7" >FirstName</Typography> </TableCell>
                    <TableCell size="medium"> <Typography variant="h7">LastName</Typography> </TableCell>
                    <TableCell size="medium"> <Typography variant="h7">Email</Typography> </TableCell>
                    <TableCell size="medium"> <Typography variant="h7">UserName</Typography> </TableCell>
                    <TableCell size="medium"> <Typography variant="h7">Role</Typography> </TableCell>
                    <TableCell size="medium"> <Typography variant="h7">Approved</Typography> </TableCell>
                          
                    </TableRow>
                 
                    { instanceData && instanceData.map((item,index)=> {

                        return ( 
                        <TableRow key={item._id} > 
                            {/* <TableCell size="medium"> {item._id} </TableCell> */}
                            <TableCell size="medium"> {item.firstname} </TableCell>
                            <TableCell size="medium"> {item.lastname} </TableCell>
                            <TableCell size="medium"> {item.email} </TableCell>
                            <TableCell size="medium"> {item.username} </TableCell>
                            <TableCell size="medium"> {item.role} </TableCell>
                            <TableCell size="medium"> {item.approved} </TableCell>
                            <ButtonGroup>
                              <Button style= {{padding: "5px 10px"}} onClick ={setUserName(item.username)}  variant="contained" fullWidth='false'>Select</Button>
                              <Button style= {{padding: "5px 10px"}} onClick ={approveHandler}  variant="contained" fullWidth='false'>Approve</Button>
                              <Button style= {{padding: "5px 25px"}} onClick ={lockHandler}  variant="contained" fullWidth='false'>Lock</Button>    
                            </ButtonGroup>    
                         </TableRow>);
                        })}

                    </TableBody>
                                  
                    
                </Table>
                </FormControl>
            </Paper>
             </Container>
             </Grid>
            
             </>

    )

}

export default Configuration;