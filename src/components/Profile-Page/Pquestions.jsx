import React from "react";
import Panswers from "./Panswers";
function Pquestions(props) {
    return (
        <div className="previous-questions">
            {/* <div className="user-details"> */}
            {/* <img
                    className="user-profile"
                    src="images/Sign-up-logo.png"
                    alt="profile-in-div"
                /> */}
            {/* <div className="user-name"><span style={{ borderBottom: "1px solid #8E8E8E" }}>{props.userName} asked on {props.timeAsked}</span></div> */}
            {/* </div> */}
            <h4>{props.question}</h4>
            {/* <div><CreateIcon /></div> */}
            {/* <div className="details">Asked by {props.userName} on {props.timeAsked}</div> */}
            <div className="details">
                {/* <button className="button-style" style={{ color: "#8E8E8E" }} >
                    <CreateIcon />  Answer Now
                </button> */}
                <div>
                    Asked by {props.userName} on {props.timeAsked}
                </div>
            </div>
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
    )
}
export default Pquestions;