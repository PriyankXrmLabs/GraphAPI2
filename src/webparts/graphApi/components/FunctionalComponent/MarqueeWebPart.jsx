import React from "react";
// import Marquee from "react-fast-marquee"

function MarqueeWeb(props) {


  const marqueeStyle = {
    fontSize: "24px",
    color: props.color,
    backgroundColor: props.bg,
    padding: "10px",
    border: "2px solid black",

  };


  return (


    <div className="w-full">
    <marquee   style={marqueeStyle}  scrollamount={props.speed} behavior="scroll" direction={props.dir}>{props.data}</marquee>
    </div>
  
  );
}

export default MarqueeWeb;
