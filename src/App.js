import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import './App.css';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';


function App(){
  let history = useHistory()
  
    const responseFacebook = (response) => {
      console.log(response);
      history.push('/Dashboard')
    }

    const responseGoogle = (response) => {
      console.log(response);
      history.push('/Dashboard');
      
    }

    

    return (
      <div className="App">
        <h2>Welcome to Weather tracking App</h2>
        <h4>LOGIN WITH FACEBOOK OR GOOGLE</h4>

      <FacebookLogin
        appId="2761167350782705"
        fields="name,email,picture"
        callback={responseFacebook}
      />
      <br />
      <br />


      <GoogleLogin
        clientId="320993946166-bjhniafdi4r97mej23rsffibflt0a4lo.apps.googleusercontent.com" 
        buttonText="LOGIN WITH GOOGLE"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      />

      </div>
    );
  
}




export default App;

