import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
import ProfileQuestions from "./ProfileQuestions";
import ProfilePosts from "./ProfilePosts";

function Profile(props) {

    const [completeInfo, setCompleteinfo] = useState({ questions: 0, answers: 0, posts: 0 });

    const [questionField, setQuestionfield] = useState([]);

    const [answerField, setAnswerfield] = useState([]);

    const [postField, setPostfield] = useState([]);

    const [profilePage, setProfilepage] = useState({ profileOption: true, questionOption: false, answerOption: false, postOption: false });

    let currentUser = sessionStorage.getItem("name");

    useEffect(() => {
        fetch("http://localhost:2900/completeInfo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ profilePage: currentUser })
        })
            .then((response) => {
                if (!response.ok) {
                    console.log("error");
                }
                return response.json();
            })
            .then((serverResponse) => {
                console.log(serverResponse);
                setCompleteinfo({ questions: serverResponse.questions, answers: serverResponse.answers, posts: serverResponse.posts });
            })
            .catch((err) => {
                console.log(err);
            })
    }, [currentUser])

    function defaultFunction() {
        setProfilepage((prevValue) => {
            return {
                ...prevValue,
                profileOption: true,
                questionOption: false,
                answerOption: false,
                postOption: false
            }
        })
    }

    function questionInfo() {
        setProfilepage((prevValue) => {
            return {
                ...prevValue,
                profileOption: false,
                questionOption: true,
                answerOption: false,
                postOption: false
            }
        })
        fetch("http://localhost:2900/questionInfo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ profilePage: currentUser })
        })
            .then((response) => {
                if (!response.ok) {
                    console.log("error");
                }
                return response.json();
            })
            .then((serverResponse) => {
                console.log(serverResponse);
                setQuestionfield(serverResponse.questionInfo);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function answerInfo() {
        setProfilepage((prevValue) => {
            return {
                ...prevValue,
                profileOption: false,
                questionOption: false,
                answerOption: true,
                postOption: false
            }
        })
        fetch("http://localhost:2900/answerInfo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ profilePage: currentUser })
        })
            .then((response) => {
                if (!response.ok) {
                    console.log("error");
                }
                return response.json();
            })
            .then((serverResponse) => {
                console.log(serverResponse);
                setAnswerfield(serverResponse.answerInfo);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function postInfo() {
        setProfilepage((prevValue) => {
            return {
                ...prevValue,
                profileOption: false,
                questionOption: false,
                answerOption: false,
                postOption: true
            }
        })
        fetch("http://localhost:2900/postInfo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ profilePage: currentUser })
        })
            .then((response) => {
                if (!response.ok) {
                    console.log("error");
                }
                return response.json();
            })
            .then((serverResponse) => {
                console.log(serverResponse);
                setPostfield(serverResponse.postInfo);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <section id="Profile">
            <div className="container-fluid">
                <div className="profile-page-wrapper">
                    <div className="row top-div">
                        <div className="col-lg-6 col-md-6 profile-img-div">
                            <img
                                className="profile-page-img"
                                src="images/sign-up-logo.png"
                                alt="profile"
                            />
                        </div>
                        <div className="col-lg-6 col-md-6 user-info-div">
                            <div className="email-and-editProfile">
                                <h1>{sessionStorage.getItem("name")}</h1>
                                <Link to="/editProfile"><h2 className="edit-profile">Edit Profile</h2></Link>
                            </div>
                            <div className="core-info">
                                <h5>{completeInfo.questions} Questions</h5>
                                <h5>{completeInfo.answers} Answers</h5>
                                <h5>{completeInfo.posts} Posts</h5>
                            </div>
                            <div>
                                <h5>{sessionStorage.getItem("email")}</h5>
                            </div>
                        </div>
                    </div>
                    <div className="bottom-container">
                        <hr className="profilePage" />
                        <div className="options-div">
                            <button className="button-style-profile"
                                style={profilePage.profileOption ? {
                                    color: "#007bff",
                                    borderBottom: "2px solid #007bff"
                                } : null}
                                onClick={defaultFunction}>Profile</button>
                            <button className="button-style-profile"
                                style={profilePage.questionOption ? {
                                    color: "#007bff",
                                    borderBottom: "2px solid #007bff"
                                } : null}
                                onClick={questionInfo}>Questions</button>
                            <button className="button-style-profile"
                                style={profilePage.answerOption ? {
                                    color: "#007bff",
                                    borderBottom: "2px solid #007bff"
                                } : null}
                                onClick={answerInfo}>Answers</button>
                            <button className="button-style-profile"
                                style={profilePage.postOption ? {
                                    color: "#007bff",
                                    borderBottom: "2px solid #007bff"
                                } : null}
                                onClick={postInfo}>Posts</button>
                        </div>
                        <hr className="profilePage" />
                        <div>
                            {profilePage.profileOption ? <h4 className="your-profile">Your Profile</h4> : null}
                        </div>
                        <div>
                            {profilePage.questionOption ? <>{
                                questionField.map((questionField, index) => (
                                    <ProfileQuestions
                                        key={index}
                                        id={questionField._id}
                                        userName={questionField.userName}
                                        question={questionField.questions}
                                        answer={questionField.answers}
                                        timeAsked={questionField.timeAsked}
                                        branch={questionField.branch}
                                    />

                                ))
                            }</> : null}
                        </div>
                        <div>
                            {profilePage.answerOption ? <>{
                                answerField.map((answerField, index) => (
                                    <ProfileQuestions
                                        key={index}
                                        id={answerField._id}
                                        userName={answerField.userName}
                                        question={answerField.questions}
                                        answer={answerField.answers}
                                        timeAsked={answerField.timeAsked}
                                        branch={answerField.branch}
                                    />

                                ))
                            }</> : null}
                        </div>
                        <div>
                            {profilePage.postOption ? <>{postField.map((postField, index) => (
                                <ProfilePosts
                                    key={index}
                                    id={postField._id}
                                    post={postField.post}
                                    userName={postField.user}
                                    timePosted={postField.timePosted}
                                    likes={postField.upVotes}
                                    dislikes={postField.downVotes}
                                />
                            ))}</> : null}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default Profile;
