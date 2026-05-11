import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

function Quiz_page({questions}) {
    const [current_question , set_current_question]  = useState(0)
//   const questions = [
//     "Alton Mason",
//     "Broderick Hunter",
//     "Adonis Bosso",
//     "David Agbodji",
//     "Babacar N'doye",
//     "Luka Sabbat",
//     "Tyson Beckford",
//     "Fante Prince",
//     "Victor Ndigwe",
//     "Shaun Ross",
//   ];

    function prev_question() {
        if (current_question <= 0) {
            return;
        }
        else{
            set_current_question(current_question - 1);
        }
    }

    function next_question() {
        if (current_question >= questions.length - 1) {
            return;
        }
        else{
            set_current_question(current_question + 1);
        }
    }

    return (
        <section id="mr_quiz">
            <div id="current_questions">
                <p>{questions[current_question]}</p>
            </div>
            <div id="options">
                <button onClick={prev_question}><FontAwesomeIcon icon={faArrowLeft} /></button>
                <button onClick={next_question}><FontAwesomeIcon icon={faArrowRight} /></button>
            </div>
        </section>);
}

export default Quiz_page;