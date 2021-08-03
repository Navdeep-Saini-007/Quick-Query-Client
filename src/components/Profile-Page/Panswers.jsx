import React from "react";
function Panswers(props) {
    return (
        <div className="answer">
            <br />
            <h5>{props.answer}</h5>
            <span className="details">
                answered by: {props.userAnswered} on {props.timeAnswered}
            </span>
        </div>
    )
}
export default Panswers;