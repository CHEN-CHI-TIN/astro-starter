import React, { useState } from "react";
import { Stepper, Step } from "react-form-stepper";
import "./App.css";

function MyStep(curStep) {
  console.log(curStep, "~~~~~~~~~~~~");
  return (
    <div
      style={{ height: "5px" }}
      className="flex flex-row w-screen justify-end mr-60"
    >
      <CustomStepper
        activeColor={"rgba(0,0,0,0.2)"}
        defaultColor="rgba(255,255,255,1)"
        steps={curStep["cur"]}
        activeStep={0}
      >
        <Step style={{ fontSize: "12px" }} label="基本資訊" />
        <Step style={{ fontSize: "12px" }} label="象限分類" />
        <Step style={{ fontSize: "12px" }} label="專家評估" />
        <Step style={{ fontSize: "12px" }} label="專家評估" />
        <Step style={{ fontSize: "12px" }} label="問卷送出" />
      </CustomStepper>
    </div>
  );
}

function CustomStepper(props) {
  return (
    <Stepper
      {...props}
      connectorStateColors={true}
      connectorStyleConfig={{
        completedColor: "#ffbd13",
        activeColor: "#ffbd13",
        disabledColor: "#eee",
      }}
      styleConfig={{
        activeBgColor: "#ffd813",
        completedBgColor: "#ffbd13",
        inactiveBgColor: "#eee",
        activeTextColor: "#111",
        completedTextColor: "#222",
        inactiveTextColor: "#444",
      }}
    />
  );
}

export default MyStep;
