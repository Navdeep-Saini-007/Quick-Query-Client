import React from "react";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import CommentIcon from '@material-ui/icons/Comment';
function PreviousPosts(props) {
    return (
        <div className="previous-questions div-border">
            {/* <div className="user-details">
                <img
                    className="user-profile"
                    src="images/Sign-up-logo.png"
                    alt="profile-in-div"
                />
                <span className="user-name post-given-by">{props.userName}</span>
            </div> */}
            <div>
                <h4 style={{ fontWeight: "normal", fontSize: "1.2rem", lineHeight: "1.3" }}>{props.post}</h4>
            </div>
            <div className="details">
                <div style={{ display: "flex", justifyContent: "space-between", width: "10rem" }}>
                    <button className="button-style" style={{ color: "#8E8E8E" }}><ThumbUpIcon /></button>
                    <button className="button-style" style={{ color: "#8E8E8E" }}> <ThumbDownIcon /></button>
                    <button className="button-style" style={{ color: "#8E8E8E" }}><CommentIcon /></button>
                </div>
                <div>
                    Posted by {props.userName} on {props.timePosted}
                </div>
            </div>
        </div>
    );
}
export default PreviousPosts;
