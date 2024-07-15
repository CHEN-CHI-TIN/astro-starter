import React from "react";
import "../App.css";

const Title = ({ zoneNameList, zoneIndex, justify }) => {
  const zoneNames = zoneNameList[zoneIndex]?.split("");
  if (!zoneNames) return null;
  return (
    <div className={`flex justify-${justify} grid-title-0${zoneIndex + 1}`}>
      <div className={justify === "end" ? "title-left" : "title-right"}>
        {zoneNames &&
          zoneNames.map((item, index) => {
            return (
              <div key={item + index} className="writing-vertical">
                {item}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Title;
