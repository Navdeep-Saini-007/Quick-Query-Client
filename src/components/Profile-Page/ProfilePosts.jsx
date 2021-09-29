import React from "react";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
function ProfilePosts(props) {
    return (
        <div className="previous-questions div-border">
            <div>
                <h4 style={{ fontWeight: "normal", fontSize: "1.2rem", lineHeight: "1.3" }}>{props.post}</h4>
            </div>
            <div className="details">
                <div style={{ display: "flex", justifyContent: "space-between", width: "7rem" }}>
                    <button className="button-style button-color" >
                        <ThumbUpIcon />  {props.likes}
                    </button>
                    <button className="button-style button-color" >
                        <ThumbDownIcon />  {props.dislikes}
                    </button>
                </div>
                <div>
                    Posted by {props.userName} on {props.timePosted}
                </div>
            </div>
        </div>
    )
}
export default ProfilePosts;