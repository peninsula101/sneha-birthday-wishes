import React, { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";
import { ReactTyped } from "react-typed";
import "./BirthdayWish.css";

function BirthdayWish() {

  // ⭐ CHANGE HER NAME HERE
  const name = "Sneha";

  // states
  const [language, setLanguage] = useState("english");
  const [cakeCut, setCakeCut] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  // audio ref
  const audioRef = useRef(null);

  // cinematic intro timer
  useEffect(() => {

    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 3000);

    return () => clearTimeout(timer);

  }, []);

  // birthday messages
  const messages = {
    english: [
      "Happy Birthday to the person who never officially applied for the role of “Life Guide,” but still ended up correcting my career, academics 🎉",
      "Happy Birthday to the person who had the patience to deal with my dumb questions, repeated mistakes, and last-minute panic attacks. 😁",
      "Thanks for being my friend who didn’t just guide me academically, but also upgraded my mindset. 😂",
      "Happy Birthday to the person who deserves partial credit for whatever decent things I’ve done in life. ❤️",
      "Thanks for guiding me even when I was clearly a difficult student. 😋"
    ],
    telugu: [
      "నా ఫేవరెట్ మెంటర్ కి పుట్టిన రోజు శుభాకాంక్షలు 🥳",
      "నా కెరీర్ ని నడిపించిన నీకు ధాన్యవాదాలు 🙌",
      "నా డౌట్స్ భరించినందుకు అవార్డ్ రావాలి 🙏",
      "ఎప్పటికీ నా ఫేవరెట్ మిత్రమా 👌"
    ]
  };

  // cake click handler
  const cutCake = () => {

    if (cakeCut) return;

    setCakeCut(true);
    setShowConfetti(true);

    // play music
    const audio = audioRef.current;

    if (audio) {

      audio.volume = 0;
      audio.play();

      // smooth fade in
      let volume = 0;

      const fade = setInterval(() => {

        if (volume < 0.5) {
          volume += 0.05;
          audio.volume = volume;
        }
        else {
          clearInterval(fade);
        }

      }, 200);

    }

    // show popup after delay
    setTimeout(() => {
      setShowPopup(true);
    }, 1500);

  };

  // cinematic intro screen
  if (showIntro) {

    return (
      <div className="intro">
        <h1 className="intro-text">
          A Special Surprise is Waiting...
        </h1>
      </div>
    );

  }

  // main screen
  return (

    <div className="container">

      {showConfetti && <Confetti />}

      <div className="card">

        {/* photo */}
        <div className="photo-container">
            <img
                src="/images/her-photo.png"
                className="main-photo"
                alt="birthday"
            />
        </div>

        {/* glowing text BELOW image */}
        <div className="glow-text-below">
        Happy Birthday, {name} ✨
        </div>

        {/* typing text */}
        <div style={{ minHeight: "40px", marginTop: "15px" }}>
          <ReactTyped
            strings={messages[language]}
            typeSpeed={50}
            backSpeed={30}
            loop
          />
        </div>

        {/* language buttons */}
        <div className="button-group">

            <button onClick={() => setLanguage("telugu")}>
            తెలుగు
          </button>

          <button onClick={() => setLanguage("english")}>
            English
          </button>

          

        </div>

        {/* cake */}
        <div className="cake-area">

          <div
            className={`cake ${cakeCut ? "cut" : ""}`}
            onClick={cutCake}
          >
            🎂
          </div>

          {!cakeCut && (
            <p>Please Click cake to cut</p>
          )}

          {cakeCut && (
            <p className="success">
              Cake Cut Successfully 🎉
            </p>
          )}

        </div>

        <p style={{ color: "gray", marginTop: "10px" }}>
          — Your friend ❤️
        </p>

      </div>

      {/* music */}
      <audio ref={audioRef} loop>
        <source src="/music/birthday.mp3" type="audio/mpeg" />
      </audio>

      {/* popup */}
      {showPopup && (

        <div className="popup">

          <div className="popup-card">

            <h2>❤️ Message for You ❤️</h2>

            <p>
              Thank you for guiding my career,<br/>
              supporting me always,<br/>
              and standing beside.<br/><br/>

              Happy Birthday <br />
              and hope u celebrate many more happy and cheerful birthdays.
            </p>

            <button onClick={() => setShowPopup(false)}>
              Close
            </button>

          </div>

        </div>

      )}

    </div>

  );

}

export default BirthdayWish;