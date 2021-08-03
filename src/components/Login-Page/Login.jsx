import React, { useState } from "react";
import "./Login.css";
import { Link, Redirect } from "react-router-dom";
import LoginSvg from "./LoginSvg.jsx";

function Login(props) {
    const [userDetails, setUserdetails] = useState(null);

    const [isRegistered, setIsRegistered] = useState(false);

    const [isDone, setIsdone] = useState(false);

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const [checkPassword, setCheckpassword] = useState(true);

    // const [checkUser, setCheckuser] = useState(true);

    function handleChange(event) {
        const { name, value } = event.target;
        setLoginData((prevValue) => {
            return {
                ...prevValue,
                [name]: value,
            };
        });
    }

    function submit(event) {
        console.log(loginData);
        event.preventDefault();
        fetch("http://localhost:2900/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginData),
        })
            .then((response) => {
                if (!response.ok) {
                    console.log("error");
                    console.log(response);
                }
                return response.json();
            })
            .then((result) => {
                console.log(result);
                setUserdetails(result.user);
                setCheckpassword(result.userExisted);
                // setCheckuser(result.notUSer);
                setIsdone(result.userExisted);
                setIsRegistered(result.userExisted);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    // function google() {
    //   fetch("http://localhost:2900/auth/google")
    //     .then((response) => {
    //       if (!response.ok) {
    //         console.log("error");
    //         console.log(response);
    //       }
    //       return response.json();
    //     })
    //     .then((result) => {
    //       console.log(result);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // }

    return (
        <section id="login">
            <div className="container-fluid">
                <div className="login-flex">
                    <div>
                        <h1 className="logo">Quick-Query</h1>
                        <h3 className="about">A place to learn and share knowledge.</h3>
                    </div>
                    <div className="row outer-div">
                        <div className="col-lg-6 inner-div">
                            <div className="svg-img">
                                <LoginSvg />
                            </div>
                        </div>
                        <div className="col-lg-6 inner-div-right">
                            <div className="div-border wrapper-login">
                                <form onSubmit={submit} className="form-login">
                                    <input
                                        onChange={handleChange}
                                        value={loginData.email}
                                        className="form-control input-login"
                                        placeholder="Your Email"
                                        type="email"
                                        name="email"
                                        required
                                        autoCapitalize="off"
                                        maxLength="75"
                                    />
                                    <br />
                                    <input
                                        onChange={handleChange}
                                        value={loginData.password}
                                        className="form-control input-login"
                                        placeholder="Your Password"
                                        type="password"
                                        name="password"
                                        required
                                        autoCapitalize="off"
                                    />
                                    <br />
                                    {checkPassword ? null : <p style={{ color: "red" }}>Your password is incorrect. Please check it again.</p>}
                                    {/* {checkUser ? null : <p style={{ color: "red" }}>You are not registered. Please create a account.</p>} */}
                                    <button
                                        type="submit"
                                        className="btn btn-primary login-button button-margin"
                                    >
                                        Log in
                                    </button>

                                    {/* <div className="OR-div margin-twenty">
                                        <hr />
                                        <span className="OR">OR</span>
                                        <hr />
                                    </div> */}
                                    <div>
                                        <Link to="/forgotpassword" className="hover">
                                            <span className="forgot-password">Forgot password?</span>
                                        </Link>
                                    </div>
                                </form>
                                {/* <div className="margin-twenty">
                  <button
                    type="submit"
                    onClick={google}
                    className="btn btn-primary"
                  >
                    <i className="fab fa-google margin-five"></i>Log in With Google
                  </button>
                </div> */}
                            </div>
                            <div className="second-div-border div-border account-div-login">
                                <span className="margin-five">Don't have an account.</span>
                                <Link className="hover" to="/signup">
                                    Sign up
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isDone ? props.details(userDetails) : null}
            {isRegistered ? <Redirect to="/home" /> : null}
        </section>
    );
}

export default Login;
