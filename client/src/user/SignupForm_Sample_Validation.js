import React, {useState} from "react";
import { useForm } from "react-hook-form";
import { FormControl,TextField,InputLabel, TextareaAutosize, Button,Typography,ButtonGroup,Avatar,Paper,Grid} from '@material-ui/core';

export default function App() {
    const { register, handleSubmit, formState :{errors} } = useForm();
    const onSubmit = data => console.log(data);
     
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField {...register("firstName", { required : "This is required", minLength: {value: 5, message : "Less input"},
        pattern: { value: /\S+@\S+\.\S+/, message: "Not email"}
        })} />
        {errors.firstName && errors.firstName.message}
        <input type="submit" />
      </form>
    );
  }
