import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
// import Signup from "./Signup.jsx"
function Navbar() {
    // function Logout() {
    //     fetch("http://localhost:3000/logout")
    //         .then((response) => {
    //             if (!response.ok) {
    //                 console.log("error");
    //             }
    //             return response.json();
    //         })
    //         .then((result) => {
    //             console.log(result);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link to="/home" className="navbar-brand">
                Quick-Query
            </Link>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/home">
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/posts">
                            Add a Post
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/contact">
                            Contact Us
                        </Link>
                    </li>
                    <li className="nav-item dropdown">
                        <a
                            className="nav-link dropdown-toggle"
                            href="#profile"
                            id="navbarDropdown"
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <img
                                src="images/Sign-up-logo.png"
                                className="profile-img"
                                alt="profile"
                            />
                        </a>
                        <div
                            className="dropdown-menu dropdown-menu-right"
                            aria-labelledby="navbarDropdown"
                        >
                            <Link className="dropdown-item" to="/profile">
                                Profile
                            </Link>
                            {/* <Link className="dropdown-item" to="/feedback">
                                Feedback
                            </Link> */}
                            <div className="dropdown-divider"></div>
                            <Link className="dropdown-item" to="/">
                                Log Out
                            </Link>
                            {/* <button onClick={Logout} className="logout">
                                Log Out
                            </button> */}
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
export default Navbar;
