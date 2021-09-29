import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import "./Editprofile.css";
function Editprofile(props) {

    const [editprofilePage, setEditprofilepage] = useState({ email: "", fullName: "", bio: "", branch: "", startYear: "", endYear: "", userEmail: "", previousName: "" });

    const [update, setUpdate] = useState(false);

    let currentUser = sessionStorage.getItem("email");

    let currentName = sessionStorage.getItem("name");

    function handleChange(event) {
        const { name, value } = event.target;
        setEditprofilepage((prevValue) => {
            return {
                ...prevValue,
                [name]: value,
                userEmail: currentUser,
                previousName: currentName
            }
        })
    }

    function submit(event) {
        console.log(editprofilePage);
        event.preventDefault();
        fetch("http://localhost:2900/updateUser", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(editprofilePage),
        })
            .then((response) => {
                if (!response.ok) {
                    console.log("error");
                }
                return response.json();
            })
            .then((result) => {
                console.log(result);
                setUpdate(result.updated);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <section id="edit-profile">
            <div className="container-fluid">
                <div className="editProfile-wrapper div-border">
                    <form onSubmit={submit} className="form-components">
                        <div className="picture-div">
                            <div>
                                <img className="edit-img" src="images/sign-up-logo.png" alt="profile" />
                            </div>
                            <div className="pictureRight-div">
                                <h5>{sessionStorage.getItem("email")}</h5>
                                <a href="nothing">Change Photo</a>
                            </div>
                        </div>
                        <div className="split spacing">
                            <div className="user-option">Email</div>
                            <input className="form-control" defaultValue={sessionStorage.getItem("email")} name="email" onChange={handleChange} type="email" />
                        </div>
                        <div className="split spacing">
                            <div className="user-option">Name</div>
                            <input className="form-control" defaultValue={sessionStorage.getItem("name")} name="fullName" onChange={handleChange} type="text" placeholder="Full name" />
                        </div>
                        <div className="split spacing">
                            <div className="user-option">Bio</div>
                            <textarea className="form-control" name="bio" value={editprofilePage.bio} onChange={handleChange} type="text" placeholder="Bio" />
                        </div>
                        <div className="split spacing">
                            <div className="user-option">Branch</div>
                            <select className="btn dropdown-input" name="branch" value={editprofilePage.branch} onChange={handleChange}>
                                <option value="">Branch</option>
                                <option value="General">General</option>
                                <option value="CSE/IT">CSE/IT</option>
                                <option value="ME">ME</option>
                                <option value="ECE">ECE</option>
                                <option value="ELE">ELE</option>
                                <option value="BCA">BCA</option>
                                <option value="MCA">MCA</option>
                                <option value="BBA">BBA</option>
                                <option value="MBA">MBA</option>
                            </select>
                        </div>
                        <div className="split spacing">
                            <div className="user-option">Year</div>
                            <div>
                                <select className="btn dropdown-input left-dropdown" name="startYear" value={editprofilePage.startYear} onChange={handleChange}>
                                    <option value="">From</option>
                                    <option value="2017">2017</option>
                                    <option value="2018">2018</option>
                                    <option value="2019">2019</option>
                                    <option value="2020">2020</option>
                                    <option value="2021">2021</option>
                                    <option value="2022">2022</option>
                                </select>
                                <select className="btn dropdown-input" name="endYear" value={editprofilePage.endYear} onChange={handleChange}>
                                    <option value="">To</option>
                                    <option value="2021">2021</option>
                                    <option value="2022">2022</option>
                                    <option value="2023">2023</option>
                                    <option value="2024">2024</option>
                                    <option value="2025">2025</option>
                                    <option value="2026">2026</option>
                                </select>
                            </div>
                        </div>
                        {update ? <p style={{ color: "green", textAlign: "center" }}>Your profile is successfully updated.</p> : null}
                        <button className="edit-profile-btn btn btn-outline-primary" type="submit">Save</button>
                    </form>
                </div>
            </div>
            {update ? <Redirect to="/" /> : null}
        </section>
    )
}
export default Editprofile;