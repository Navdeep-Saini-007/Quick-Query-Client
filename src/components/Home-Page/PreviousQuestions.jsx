import React, { useState } from "react";
import PreviousAnswers from "./PreviousAnswers";
import CreateIcon from '@material-ui/icons/Create';

function PreviousQuestions(props) {
    const [previousquestionsPage, setPreviousquestionspage] = useState({
        serverQuestionid: null,
        answers: "",
        userAnswered: "",
    });

    const [inputAnimation, setInputanimation] = useState({
        count: 0,
        condition: false
    });

    const [isSubmitted, setIssubmitted] = useState(false);

    function handleAnimation(event) {
        setInputanimation((prevValue) => {
            return {
                ...prevValue,
                count: inputAnimation.count + 1
            }
        })
        if (inputAnimation.count % 2 === 0) {
            setInputanimation((prevValue) => {
                return {
                    ...prevValue,
                    condition: true
                }
            })
        } else {
            setInputanimation((prevValue) => {
                return {
                    ...prevValue,
                    condition: false
                }
            })
        }
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setPreviousquestionspage((prevValue) => {
            return {
                ...prevValue,
                [name]: value,
                serverQuestionid: props.id,
                userAnswered: sessionStorage.getItem("name")
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
            <div>
                <h4>{props.question}</h4>
                <div className="details">
                    <div className="question-description">
                        <button className="button-style" style={{ color: "#8E8E8E" }} onClick={handleAnimation} >
                            <CreateIcon />  Answer Now
                        </button>
                        <div className="category">
                            Category : {props.branch}
                        </div>
                    </div>
                    <div>
                        Asked by {props.userName} on {props.timeAsked}
                    </div>
                </div>
                {inputAnimation.condition ?
                    <form className="answer-input" onSubmit={submit}>
                        <div className="enter-question">
                            <textarea
                                onChange={handleChange}
                                name="answers"
                                value={previousquestionsPage.answers}
                                className="question-input"
                                type="text"
                                placeholder="answer here..."
                            />
                            <button className="btn question-button btn-outline-primary">Submit</button>
                        </div>
                    </form>
                    : null}
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
            </div>
        </div>
    );
}
export default PreviousQuestions;
