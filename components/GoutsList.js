import React from "react";
import Gout from "./Gout";
import "./GoutsList.css";
import bgImage from "../background.png";
//Images
import pasteque from "../12.png";
import Cassis from "../1.png";
import FruitDelapassion from "../123.png";
import FiguedeBarbarie from "../1234.png";
import CitronVert from "../12345.png";
export default function GoutsList() {
  return (
    <div>
      <div className="App-header GoutsList">
        <img alt="bg" src={bgImage} style={{ width: "100%" ,height:"780px",marginTop:"0px"}} />
        <div className="bgTransparent">
          {" "}
          <h1 className="Heading">QUEL GOÛT VOULEZ-VOUS BOIRE AUJOURD'HUI ? </h1>
        </div>

        <Gout className="goutHover Cassis" saveur={1} img={Cassis} />
        <Gout className="goutHover Pasteque" saveur={2} img={pasteque} />
        <Gout
          className="goutHover PecheetFruitdelaPassion"
          saveur={3}
          img={FruitDelapassion}
        />
        <Gout
          className="goutHover FiguedeBarbarie"
          saveur={4}
          img={FiguedeBarbarie}
        />
        <Gout className="goutHover CitronVert" saveur={5} img={CitronVert} />
      </div>
    </div>
  );
}
