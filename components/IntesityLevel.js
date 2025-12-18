import React, { useState } from "react";
import "./GoutsList.css";
import "./intensity.css";
import bgImage from "../background.png";
import faible from "../faible.png";
import moyenne from "../moyenne.png";
import fort from "../fort.png";
import goBack from "../btn retour.png";
import { Link, useNavigate } from "react-router-dom";
import deguster from "../btn deguster.png";

export default function IntesityLevel() {
  const [LevelChoosed, setLevelChoosed] = useState();
  const [isSelectedFaible, setisSelectedFaible] = useState(false);
  const [isSelectedMoyenne, setisSelectedMoyenne] = useState(false);
  const [isSelectedFort, setisSelectedFort] = useState(false);
  const Navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  //Concentration Config
  const DURATION_EAU_CONST = 10000;
  const durationLevel1 = 2000;
  const durationLevel3 = 4000;
  const durationLevel2 = 3000;

  function hundlSelect(selectedImage) {
    console.log(selectedImage);
    switch (selectedImage) {
      case 1: {
        setisSelectedFaible((prv) => !prv);
        setisSelectedMoyenne(false);
        setisSelectedFort(false);
        break;
      }
      case 2: {
        setisSelectedFaible(false);
        setisSelectedMoyenne((prv) => !prv);
        setisSelectedFort(false);
        break;
      }
      case 3: {
        setisSelectedFaible(false);
        setisSelectedMoyenne(false);
        setisSelectedFort((prv) => !prv);
        break;
      }
    }
  }

  function degusterFn() {
    //alert(`Selected is ${LevelChoosed}`);
    var obj = JSON.parse(sessionStorage.GoutParameters);
    //console.log(obj.saveur);
    startProgram(obj.saveur, LevelChoosed);
    Navigate("/SuccesDeguster");
  }
  const startProgram = (saveur, level) => {
    if (isLoading === false) {
      setIsLoading(true);
      let timems = durationLevel1;
      if (level === 2) {
        timems = durationLevel2;
      } else if (level === 3) {
        timems = durationLevel3;
      }
      const url =
        "http://localhost:9000/command/" +
        saveur +
        "/" +
        timems +
        "/" +
        DURATION_EAU_CONST;

      fetch(url)
        .then((response) => {
          setIsLoading(false);
          sessionStorage.clear();
          //  setCurrentSaveur(null);
        })
        .catch((error) => {
          setIsLoading(false);
          sessionStorage.clear();
        //setCurrentSaveur(null);
        });
    }
  };

  return (
    <div className="GoutsList">
      <img alt="bg" src={bgImage} style={{ width: "100%" ,height:"780px"}} />
      <div className="bgTransparent">
        {" "}
        <h1 className="Heading">QUEL INTENSITÉ VOULEZ-VOUS ?</h1>
      </div>

      <div className="bins">
        <img
          alt="bin firstBin"
          className="bin"
          style={{ transform: isSelectedFaible ? "scale(1.2)" : "" }}
          src={faible}
          onClick={(e) => {
            setLevelChoosed(1);
            hundlSelect(1);
          }}
        />
        <img
          style={{ transform: isSelectedMoyenne ? "scale(1.2)" : "" }}
          alt="bin secondBin"
          className="bin"
          src={moyenne}
          onClick={() => {
            setLevelChoosed(2);
            hundlSelect(2);
          }}
        />
        <img
          style={{ transform: isSelectedFort ? "scale(1.2)" : "" }}
          alt="bin ThirdBin"
          className="bin"
          src={fort}
          onClick={() => {
            setLevelChoosed(3);
            hundlSelect(3);
          }}
        />
      </div>
      <img src={deguster} className="deguster" onClick={degusterFn} />
      <Link to="/gouts">
        <img src={goBack} alt="goBack" className="goBack" />
      </Link>
    </div>
  );
}
