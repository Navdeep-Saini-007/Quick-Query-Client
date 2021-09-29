// import React,{useState} from "react";
import "./App.css";
import Login from "../Login-Page/Login.jsx";
import Signup from "../Signup-Page/Signup.jsx";
import Home from "../Home-Page/Home.jsx";
import Post from "../Post/Post.jsx";
import Contact from "../Contact-Us-Page/Contact.jsx";
import Profile from "../Profile-Page/Profile.jsx";
import Forgotpassword from "../Forgot-Password-Page/Forgot.jsx";
import Navbar from "../Navbar/Navbar.jsx";
import Editprofile from "../Edit-Profile-Page/Editprofile";
import { Switch, Route } from "react-router-dom";

function App() {
  // const [loginUser, setLoginuser] = useState(false);

  // const [signupUser, setSignupuser] = useState(false);

  // const [finalDetails, setFinaldetails] = useState(false);

  // function loginUserDetails() {
  //   setLoginuser(true);
  // }

  // function signupUserDetails() {
  //   setSignupuser(true);
  // }



  // useEffect(() => {
  //   setFinaldetails(loginUser);
  // }, [loginUser]);

  // useEffect(() => {
  //   setFinaldetails(signupUser);
  // }, [signupUser]);

  // useEffect(() => {
  //   console.log(finalDetails);
  // }, [finalDetails]);

  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Login /> 
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/forgotpassword">
          <Forgotpassword />
        </Route>
        <Route exact path="/home">
          <Navbar  />
          <Home  />
        </Route>
        <Route exact path="/posts">
          <Navbar/>
          <Post  />
        </Route>
        <Route exact path="/contact">
          <Navbar/>
          <Contact />
        </Route>
        <Route exact path="/profile">
          <Navbar/>
          <Profile  />
        </Route>
        <Route exact path="/editProfile">
          <Navbar/>
          <Editprofile />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
