function FinishScreen({curPoints, maxPoints}) {
    return (
        <>
        <div className="result">
            <span>You have Scored {curPoints} Points out of {maxPoints} ( {Math.ceil(Number(curPoints/maxPoints)*100)} % )</span>
        </div>
        <div className="highscore">
            ( HighScore : {curPoints})
        </div>
        </>
    )
}

export default FinishScreen
