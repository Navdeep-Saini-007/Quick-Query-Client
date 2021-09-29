import React, { useState } from "react";
import "./Login.css";
import { Link, Redirect } from "react-router-dom";
import LoginSvg from "./LoginSvg.jsx";

function Login(props) {
    const [userDetails, setUserdetails] = useState("");

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const [condition, setCondition] = useState({ checkUser: false, checkPassword: true, isDone: false, isRegistered: false });

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
                setCondition((prevValue) => {
                    return {
                        ...prevValue,
                        checkPassword: result.wrongPass,
                        checkUser: result.notUser,
                        isRegistered: result.userExisted,
                        isDone: result.userExisted
                    }
                })
            })
            .catch((err) => {
                console.log(err);
            });
    }

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
                                    {condition.checkPassword ? null : <p style={{ color: "red" }}>Your password is incorrect. Please check it again.</p>}
                                    {condition.checkUser ? <p style={{ color: "red" }}>You are not registered. Please create a account.</p> : null}
                                    <button
                                        type="submit"
                                        className="btn btn-primary login-button button-margin"
                                    >
                                        Log in
                                    </button>
                                    <div>
                                        <Link to="/forgotpassword" className="hover">
                                            <span className="forgot-password">Forgot password?</span>
                                        </Link>
                                    </div>
                                </form>
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
            {condition.isDone ? sessionStorage.setItem("id", userDetails._id) : null}
            {condition.isDone ? sessionStorage.setItem("name", userDetails.userName) : null}
            {condition.isDone ? sessionStorage.setItem("email", userDetails.email) : null}
            {condition.isRegistered ? <Redirect to="/home" /> : null}
        </section>
    );
}

export default Login;
