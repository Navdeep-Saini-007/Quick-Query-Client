import React, { useState } from "react";
import "./Signup.css";
import { Redirect, Link } from "react-router-dom";
function Signup(props) {
    const [userDetails, setUserdetails] = useState("");

    const [condition, setCondition] = useState({ isRegistered: false, isDone: false, checkUser: false });

    const [userData, setUserData] = useState({
        email: "",
        fullName: "",
        password: "",
    });

    function handleChange(event) {
        const { name, value } = event.target;
        setUserData((prevValue) => {
            return {
                ...prevValue,
                [name]: value,
            };
        });
    }

    function submit(event) {
        event.preventDefault();
        console.log(userData);
        fetch("http://localhost:2900/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        })
            .then((response) => {
                if (!response.ok) {
                    console.log("err");
                    console.log(response);
                }
                return response.json();
            })
            .then((serverResponse) => {
                console.log(serverResponse);
                setUserdetails(serverResponse.user);
                setCondition((prevValue) => {
                    return {
                        ...prevValue,
                        isRegistered: serverResponse.userExisted,
                        isDone: serverResponse.userExisted,
                        checkUser: serverResponse.already
                    }
                })
                setUserData({ email: "", fullName: "", password: "" });
            });
    }

    return (
        <section id="signup">
            <div className="container-fluid">
                <div className="signup-wrapper">
                    <div className="div-border">
                        <h1 className="big-heading">Quick-Query</h1>
                        <form onSubmit={submit} className="form-signup">
                            <h2 className="subheading margin_fifteen">
                                A place to learn and share knowledge.
                            </h2>
                            <input
                                name="email"
                                value={userData.email}
                                onChange={handleChange}
                                className="form-control margin_ten"
                                required
                                type="email"
                                placeholder="Email"
                            ></input>
                            <input
                                name="fullName"
                                value={userData.fullName}
                                onChange={handleChange}
                                className="form-control margin_ten"
                                required
                                type="text"
                                placeholder="Full Name"
                            ></input>
                            <input
                                name="password"
                                value={userData.password}
                                onChange={handleChange}
                                className="form-control margin_ten"
                                required
                                type="password"
                                placeholder="Password"
                            ></input>
                            {condition.checkUser ? <p style={{ color: "red" }}>This email address is already registered.</p> : null}
                            <button
                                type="submit"
                                className="btn btn-primary signup-button"
                            >
                                Sign up
                            </button>
                            <p className="p-fadedcolor">
                                By signing up, you agree to our{" "}
                                <a className="faded-links" href="#signup">
                                    Terms
                                </a>{" "}
                                ,{" "}
                                <a className="faded-links" href="#signup">
                                    Data Policy
                                </a>{" "}
                                and{" "}
                                <a className="faded-links" href="#signup">
                                    Cookies Policy
                                </a>
                                .
                            </p>
                        </form>
                    </div>
                    <div className="account-div-signup div-border">
                        <span>Have an account?</span>
                        <Link className="login-link hover" to="/">
                            Log in
                        </Link>
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
export default Signup;
