import React from "react";
import ProfileAnswers from "./ProfileAnswers";
function ProfileQuestions(props) {
    return (
        <div className="previous-questions">
            <div>
                <h4>{props.question}</h4>
                <div className="details">
                    <div className="category">
                        Category : {props.branch}
                    </div>
                    <div>
                        Asked by {props.userName} on {props.timeAsked}
                    </div>
                </div>
                {props.answer.map((answer, index) => (
                    <ProfileAnswers
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
    )
}
export default ProfileQuestions;