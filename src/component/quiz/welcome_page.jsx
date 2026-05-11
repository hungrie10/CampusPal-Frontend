import React from "react";
import Intro_page from "./intro_page";
import Quiz_page from "./quiz_page";

function Welcome_page({quest}) {
  const [quiz, setQuiz] = React.useState(false);

  function startQuiz() {
    setQuiz(true);
    console.log("Quiz started!");
  }

  return (
    <main id="welcome_page">
      {quiz == false && <Intro_page startQuiz={startQuiz} />}

      {quiz == true && <Quiz_page questions={quest}/>}
    </main>
  );
}

export default Welcome_page;
