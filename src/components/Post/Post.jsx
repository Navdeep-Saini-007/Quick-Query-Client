import { React, useState, useEffect } from "react";
import PreviousPosts from "./PreviousPosts";
import "../Home-Page/Home.css";
function Post(props) {
    const [postData, setPostdata] = useState({ post: "", user: null });

    const [serverData, setServerdata] = useState([]);

    const [isPosted, setIsposted] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;
        setPostdata((prevValue) => {
            return {
                ...prevValue,
                [name]: value,
                user: props.user.userName,
            };
        });
    }

    function submit(event) {
        event.preventDefault();
        console.log(postData);
        fetch("http://localhost:2900/post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
        })
            .then((response) => {
                if (!response.ok) {
                    console.log("error");
                }
                return response.json();
            })
            .then((server) => {
                console.log(server);
                setIsposted(true);
                setPostdata({ post: "", user: null });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        fetch("http://localhost:2900/post")
            .then((response) => {
                if (!response.ok) {
                    console.log("error");
                }
                return response.json();
            })
            .then((server) => {
                console.log(server);
                setServerdata(server.process);
            })
            .catch((err) => {
                console.log(err);
            });
        return () => {
            setIsposted(false);
        };
    }, [isPosted]);

    return (
        <section id="home">
            <div className="container-fluid">
                <div className="home-page-wrapper">
                    <div className="user-space">
                        <div className="user-details">
                            <img
                                className="user-profile"
                                src="images/Sign-up-logo.png"
                                alt="profile-in-div"
                            />
                            <span className="user-name">{props.user.userName}</span>
                        </div>
                        <form onSubmit={submit}>
                            <div className="form-group">
                                <textarea
                                    onChange={handleChange}
                                    required
                                    name="post"
                                    value={postData.post}
                                    className="question-input form-control"
                                    type="text"
                                    placeholder="Add a post..."
                                />
                                <button
                                    type="submit"
                                    className="question-button btn btn-outline-primary"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                    {serverData.map((serverData, index) => (
                        <PreviousPosts
                            key={index}
                            id={serverData._id}
                            post={serverData.post}
                            userName={serverData.user}
                            timePosted={serverData.timePosted}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Post;
