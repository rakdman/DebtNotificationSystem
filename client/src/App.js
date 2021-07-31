//import React, {useState,useCallback,useContext}  from 'react';
import React, {useState}  from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';

import './App.css';

import LoginForm from './user/LoginForm';
import Home from './components/home/Home';
import {AuthContext} from './components/app-context/AuthContext';
import SMSTemplate from './components/templates/SMSTemplate';
import EmailTemplate from './components/templates/EmailTemplate';
import SMSTemplateView from './components/templates/SMSTemplateView';
import SignupForm from './user/SignupForm';
import Configuration from './components/integration/configuration'
import HomeHeaderPublic from './components/home/HomeHeaderPublic';
import EmailTemplateView from './components/templates/EmailTemplateView';




function App() {
  
 
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const [loggedInUser,setLoggedInUser] = useState("");
  const [token,setToken] = useState(null);
  const [idd,setIdd] = useState(null);
  const [errorMessage,setErrorMessage] = useState();
  const [role,setRole] = useState();


 // setToken(token);
  
  // const login = useCallback(() => {
  //   console.log("I am into login callback function");
  //   console.log(isLoggedIn);
  //   let  newLoginState = true;
  //   setIsLoggedIn(newLoginState);
  //   //auth.IsLoggedIn=true;
  //   console.log("I am into after callback function");
  //   console.log(isLoggedIn);
  // }, []);


  // const logout = useCallback(()=> {
  //   setIsLoggedIn(false);
  //   console.log("I am into logout callback function");
  // },[]); 

  //


    
   return (
    <AuthContext.Provider value={{token,setToken,isLoggedIn,setIsLoggedIn,loggedInUser,setLoggedInUser,idd,setIdd,errorMessage, setErrorMessage,role,setRole}}>
        <BrowserRouter>
          <Switch>
              <Route path="/" exact>
                <HomeHeaderPublic/>
              </Route>
              <Route path="/loginform" exact>
                <LoginForm />
              </Route>
              <Route path="/home" exact>
                <Home />
              </Route>
              <Route path="/template/sms/create" exact>
                    <SMSTemplate />
              </Route>
              <Route path="/template/sms/view" exact>
                    <SMSTemplateView />
              </Route>
              <Route path="/viewemail" exact>
                    <EmailTemplateView />
              </Route>
              
              <Route path="/template/email" exact>
                    <EmailTemplate />
              </Route>
              <Route path="/signup" exact>
                    <SignupForm />
              </Route>
              <Route path="/configuration" exact>
                    <Configuration />
              </Route>

              <Redirect to="/" />
          </Switch>

        </BrowserRouter>
      </AuthContext.Provider>
    );
}

export default App;