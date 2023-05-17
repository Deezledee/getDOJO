import React, { useState } from "react";
import Navbar from "../components/Navbar";

function Quiz() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const questions = [
    {
      id: 1,
      question: "What is the difference between an Oi-Zuki and a Gyaku-Zuki?",

      options: ["A. Oi-Zuki is a front fist with a 45 degree hip twist and Gyaku-Zuki is a front fist with a full (90 degree) hip twist",

       "B. Oi-Zuki is a front fist with a full (90 degree) hip twist and Gyaku-Zuki is a front fist with a 45 degree hip twist",

        "C. Gyaku-Zuki is a front kick (mostly to the torso area) with stretched toes pointing up and Oi-Zuki is a back kick with a side ankle",

         "D. Oi-Zuki is a front kick (mostly to the torso area) with stretched toes pointing up and Gyaku-Zuki is a back kick with a side ankle"],
      answer: "A. Oi-Zuki is a front fist with a 45 degree hip twist and Gyaku-Zuki is a front fist with a full (90 degree) hip twist",
    },
    {
      id: 2,
      question: "Who is known as the founder of Shotokan karate? He is also known as \"The Father of Modern Karate.\"",

      options: ["A. Gichin Funakoshi",

       "B. Kazumi Tabata",

        "C. Takayuki Mikami",

         "D. Bruce Lee" ],

      answer: "A. Gichin Funakoshi",
    },
    {
      id: 3,
      question: "What is the first move you learn as a beginner?",

      options: ["A. Kihon",

       "B. Throwing Techniques",

        "C. Unsu Kata",

         "D. Jiyu Ippon Kumite" ],

      answer: "A. Kihon",
    },
    {
      id: 4,
      question: "Edmund Kealoha Parker was widely known as who?",

      options: ["A. The Father of American Karate",

       "B. The Father of French Karate",

        "C. The Father of Bulgarian Karate",

         "D. The Father of German Karate" ],

      answer: "A. The Father of American Karate",
    },
    {
      id: 5,
      question: "White gloves have been banned for some time now on WKF-tournaments. Which glove colors are allowed?",

      options: ["A. Red gloves for \"Aka\" and blue gloves for \"Ao\"",

       "B. Blue gloves for \"Aka\" and red gloves for \"Ao\"",

        "C. Black gloves for \"Aka\" and blue gloves for \"Ao\"",

         "D. Blue gloves for \"Aka\" and black gloves for \"Ao\"" ],

      answer: "A. Red gloves for \"Aka\" and blue gloves for \"Ao\"",
    },
    {
      id: 6,
      question: "What does the Japanese word \"Karate\" mean in English?",

      options: ["A. Empty Hand",

       "B. Full Hand",

        "C. Eyes to the Sun",

         "D. Relaxed Mind" ],

      answer: "A. Empty Hand",
    },
    {
      id: 7,
      question: "What does \"Muwate\" mean?",

      options: ["A. Turn",

       "B. Kick",

        "C. Throw",

         "D. Breathe" ],

      answer: "A. Turn",
    },
    {
      id: 8,
      question: "Hakutsuru is an ancient Chinese form (kata) which is said to have influenced several Shorin-Ryu kata. What does the name \"Hakutsuru mean\"?",

      options: ["A. White Crane",

       "B. Black Crane",

        "C. White Eagle",

         "D. Black Eagle" ],

      answer: "A. White Crane",
    },
    {
      id: 9,
      question: "In what year was Shotokan-Karate founded?",

      options: ["A. 1936",

       "B. 1876",

        "C. 1915",

         "D. 1910" ],

      answer: "A. 1936",
    },
    {
      id: 10,
      question: "In Shotokan Karate, the chain of the belts a trainee can advance is what?",

      options: ["A. White, Yellow, Orange, Green, Blue (2 levels), Brown (3 levels), and Black (10 levels)",

       "B. White, Orange, Yellow, Purple, Blue, Green, Brown (3 levels), and Black (9 levels)",

        "C. White, Yellow, Green, Orange, Blue, Brown (3 levels), and Black (10 levels)",

         "D. White, Yellow, Orange, Green, Blue (3 levels), Brown (2 levels), and Black (9 levels)" ],

      answer: "A. White, Yellow, Orange, Green, Blue (2 levels), Brown (3 levels), and Black (10 levels)",
    }
    
   
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    let correct = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.answer) {
        correct++;
      }
    });
    if (correct === questions.length) {
      // All answers are correct
      setSubmitted(true);
      setCorrectAnswers(correct);
    } else {
      setSubmitted("lost");
    }
  };

  const handleAnswerChange = (id, answer) => {
    setAnswers((prevAnswers) => ({ ...prevAnswers, [id]: answer }));
  };

  if (submitted === true) {
    return (
      <div className="congratsPage">
        <h2 className="congrats">Congrats!</h2>
        <img className="chuck-norris-congrats" src ="https://res.cloudinary.com/djzhnyobz/image/upload/v1683985209/Congrats-Chuck_kg5hbm.jpg" alt="chuck-norris-congrats"/>
        <button className="returnToHomeCongrats" onClick={() => window.location.href = "/home-page"}>Back to Home</button>
      </div>
    );
  } else if (submitted === "lost") {
    return (
      <div className="youLostPage">
        <h2 className="youLostTitle">You lost!</h2>
        <img className="chuck-norris-onions" src ="https://res.cloudinary.com/djzhnyobz/image/upload/v1683896269/59dec6cfd79ee9828f52a5984e59216b_sxayez.jpg" alt="chuck-norris-onions"/>
        <div className="youLostButtons">
        <button className="tryAgainButton" onClick={() => window.location.reload()}>Try again</button>
        <button className="returnToHomeLost" onClick={() => window.location.href = "/home-page"}>Back to Home</button>
      </div>
      </div>
    );
  }

  return (
    <div className="quizPage">
      <Navbar/>
    <form className="quizForm" onSubmit={handleSubmit}>
      {questions.map((q) => (
        <div key={q.id}>
          <h3 className="question">{q.question} 🤔</h3>
          {q.options.map((option) => (
            <div key={option}>
              <label>
                <input className="answer"
                  type="radio"
                  name={q.id}
                  value={option}
                  checked={answers[q.id] === option}
                  onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                />
                {option}
              </label>
            </div>
          ))}
        </div>
      ))}
      <button className="submitQuizButton" type="submit">Submit 🥊</button>

    </form>
    </div>
  );
}

export default Quiz;
