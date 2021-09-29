import React, { useState, useEffect } from "react";
import PreviousQuestions from "./PreviousQuestions.jsx";
import "./Home.css";

function Home(props) {
    const [homeData, setHomeData] = useState({ questions: "", user: "", userId: "", branch: "" });

    const [serverData, setServerdata] = useState([]);

    const [branch, setBranch] = useState("");

    const [questionSubmitted, setQuestionsubmitted] = useState(false);

    const [branchOptions, setBranchoptions] = useState({ all: true, general: false, cse: false, me: false, ece: false, ele: false, bca: false, mca: false, bba: false, mba: false });

    function checkSubmitted(isSubmitted) {
        setQuestionsubmitted(true);
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setHomeData((prevValue) => {
            return {
                ...prevValue,
                [name]: value,
                user: sessionStorage.getItem("name"),
                userId: sessionStorage.getItem("id")
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
        fetch("http://localhost:2900/homeOptions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ branch: branch }),
        })
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
    }, [questionSubmitted, branch]);

    function defaultFunction() {
        setBranchoptions((prevValue) => {
            return {
                ...prevValue,
                all: true,
                general: false,
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
        setBranch("");
        setQuestionsubmitted(true);
    }
    function General() {
        setBranchoptions((prevValue) => {
            return {
                ...prevValue,
                all: false,
                general: true,
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
        setBranch("General");
        setQuestionsubmitted(true);
    }
    function CSE() {
        setBranchoptions((prevValue) => {
            return {
                ...prevValue,
                all: false,
                general: false,
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
        setBranch("CSE/IT");
        setQuestionsubmitted(true);
    }
    function ME() {
        setBranchoptions((prevValue) => {
            return {
                ...prevValue,
                all: false,
                general: false,
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
        setBranch("ME");
        setQuestionsubmitted(true);
    }
    function ECE() {
        setBranchoptions((prevValue) => {
            return {
                ...prevValue,
                all: false,
                general: false,
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
        setBranch("ECE");
        setQuestionsubmitted(true);
    }
    function ELE() {
        setBranchoptions((prevValue) => {
            return {
                ...prevValue,
                all: false,
                general: false,
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
        setBranch("ELE");
        setQuestionsubmitted(true);
    }
    function BCA() {
        setBranchoptions((prevValue) => {
            return {
                ...prevValue,
                all: false,
                general: false,
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
        setBranch("BCA");
        setQuestionsubmitted(true);
    }
    function MCA() {
        setBranchoptions((prevValue) => {
            return {
                ...prevValue,
                all: false,
                general: false,
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
        setBranch("MCA");
        setQuestionsubmitted(true);
    }
    function BBA() {
        setBranchoptions((prevValue) => {
            return {
                ...prevValue,
                all: false,
                general: false,
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
        setBranch("BBA");
        setQuestionsubmitted(true);
    }
    function MBA() {
        setBranchoptions((prevValue) => {
            return {
                ...prevValue,
                all: false,
                general: false,
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
        setBranch("MBA");
        setQuestionsubmitted(true);
    }

    return (
        <section id="home">
            <div className="container-fluid">
                <div className="home-page-wrapper">
                    <div style={{ textAlign: "center" }}>
                        <p style={{ marginBottom: "2rem", fontSize: "1.5rem", color: "#8E8E8E" }}>Select your branch for getting specific branch questions.</p>
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
                                onClick={General}
                                style={branchOptions.general ? {
                                    color: "#007bff",
                                    borderBottom: "2px solid #007bff"
                                } : null}
                            >General</button>
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
                        <hr className="branch-options-line" />
                    </div>
                    <div className="user-space">
                        <div className="user-details">
                            <img
                                className="user-profile"
                                src="images/Sign-up-logo.png"
                                alt="profile-in-div"
                            />
                            <span className="user-name">{sessionStorage.getItem("name")}</span>
                        </div>
                        <form onSubmit={submit}>
                            <div className="enter-question">
                                <textarea
                                    onChange={handleChange}
                                    value={homeData.questions}
                                    required
                                    name="questions"
                                    className="question-input top-input"
                                    type="text"
                                    placeholder="Ask a question..."
                                />
                                <select name="branch" required className="branch-select btn select-input" onChange={handleChange} value={homeData.branch}>
                                    <option value="">Branch</option>
                                    <option value="General">General</option>
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
                            timeAsked={serverData.timeAsked}
                            branch={serverData.branch}
                            answerSubmitted={checkSubmitted}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
export default Home;
