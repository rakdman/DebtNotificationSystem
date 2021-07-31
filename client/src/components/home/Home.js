import React from 'react';
import  { useContext } from 'react';
// import { NavLink} from 'react-router-dom';
//import { NavLink,useHistory } from 'react-router-dom';
// import {Navbar} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import './Home.css';
import {AuthContext} from '../app-context/AuthContext';
import HomeHeader from './HomeHeader';
import HomeHeaderPublic from './HomeHeaderPublic';
// import Container from '@material-ui/core/Container';




const Home = () => {

    // const {isLoggedIn,setIsLoggedIn,token,setToken,loggedInUser,setLoggedInUser,homeContent,setHomeContent} = useContext(AuthContext);
    const {isLoggedIn,setIsLoggedIn,token,setToken} = useContext(AuthContext);

    let storgedData;

  let usehistory =useHistory();


  try{
      storgedData = JSON.parse(localStorage.getItem('userData'));
    //   console.log('localStorage Data:'+storgedData.token);        
  } catch(error) {
      storgedData=null;
    //   console.log('localStorge is not set#############');
  }

  if (storgedData) {
    // console.log('Into the already stored data check');
                // setLoggedInUser(storgedData.username);
                setToken(storgedData.token);
                setIsLoggedIn(true);
                usehistory.push("/home");
               
            //    console.log('Into checking the token');
} 

   // let usehistory =useHistory();
   
    // console.log('isLoggedIn from Home context:'+isLoggedIn);
    //const {isLoggedIn,loggedInUser} = useContext(AuthContext);

    // console.log("Token from Context Home page: "+token);

    // const logout = () => {
    //     localStorage.removeItem('userData');

    // }

    let Home;
  

    if (isLoggedIn && token)
    {   
       
        Home =<HomeHeader/>
    } else {
        Home = <HomeHeaderPublic/>
;
    }

    return(
        <>
              {Home}
        </>
      )


}

export default Home;