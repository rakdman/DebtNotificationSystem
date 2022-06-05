import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import HomeHeader from "../home/HomeHeader";
import ViewWorkflowSteps from "./ViewWorkflowSteps";

import {
  FormControl,
  Button,
  Typography,
  Table,
  TableRow,
  TableBody,
  TableCell,
} from "@material-ui/core";
import Container from "@material-ui/core/Container";

import Modal from "@material-ui/core/Modal";

import { AuthContext } from "../app-context/AuthContext";
import { ContactSupportOutlined } from "@material-ui/icons";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

function WorkflowTemplateView() {
  const usehistory = useHistory();

  let submitHandler;

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [wfsteps, setWfSteps] = useState();
  const { isLoggedIn, idd, setIdd } = useContext(AuthContext);

  console.log("In View WF Template steps");
  console.log(isLoggedIn);

  if (!isLoggedIn) {
    usehistory.push("/");
  }

  let nameInput, textInput, message;

  // read data
  console.log("Before calling readoneinstancebyid API");

  const [wfData, setWfData] = useState(null);
  const apiURL = "api/workflow/readallwftemplate";
  const fetchData = async () => {
    const response = await axios.get(apiURL);

    console.log("Getting wfname");
    setWfData(response.data);
    console.log("Moving out of readallwftemplate");
  };

  useEffect(() => {
    fetchData();
  }, []);

  let saveHandler;

  // return(<>
  //     {wfData && wfData.map((item,index)=> {console.log(item.)})}

  // </>)

  // ViewHandler and Modal

  const [open, setOpen] = React.useState(false);

  const viewHandler = (event) => {};

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <Container>
      <Dialog open="open" onClose={handleClose}>
        <DialogContent>
          <ViewWorkflowSteps />
        </DialogContent>
      </Dialog>
    </Container>
  );

  return (
    <Container>
      {/* <HomeHeader/> */}
      <br />
      <br />
      <br />
      <br />
      <br />

      <Container width="40%">
        <Typography variant="h6">Instance View</Typography>
        <FormControl>
          <br />

          <Table style={{ width: "100%" }}>
            <TableBody>
              <TableRow>
                <TableCell size="medium">
                  {" "}
                  <Typography variant="h7">Workflow ID</Typography>{" "}
                </TableCell>
                <TableCell size="medium">
                  {" "}
                  <Typography variant="h7">Workflow Name</Typography>{" "}
                </TableCell>
              </TableRow>

              {wfData &&
                wfData.map((item, index) => {
                  return (
                    <TableRow key={item._id}>
                      <TableCell size="medium"> {item._id} </TableCell>
                      <TableCell size="medium"> {item.wfname} </TableCell>
                      <TableCell size="medium">
                        {" "}
                        {item.wfsteps.map((step) => {
                          console.log(step.NName);
                        })}{" "}
                      </TableCell>

                      <Button
                        variant="contained"
                        onClick={() => {
                          console.log("View Handler Button");
                          setOpen(true);
                          setIdd(item._id);
                          console.log("Instance view item._id:" + item._id);
                        }}
                        fullWidth="false"
                      >
                        View
                      </Button>
                      <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                      >
                        {body}
                      </Modal>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </FormControl>
      </Container>
    </Container>
  );
}

export default WorkflowTemplateView;
