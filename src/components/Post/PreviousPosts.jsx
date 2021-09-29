import React, { useState, useEffect } from "react";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import CommentIcon from '@material-ui/icons/Comment';
import Comments from "./Comments.jsx";
function PreviousPosts(props) {

    const [postPage, setPostpage] = useState({ postId: null, upVotes: props.likes, downVotes: props.dislikes });

    const [count, setCount] = useState({ upCount: 0, downCount: 0, commentCount: 0, condition: false });

    const [already, setAlready] = useState({ likes: false, dislikes: false });

    const [isSubmitted, setIssubmitted] = useState(false);

    const [previousPosts, setPreviousposts] = useState({ postId: null, comment: "", commentedBy: "" });

    const [commentArray, setCommentarray] = useState([]);

    useEffect(() => {
        fetch("http://localhost:2900/comment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ postId: props.id }),
        })
            .then((response) => {
                if (!response.ok) {
                    console.log("error");
                }
                return response.json();
            })
            .then((server) => {
                console.log(server);
                setCommentarray(server.process[0].comments);
            });
    }, [count.condition, props.id, isSubmitted]);

    function handleComment() {
        setCount((prevValue) => {
            return {
                ...prevValue,
                commentCount: count.commentCount + 1
            }
        })
        if (count.commentCount % 2 === 0) {
            setCount((prevValue) => {
                return {
                    ...prevValue,
                    condition: true
                }
            })
        } else {
            setCount((prevValue) => {
                return {
                    ...prevValue,
                    condition: false
                }
            })
        }
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setPreviousposts((prevValue) => {
            return {
                ...prevValue,
                [name]: value,
                postId: props.id,
                // commentedBy: props.currentUser
                commentedBy: sessionStorage.getItem("name")
            };
        });
    }

    function submit(event) {
        console.log(previousPosts);
        event.preventDefault();
        fetch("http://localhost:2900/comment", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(previousPosts),
        })
            .then((response) => {
                if (!response.ok) {
                    console.log("error");
                }
                return response.json();
            })
            .then((server) => {
                console.log(server);
                setPreviousposts({ postId: null, comment: "", commentedBy: "" });
                setIssubmitted(true);
            });
    }

    function handleLikes() {
        setCount((prevValue) => {
            return {
                ...prevValue,
                upCount: count.upCount + 1
            }
        })
        if (already.dislikes && count.upCount % 2 === 0) {
            setAlready((prevValue) => {
                return {
                    ...prevValue,
                    dislikes: false
                }
            });
            setCount((prevValue) => {
                return {
                    ...prevValue,
                    upCount: 1,
                    downCount: 0
                }
            })
            setPostpage((prevValue) => {
                return {
                    ...prevValue,
                    upVotes: postPage.upVotes + 1,
                    downVotes: postPage.downVotes - 1,
                    postId: props.id
                }
            })

        } else if (count.upCount % 2 === 0) {
            setAlready((prevValue) => {
                return {
                    ...prevValue,
                    likes: true
                }
            });
            setPostpage((prevValue) => {
                return {
                    ...prevValue,
                    upVotes: postPage.upVotes + 1,
                    postId: props.id
                }
            })

        } else {
            setAlready((prevValue) => {
                return {
                    ...prevValue,
                    likes: false
                }
            });
            setPostpage((prevValue) => {
                return {
                    ...prevValue,
                    upVotes: postPage.upVotes - 1,
                    postId: props.id
                }
            })
        }
    }

    function handleDislikes() {
        setCount((prevValue) => {
            return {
                ...prevValue,
                downCount: count.downCount + 1
            }
        })
        if (already.likes && count.downCount % 2 === 0) {
            setAlready((prevValue) => {
                return {
                    ...prevValue,
                    likes: false
                }
            })
            setCount((prevValue) => {
                return {
                    ...prevValue,
                    upCount: 0,
                    downCount: 1
                }
            })
            setPostpage((prevValue) => {
                return {
                    ...prevValue,
                    downVotes: postPage.downVotes + 1,
                    upVotes: postPage.upVotes - 1,
                    postId: props.id
                }
            })
        } else if (count.downCount % 2 === 0) {
            setAlready((prevValue) => {
                return {
                    ...prevValue,
                    dislikes: true
                }
            })
            setPostpage((prevValue) => {
                return {
                    ...prevValue,
                    downVotes: postPage.downVotes + 1,
                    postId: props.id
                }
            })
        } else {
            setAlready((prevValue) => {
                return {
                    ...prevValue,
                    dislikes: false
                }
            })
            setPostpage((prevValue) => {
                return {
                    ...prevValue,
                    downVotes: postPage.downVotes - 1,
                    postId: props.id
                }
            })
        }
    }

    useEffect(() => {
        console.log(postPage);
        fetch("http://localhost:2900/post", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postPage),
        })
            .then((response) => {
                if (!response.ok) {
                    console.log("error");
                }
                return response.json();
            })
            .then((serverResponse) => {
                console.log(serverResponse);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [postPage, postPage.postId, postPage.upVotes, postPage.downVotes]);

    return (
        <div className="previous-questions div-border">
            <div>
                <h4 style={{ fontWeight: "normal", fontSize: "1.2rem", lineHeight: "1.3" }}>{props.post}</h4>
            </div>
            <div className="details">
                <div style={{ display: "flex", justifyContent: "space-between", width: "10rem" }}>
                    <button className="button-style button-color" style={already.likes ? { color: "#007bff" } : null} onClick={handleLikes}>
                        <ThumbUpIcon />  {postPage.upVotes}
                    </button>
                    <button className="button-style button-color" style={already.dislikes ? { color: "#007bff" } : null} onClick={handleDislikes}>
                        <ThumbDownIcon />  {postPage.downVotes}
                    </button>
                    <button className="button-style button-color" style={count.condition ? { color: "#007bff" } : null} onClick={handleComment}>
                        <CommentIcon />  {commentArray.length}
                    </button>
                </div>
                <div>
                    Posted by {props.userName} on {props.timePosted}
                </div>
            </div>
            {count.condition ?
                <form className="answer-input" onSubmit={submit}>
                    <div className="enter-question">
                        <textarea
                            onChange={handleChange}
                            value={previousPosts.comment}
                            name="comment"
                            className="question-input"
                            type="text"
                            placeholder="Add a Comment..."
                        />
                        <button className="btn question-button btn-outline-primary">Submit</button>
                    </div>
                </form>
                : null}
            {count.condition ?
                commentArray.map((commentArray, index) => (
                    <Comments
                        key={index}
                        id={commentArray._id}
                        comment={commentArray.comment}
                        commentedBy={commentArray.commentedBy}
                    />
                ))
                : null}
        </div>
    );
}
export default PreviousPosts;
