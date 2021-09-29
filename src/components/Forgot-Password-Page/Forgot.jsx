import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Forgot.css";
function Forgot() {

    const [forgotPage, setForgotpage] = useState({ email: "", password: "", storeEmail: "" });

    const [condition, setCondition] = useState({ change: false, ack: false, checkEmail: true });

    function handleChange(event) {
        const { name, value } = event.target;
        setForgotpage((prevValue) => {
            return {
                ...prevValue,
                [name]: value,
                storeEmail: ""
            }
        })
    }

    function handlepasswordChange(event) {
        const { name, value } = event.target;
        setForgotpage((prevValue) => {
            return {
                ...prevValue,
                [name]: value,
            }
        })
    }

    function submit(event) {
        event.preventDefault();
        console.log(forgotPage);
        fetch("http://localhost:2900/forgot", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(forgotPage),
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
                setCondition((prevValue) => {
                    return {
                        ...prevValue,
                        change: serverResponse.user,
                        checkEmail: serverResponse.user
                    }
                })
                setForgotpage({ email: "", password: "", storeEmail: serverResponse.serverEmail });
            });
    }

    function passwordSubmit(event) {
        event.preventDefault();
        console.log(forgotPage);
        fetch("http://localhost:2900/newPassword", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(forgotPage),
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
                setCondition((prevValue) => {
                    return {
                        ...prevValue,
                        ack: serverResponse.done
                    }
                })
            });
    }

    return (
        <section id="forgot-password">
            <div className="container-fluid">
                <div className="main-wrapper">
                    <div className="forgot-page-wrapper div-border">
                        <h1>Forgot Password?</h1>
                        <h2 className="forgot-subheading">Enter your registered email address here</h2>
                        {condition.change ? null :
                            <form onSubmit={submit}>
                                <input name="email" onChange={handleChange} value={forgotPage.email} className="form-control forgot-input" type="text" placeholder="Your Email" required />
                                {condition.checkEmail ? null : <p style={{ color: "red" }}>This email was not registered.</p>}
                                <button className="btn btn-primary forgot-button">Submit</button>
                            </form>}
                        {condition.change ?
                            <form onSubmit={passwordSubmit}>
                                <input defaultValue={forgotPage.storeEmail} className="form-control password-input" type="text" />
                                <input name="password" value={forgotPage.password} onChange={handlepasswordChange} className="form-control password-input" type="password" placeholder="Enter New Password" required />
                                {condition.ack ? <p style={{ color: "green" }}>Your password was changed. Please login.</p> : null}
                                <button className="btn btn-primary forgot-button">Submit</button>
                            </form> : null}
                        <div className="forgot-or-div">
                            <hr />
                            <span className="OR">OR</span>
                            <hr />
                        </div>
                        <Link className="hover" to="/signup">Create New Account</Link>
                    </div>
                    <div className="forgot-page-wrapper div-border forgot-lower-div">
                        <Link className="hover" to="/">Back To Login</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Forgot;