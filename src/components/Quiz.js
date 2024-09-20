import React, { useEffect, useState } from "react";
import { QUESTIONS } from "../question";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userAnswer, setUserAnswer] = useState(null);
  const [shuffledOptions, setShuffledOptions] = useState([])
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0); 

  useEffect(() => {
    const options = [
      ...QUESTIONS[currentQuestion].incorrect_answers,
      QUESTIONS[currentQuestion].correct_answer,
    ].sort(() => Math.random() - 0.5);
    setShuffledOptions(options);
  }, [currentQuestion]);

  const handleSelectedAnswer = (selectedAnswer) => {
    setUserAnswer(selectedAnswer)
    setIsAnswered(true)
    if(selectedAnswer === QUESTIONS[currentQuestion].correct_answer){
      setScore(prev => prev + 1)
    }
  }

  const handleNextQuestion = () => {
    setIsAnswered(false)
    if(currentQuestion < QUESTIONS.length - 1){
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const renderStars = (difficulty) => {
    let stars = 0;
    if (difficulty === "easy") {
      stars = 1;
    } else if (difficulty === "medium") {
      stars = 2;
    } else if (difficulty === "hard") {
      stars = 3;
    }
    return "★".repeat(stars) + "☆".repeat(3 - stars); 
  };

  const progressPercentage = ((currentQuestion + 1) / QUESTIONS.length) * 100;
  const scorePercentage = (score / QUESTIONS.length) * 100;
  return (
    <div>
      <div style={{ width: "100%", backgroundColor: "#f3f3f3", height: "15px", marginBottom: "20px" }}>
        <div
          style={{
            width: `${progressPercentage}%`,
            backgroundColor: "#4caf50",
            height: "100%",
            transition: "width 0.3s ease-in-out",
          }}
        ></div>
      </div>
      <div>
      <div>
        <h1>
          Question {currentQuestion + 1} of {QUESTIONS.length}
        </h1>
        <p>{QUESTIONS[currentQuestion].category}</p>
        <p>{renderStars(QUESTIONS[currentQuestion].difficulty)}</p>
      </div>
      <div style={{width: '700px', display:'flex' ,alignItems: 'center', margin: '0 auto'}}>
        <h1>{QUESTIONS[currentQuestion].question}</h1>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "10px",
          justifyItems: "center",
        }}
      >
        {shuffledOptions.map((answer) => (
          <button 
          onClick={() => handleSelectedAnswer(answer)} 
          style={{ padding: "10px", width: "150px" }}
          disabled={isAnswered && answer !== userAnswer}
          >
            {answer}
          </button>
        ))}
      </div>
      </div>
      {isAnswered && <div>
        {userAnswer === QUESTIONS[currentQuestion].correct_answer ? <h2>Correct!</h2> : <h2>Sorry!</h2>}
      </div>}
      <div>
        {(isAnswered && currentQuestion !== (QUESTIONS.length - 1)) && 
        <button 
          style={{ padding: "10px", width: "150px",  marginTop: '10px'}}
          onClick={handleNextQuestion}
        >
          Next Question
        </button>}
      </div>
     <div>
      {currentQuestion === (QUESTIONS.length - 1) && isAnswered && (
      <div>
      <p>Score: {scorePercentage}% out of 100%</p>
      </div> )
      }
     </div>
    </div>
  );
};

export default Quiz;
