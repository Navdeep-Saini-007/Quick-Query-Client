import { Link } from "react-router-dom";
import "./Navbar.css";
function Navbar(props) {
    return (
        <nav className="navbar navbar-custom navbar-expand-lg navbar-dark">
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
                    <li className="nav-item active">
                        <Link className="nav-link" to="/posts">
                            Add a Post
                        </Link>
                    </li>
                    <li className="nav-item active">
                        <Link className="nav-link" to="/contact">
                            Contact Us
                        </Link>
                    </li>
                    <li className="nav-item dropdown profile-dropdown">
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
                            className="dropdown-menu"
                            aria-labelledby="navbarDropdown"
                        >
                            <Link className="dropdown-item" to="/profile">
                                Profile
                            </Link>
                            <div className="dropdown-divider"></div>
                            <Link className="dropdown-item" to="/">
                                Log Out
                            </Link>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
export default Navbar;
