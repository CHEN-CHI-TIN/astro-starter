import React, { useState, useEffect, useContext, useRef } from "react";
import { ItemWrapper } from "./Item.style";
import { ThemeContext } from "../theme-context";
import PropTypes from "prop-types";
import Draggable from "react-draggable"; // <-- 引入react-draggable

const MAX_LENGTH = 15;
const baseSize = 12;
const baseFontSize = 16.5;
const baseFontPositionX = 27;
const baseFontPositionY = -6;
const textStyle = {
  fill: "black", // 將文字顏色設置為白色
  textShadow: "1px 2px 5px rgba(255, 255, 255, 0.9)", // 添加陰影效果
};

function Item(props) {
  //create ref
  let ref = useRef(null);

  //context variables
  const { itemFontSize, fontFamily } = useContext(ThemeContext);

  //state variables
  const [isHovered, setIsHovered] = useState(false);
  const [index, setIndex] = useState(0);
  const [radarItemFontSize, setRadarItemFontSize] = useState(
    window.innerWidth < 1800 ? baseFontSize - 2 : baseFontSize,
  );
  const [circleRadius, setCircleRadius] = useState(
    window.innerWidth < 1800
      ? {
          Transformational: baseSize + 6,
          High: baseSize + 3,
          Moderate: baseSize,
        }
      : {
          Transformational: baseSize + 2 + 6,
          High: baseSize + 2 + 3,
          Moderate: baseSize + 2,
        },
  );

  const shortName =
    props.data.name.length > MAX_LENGTH
      ? props.data.name.substr(0, MAX_LENGTH) + "..."
      : props.data.name;

  const onMouseToggle = () => {
    setIsHovered(!isHovered);
  };

  useEffect(() => {
    function handleResize() {
      setRadarItemFontSize(
        window.innerWidth < 1800 ? baseFontSize - 2 : baseFontSize,
      );
      setCircleRadius(
        window.innerWidth < 1800
          ? {
              Transformational: baseSize + 6,
              High: baseSize + 3,
              Moderate: baseSize,
            }
          : { Transformational: 23, High: 20, Moderate: baseSize + 2 },
      );
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    let i = 0;
    while (i < props.innovationIndex.length) {
      // console.log(props.innovationIndex[i], "||", props.data.id);
      if (props.innovationIndex[i] === props.data.id) {
        setIndex(i + 1);
      }
      i++;
    }
  }, [props.innovationIndex]);

  return (
    <ItemWrapper
      className="blip element"
      id={"blip-" + props.data.id}
      transform={
        " rotate(" +
        props.rotateDegrees +
        ") translate(" +
        props.data.x +
        "," +
        props.data.y +
        ")"
      }
      onMouseEnter={onMouseToggle}
      onMouseLeave={onMouseToggle}
      ref={ref}
      style={{
        opacity: isHovered ? "1.0" : "1.0",
        fontWeight: isHovered ? "Bold" : "Normal",
      }}
    >
      <Draggable>
        <g>
          {props.data.cycleType === "Transformational" && (
            <circle
              r={circleRadius.Transformational}
              stroke="white"
              stroke-width="1.5"
              fill="#0C2653"
            />
          )}
          {props.data.cycleType === "High" && (
            <circle
              r={circleRadius.High}
              stroke="white"
              stroke-width="1.5"
              fill="#6E7FA0"
            />
          )}
          {props.data.cycleType === "Moderate" && (
            <circle
              r={circleRadius.Moderate}
              stroke="white"
              stroke-width="1.5"
              fill="#4498D3"
            />
          )}
          <text
            className={"name"}
            textAnchor="middle"
            dominantBaseline="middle"
            dy={2}
            fontSize={16}
            fontFamily={fontFamily}
            fill="white"
          >
            {index}
          </text>
          {props.data.cycleType === "Transformational" && (
            <text
              className={"name"}
              x="0"
              y={baseFontPositionY}
              fontSize={radarItemFontSize}
              fontFamily={fontFamily}
              fontWeight={"Bold"}
              textAnchor="start"
              dominantBaseline="middle"
              style={textStyle}
            >
              {props.data.name === "Low-Code/No-Code Solutions" ? (
                <>
                  <tspan
                    x={baseFontPositionX}
                    dy="0"
                    textAnchor="start"
                    dominantBaseline="middle"
                  >
                    {"Low-Code/No-Code"}
                  </tspan>
                  <tspan
                    x={baseFontPositionX}
                    dy="1.2em"
                    textAnchor="start"
                    dominantBaseline="middle"
                  >
                    {"Solutions"}
                  </tspan>
                </>
              ) : (
                <>
                  <tspan
                    x={baseFontPositionX}
                    dy="0"
                    textAnchor="start"
                    dominantBaseline="middle"
                  >
                    {props.data.name.split(" ").slice(0, 2).join(" ")}
                  </tspan>
                  <tspan
                    x={baseFontPositionX}
                    dy="1.2em"
                    textAnchor="start"
                    dominantBaseline="middle"
                  >
                    {props.data.name.split(" ").slice(2).join(" ")}
                  </tspan>
                </>
              )}
            </text>
          )}
          {props.data.cycleType === "High" && (
            <text
              className={"name"}
              x="0"
              y={baseFontPositionY}
              fontSize={radarItemFontSize}
              fontFamily={fontFamily}
              fontWeight={"Bold"}
              textAnchor="start"
              dominantBaseline="middle"
              style={textStyle}
            >
              {props.data.name === "Low-Code/No-Code Solutions" ? (
                <>
                  <tspan
                    x={baseFontPositionX - 6}
                    dy="0"
                    textAnchor="start"
                    dominantBaseline="middle"
                  >
                    {"Low-Code/No-Code"}
                  </tspan>
                  <tspan
                    x={baseFontPositionX - 6}
                    dy="1.2em"
                    textAnchor="start"
                    dominantBaseline="middle"
                  >
                    {"Solutions"}
                  </tspan>
                </>
              ) : (
                <>
                  <tspan
                    x={baseFontPositionX - 6}
                    dy="0"
                    textAnchor="start"
                    dominantBaseline="middle"
                  >
                    {props.data.name.split(" ").slice(0, 2).join(" ")}
                  </tspan>
                  <tspan
                    x={baseFontPositionX - 6}
                    dy="1.2em"
                    textAnchor="start"
                    dominantBaseline="middle"
                  >
                    {props.data.name.split(" ").slice(2).join(" ")}
                  </tspan>
                </>
              )}
            </text>
          )}
          {props.data.cycleType === "Moderate" && (
            <text
              className={"name"}
              x="0"
              y={baseFontPositionY}
              fontSize={radarItemFontSize}
              fontFamily={fontFamily}
              fontWeight={"Bold"}
              textAnchor="start"
              dominantBaseline="middle"
              style={textStyle}
            >
              {props.data.name === "Low-Code/No-Code Solutions" ? (
                <>
                  <tspan
                    x={baseFontPositionX - 9}
                    dy="0"
                    textAnchor="start"
                    dominantBaseline="middle"
                  >
                    {"Low-Code/No-Code"}
                  </tspan>
                  <tspan
                    x={baseFontPositionX - 9}
                    dy="1.2em"
                    textAnchor="start"
                    dominantBaseline="middle"
                  >
                    {"Solutions"}
                  </tspan>
                </>
              ) : (
                <>
                  <tspan
                    x={baseFontPositionX - 9}
                    dy="0"
                    textAnchor="start"
                    dominantBaseline="middle"
                  >
                    {props.data.name.split(" ").slice(0, 2).join(" ")}
                  </tspan>
                  <tspan
                    x={baseFontPositionX - 9}
                    dy="1.2em"
                    textAnchor="start"
                    dominantBaseline="middle"
                  >
                    {props.data.name.split(" ").slice(2).join(" ")}
                  </tspan>
                </>
              )}
            </text>
          )}
        </g>
      </Draggable>
    </ItemWrapper>
  );
}

Item.propTypes = {
  rotateDegrees: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
};

export default Item;
