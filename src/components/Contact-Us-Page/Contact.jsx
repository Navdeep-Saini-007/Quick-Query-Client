import React, { useState } from "react";
import "./Contact.css";
function Contact() {
    const [contactData, setContactdata] = useState({
        userName: "",
        userEmail: "",
        userMessage: "",
    });

    const [condition, setCondition] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;
        setContactdata((prevValue) => {
            return {
                ...prevValue,
                [name]: value,
            };
        });
    }

    function submit(event) {
        console.log(contactData);
        event.preventDefault();
        fetch("http://localhost:2900/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(contactData),
        })
            .then((response) => {
                if (!response.ok) {
                    console.log(response);
                    console.log("error");
                }
                return response.json();
            })
            .then((result) => {
                console.log(result);
                setCondition(true);
                setContactdata({
                    userName: "",
                    userEmail: "",
                    userMessage: "",
                });
            });
    }

    return (
        <section id="contact-us">
            <div className="container-fluid">
                <div className="contact-us-wrapper">
                    <div className="header-contact-us">
                        <h1 className="main-heading">Contact Us</h1>
                        <p className="subheading">
                            Have some questions? Feel free to contact us.
                        </p>
                    </div>
                    {/* <div className="row">
                        <div className="col-md-6">
                            <div className="contacts-container">
                                <div className="contacts-logo">
                                    <i className="far fa-envelope fa-2x"></i>
                                </div>
                                <div className="email">
                                    <p>er.navdeepsingh41@gmail.com</p>
                                    <p>parshant648@gmail.com</p>
                                    <p>pratik888top@gmail.com</p>
                                </div>
                            </div>
                            <div className="contacts-container">
                                <div className="contacts-logo">
                                    <i className="fab fa-instagram fa-2x"></i>
                                </div>
                                <div className="instagram">
                                    <p>navdeepsaini07</p>
                                    <p>parshant_yadav321</p>
                                    <p>pratik_Op</p>
                                </div>
                            </div>
                        </div> */}
                    <div className=" message-container">
                        <div className="div-border">
                            <form onSubmit={submit}>
                                <input
                                    onChange={handleChange}
                                    value={contactData.userEmail}
                                    className="form-control input"
                                    type="email"
                                    name="userEmail"
                                    required
                                    placeholder="Email"
                                />
                                <input
                                    onChange={handleChange}
                                    value={contactData.userName}
                                    className="form-control input"
                                    type="text"
                                    name="userName"
                                    required
                                    autoCapitalize="off"
                                    placeholder="Full Name"
                                />
                                <textarea
                                    onChange={handleChange}
                                    value={contactData.userMessage}
                                    className="contact-us-question form-control input"
                                    type="text"
                                    required
                                    name="userMessage"
                                    placeholder="Your Question or Suggestion..."
                                />
                                {condition ? <p style={{ color: "green" }}>Your message or suggestion is submitted.</p> : null}
                                <div className="contact-us-button">
                                    <button className=" btn btn-primary" type="submit">
                                        SEND MESSAGE
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="footer">
                        <i className="far fa-envelope fa-2x"></i>
                        <p className="email">quick-querysupport@gmail.com</p>
                    </div>
                </div>
            </div>
            {/* </div> */}
        </section>
    );
}
export default Contact;
