import React, {useContext, useState} from 'react';

import logo from '../media/logo.png';
import {AuthContext} from '../components/app-context/AuthContext';
import { useHistory } from 'react-router-dom';
import axios from 'axios'
import { FormControl,TextField,InputLabel, TextareaAutosize, Button,Typography,ButtonGroup,Avatar,Paper} from '@material-ui/core';
import Container from '@material-ui/core/Container'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import HomeHeaderPublic from '../components/home/HomeHeaderPublic';
import {useForm} from 'react-hook-form'
import FacebookLogin from 'react-facebook-login'
// import FacebookIcon from '@material-ui/icons/Facebook';



function LoginForm() {

    let usehistory =useHistory();

    //let loggedInUser;
    
    const [fbUser, setFbUser] = useState("")
    const [fbToken,setFbToken] = useState("")
    const [fbEmail,setFbEmail] = useState("")

    const [loggedInPassword, setLoggedInPassword] = useState("");
    const  [errorMessage,setErrorMessage] = useState();

    const { register, handleSubmit, formState :{errors} } = useForm()

    // let {token,setToken,isLoggedIn,setIsLoggedIn,loggedInUser,setLoggedInUser,errorMessage,setErrorMessage} = useContext(AuthContext);
    let {token,setToken,isLoggedIn,setIsLoggedIn,loggedInUser,setLoggedInUser,role,setRole} = useContext(AuthContext);

    
    // console.log("Is logged in="+isLoggedIn);

    // console.log('Entered into LoginForm method....');

    //Checking if user is already logged in via localStorage

 console.log(process.env.REACT_APP_FB_APP_ID)

    let storgedData;

    try{
        storgedData = JSON.parse(localStorage.getItem('userData'));
        // console.log('localStorage Data:'+storgedData.token);        
    } catch(error) {
        storgedData=null;
        // console.log('localStorge is not set#############');
    }


    if (storgedData) {
        // console.log('Into the already stored data check');
                    setLoggedInUser(storgedData.username);
                    setToken(storgedData.token);
                    setIsLoggedIn(true);
                
                    usehistory.push("/home");
            
            // console.log('Into checking the token');
    
    } 

    // let loginSubmitHandler;

    var onSubmit
    

    if (!storgedData) {
    
    // loginSubmitHandler =  event => {
        onSubmit =  event => {
        
        
        // event.preventDefault(); 

        setErrorMessage(<Typography color="error"></Typography> );
       

        // console.log('Entering into login form.............')

                let respToken;

                // console.log("////////////////////////////////////////////////////////////////////////////7")

        console.log(process.env.REACT_APP_SERVER_IP_PORT)
        // axios.get(`http://localhost:9090/api/user/readuser`,{params:{username:event.loggedInUser, password:event.loggedInPassword }}).then(res=>{
        axios.get(`http://${process.env.REACT_APP_SERVER_IP_PORT}/api/user/readuser`,{params:{username:event.loggedInUser, password:event.loggedInPassword }}).then(res=>{
           //console.log(res.data.map((user)=>user.username +' '+user.token));
            // console.log(res.data);
            respToken=res.data.token;
            // console.log("Printing token again:"+respToken);
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



  const responseFacebook = (response) => {
  
    console.log(response.accessToken);
    // console.log(response.email);
    // console.log(response.name)
    // console.log(respToken.accessToken)
    //  setData(response);
     if (response.accessToken) {
        //  console.log('Entering 1')
      setFbToken(response.accessToken)
      setIsLoggedIn(true);
      setFbUser(response.email)
      setFbEmail(response.email)
      setRole("0")
    //    console.log(fbUser,fbToken,fbEmail)
     
    //    if (fbUser&&fbToken&&fbEmail) {
        if (response.email&& response.accessToken) {
        // console.log('Entering 2')
            // axios.get(`http://localhost:9090/api/user/checkuser`,{params:{username:response.email}}).then(res=>{
                axios.get(`http://${process.env.REACT_APP_SERVER_IP_PORT}/api/user/checkuser`,{params:{username:response.email}}).then(res=>{
                // console.log('Response from the API:')
                // console.log(res.data)
                if(res.data === "UserDonotExist")
                {
                   console.log('Creating new user')
                    // axios.post(`http://localhost:9090/api/user/createUser`,{username:fbEmail, password:'fbpasswordnotavailable', email:fbEmail,role: "0",  firstname:response.name }).then(res=> console.log(res))
                    axios.post(`http://${process.env.REACT_APP_SERVER_IP_PORT}/api/user/createUser`,{username:fbEmail, password:'fbpasswordnotavailable', email:fbEmail,role: "0",  firstname:response.name }).then(res=> console.log(res))
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
                    // console.log('Entering 3')
                    localStorage.setItem('userData',JSON.stringify({username:response.email,token:response.accessToken}));
                    console.log(localStorage.getItem('userData'))
                    // console.log('Entering 4')
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
                <Avatar src = "/logo3.png"> 
                {/* width="300"  */}
                {/* <img src={logo} className="App-logo" alt="logo"  /> */}

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
                <Button variant="contained"  type="submit" color="primary" onClick={handleSubmit(onSubmit)} >Login</Button>
              
            
                <br/>
                <br/>
                   {/* <Button variant="contained"  type="submit"  onClick={handleLoginFacebook} startIcon= {<FacebookIcon/>}>Login Facebook</Button> */}

              
                   <FacebookLogin
                    // appId="369106464611069"
                    appId={process.env.REACT_APP_FB_APP_ID}
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