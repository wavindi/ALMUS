import React, { useEffect, useState } from "react";
import "./GoutsList.css";
import "./Succes.css";
import bgImage from "../background.png";
import ProgressBar from "./ProgressBar";
import { useNavigate } from "react-router-dom";

export default function Succes() {
  const Navigate = useNavigate();
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    let interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 10);
    if (seconds === 100) {
      clearInterval(interval);
        setTimeout(() => {
        Navigate("/")
        
      }, 4000);
      
    }

    return () => clearInterval(interval);
  }, [seconds]);

  

  return (
    <div className="container">
      <img alt="bg BG" src={bgImage} style={{ width: "100%",height:"765px" }} />
      <h1 className="Merci_paraghraphe">
        MERCI D'AVOIR CHOISI NOTRE EAU VITAMINÉ SPORT WATER ! 
      </h1>
      <h1 className="PROCHAINE">À LA PROCHAIIIIIIINE XOXO .</h1>
      <div className="progressBar">
        <ProgressBar bgcolor="#8D9EFF" completed={seconds} />
      </div>
    </div>
  );
}
