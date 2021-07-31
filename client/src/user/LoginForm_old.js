import React, {useContext, useState} from 'react';

import logo from '../media/logo.png';
import {AuthContext} from '../components/app-context/AuthContext';
import { useHistory } from 'react-router-dom';
import axios from 'axios'
import { FormControl,TextField,Typography,ButtonGroup,Button,Avatar,Paper} from '@material-ui/core';
import Container from '@material-ui/core/Container'
import HomeHeaderPublic from '../components/home/HomeHeaderPublic';
import {useForm} from 'react-hook-form'
import FacebookLogin from 'react-facebook-login'

function LoginForm() {

    let usehistory =useHistory();

    const [fbUser, setFbUser] = useState("")
    const [fbToken,setFbToken] = useState("")
    const [fbEmail,setFbEmail] = useState("")

    const [loggedInPassword, setLoggedInPassword] = useState("");
    const  [errorMessage,setErrorMessage] = useState();

    const { register, handleSubmit, formState :{errors} } = useForm()

    let {token,setToken,isLoggedIn,setIsLoggedIn,loggedInUser,setLoggedInUser,role,setRole} = useContext(AuthContext);

    let storgedData;

// Check if local storage is set for the user

    try{
        storgedData = JSON.parse(localStorage.getItem('userData'));
    } catch(error) {
        storgedData=null;
    }

    if (storgedData) {
            setLoggedInUser(storgedData.username);
            setToken(storgedData.token);
            setIsLoggedIn(true);
            usehistory.push("/home");
    } 

    var onSubmit
    
    if (!storgedData) {
    
       onSubmit =  event => {
        setErrorMessage(<Typography color="error"></Typography> );
        let respToken;

        axios.get(`http://localhost:9090/api/user/readuser`,{params:{username:event.loggedInUser, password:event.loggedInPassword }}).then(res=>{
            respToken=res.data.token;
            setErrorMessage(<Typography color="error"></Typography> );
            if (respToken)
            {
                // console.log('Setting token and isLoggedInUser');
                setLoggedInUser(event.loggedInUser);
                // console.log('Context loggedInUser from Loginform'+event.loggedInUser);
                // console.log('Context respToken from Loginform'+respToken);
                //token=respToken;
                setToken(respToken);
                setIsLoggedIn(true);
                // console.log('Role read from the readuserAPI during login')
                // console.log(res.data.role)
                setRole(res.data.role[0])
                
                localStorage.setItem('userData',JSON.stringify({username:event.loggedInUser,token:respToken}));
                //console.log('Context token from Loginform:'+token);

                // console.log('Role set during the login in the context: ')
                // console.log(role)
                usehistory.push("/home");
            }
            else
            {

                
                usehistory.push("/");
                setErrorMessage(<Typography color="error">Invalid Credentials</Typography> );
                 return;
            }
            

         
        })
            // console.log('Token not found'+respToken);
            // setErrorMessage(<Typography color="error">Invalid Credentials</Typography> );
            

       }
} 



//onChange={event=> {loggedInPassword=event.target.value}}


// const responseFacebook = (res) => {
//   console.log('Facebook responseFacebook',res)
// }

  const [data, setData] = useState({});



   const responseFacebook =  (response) => {
// async function responseFacebook(response) {
    console.log('Entering')
    
    // console.log(response.accessToken)
  
    // console.log(response);
    // console.log(response.email);
    // console.log(response.name)
    // console.log(respToken.accessToken)
    //  setData(response);
     if (  response.accessToken) {
        console.log('Entering')
      setFbToken(response.accessToken)
      setIsLoggedIn(true);
      setFbUser(response.email)
      setFbEmail(response.email)
      setRole("0")
     console.log(fbUser,fbToken,fbEmail)
     
      if (fbUser&&fbToken&&fbEmail) {
     
            axios.get(`http://localhost:9090/api/user/checkuser`,{params:{username:response.email}}).then(res=>{
                // console.log('Response from the API:')
               
                if(res.data == 'UserDonotExist')
                {
                    //  console.log('creating new fb user')
                    axios.post(`http://localhost:9090/api/user/createUser`,{username:fbEmail, password:'fbpasswordnotavailable', email:fbEmail,role: "0",  firstname:response.name }).then(res=> console.log(res))
                    setErrorMessage(<Typography color="error">User Created waiting for approval</Typography> );
                }
                else if (res.data == 'UserExistsNotApproved')
                {
                    // console.log('Already exists but UserExistsNotApproved')
                    setErrorMessage(<Typography color="error">Waiting for Admin to approve</Typography> );
                }
                else
                {
                    // console.log('Already exists and Approved')
                    // localStorage.setItem('userData',JSON.stringify({username:fbUser,token:fbToken}));
                    localStorage.setItem('userData',JSON.stringify({username:fbUser,token:fbToken}));
                    usehistory.push("/home")
                }
            })

            // localStorage.setItem('userData',JSON.stringify({username:fbUser,token:fbToken}));
           
            // usehistory.push("/home")
        }
    }

  }


    return(
      

        <Container  maxWidth="sm">
        
        <HomeHeaderPublic/>
        <br/><br/><br/><br/>
   

        <br/><br/>
        
        <Paper elevation= {2} variant="outlined">
        <center>
            <FormControl>
            <br/>
            <center>
                <Avatar>
                {/* width="300"  */}
                <img src={logo} className="App-logo" alt="logo"  />
                </Avatar>
                <br/><br/>
            </center>
            
                {/* <TextField label="User Name"  variant= "outlined" type="Text" value={loggedInUser} onChange={event => {setLoggedInUser(event.target.value) }}></TextField> */}
                <TextField label="First Name"  variant= "outlined" type="Text" {...register("loggedInUser",{required: "Input required"})} />
                {errors.loggedInUser && errors.loggedInUser.message }
                <br/>  <br/>  
               
                {/* <TextField label="Password" variant= "outlined" type="Password" value={loggedInPassword} onChange={event=> {setLoggedInPassword(event.target.value)}} ></TextField> */}
                <TextField label="Password" variant= "outlined" type="Password" {...register("loggedInPassword",{required: "Input required" })}/>
                {errors.loggedInPassword && errors.loggedInPassword.message }
                <br/>
                <br/>
                {/* <Button variant="contained" onClick= {loginSubmitHandler} type="submit">Login</Button> */}
                <Button variant="contained"  type="submit" onClick={handleSubmit(onSubmit)} >Login</Button>
              
                <br/>
                <br/>
                   {/* <Button variant="contained"  type="submit"  onClick={handleLoginFacebook} startIcon= {<FacebookIcon/>}>Login Facebook</Button> */}
            

                   <FacebookLogin
                    appId="369106464611069"
                    autoLoad={false}
                    fields="name,email,picture"
                    // onClick={responseFacebook}
                   callback={responseFacebook} 
                   size= "small"
                   icon="fa-facebook"
                   />
              
                 
                   <br/>
                   

                {errorMessage}
                <br/>
            </FormControl>
            </center>
            </Paper>
        </Container> 
      
    );
}

export default LoginForm;