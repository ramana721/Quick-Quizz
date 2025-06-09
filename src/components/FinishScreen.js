function FinishScreen({curPoints, maxPoints, dispatch}) {
    return (
        <>
        <div className="result">
            <span>You have Scored {curPoints} Points out of {maxPoints} ( {Math.ceil(Number(curPoints/maxPoints)*100)} % )</span>
        </div>
        <div className="highscore">
            ( HighScore : {curPoints})
        </div>
        <button className="btn btn-ui" onClick={() => dispatch({type:"restart"})}>Restart Quiz</button>
        </>
    )
}

export default FinishScreen
