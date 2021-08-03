import React from "react";
function PreviousPosts(props) {
    return (
        <div className="previous-questions div-border">
            <div className="user-details">
                <img
                    className="user-profile"
                    src="images/Sign-up-logo.png"
                    alt="profile-in-div"
                />
                <span className="user-name post-given-by">{props.userName}</span>
            </div>
            <div>
                <h4 className="post">{props.post}</h4>
            </div>
            <span style={{ color: "#8E8E8E" }}>posted on {props.timePosted}</span>
        </div>
    );
}
export default PreviousPosts;
