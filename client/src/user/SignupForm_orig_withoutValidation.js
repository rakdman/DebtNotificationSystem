import React, { useContext, useState } from "react";

import logo from "../media/logo.png";
import { AuthContext } from "../components/app-context/AuthContext";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {
  FormControl,
  TextField,
  InputLabel,
  TextareaAutosize,
  Button,
  Typography,
  ButtonGroup,
  Avatar,
  Paper,
  Grid,
} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import HomeHeaderPublic from "../components/home/HomeHeaderPublic";

function SignupForm() {
  let usehistory = useHistory();

  //let loggedInUser;

  //const [loggedInUser, setLoggedInUser] = useState("")
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  // const [loggedInPassword, setLoggedInPassword] = useState("");

  // let {token,setToken,isLoggedIn,setIsLoggedIn,loggedInUser,setLoggedInUser,errorMessage,setErrorMessage} = useContext(AuthContext);
  //    let {errorMessage,setErrorMessage} = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState();

  //Checking if user is already logged in via localStorage

  // let storgedData;

  // try{
  //     storgedData = JSON.parse(localStorage.getItem('userData'));
  //     console.log('localStorage Data:'+storgedData.token);
  // } catch(error) {
  //     storgedData=null;
  //     console.log('localStorge is not set#############');
  // }

  let loginSubmitHandler;

  // if (!storgedData) {
  const signupSubmitHandler = (event) => {
    event.preventDefault();

    axios
      .get(`api/user/checkuser`, {
        params: { username: userName, email: email },
      })
      .then((res) => {
        console.log("Response from API");
        //    console.log(userName)

        const response = res.data;
        console.log(response);

        if (response == "UserDonotExist") {
          console.log("Creating a new user");
          setErrorMessage(<Typography color="error"></Typography>);

          axios
            .post(`api/user/createUser`, {
              username: userName,
              password: userPassword,
              email: email,
              role: "0",
              firstname: firstName,
              lastname: lastName,
            })
            .then((res) => console.log(res));

          setErrorMessage(
            <Typography color="error">
              User Created Successfully, now wait for Admin to approve
            </Typography>
          );

          // usehistory.push("/");
        } else {
          console.log("SettgedInUser");
          setErrorMessage(
            <Typography color="error">User already exists</Typography>
          );
        }
      });
  };
  // }

  // if (storgedData) {
  //     console.log('Into the already stored data check');
  //                 setLoggedInUser(storgedData.username);
  //                 setToken(storgedData.token);
  //                 setIsLoggedIn(true);
  //                 usehistory.push("/home");

  //         console.log('Into checking the token');

  // }

  // const signupSubmitHandler = event => {console.log('Signup Submit Handler')}

  //onChange={event=> {loggedInPassword=event.target.value}}

  return (
    <Container maxWidth="sm">
      <HomeHeaderPublic />
      <br />
      <br />
      <br />

      <br />
      <br />

      <Paper elevation={2} variant="outlined">
        <center>
          <FormControl>
            <br />
            <center>
              <Avatar>
                <img src={logo} className="App-logo" alt="logo" width="300" />
              </Avatar>
              <br />
            </center>

            <TextField
              label="First Name"
              variant="outlined"
              type="Text"
              value={firstName}
              onChange={(event) => {
                setFirstName(event.target.value);
              }}
            ></TextField>
            <br />
            <TextField
              label="Last Name"
              variant="outlined"
              type="Text"
              value={lastName}
              onChange={(event) => {
                setLastName(event.target.value);
              }}
            ></TextField>
            <br />

            <TextField
              label="Email"
              variant="outlined"
              type="Text"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            ></TextField>
            <br />

            <TextField
              label="User Name"
              variant="outlined"
              type="Text"
              value={userName}
              onChange={(event) => {
                setUserName(event.target.value);
              }}
            ></TextField>
            <br />

            <TextField
              label="Password"
              variant="outlined"
              type="Password"
              value={userPassword}
              onChange={(event) => {
                setUserPassword(event.target.value);
              }}
            ></TextField>

            <br />
            <Button
              variant="contained"
              onClick={signupSubmitHandler}
              type="submit"
            >
              Sign Up
            </Button>
            <br />

            {errorMessage}
            <br />
          </FormControl>
        </center>
      </Paper>
    </Container>
  );
}

export default SignupForm;
