import React from "react";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
function ProfileAnswers(props) {
  return (
    <div id="answer">
      <hr />
      <h4>{props.answer}</h4>
      <div className="details">
        <div className="ui-icons-profile">
          <button className="button-style button-color">
            <ThumbUpIcon />  {props.likes}
          </button>
          <button className="button-style button-color">
            <ThumbDownIcon /> {props.dislikes}
          </button>
        </div>
        <div>
          Answered by {props.userAnswered} on {props.timeAnswered}
        </div>
      </div>
    </div>
  )
}
export default ProfileAnswers;