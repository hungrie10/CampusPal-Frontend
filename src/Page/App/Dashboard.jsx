import React from "react";
import Header from "../../component/Header";
import Footer from "../../component/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHomeUser,
  faLeftLong,
  faRightLong,
} from "@fortawesome/free-solid-svg-icons";
import { faNoteSticky } from "@fortawesome/free-solid-svg-icons";
import { faVoicemail } from "@fortawesome/free-solid-svg-icons";
import { faWalkieTalkie } from "@fortawesome/free-solid-svg-icons";
import hero from "../../assets/hero.png";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import slides from "./msg";
import data from "./index";

function Dashboard() {
  const my_slide = useRef(null);
  let dt = data;

  const [currentQuotes, setCurrentQuotes] = useState(0);
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/quotes")
      .then((res) => res.json())
      .then((data) => {
        setQuotes(data.quotes);
      });
  }, [quotes]);

  function change_quotes_backwards() {
    setCurrentQuotes((prev) => {
      if (prev === 0) return quotes.length - (quotes.length % 2 === 0 ? 3 : 2);
      return prev - (quotes.length % 2 === 0 ? 3 : 2);
    });
  }

  function change_quotes_forwards() {
    setCurrentQuotes((prev) => {
      if (prev === quotes.length - (quotes.length % 2 === 0 ? 3 : 2)) {
        setCurrentQuotes(0);
        return;
      }
      return prev + (quotes.length % 2 === 0 ? 3 : 2);
    });
  }

  const [currentSlide, setCurrentSlide] = useState(1);

  function change_slide(slideNumber) {
    setCurrentSlide(slideNumber);
  }

  function render_new_msg() {
    const slide = slides[currentSlide - 1];

    return (
      <div id="inner_banner">
        <div id="banner_description">
          <h2>{slide.title}</h2>
          <p>{slide.text}</p>
        </div>
      </div>
    );
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        if (prev === slides.length) return 1;
        return prev + 1;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <main id="dashboard_page">
      <Header />

      {/* Dashboard Title */}
      <section id="title">
        <div id="title_name">
          <h2>Dashboard</h2>
        </div>

        <div id="title_filter">
          <span
            className={`first_slide ${currentSlide === 1 ? "focus" : ""}`}
            onClick={() => change_slide(1)}
          ></span>

          <span
            className={`second_slide ${currentSlide === 2 ? "focus" : ""}`}
            onClick={() => change_slide(2)}
          ></span>

          <span
            className={`third_slide ${currentSlide === 3 ? "focus" : ""}`}
            onClick={() => change_slide(3)}
          ></span>
        </div>
      </section>

      {/* Our Banner for Campus Pal */}
      <section id="banner">
        <img src={hero} alt="" />
        {render_new_msg()}
      </section>

      <section id="about_campus_pal">
        <div id="about_title">
          <h2>About Campus Pal</h2>
          {quotes.length && (
            <span>
              
              <FontAwesomeIcon
                icon={faLeftLong}
                onClick={change_quotes_backwards}
              />
               
              <FontAwesomeIcon
                icon={faRightLong}
                onClick={change_quotes_forwards}
              />
              
            </span>
          )}
        </div>

        <p>
          Campus Pal is a revolutionary platform designed to enhance the student
          experience on college campuses.{" "}
        </p>
      </section>

      <section id="extList">
        {!quotes.length && (
          <div
            id="loading_quotes"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "200px",
              fontSize: "0.75rem",
              color: "#555",
              width: "100vw",
            }}
          >
            Loading quotes...
          </div>
        )}
        {quotes &&
          quotes
            .slice(
              currentQuotes,
              quotes.length % 2 == 0 ? currentQuotes + 3 : currentQuotes + 2,
            )
            .map((i) => {
              let { quote_author, quote_description } = i;

              return (
                <div className="extensions">
                  <div className="extDets">
                    <div className="extLogo">
                      <div className="extInfo">
                        <h1>{quote_author}</h1>
                        <p>{quote_description}</p>
                      </div>
                    </div>

                    <br />
                  </div>
                </div>
              );
            })}
      </section>

      <Footer />
    </main>
  );
}

export default Dashboard;
