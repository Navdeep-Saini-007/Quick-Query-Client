import React from "react";
function Comments(props) {
    return (
        <section id="comments">
            <div>
                <hr />
                <h5>{props.commentedBy}</h5>
                <div>{props.comment}</div>
            </div>
        </section>
    )
}
export default Comments;