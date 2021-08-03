import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
import Pquestions from "./Pquestions";
import PreviousPosts from "../Post/PreviousPosts";

function Profile(props) {

    const [completeInfo, setCompleteinfo] = useState({ questions: null, answers: null, posts: null });

    const [questionField, setQuestionfield] = useState([]);

    const [answerField, setAnswerfield] = useState([]);

    const [postField, setPostfield] = useState([]);

    const [profilePage, setProfilepage] = useState({ profileOption: true, questionOption: false, answerOption: false, postOption: false });

    let currentUser = props.user.userName;

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

    console.log(questionField);
    console.log(answerField);
    console.log(postField);

    return (
        // <section className="bg-light">
        //     <div className="container-fluid">
        //         <div className="col-lg-6 col-md-6  offset-lg-3 offset-md-3 bg-white shadow my-5 border border-primary">
        //             <div className="editProfileForm">
        //                 <div className="icon">
        //                     <i className="fas fa-user-circle fa-5x"></i><br />
        //                 </div>
        //                 <h2 className="h2 text-center text-dark ">Profile</h2>
        //                 <div className="form-group">
        //                     <label for="userFName"> First Name<span className="text-danger ml-1">*</span></label>
        //                     <input type="text" className="form-control" id="userFName" placeholder="First Name" />
        //                 </div>
        //                 <div className="form-group">
        //                     <label for="userLname">Last Name<span className="text-danger ml-1">*</span></label>
        //                     <input type="text" className="form-control" id="userLname" placeholder="Last Name" />
        //                 </div>
        //                 <div className="form-group">
        //                     <label for="userId">Email id<span className="text-danger ml-1">*</span></label>
        //                     <input type="text" className="form-control" placeholder="Email id" />
        //                 </div>
        //                 <div className="form-group">
        //                     <label for="userCourse">Course<span className="text-danger ml-1">*</span></label><br />
        //                     <select className="form-select" aria-label="Default select example">
        //                         <option selected>Course</option>
        //                         <option value="1">Btech</option>
        //                         <option value="2">BBA</option>
        //                         <option value="3">MBA</option>
        //                         <option value="4">BCA</option>
        //                     </select>
        //                 </div>
        //                 <div className="form-group">
        //                     <label for="userBatch">Batch<span className="text-danger ml-1">*</span></label><br />
        //                     <select className="form-select1" aria-label="Default select example">
        //                         <option selected>From</option>
        //                         <option value="1">2017</option>
        //                         <option value="2">2018</option>
        //                         <option value="3">2019</option>
        //                         <option value="4">2020</option>
        //                         <option value="5">2021</option>
        //                     </select>
        //                     <select className="form-select2" aria-label="Default select example">
        //                         <option selected>To</option>
        //                         <option value="1">2021</option>
        //                         <option value="2">2022</option>
        //                         <option value="3">2023</option>
        //                         <option value="4">2024</option>
        //                         <option value="5">2025</option>
        //                     </select>
        //                 </div>
        //                 <div className="form-group">
        //                     <label for="userBio">Biography<span className="text-danger ml-1">*</span></label>
        //                     <textarea className="form-control" id="userBio" rows="4"></textarea>
        //                 </div>
        //                 <div className="button">
        //                     <button type="button" className="btn btn-outline-primary btn-block text-uppercase ">Save</button>
        //                     <button type="button" className="btn btn-outline-secondary btn-block text-uppercase">Cancel</button>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </section>
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
                                <h1>{props.user.userName}</h1>
                                <Link to="/"><h2 className="edit-profile">Edit Profile</h2></Link>
                            </div>
                            <div className="core-info">
                                <h5>{completeInfo.questions} Questions</h5>
                                <h5>{completeInfo.answers} Answers</h5>
                                <h5>{completeInfo.posts} Posts</h5>
                            </div>
                            <div>
                                <h5>{props.user.email}</h5>
                            </div>
                        </div>
                    </div>

                    <div className="bottom-container">
                        <hr />
                        <div className="options-div">
                            <button className="button-style"
                                style={profilePage.profileOption ? {
                                    color: "#007bff",
                                    borderBottom: "2px solid #007bff"
                                } : null}
                                onClick={defaultFunction}>Profile</button>
                            <button className="button-style"
                                style={profilePage.questionOption ? {
                                    color: "#007bff",
                                    borderBottom: "2px solid #007bff"
                                } : null}
                                onClick={questionInfo}>Questions</button>
                            <button className="button-style"
                                style={profilePage.answerOption ? {
                                    color: "#007bff",
                                    borderBottom: "2px solid #007bff"
                                } : null}
                                onClick={answerInfo}>Answers</button>
                            <button className="button-style"
                                style={profilePage.postOption ? {
                                    color: "#007bff",
                                    borderBottom: "2px solid #007bff"
                                } : null}
                                onClick={postInfo}>Posts</button>
                        </div>
                        <hr />
                        <div>
                            {profilePage.profileOption ? <h4>Your Profile</h4> : null}
                        </div>
                        <div>
                            {profilePage.questionOption ? <>{
                                questionField.map((questionField, index) => (
                                    <Pquestions
                                        key={index}
                                        id={questionField._id}
                                        userName={questionField.userName}
                                        question={questionField.questions}
                                        answer={questionField.answers}
                                        user={props.user}
                                        timeAsked={questionField.timeAsked}
                                    />

                                ))
                            }</> : null}
                        </div>
                        <div>
                            {profilePage.answerOption ? <>{
                                answerField.map((answerField, index) => (
                                    <Pquestions
                                        key={index}
                                        id={answerField._id}
                                        userName={answerField.userName}
                                        question={answerField.questions}
                                        answer={answerField.answers}
                                        user={props.user}
                                        timeAsked={answerField.timeAsked}
                                    />

                                ))
                            }</> : null}
                        </div>
                        <div>
                            {profilePage.postOption ? <>{postField.map((postField, index) => (
                                <PreviousPosts
                                    key={index}
                                    id={postField._id}
                                    post={postField.post}
                                    userName={postField.user}
                                    timePosted={postField.timePosted}
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
