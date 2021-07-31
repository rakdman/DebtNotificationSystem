import React,{useState, useContext} from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { alignPropType } from 'react-bootstrap/esm/DropdownMenu';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';


import SMSTemplate from '../templates/SMSTemplate';
import EmailTemplate from '../templates/EmailTemplate';
import WorkflowTemplate from '../templates/WorkflowTemplate';
import SMSTemplateView from '../templates/SMSTemplateView';
import EmailTemplateView from '../templates/EmailTemplateView';
import WorkflowTemplateView from '../templates/WorkflowTemplateView';
import HomeHeaderPublic from './HomeHeaderPublic';
import { AuthContext } from '../app-context/AuthContext';
import MonitoringHome from '../monitoring/monitoringhome';
import LoadingHome from '../monitoring/LoadingHome';
import Configuration from '../integration/configuration';



// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//   },
// }));

export default function HomeHeader() {

  const [myComponent,setMyComponent] = useState();
  const {setErrorMessage,role} = useContext(AuthContext);

  //const classes = useStyles();
  let usehistory =useHistory();

  const [anchorE1, setAnchorE1] = React.useState(null);
  const [anchorE2, setAnchorE2] = React.useState(null);
  const [anchorE3, setAnchorE3] = React.useState(null);
  const [anchorE4, setAnchorE4] = React.useState(null);

  const handleClickE1 = (event) => {
    setAnchorE1(event.currentTarget);
    console.log("Captured Event: "+event.currentTarget);
  };

  const handleCloseE1 = () => {
    setAnchorE1(null);
   };

   const handleCreateSMS = () => {
    setAnchorE1(null);
    console.log('This is from MenuItem Create SMS');
    setMyComponent(<SMSTemplate/>);
   };

   const handleViewSMS = () => {
    setAnchorE1(null);
    console.log('This is from MenuItem View SMS handleViewSMS function');
    setMyComponent(<SMSTemplateView/>);
   };
   
   const handleCreateEmail = () => {
     setAnchorE1(null);
    console.log('This is from MenuItem Create Email');
    setMyComponent(<EmailTemplate/>);

   };

   const handleViewEmail = () => {
     setAnchorE1(null);
    console.log('This is from MenuItem View Email handleViewEmail function');
    setMyComponent(<EmailTemplateView/>);

   };
   

  const handleClickE2 = (event) => {
    setAnchorE2(event.currentTarget);
    console.log("Event.Target:"+event.currentTarget);
  };

  const handleCloseE2 = () => {
    setAnchorE2(null);
  };

  const handleCreateWorkflow = () => {
     setAnchorE2(null);
     console.log('This is from MenuItem Create Workflow');
     setMyComponent(<WorkflowTemplate/>);

   };

   const handleViewWorkflow = () => {
     setAnchorE2(null);
     console.log('This is from MenuItem View SMS handleViewSMS function');
     setMyComponent(<WorkflowTemplateView/>);

   };


  const handleClickE3 = (event) => {
    setAnchorE3(event.currentTarget);
    console.log("Event.Target:"+event.currentTarget);
  };

  const handleCloseE3 = () => {
    setAnchorE3(null);
  };

  const handleViewInstances = () => {
    setAnchorE3(null);
    console.log('This is from MenuItem View Monitoring View Instances function');
    setMyComponent(<MonitoringHome/>);

  };

  const handleLoadInstances = () => {
    setAnchorE3(null);
    console.log('This is from MenuItem Load Instances function');
    setMyComponent(<LoadingHome/>);

  };
 
  const handleClickE4 = (event) => {
    setAnchorE4(event.currentTarget);
    console.log("Event.Target:"+event.currentTarget);
  };

  const handleCloseE4 = () => {
    setAnchorE4(null);
  };

  const handleConfiguration = () => {
    setAnchorE4(null);
    console.log('This is from MenuItem Integration Configuration function');
    setMyComponent(<Configuration/>);

  };

  const handleViewDashboard = () => {
    // setAnchorE4(null);
    // console.log('This is from MenuItem View Monitoring View Instances function');
    // setMyComponent(<MonitoringHome/>);

  };

  const logout = () => {
    console.log("In Logout function");
    localStorage.removeItem('userData');
    // usehistory.push("/");
    setErrorMessage("");
    usehistory.push("HomeHeaderPublic");
}

  return (
    <Grid container  direction="row"  alignItems="flex-start">
      <AppBar position="fixed" color= "primary">
    
      <Grid item>
    <Toolbar variant= "dense" >
      <div>
          <IconButton  color="inherit" aria-label="menu">
           Debit Notification System
          </IconButton>

     <Button aria-controls="monitoringmenu" aria-haspopup="true" onClick={handleClickE3}  style={{textTransform: 'capitalize', color :'white' }}>
        Monitoring
      </Button>

      <Button aria-controls="configmenu" aria-haspopup="true" onClick={handleClickE1}  style={{textTransform: 'capitalize', color :'white'}}>
        Templates
      </Button>
      <Button aria-controls="workflowmenu" aria-haspopup="true"  onClick={handleClickE2} style={{textTransform: 'capitalize', color :'white'}} >
        Workflow
      </Button>

      
      {role!='0'&& <Button aria-controls="integrationmenu" aria-haspopup="true" onClick={handleClickE4}  style={{textTransform: 'capitalize', color :'white' }}>Administration</Button>}
      
      
      {/* <Button aria-controls="integrationmenu" aria-haspopup="true" onClick={handleClickE4}  style={{textTransform: 'capitalize', color :'white' }}>
      {role!='0'&& <>Administration</>}
      </Button> */}

      {/* <Button color="inherit" style={{textTransform: 'capitalize'}}>Login</Button>
      <Button color="inherit" style={{textTransform: 'capitalize'}}>SignUp</Button> */}

      <Button onClick={logout} color="inherit" style={{textTransform: 'capitalize'}}>Logout</Button>


      <Menu
        id="configmenu"
        anchorEl={anchorE1}
        keepMounted
        open={Boolean(anchorE1)}
        onClose={handleCloseE1} 
       >
        
        <MenuItem onClick={handleCreateEmail}>Create Email</MenuItem>
        <MenuItem onClick={handleViewEmail}>View Email</MenuItem>
        <MenuItem onClick={handleCreateSMS}>Create SMS</MenuItem>
        <MenuItem onClick={handleViewSMS}>View SMS</MenuItem>

       </Menu>

       <Menu
        id="workflowmenu"
        anchorEl={anchorE2}
        keepMounted
        open={Boolean(anchorE2)}
        onClose={handleCloseE2} 
        >
        <MenuItem onClick={handleCreateWorkflow}>Create Workflow</MenuItem>
        <MenuItem onClick={handleViewWorkflow} >View Workflow</MenuItem>
       </Menu>


       <Menu
        id="monitoringmenu"
        anchorEl={anchorE3}
        keepMounted
        open={Boolean(anchorE3)}
        onClose={handleCloseE3} 
        >
        <MenuItem onClick={handleViewInstances}>View Instances</MenuItem>
        {/* <MenuItem onClick={handleViewDashboard} >View Dashboard</MenuItem> */}
        <MenuItem onClick={handleLoadInstances} >Load Data</MenuItem>
       </Menu>


       <Menu
        id="integrationmenu"
        anchorEl={anchorE4}
        keepMounted
        open={Boolean(anchorE4)}
        onClose={handleCloseE4} 
        >
     
        <MenuItem onClick={handleConfiguration}>UserManagement</MenuItem>
       </Menu>
        
      </div>
 
        </Toolbar>
        </Grid>
      </AppBar>

      <Grid item>
 
      {myComponent}
      </Grid>
    

    </Grid>
  
    
  );
}
