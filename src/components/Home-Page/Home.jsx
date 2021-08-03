import React, { useState, useEffect } from "react";
import PreviousQuestions from "./PreviousQuestions.jsx";
import "./Home.css";

function Home(props) {
    const [homeData, setHomeData] = useState({ questions: "", user: "", userId: "" });

    const [serverData, setServerdata] = useState([]);

    const [questionSubmitted, setQuestionsubmitted] = useState(false);

    // console.log(props.user);

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
                userId: props.user._id
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
                setHomeData({ questions: "", user: "", userId: "" });
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

    return (
        <section id="home">
            <div className="container-fluid">
                <div className="home-page-wrapper">
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
                            <div className="form-group">
                                <textarea
                                    onChange={handleChange}
                                    value={homeData.questions}
                                    required
                                    name="questions"
                                    className="question-input form-control"
                                    type="text"
                                    placeholder="Ask a question..."
                                />
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
