import React, { useState } from "react";
import PreviousAnswers from "./PreviousAnswers";

function PreviousQuestions(props) {
    const [previousquestionsPage, setPreviousquestionspage] = useState({
        serverQuestionid: null,
        answers: "",
        userAnswered: "",
    });

    const [isSubmitted, setIssubmitted] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;
        setPreviousquestionspage((prevValue) => {
            return {
                ...prevValue,
                [name]: value,
                serverQuestionid: props.id,
                userAnswered: props.user.userName,
            };
        });
    }

    function submit(event) {
        console.log(previousquestionsPage);
        event.preventDefault();
        fetch("http://localhost:2900/home", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(previousquestionsPage),
        })
            .then((response) => {
                if (!response.ok) {
                    console.log("error");
                }
                return response.json();
            })
            .then((server) => {
                console.log(server);
                setIssubmitted(server.answerAdded);
                props.answerSubmitted(isSubmitted);
                setPreviousquestionspage({
                    serverQuestionid: null,
                    answers: "",
                    userAnswered: "",
                });
            });
    }

    return (
        <div className="previous-questions">
            <div className="user-details">
                <img
                    className="user-profile"
                    src="images/Sign-up-logo.png"
                    alt="profile-in-div"
                />
                <span className="user-name">{props.userName}</span>
            </div>
            <div>
                <h4>{props.question}</h4>
                <span className="details">asked on {props.timeAsked}</span>
                <div>
                    {props.answer.map((answer, index) => (
                        <PreviousAnswers
                            key={index}
                            id={answer._id}
                            answer={answer.answerByuser}
                            userAnswered={answer.userAnswered}
                            timeAnswered={answer.timeAnswered}
                            likes={answer.upVotes}
                            dislikes={answer.downVotes}
                        />
                    ))}
                </div>
                <form className="answer-input" onSubmit={submit}>
                    <textarea
                        onChange={handleChange}
                        name="answers"
                        value={previousquestionsPage.answers}
                        className="form-control question-input"
                        type="text"
                        placeholder="answer here..."
                    />
                    <button className="btn question-button btn-outline-primary">Submit</button>
                </form>
            </div>
        </div>
    );
}
export default PreviousQuestions;
