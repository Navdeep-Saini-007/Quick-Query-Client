import { React, useState, useEffect } from "react";
import "./App.css";
import Login from "../Login-Page/Login.jsx";
import Signup from "../Signup-Page/Signup.jsx";
import Home from "../Home-Page/Home.jsx";
import Post from "../Post/Post.jsx";
import Contact from "../Contact-Us-Page/Contact.jsx";
// import Feedback from "../Feedback-Page/Feedback.jsx";
import Profile from "../Profile-Page/Profile.jsx";
import Forgotpassword from "../Forgot-Password-Page/Forgot.jsx";
import Navbar from "../Navbar/Navbar.jsx";
import { Switch, Route } from "react-router-dom";

function App() {
  const [loginUser, setLoginuser] = useState(null);

  const [signupUser, setSignupuser] = useState(null);

  const [finalDetails, setFinaldetails] = useState(null);

  function loginUserDetails(UserDetails) {
    setLoginuser(UserDetails);
  }

  function signupUserDetails(UserDetails) {
    setSignupuser(UserDetails);
  }

  useEffect(() => {
    setFinaldetails(loginUser);
  }, [loginUser]);

  useEffect(() => {
    setFinaldetails(signupUser);
  }, [signupUser]);

  useEffect(() => {
    console.log(finalDetails);
  }, [finalDetails]);

  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Login details={loginUserDetails} />
        </Route>
        <Route exact path="/signup">
          <Signup details={signupUserDetails} />
        </Route>
        <Route exact path="/forgotpassword">
          <Forgotpassword />
        </Route>
        <Route exact path="/home">
          <Navbar />
          <Home user={finalDetails} />
        </Route>
        <Route exact path="/posts">
          <Navbar />
          <Post user={finalDetails} />
        </Route>
        <Route exact path="/contact">
          <Navbar />
          <Contact />
        </Route>
        <Route exact path="/profile">
          <Navbar />
          <Profile user={finalDetails} />
        </Route>
        {/* <Route exact path="/feedback">
          <Navbar />
          <Feedback />
        </Route> */}
      </Switch>
    </div>
  );
}

export default App;
