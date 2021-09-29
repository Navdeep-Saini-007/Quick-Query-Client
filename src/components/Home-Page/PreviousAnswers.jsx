import React, { useState, useEffect } from "react";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
function PreviousAnswers(props) {

  const [answerPage, setAnswerpage] = useState({ answerId: null, upVotes: props.likes, downVotes: props.dislikes });

  const [count, setCount] = useState({ upCount: 0, downCount: 0 });

  const [already, setAlready] = useState({ likes: false, dislikes: false });

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
      setAnswerpage((prevValue) => {
        return {
          ...prevValue,
          upVotes: answerPage.upVotes + 1,
          downVotes: answerPage.downVotes - 1,
          answerId: props.id
        }
      })

    } else if (count.upCount % 2 === 0) {
      setAlready((prevValue) => {
        return {
          ...prevValue,
          likes: true
        }
      });
      setAnswerpage((prevValue) => {
        return {
          ...prevValue,
          upVotes: answerPage.upVotes + 1,
          answerId: props.id
        }
      })

    } else {
      setAlready((prevValue) => {
        return {
          ...prevValue,
          likes: false
        }
      });
      setAnswerpage((prevValue) => {
        return {
          ...prevValue,
          upVotes: answerPage.upVotes - 1,
          answerId: props.id
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
      setAnswerpage((prevValue) => {
        return {
          ...prevValue,
          downVotes: answerPage.downVotes + 1,
          upVotes: answerPage.upVotes - 1,
          answerId: props.id
        }
      })
    } else if (count.downCount % 2 === 0) {
      setAlready((prevValue) => {
        return {
          ...prevValue,
          dislikes: true
        }
      })
      setAnswerpage((prevValue) => {
        return {
          ...prevValue,
          downVotes: answerPage.downVotes + 1,
          answerId: props.id
        }
      })
    } else {
      setAlready((prevValue) => {
        return {
          ...prevValue,
          dislikes: false
        }
      })
      setAnswerpage((prevValue) => {
        return {
          ...prevValue,
          downVotes: answerPage.downVotes - 1,
          answerId: props.id
        }
      })
    }
  }

  useEffect(() => {
    console.log(answerPage);
    fetch("http://localhost:2900/answers", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(answerPage),
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
  }, [answerPage, answerPage.answerId, answerPage.upVotes, answerPage.downVotes]);

  return (
    <div id="answer">
      <hr />
      <h4>{props.answer}</h4>
      <div className="details">
        <div className="ui-icons-questions">
          <button className="button-style button-color" style={already.likes ? { color: "#007bff" } : null} onClick={handleLikes}>
            <ThumbUpIcon />  {answerPage.upVotes}
          </button>
          <button className="button-style button-color" style={already.dislikes ? { color: "#007bff" } : null} onClick={handleDislikes}>
            <ThumbDownIcon /> {answerPage.downVotes}
          </button>
        </div>
        <div>
          Answered by {props.userAnswered} on {props.timeAnswered}
        </div>
      </div>
    </div>
  );
}
export default PreviousAnswers;
