import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import HomeHeader from "../home/HomeHeader";

import FormInputText from "../../shared/forminputtext";
import FormInput from "../../shared/forminput";

import { AuthContext } from "../../components/app-context/AuthContext";

function SMSTemplate() {
  //let userAction;
  let submitHandler;

  const [templateName, setTemplateName] = useState();
  const [templateText, setTemplateText] = useState();

  const { isLoggedIn } = useContext(AuthContext);

  let usehistory = useHistory();

  console.log("in SMS Template before move to home");
  console.log(isLoggedIn);

  if (!isLoggedIn) {
    usehistory.push("/");
  }

  let nameInput, textInput, message;

  const saveHandler = (event) => {
    event.preventDefault();
    console.log("SMS Save submitHandler");

    const payload = JSON.stringify({ tname: templateName, text: templateText });
    axios
      .post(`api/template/create`, { tname: templateName, text: templateText })
      .then((res) => {
        console.log(res.data.tname);
      });

    swal({
      title: "Success",
      text: "SMS template created successfully!",
      icon: "success",
    });

    usehistory.push("/home");
  };

  const cancelHandler = (event) => {
    event.preventDefault();
    console.log("SMS Cancel submitHandler");
    usehistory.push("/home");
  };

  return (
    <div className="App">
      <HomeHeader />
      <form onSubmit={submitHandler}>
        <b>SMS Template Creation</b>
        <br />
        <label>Name</label>
        <input
          type="Text"
          value={templateName}
          onChange={(event) => {
            setTemplateName(event.target.value);
          }}
        ></input>
        <br />
        <label>Template</label>
        <textarea
          type="Text"
          value={templateText}
          onChange={(event) => {
            setTemplateText(event.target.value);
          }}
          rows="5"
          cols="40"
        ></textarea>
        <br />
        <button type="submit" onClick={saveHandler}>
          Save
        </button>
        <button type="submit" onClick={cancelHandler}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default SMSTemplate;
