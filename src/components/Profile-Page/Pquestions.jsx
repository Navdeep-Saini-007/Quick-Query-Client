import React from "react";
import Panswers from "./Panswers";
function Pquestions(props) {
    return (
        <div className="previous-questions div-border">
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
                        <Panswers
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
    )
}
export default Pquestions;