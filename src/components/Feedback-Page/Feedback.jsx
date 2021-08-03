import React from "react";
import "./Feedback.css";
function Feedback() {
    return (
        <section>
            <div>
                <div className=" container feedback-form">
                    <div className="feedback-image">
                        <img src="images/bg1.jpg" alt="feedback-img" />
                    </div>
                    <form method="POST">
                        <h3>Drop Us a Feedback</h3>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Your Name" required="required" />
                                </div>
                                <div className="form-group">
                                    <input type="number" className="form-control" placeholder="Phone Number" required="required" />
                                </div>
                                <div className="form-group">
                                    <p>Did you get your answer?</p>
                                    Yes <input type="radio" name="1" />
                                    <br />
                                    No <input type="radio" name="1" />
                                </div>
                                <textarea name="txtMsg" className="form-control" placeholder="Your message or suggestion"
                                    style={{ width: "450px", height: "150px", marginTop: "10px" }}>
                                </textarea>
                                <div className="form-group">
                                    <input type="submit" name="btnsubmit" className="btnfeedback" value="Send Feedback"
                                        style={{ outline: "none" }} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <input type="text" name="TxtEmail" className="form-control" placeholder="Your Email"
                                        required="required" />
                                    <p>Are you satisfied with our website?</p>
                                    Yes <input type="radio" name="2" /><br />
                                    No <input type="radio" name="2" />
                                </div>
                                <div className="form-group-two">
                                    <p>How much do you rate us out of 10</p>
                                    <input type="radio" name="3" />
                                    <input type="radio" name="3" />
                                    <input type="radio" name="3" />
                                    <input type="radio" name="3" />
                                    <input type="radio" name="3" />
                                    <input type="radio" name="3" />
                                    <input type="radio" name="3" />
                                    <input type="radio" name="3" />
                                    <input type="radio" name="3" />
                                    <input type="radio" name="3" />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}
export default Feedback;