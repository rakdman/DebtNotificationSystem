import React from 'react';
import { useHistory } from 'react-router-dom';
// import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
// import { Input } from '@material-ui/icons';



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

export default function HomeHeaderPublic() {

  // const [myComponent,setMyComponent] = useState();
  // const classes = useStyles();
  let usehistory =useHistory();

  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const [anchorE2, setAnchorE2] = React.useState(null);
  // const [anchorE3, setAnchorE3] = React.useState(null);
  // const [anchorE4, setAnchorE4] = React.useState(null);

 
//   const logout = () => {
//     console.log("In Logout function");
//     localStorage.removeItem('userData');
//     usehistory.push("/");
// }

const login = () => {
  // console.log("In Login function");
  // usehistory.push(LoginForm);
  usehistory.push('/loginform')
}

const SignupFormHandler = () => {
  console.log("From signnup handler");
  usehistory.push('/signup')
  
}

  return (
    <Container >
      <AppBar position="fixed" color= "primary">
    
    <Toolbar variant= "regular">
      <div>
          <IconButton  color="inherit" aria-label="menu">
           Debit Notification System
          </IconButton>
      <Button color="inherit" onClick ={login}  style={{textTransform: 'capitalize'}}>Login</Button>
      <Button color="inherit" onClick= {SignupFormHandler} style={{textTransform: 'capitalize'}}>SignUp</Button>
      

      </div>
        </Toolbar>
      </AppBar>
      
      <div>
     
      {/* <myComponent/> */}
      
      </div>

    </Container>

    
  );
}
