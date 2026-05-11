import React from "react";
import go_rabbit from "../../assets/go_rabbit.png";

function Intro_page({startQuiz}) {
  return (
    <section id="intro_page">
      <img src={go_rabbit} alt="Go Rabbit" />
      <h1>Quiz Introduction</h1>
      <p>
        Welcome to the quiz! You will be asked to answer a series of questions.
      </p>
        <button onClick={startQuiz}>Start Quiz</button>
    </section>
  );
}

export default Intro_page;
