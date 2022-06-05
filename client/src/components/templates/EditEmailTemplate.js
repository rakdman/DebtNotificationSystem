import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import HomeHeader from "../home/HomeHeader";

import {
  FormControl,
  TextField,
  InputLabel,
  TextareaAutosize,
  Button,
  Typography,
  ButtonGroup,
} from "@material-ui/core";
import Container from "@material-ui/core/Container";

import { AuthContext } from "../app-context/AuthContext";

function EditEmailTemplate() {
  const usehistory = useHistory();

  //let userAction;
  let submitHandler;

  const [templateName, setTemplateName] = useState();
  const [templateText, setTemplateText] = useState();

  const { isLoggedIn, idd, setIdd } = useContext(AuthContext);

  console.log("in Email Template before move to home");
  console.log(isLoggedIn);

  if (!isLoggedIn) {
    usehistory.push("/");
  }

  let nameInput, textInput, message;

  // read data

  function getData() {
    axios
      .get(`api/template/readoneemailtemplate`, { params: { idd: idd } })
      .then((res) => {
        console.log("This is tname from getData function:" + res.data.tname);
        setTemplateName(res.data.tname);
        setTemplateText(res.data.text);
      });
  }

  let saveHandler;

  useEffect(() => getData(), []);

  // update data
  saveHandler = (event) => {
    event.preventDefault();
    console.log("Email Save submitHandler");

    console.log("templateName:" + templateName);
    console.log("templateText:" + templateText);

    const payload = JSON.stringify({ tname: templateName, text: templateText });
    axios
      .patch(`api/template/updateemailtemplate`, {
        idd: idd,
        tname: templateName,
        text: templateText,
      })
      .then((res) => {
        console.log(res.data);
      });

    console.log("payload:" + payload);

    swal({
      title: "info",
      text: "Email template created successfully!",
      icon: "success",
    });

    setIdd(null);

    usehistory.push("/loginform");
  };

  const cancelHandler = (event) => {
    event.preventDefault();
    console.log("Email Cancel submitHandler");
    usehistory.push("/loginform");
    // usehistory.push("/viewemail");
  };

  return (
    <React.Fragment>
      <HomeHeader />

      <Container maxWidth="md">
        <FormControl onSubmit={submitHandler} size="medium">
          <Typography variant="h6">Email Template</Typography>
          <br />

          <TextField
            variant="outlined"
            type="Text"
            value={templateName}
            onChange={(event) => {
              setTemplateName(event.target.value);
            }}
          ></TextField>
          <br />

          <TextareaAutosize
            placeholder="Template Text"
            value={templateText}
            onChange={(event) => {
              setTemplateText(event.target.value);
            }}
            rows="5"
            cols="40"
          ></TextareaAutosize>
          <br />
          <ButtonGroup>
            <Button
              variant="contained"
              size="small"
              color="primary"
              onClick={saveHandler}
            >
              Save
            </Button>
            <Button
              variant="contained"
              size="small"
              color="primary"
              type="submit"
              onClick={cancelHandler}
            >
              Cancel
            </Button>
          </ButtonGroup>
          <br />
        </FormControl>
      </Container>
    </React.Fragment>
  );
}

export default EditEmailTemplate;
