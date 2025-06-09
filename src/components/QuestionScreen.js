function QuestionScreen({ questions, qIndex, dispatch, answer, curPoints }) {
  //   console.log(questions, "hello", qIndex);
  const question = questions[qIndex];
  const questionsLength = questions.length;
  const maxPoints = questions.reduce((acc, ele) => ele.points + acc, 0);
  return (
    <>
      <Header
        questionsLength={questionsLength}
        qIndex={qIndex}
        curPoints={curPoints}
        maxPoints={maxPoints}
      />
      <div>
        <h4>{question.question}</h4>
        <div className="options">
          {question.options.map((option, index) => (
            <Options
              option={option}
              key={index}
              index={index}
              dispatch={dispatch}
              crctAnswer={question.correctOption}
              answer={answer}
              points={questions[qIndex].points}
            />
          ))}
        </div>
      </div>
      <Footer
        answer={answer}
        dispatch={dispatch}
        qIndex={qIndex}
        questionsLength={questionsLength}
        curPoints={curPoints}
      />
    </>
  );
}

export default QuestionScreen;

function Header({ questionsLength, qIndex, curPoints, maxPoints }) {
  return (
    <header className="progress">
      <progress max={questionsLength} value={qIndex}></progress>
      <p>
        Question <strong>{qIndex + 1}</strong> / {questionsLength}
      </p>
      <p>
        <strong>{curPoints}</strong> / {maxPoints}
      </p>
    </header>
  );
}

function Options({ option, index, dispatch, crctAnswer, answer, points }) {
  return (
    <>
      <button
        className={`btn btn-option ${
          answer !== null && (index === answer ? "answer" : "")
        } ${answer !== null && (index === crctAnswer ? "correct" : "wrong")}`}
        onClick={() => {
          let pointsToAdd = index === crctAnswer ? points : 0;
          dispatch({
            type: "answered",
            payLoad: { index: index, pointsToAdd: pointsToAdd },
          });
        }}
        disabled={answer !== null ? true : false}
      >
        {option}
      </button>
    </>
  );
}

function Footer({ answer, dispatch, qIndex, questionsLength, curPoints }) {
  return (
    <footer>
      {answer !== null &&
        (qIndex !== questionsLength - 1 ? (
          <button
            className="btn btn-ui"
            onClick={() => dispatch({ type: "nextQuestion" })}
          >
            Next
          </button>
        ) : (
          <button
            className="btn btn-ui"
            onClick={() => dispatch({ type: "finished", payLoad: curPoints })}
          >
            Finish
          </button>
        ))}
    </footer>
  );
}
