import React, { useState } from "react";
import "./Signup.css";
import { Redirect, Link } from "react-router-dom";
function Signup(props) {
    const [userDetails, setUserdetails] = useState(null);

    const [isRegistered, setIsRegistered] = useState(false);

    const [isDone, setIsdone] = useState(false);

    const [checkUser, setCheckuser] = useState(false);

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
                setCheckuser(serverResponse.already);
                setIsdone(serverResponse.userExisted);
                setIsRegistered(serverResponse.userExisted);
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
                            {/* <button className="btn btn-primary google-button margin_fifteen">
                                <i className="fab fa-google google-icon-signup"></i>
                                Log in with Google
                            </button> */}
                            {/* <div className="margin_fifteen">
                                <hr />
                                <span className="OR">OR</span>
                                <hr />
                            </div> */}
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
                            {checkUser ? <p style={{ color: "red" }}>This email address is already registered.</p> : null}
                            <button
                                value={isRegistered}
                                type="submit"
                                className="btn btn-primary signup-button"
                            >
                                Sign up
                            </button>
                            {/* <p className="p-fadedcolor">
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
                            </p> */}
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
            {isDone ? props.details(userDetails) : null}
            {isRegistered ? <Redirect to="/home" /> : null}
        </section>
    );
}
export default Signup;
