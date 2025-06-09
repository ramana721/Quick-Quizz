import { useReducer, useEffect } from "react";

import Header from "./Header";
import Loader from "./Loader";
import Error from "./Error";
import Main from "./Main";
import QuestionScreen from "./QuestionScreen";
import FinishScreen from "./FinishScreen";

// import { type } from "@testing-library/user-event/dist/type";
// import { act } from "@testing-library/react";

const [
  LOADING,
  DATARECIEVED,
  REQUESTFAILED,
  ANSWERED,
  NEXTQUESTION,
  FINISHED,
  RESTART,
] = [
  "loading",
  "dataRecieved",
  "requestFailed",
  "answered",
  "nextQuestion",
  "finished",
  "restart",
];

const initialState = {
  questions: [],
  quizStatus: "initial",
  qIndex: 0,
  answer: null,
  curPoints: 0,
  highScore: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case LOADING:
      return { ...state, quizStatus: "loading" };
    case DATARECIEVED:
      return { ...state, quizStatus: "active", questions: action.payLoad };
    case REQUESTFAILED:
      return { ...state, quizStatus: "error" };
    case ANSWERED:
      return {
        ...state,
        answer: action.payLoad.answer,
        curPoints: state.curPoints + action.payLoad.pointsToAdd,
      };
    case NEXTQUESTION:
      return { ...state, qIndex: state.qIndex + 1, answer: null };
    case FINISHED:
      return {
        ...state,
        quizStatus: "finished",
        highScore: Math.max(state.highScore, action.payLoad),
      };
    case RESTART:
      return { ...initialState, highScore: state.highScore };
    default:
      throw new Error("action not recognized");
  }
}
function App() {
  const [{ questions, quizStatus, qIndex, answer, curPoints }, dispatch] =
    useReducer(reducer, initialState);

  useEffect(
    function () {
      if (quizStatus !== "loading") return;

      setTimeout(
        () =>
          fetch("../data/questions.json")
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              dispatch({ type: DATARECIEVED, payLoad: data.questions });
            })
            .catch((e) => {
              dispatch({ type: REQUESTFAILED });
            }),
        500
      );
    },
    [quizStatus]
  );

  const maxPoints = questions?.reduce((acc, ele) => ele.points + acc, 0);
  return (
    <div className="app">
      <Header />
      <Main>
        {quizStatus === "initial" && <StartScreen dispatch={dispatch} />}
        {quizStatus === "loading" && <Loader />}
        {quizStatus === "error" && <Error />}
        {quizStatus === "active" && (
          <QuestionScreen
            questions={questions}
            qIndex={qIndex}
            dispatch={dispatch}
            answer={answer}
            curPoints={curPoints}
          />
        )}
        {quizStatus === "finished" && (
          <FinishScreen
            curPoints={curPoints}
            maxPoints={maxPoints}
            dispatch={dispatch}
          />
        )}
      </Main>

      {/* <Main /> */}
    </div>
  );
}

export default App;

function StartScreen({ dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to React Quiz</h2>
      <h3>15 Questions to test your React Mastery.</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "loading" })}
      >
        Start
      </button>
    </div>
  );
}
