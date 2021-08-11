import React, { useState, useEffect } from "react";
import PreviousQuestions from "./PreviousQuestions.jsx";
import "./Home.css";

function Home(props) {
    const [homeData, setHomeData] = useState({ questions: "", user: "", userId: "", branch: "" });

    const [serverData, setServerdata] = useState([]);

    const [questionSubmitted, setQuestionsubmitted] = useState(false);

    const [branchOptions, setBranchoptions] = useState({ all: true, cse: false, me: false, ece: false, ele: false, bca: false, mca: false, bba: false, mba: false });

    // console.log(props.user);

    function popUp() {
        console.log("I got clicked.");
    }

    function checkSubmitted(isSubmitted) {
        setQuestionsubmitted(true);
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setHomeData((prevValue) => {
            return {
                ...prevValue,
                [name]: value,
                user: props.user.userName,
                userId: props.user._id,
            };
        });
    }

    function submit(event) {
        console.log(homeData);
        event.preventDefault();
        fetch("http://localhost:2900/home", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(homeData),
        })
            .then((response) => {
                if (!response.ok) {
                    console.log("error");
                }
                return response.json();
            })
            .then((result) => {
                console.log(result);
                setQuestionsubmitted(true);
                setHomeData({ questions: "", user: "", userId: "", branch: "" });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        fetch("http://localhost:2900/home")
            .then((response) => {
                if (!response.ok) {
                    console.log("error");
                }
                return response.json();
            })
            .then((data) => {
                setServerdata(data.process);
                setQuestionsubmitted(false);
                console.log(data);
            });
    }, [questionSubmitted]);

    function defaultFunction() {
        setBranchoptions((prevValue) => {
            return {
                ...prevValue,
                all: true,
                cse: false,
                me: false,
                ece: false,
                ele: false,
                bca: false,
                mca: false,
                bba: false,
                mba: false
            }
        })
        // fetch("http://localhost:2900/home")
        //     .then((response) => {
        //         if (!response.ok) {
        //             console.log("error");
        //         }
        //         return response.json();
        //     })
        //     .then((data) => {
        //         setServerdata(data.process);
        //         setQuestionsubmitted(false);
        //         console.log(data);
        //     });
    }
    function CSE() {
        setBranchoptions((prevValue) => {
            return {
                ...prevValue,
                all: false,
                cse: true,
                me: false,
                ece: false,
                ele: false,
                bca: false,
                mca: false,
                bba: false,
                mba: false
            }
        })
        // fetch("http://localhost:2900/homeOptions", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({ branch: "CSE/IT" }),
        // })
        //     .then((response) => {
        //         if (!response.ok) {
        //             console.log("error");
        //         }
        //         return response.json();
        //     })
        //     .then((result) => {
        //         console.log(result);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
    }
    function ME() {
        setBranchoptions((prevValue) => {
            return {
                ...prevValue,
                all: false,
                cse: false,
                me: true,
                ece: false,
                ele: false,
                bca: false,
                mca: false,
                bba: false,
                mba: false
            }
        })
    }
    function ECE() {
        setBranchoptions((prevValue) => {
            return {
                ...prevValue,
                all: false,
                cse: false,
                me: false,
                ece: true,
                ele: false,
                bca: false,
                mca: false,
                bba: false,
                mba: false
            }
        })
    }
    function ELE() {
        setBranchoptions((prevValue) => {
            return {
                ...prevValue,
                all: false,
                cse: false,
                me: false,
                ece: false,
                ele: true,
                bca: false,
                mca: false,
                bba: false,
                mba: false
            }
        })
    }
    function BCA() {
        setBranchoptions((prevValue) => {
            return {
                ...prevValue,
                all: false,
                cse: false,
                me: false,
                ece: false,
                ele: false,
                bca: true,
                mca: false,
                bba: false,
                mba: false
            }
        })
    }
    function MCA() {
        setBranchoptions((prevValue) => {
            return {
                ...prevValue,
                all: false,
                cse: false,
                me: false,
                ece: false,
                ele: false,
                bca: false,
                mca: true,
                bba: false,
                mba: false
            }
        })
    }
    function BBA() {
        setBranchoptions((prevValue) => {
            return {
                ...prevValue,
                all: false,
                cse: false,
                me: false,
                ece: false,
                ele: false,
                bca: false,
                mca: false,
                bba: true,
                mba: false
            }
        })
    }
    function MBA() {
        setBranchoptions((prevValue) => {
            return {
                ...prevValue,
                all: false,
                cse: false,
                me: false,
                ece: false,
                ele: false,
                bca: false,
                mca: false,
                bba: false,
                mba: true
            }
        })
    }

    return (
        <section id="home">
            <div className="container-fluid">
                <div className="home-page-wrapper">
                    <div style={{ textAlign: "center" }}>
                        <h1 style={{ marginBottom: "1rem" }}>Question/Answer Section</h1>
                        <p style={{ marginBottom: "2rem", fontSize: "1.5rem", color: "#8E8E8E" }}>Select your branch for better results.</p>
                    </div>
                    <div>
                        <div className="branch">
                            <button className="branch-button"
                                onClick={defaultFunction}
                                style={branchOptions.all ? {
                                    color: "#007bff",
                                    borderBottom: "2px solid #007bff"
                                } : null}
                            >All</button>
                            <button className="branch-button"
                                onClick={CSE}
                                style={branchOptions.cse ? {
                                    color: "#007bff",
                                    borderBottom: "2px solid #007bff"
                                } : null}
                            >CSE/IT</button>
                            <button className="branch-button"
                                onClick={ME}
                                style={branchOptions.me ? {
                                    color: "#007bff",
                                    borderBottom: "2px solid #007bff"
                                } : null}
                            >ME</button>
                            <button className="branch-button"
                                onClick={ECE}
                                style={branchOptions.ece ? {
                                    color: "#007bff",
                                    borderBottom: "2px solid #007bff"
                                } : null}
                            >ECE</button>
                            <button className="branch-button"
                                onClick={ELE}
                                style={branchOptions.ele ? {
                                    color: "#007bff",
                                    borderBottom: "2px solid #007bff"
                                } : null}
                            >ELE</button>
                            <button className="branch-button"
                                onClick={BCA}
                                style={branchOptions.bca ? {
                                    color: "#007bff",
                                    borderBottom: "2px solid #007bff"
                                } : null}
                            >BCA</button>
                            <button className="branch-button"
                                onClick={MCA}
                                style={branchOptions.mca ? {
                                    color: "#007bff",
                                    borderBottom: "2px solid #007bff"
                                } : null}
                            >MCA</button>
                            <button className="branch-button"
                                onClick={BBA}
                                style={branchOptions.bba ? {
                                    color: "#007bff",
                                    borderBottom: "2px solid #007bff"
                                } : null}
                            >BBA</button>
                            <button className="branch-button"
                                onClick={MBA}
                                style={branchOptions.mba ? {
                                    color: "#007bff",
                                    borderBottom: "2px solid #007bff"
                                } : null}
                            >MBA</button>
                        </div>
                        <hr />
                    </div>
                    <div className="user-space">
                        <div className="user-details">
                            <img
                                className="user-profile"
                                src="images/Sign-up-logo.png"
                                alt="profile-in-div"
                            />
                            <span className="user-name">{props.user.userName}</span>
                        </div>
                        <form onSubmit={submit}>
                            <div className="enter-question">
                                <textarea
                                    onClick={popUp}
                                    onChange={handleChange}
                                    value={homeData.questions}
                                    required
                                    name="questions"
                                    className="question-input top-input"
                                    type="text"
                                    placeholder="Ask a question..."
                                />
                                <select name="branch" className="branch-select btn btn-outline-primary" onChange={handleChange} value={homeData.brach}>
                                    <option value="all">Branch</option>
                                    <option value="CSE/IT">CSE/IT</option>
                                    <option value="ME">ME</option>
                                    <option value="ECE">ECE</option>
                                    <option value="ELE">ELE</option>
                                    <option value="BCA">BCA</option>
                                    <option value="MCA">MCA</option>
                                    <option value="BBA">BBA</option>
                                    <option value="MBA">MBA</option>
                                </select>
                                <button
                                    type="submit"
                                    className="question-button btn btn-outline-primary"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                    {serverData.map((serverData, index) => (
                        <PreviousQuestions
                            key={index}
                            id={serverData._id}
                            userName={serverData.userName}
                            question={serverData.questions}
                            answer={serverData.answers}
                            user={props.user}
                            timeAsked={serverData.timeAsked}
                            answerSubmitted={checkSubmitted}
                        // answer={serverData.answers.map((answers,index)=>(
                        //   <div className="answer">
                        //     {/* key={index}
                        //     id={index} */}
                        //     {answers.answerByuser}
                        //   </div>
                        // ))}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
export default Home;
