import React from "react";
function PreviousAnswers(props) {
  // const [previousAnswerspage, setPreviousAnswerspage] = useState({
  //   upvoteHook: props.likes,
  //   downvoteHook: props.dislikes,
  //   answerId: null,
  // });

  // const [upCount, setUpcount] = useState(0);

  // const [downCount, setDowncount] = useState(0);

  // let i = 0;
  // let j = 0;

  // function upVote() {
  //   setPreviousAnswerspage((prevValue) => {
  //     if (previousAnswerspage.downvoteHook === 0) {
  //       return {
  //         ...prevValue,
  //         upvoteHook: i + 1,
  //         answerId: props.id,
  //       };
  //     } else {
  //       return {
  //         ...prevValue,
  //         upvoteHook: i + 1,
  //         downvoteHook: 0,
  //         answerId: props.id,
  //       };
  //     }
  //   });
  // }

  // function downVote() {
  //   setPreviousAnswerspage((prevValue) => {
  //     if (previousAnswerspage.upvoteHook === 0) {
  //       return {
  //         ...prevValue,
  //         downvoteHook: j + 1,
  //         answerId: props.id,
  //       };
  //     } else {
  //       return {
  //         ...prevValue,
  //         upvoteHook: 0,
  //         downvoteHook: j + 1,
  //         answerId: props.id,
  //       };
  //     }
  //   });
  // }
  // function upVote() {
  //   setUpcount(upCount + 1);
  //   console.log(upCount);
  //   if (upCount % 2 === 0) {
  //     setPreviousAnswerspage((prevValue) => {
  //       return {
  //         ...prevValue,
  //         upvoteHook: previousAnswerspage.upvoteHook + 1,
  //       };
  //     });
  //   } else {
  //     setPreviousAnswerspage((prevValue) => {
  //       return {
  //         ...prevValue,
  //         upvoteHook: previousAnswerspage.upvoteHook - 1,
  //       };
  //     });
  //   }
  // }

  // function downVote() {
  //   setDowncount(downCount + 1);
  //   console.log(downCount);
  //   if (downCount % 2 === 0 && upCount !== 0 && upCount % 2 === 0) {
  //     setPreviousAnswerspage((prevValue) => {
  //       return {
  //         ...prevValue,
  //         upvoteHook: previousAnswerspage.upvoteHook - 1,
  //         downvoteHook: previousAnswerspage.downvoteHook + 1,
  //       };
  //     });
  //   } else if (downCount % 2 === 0) {
  //     setPreviousAnswerspage((prevValue) => {
  //       return {
  //         ...prevValue,
  //         downvoteHook: previousAnswerspage.downvoteHook + 1,
  //       };
  //     });
  //   } else {
  //     setPreviousAnswerspage((prevValue) => {
  //       return {
  //         ...prevValue,
  //         downvoteHook: previousAnswerspage.downvoteHook - 1,
  //       };
  //     });
  //   }
  // }

  // function submit(e) {
  //   console.log(previousAnswerspage);
  //   fetch("http://localhost:2900/answers", {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(previousAnswerspage),
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         console.log("error");
  //       }
  //       return response.json();
  //     })
  //     .then((serverResponse) => {
  //       console.log(serverResponse);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  return (
    <div className="answer">
      <hr />
      <br />
      <h5 className="final-answer">{props.answer}</h5>
      {/* {previousAnswerspage.upvoteHook}
      <button
        name="upvoteHook"
        value={previousAnswerspage.upvoteHook}
        onClick={upVote}
      >
        +
      </button>
      {previousAnswerspage.downvoteHook}
      <button
        name="downvoteHook"
        value={previousAnswerspage.downvoteHook}
        onClick={downVote}
      >
        -
      </button> */}
      <span className="details">
        answered by: {props.userAnswered} on {props.timeAnswered}
      </span>
      {/* <form onSubmit={submit}>
        <button
          value={previousAnswerspage.upvoteHook}
          name="upvoteHook"
          onClick={upVote()}
        >
          +
        </button>
        {props.likes}
        <button
          value={previousAnswerspage.downvoteHook}
          name="downvoteHook"
          onClick={downVote()}
        >
          -
        </button>
        {props.dislikes}
      </form> */}
    </div>
  );
}
export default PreviousAnswers;
