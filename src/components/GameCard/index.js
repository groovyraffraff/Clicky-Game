//Game Card component...
//shows card image and
//handles on click event...
//Set is clicked to true and
//if shake = true, apply the shake effect via css class

import React from "react";
import "./style.css";

function GameCard(props) {
  return (
    <div className="row">
      <div className="card">
        <div
          onClick={() => props.clicked(props.isClicked, props.id)}
          className={"img-container" + (props.shake ? " shake" : "")}
        >
          <img className="img-thumbnail" alt={props.name} src={props.image} />
        </div>
      </div>
    </div>
  );
}

export default GameCard;
