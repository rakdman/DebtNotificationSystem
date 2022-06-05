import React, { useState, useEffect } from "react";
// import {useHistory} from 'react-router-dom';
import axios from "axios";
import swal from "sweetalert";
// import HomeHeader from '../home/HomeHeader';
// import { FormControl,TextField,InputLabel, TextareaAutosize, Button,Typography,ButtonGroup,Table,TableRow,TableBody,TableCell,TableContainer,Paper,Grid} from '@material-ui/core';
import {
  FormControl,
  Button,
  Typography,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Paper,
  Grid,
} from "@material-ui/core";
import Container from "@material-ui/core/Container";
// import {AuthContext} from '../app-context/AuthContext';

function LoadingHome() {
  const [filename, setFileName] = useState(null);
  const [instanceData, setInstanceData] = useState(null);

  // File loading

  const apiURL = `api/integration/readloadschedule`;
  const fetchJobData = async () => {
    //   const response = await axios.get(apiURL,{params:{jobname:'loadFileJob'}})
    await axios
      .get(apiURL, { params: { jobname: "loadFileJob" } })
      .then((res) => {
        //   console.log(res.data)
        setInstanceData(res.data);
      });
  };

  useEffect(() => {
    fetchJobData();
  }, []);

  // Email sending

  const [instanceEmailData, setInstanceEmailData] = useState(null);

  const apiEmailURL = `api/integration/readloadschedule`;
  const fetchEmailJobData = async () => {
    await axios
      .get(apiEmailURL, { params: { jobname: "sendEmailJob" } })
      .then((res) => {
        //   console.log(res.data)
        setInstanceEmailData(res.data);
      });
  };

  useEffect(() => {
    fetchEmailJobData();
  }, []);

  let uploadDataFile = (event) => {
    // console.log('Inside file upload function');
    // console.log('This is the filename:'+filename);

    async function loadallfiles() {
      axios
        .post(`api/integration/loadfile`, { filename: filename })
        .then((res) => console.log("Customer File Uploaded"));
    }

    loadallfiles();

    swal({
      title: "Started",
      text: "Loading job Started",
      icon: "success",
    });
  };

  let uploadPaymentFile = (event) => {
    async function loadallpaymentfiles() {
      axios
        .post(`api/integration/loadpaymentfile`, { filename: filename })
        .then((res) => console.log("Payment File Uploaded"));
    }

    loadallpaymentfiles();

    swal({
      title: "Started",
      text: "Loading job Started",
      icon: "success",
    });
  };

  return (
    <Grid container direction="column" sm={10}>
      <br />

      {/* Show existing File Loading schedule */}

      <Grid item xs={8}>
        <Container width="60%">
          <Paper elevation={2} style={{ width: "195%" }}>
            <Typography variant="h6">File Loading Job Schedule</Typography>
            <FormControl>
              <br />

              <Table style={{ width: "100%" }}>
                <TableBody>
                  <TableRow>
                    <TableCell size="medium">
                      {" "}
                      <Typography variant="h7">JobName</Typography>{" "}
                    </TableCell>
                    <TableCell size="medium">
                      {" "}
                      <Typography variant="h7">NextRunAt</Typography>{" "}
                    </TableCell>
                    <TableCell size="medium">
                      {" "}
                      <Typography variant="h7">RepeatInterval</Typography>{" "}
                    </TableCell>
                    {/* <TableCell size="medium"> <Typography variant="h7">LastRunAt</Typography> </TableCell> */}
                    <TableCell size="medium">
                      {" "}
                      <Typography variant="h7">LastFinishAt</Typography>{" "}
                    </TableCell>
                  </TableRow>

                  {instanceData &&
                    instanceData.map((item, index) => {
                      return (
                        <TableRow key={item._id}>
                          <TableCell size="medium"> {item.name} </TableCell>
                          <TableCell size="medium">
                            {" "}
                            {item.nextRunAt.slice(0, 10) +
                              " " +
                              item.nextRunAt.slice(11, 19)}{" "}
                          </TableCell>
                          <TableCell size="medium">
                            {" "}
                            {item.repeatInterval}{" "}
                          </TableCell>
                          {/* <TableCell size="medium"> {item.lockedAt} </TableCell> */}
                          <TableCell size="medium">
                            {" "}
                            {item.lastFinishedAt.slice(0, 10) +
                              " " +
                              item.lastFinishedAt.slice(11, 19)}{" "}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </FormControl>
            <br /> <br />
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={uploadDataFile}
            >
              Load Customers
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={uploadPaymentFile}
            >
              Load Payments
            </Button>
          </Paper>
        </Container>
      </Grid>
      {/* Show existing File Loading schedule Ends */}

      {/* Show existing Email sending schedule */}

      <br />
      <br />
      <br />

      <Grid item xs={8}>
        <Container width="60%">
          <Paper elevation={2} style={{ width: "195%" }}>
            <Typography variant="h6">Email Sending Job Schedule</Typography>
            <FormControl>
              <br />

              <Table style={{ width: "100%" }}>
                <TableBody>
                  <TableRow>
                    <TableCell size="medium">
                      {" "}
                      <Typography variant="h7">JobName</Typography>{" "}
                    </TableCell>
                    <TableCell size="medium">
                      {" "}
                      <Typography variant="h7">NextRunAt</Typography>{" "}
                    </TableCell>
                    <TableCell size="medium">
                      {" "}
                      <Typography variant="h7">RepeatInterval</Typography>{" "}
                    </TableCell>
                    {/* <TableCell size="medium"> <Typography variant="h7">LastRunAt</Typography> </TableCell> */}
                    <TableCell size="medium">
                      {" "}
                      <Typography variant="h7">LastFinishAt</Typography>{" "}
                    </TableCell>
                  </TableRow>

                  {instanceEmailData &&
                    instanceEmailData.map((item, index) => {
                      return (
                        <TableRow key={item._id}>
                          <TableCell size="medium"> {item.name} </TableCell>
                          <TableCell size="medium">
                            {" "}
                            {item.nextRunAt.slice(0, 10) +
                              " " +
                              item.nextRunAt.slice(11, 19)}{" "}
                          </TableCell>
                          <TableCell size="medium">
                            {" "}
                            {item.repeatInterval}{" "}
                          </TableCell>
                          {/* <TableCell size="medium"> {item.lockedAt} </TableCell> */}
                          <TableCell size="medium">
                            {" "}
                            {item.lastFinishedAt.slice(0, 10) +
                              " " +
                              item.lastFinishedAt.slice(11, 19)}{" "}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </FormControl>
            <br /> <br />
          </Paper>
        </Container>
      </Grid>
      {/* Show existing Email sending schedule Ends*/}
    </Grid>
  );
}

export default LoadingHome;
