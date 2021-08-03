import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Forgot.css";
function Forgot() {

    const [forgotPage, setForgotpage] = useState({ email: "" });

    const [newPassword, setNewpassword] = useState({ password: "" });

    const [condition, setCondition] = useState(false);

    const [ack, setAck] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;
        setForgotpage((prevValue) => {
            return {
                ...prevValue,
                [name]: value,
            }
        })
    }

    function handlepasswordChange(event) {
        const { name, value } = event.target;
        setNewpassword((prevValue) => {
            return {
                ...prevValue,
                [name]: value,
            }
        })
    }

    // if (forgotPage.password1 && forgotPage.password2 !== "" && forgotPage.password1 === forgotPage.password2) {
    //     setPassword(true);
    // }

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
                setCondition(serverResponse.user);
                setForgotpage({ email: "" });
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
            body: JSON.stringify(newPassword),
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
                setAck(serverResponse.done);
                setNewpassword({ password: "" });
            });
    }


    return (
        <section id="forgot-password">
            {/* <div className="Reset-Password">
                <img src="" alt="forgot-password" />
                <h1>Trouble Logging In?</h1>
                <div className="info">
                    <p>Enter your Email Address and we'll send you <br /> a link to get back into your account.
                    </p>
                </div>
                <input type="email" className="input-box" placeholder="Your Email" />
                <button type="button" className="send-link-btn">Send Login Link</button>
                <hr /><p className="or">OR</p>
                <div className="info1"><p><h1>Create New Account</h1></p></div>
                <div className="back">Back To Login</div>
            </div> */}
            <div className="container-fluid">
                <div className="main-wrapper">
                    <div className="forgot-page-wrapper div-border">
                        <h1>Forgot Password?</h1>
                        <h2 className="forgot-subheading">Enter your registered email address here</h2>
                        {condition ? null :
                            <form onSubmit={submit}>
                                <input name="email" onChange={handleChange} value={forgotPage.email} className="form-control forgot-input" type="text" placeholder="Your Email" required />
                                <button className="btn btn-primary forgot-button">Submit</button>
                            </form>}
                        {condition ?
                            <form onSubmit={passwordSubmit}>
                                <input name="password" value={newPassword.password} onChange={handlepasswordChange} className="form-control password-input" type="password" placeholder="Enter New Password" required />
                                {/* <input name="password2" onChange={handleChange} className="form-control password-input" type="password" placeholder="Confirm Password" required /> */}
                                {ack ? <p style={{ color: "green" }}>Your password was changed. Please login.</p> : null}
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