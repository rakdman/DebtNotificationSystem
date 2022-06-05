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
} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import HomeHeaderPublic from "../components/home/HomeHeaderPublic";
import { useForm } from "react-hook-form";

function LoginForm() {
  let usehistory = useHistory();

  const [loggedInPassword, setLoggedInPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let {
    token,
    setToken,
    isLoggedIn,
    setIsLoggedIn,
    loggedInUser,
    setLoggedInUser,
    role,
    setRole,
  } = useContext(AuthContext);

  let storgedData;

  try {
    storgedData = JSON.parse(localStorage.getItem("userData"));
  } catch (error) {
    storgedData = null;
  }

  if (storgedData) {
    setLoggedInUser(storgedData.username);
    setToken(storgedData.token);
    setIsLoggedIn(true);

    usehistory.push("/home");
  }

  var onSubmit;

  if (!storgedData) {
    onSubmit = (event) => {
      setErrorMessage(<Typography color="error"></Typography>);

      let respToken;

      console.log(process.env.REACT_APP_SERVER_IP_PORT);

      axios
        .get(`api/user/readuser`, {
          params: {
            username: event.loggedInUser,
            password: event.loggedInPassword,
          },
        })
        .then((res) => {
          respToken = res.data.token;

          setErrorMessage(<Typography color="error"></Typography>);
          if (respToken) {
            setLoggedInUser(event.loggedInUser);

            setToken(respToken);
            setIsLoggedIn(true);

            setRole(res.data.role[0]);

            localStorage.setItem(
              "userData",
              JSON.stringify({ username: event.loggedInUser, token: respToken })
            );

            usehistory.push("/home");
          } else {
            usehistory.push("/");
            setErrorMessage(
              <Typography color="error">Invalid Credentials</Typography>
            );
            return;
          }
        });
    };
  }

  const [data, setData] = useState({});

  return (
    <Container maxWidth="sm">
      <HomeHeaderPublic />
      <br />
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
              <Avatar src="/logo3.png"></Avatar>
              <br />
              <br />
            </center>
            <TextField
              label="First Name"
              variant="outlined"
              type="Text"
              {...register("loggedInUser", { required: "Input required" })}
            />
            {errors.loggedInUser && errors.loggedInUser.message}
            <br /> <br />
            <TextField
              label="Password"
              variant="outlined"
              type="Password"
              {...register("loggedInPassword", { required: "Input required" })}
            />
            {errors.loggedInPassword && errors.loggedInPassword.message}
            <br />
            <br />
            <Button
              variant="contained"
              type="submit"
              color="primary"
              onClick={handleSubmit(onSubmit)}
            >
              LOGIN
            </Button>
            <br />
            <br />
            <br />
            {errorMessage}
            <br />
          </FormControl>
        </center>
      </Paper>
    </Container>
  );
}

export default LoginForm;
