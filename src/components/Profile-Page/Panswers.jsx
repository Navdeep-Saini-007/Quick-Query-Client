import React from "react";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
function Panswers(props) {
    return (
        <div className="answer">
            <hr />
            <br />
            <h4 className="final-answer">{props.answer}</h4>
            {/* {previousAnswerspage.upvoteHook}
      <button
        name="upvoteHook"
        value={previousAnswerspage.upvoteHook}
        onClick={upVote}
      >
        +
      </button>
      {previousAnswerspage.downvoteHook}
      <button
        name="downvoteHook"
        value={previousAnswerspage.downvoteHook}
        onClick={downVote}
      >
        -
      </button> */}
            <div className="details">
                <div className="ui-icons-questions">
                    <ThumbUpIcon />
                    <ThumbDownIcon />
                    {/* <CommentIcon /> */}
                </div>
                <div>
                    Answered by {props.userAnswered} on {props.timeAnswered}
                </div>
            </div>
            {/* <form onSubmit={submit}>
        <button
          value={previousAnswerspage.upvoteHook}
          name="upvoteHook"
          onClick={upVote()}
        >
          +
        </button>
        {props.likes}
        <button
          value={previousAnswerspage.downvoteHook}
          name="downvoteHook"
          onClick={downVote()}
        >
          -
        </button>
        {props.dislikes}
      </form> */}
        </div>
    )
}
export default Panswers;