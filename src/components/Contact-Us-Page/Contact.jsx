import React, { useState } from "react";
import "./Contact.css";
import ContactSvg from "./ContactSvg";
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
                userName: sessionStorage.getItem("name"),
                userEmail: sessionStorage.getItem("email")
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
                        <p className="subheading">
                            Have some questions? Feel free to contact us.
                        </p>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="contact-image">
                                <ContactSvg />
                            </div>
                        </div>
                        <div className=" col-lg-6 right-div">
                            <div className="div-border wrapper-contact">
                                <form onSubmit={submit}>
                                    <input
                                        onChange={handleChange}
                                        defaultValue={sessionStorage.getItem("email")}
                                        className="form-control input"
                                        type="email"
                                        name="userEmail"
                                        placeholder="Email"
                                    />
                                    <input
                                        onChange={handleChange}
                                        defaultValue={sessionStorage.getItem("name")}
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
                                        placeholder="Your Suggestions..."
                                    />
                                    {condition ? <p style={{ color: "green" }}>Thanks for your suggestions!</p> : null}
                                    <div className="contact-us-button">
                                        <button className=" btn btn-primary" type="submit">
                                            SEND MESSAGE
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default Contact;
