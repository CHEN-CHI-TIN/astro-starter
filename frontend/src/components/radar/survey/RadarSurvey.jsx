import React, { useState, useEffect, useRef } from "react";
import BeatLoader from "react-spinners/BeatLoader";
// import { Document, Page } from 'react-pdf';
import DropdownMenu from "./components/DropdownMenu";
const cover = "/img_cover.png";
import SVGRadarComponent from "./components/SVGRadarComponent";
// import MyStep from "./components/MyStep";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./App.css";
import {
  filterKeys,
  extractTechIds_new,
  DivButton,
  HypeCycleListBlock,
  InnovationListBlock,
  transformInput,
  transformFinallResult,
} from "./components/CosWheel";
import InputTextLimit from "./components/InputTextLimit";
import uiContent from "./content/uiContent.json";
import { HYPECYCLES } from "./content/hypeCycles";
import CategoryButton from "./components/CategoryButton";
import useCustomStore from "./store/useCustomStore";
import { authMiddleware } from "../../../utils/authMiddleware";

import recommend from "./recommend.json";

const list = {
  genAI: [
    "Hype Cycle for Generative AI, 2023",
    "Hype Cycle for Artificial Intelligence, 2023",
    "Hype Cycle for IT Management Intelligence, 2023",
    "Hype Cycle for Natural Language Technologies, 2023",
    "Hype Cycle for Digital Government Services, 2023",
  ],
  esg: [
    "Hype Cycle for Environmental Sustainability, 2023",
    "Hype Cycle for Smart City Technologies and Solutions, 2023",
    "Hype Cycle for Managing Operational Technology, 2023",
    "Hype Cycle for Smart City and Sustainability in China, 2023",
    "Hype Cycle for Infrastructure Strategy, 2023",
  ],
  dataGovernance: [
    "Hype Cycle for Data and Analytics Programs and Practices, 2023",
    "Hype Cycle for Data and Analytics Governance, 2023",
    "Hype Cycle for Data Management, 2023",
    "Hype Cycle for Data Security, 2023",
    "Hype Cycle for Data, Analytics and AI in China, 2023",
  ],
  eam: [
    "Hype Cycle for Supply Chain Planning Technologies, 2023",
    "Hype Cycle for Enterprise Architecture, 2023",
    "Hype Cycle for Managing Operational Technology, 2023",
    "Hype Cycle for Storage and Data Protection Technologies, 2023",
    "Hype Cycle for Operating Models, 2023",
  ],
};

const staff = {
  26046: ["genAI", "dataGovernance", "eam"],
  26128: ["dataGovernance", "eam"],
  17008: ["esg", "dataGovernance", "eam"],
  16320: ["esg"],
  27748: ["esg"],
  25185: ["genAI", "dataGovernance", "eam"],
  27721: ["esg"],
  27750: ["esg", "eam"],
  27897: ["genAI"],
  27902: ["genAI"],
  11419: ["genAI", "dataGovernance", "eam"],
};

const userInfo = JSON.parse(localStorage.getItem("userInfo"));
const userEmpNo = userInfo?.emp_no;
const userCategories = staff[userEmpNo] || [];
const userIndexes = userCategories.flatMap((category) => list[category] || []);

console.log(userIndexes, "+++++++++++++");

function reset() {
  const itemsToRemove = [
    "card1",
    "card2",
    "card3",
    "card4",
    "card5",
    "card6",
    "over",
    "checkedState",
    "dynamicStartTime",
    "gartnerIndex",
    "gartnerTitles",
    "hypeCycleSelect",
    "hypeCycleSelectCard4",
    "inactiveTime",
    "innovationAllData",
    "innovationIndexs",
    "mediaQuery",
    "next",
    "nextRef",
    "nowCard",
    "questionLength",
    "selectedValues",
    "staffEmail",
    "startTime",
  ];

  itemsToRemove.forEach((item) => {
    localStorage.removeItem(item);
  });
}

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

// TODO: 2023.12.08 待加入環境變數,現在的寫法怪怪的不知為何?
const REACT_APP_API_URL = "https://20.28.192.182";
export function RadarSurvey() {
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isUnit, setIsUnit] = useState(false);
  const [card1, setCard1] = useLocalStorage("card1", true);
  const [card2, setCard2] = useLocalStorage("card2", false);
  const [card3, setCard3] = useLocalStorage("card3", false);
  const [card4, setCard4] = useLocalStorage("card4", false);
  const [card5, setCard5] = useLocalStorage("card5", false);
  const [card6, setCard6] = useLocalStorage("card6", false);
  const [over, setOver] = useLocalStorage("over", false);
  const [zone, setZone] = useLocalStorage("zone", "");
  const [staffEmail, setStaffEmail] = useLocalStorage("staffEmail", "");
  const [staffUnit, setStaffUnit] = useLocalStorage("staffUnit", "");
  const [recommendIndex, setRecommendIndex] = useLocalStorage(
    "recommendIndex",
    [],
  );
  const [hypeCycleSelect, setHypeCycleSelect] = useLocalStorage(
    "hypeCycleSelect",
    0,
  );
  const [hypeCycleSelectCard4, setHypeCycleSelectCard4] = useLocalStorage(
    "hypeCycleSelectCard4",
    0,
  );
  const [checkedState, setCheckedState] = useLocalStorage("checkedState", {});
  const [gartnerTitles, setGartnerTitles] = useLocalStorage(
    "gartnerTitles",
    [],
  );
  const [gartnerIndex, setGartnerIndex] = useLocalStorage("gartnerIndex", []);
  const [innovationIndexs, setInnovationIndexs] = useLocalStorage(
    "innovationIndexs",
    [],
  );
  const [innovationAllData, setInnovationAllData] = useLocalStorage(
    "innovationAllData",
    [],
  );
  const [selectedValues, setSelectedValues] = useLocalStorage(
    "selectedValues",
    [],
  );
  const [mediaQuery, setMediaQuery] = useLocalStorage("mediaQuery", 230); // 預設值設為 230
  const [nowCard, setnowCard] = useLocalStorage("nowCard", 0);
  const [next, setnext] = useLocalStorage("next", false);
  const [nextRef, setnextRef] = useLocalStorage("nextRef", false);
  const [questionLength, setQuestionLength] = useLocalStorage(
    "questionLength",
    0,
  );
  const [sqlHypeCycleCategory, setsqlHypeCycleCategory] = useLocalStorage(
    "sqlHypeCycleCategory",
    [],
  );
  const [hypecycleCategory, setHypecycleCategory] = useLocalStorage(
    "hypecycleCategory",
    false,
  );
  const {
    category,
    fetchCategory,
    categorySelect,
    setCategorySelect,
    sqlHypecycle,
    fetchHypeCycle,
    fetchHypeCycleAll,
  } = useCustomStore();

  useEffect(() => {
    const authenticate = async () => {
      await authMiddleware();
    };
    // authenticate();
  }, []);

  /*-------------------------------- 計算時間 ------------------------------*/
  const [startTime, setStartTime] = useLocalStorage("startTime", null);
  const [dynamicStartTime, setDynamicStartTime] = useLocalStorage(
    "dynamicStartTime",
    null,
  );
  const [elapsedTime, setElapsedTime] = useState(0);
  const [inactiveTime, setInactiveTime] = useLocalStorage("inactiveTime", 0);
  const [isOpen, setIsOpen] = useState(false);

  // 回答完就不在計時，不要等到送出時才停止。
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // 頁面不可見，記錄當前時間
        setInactiveTime(Date.now());
      } else if (card5 === false) {
        // 頁面可見，更新開始時間
        const inactiveDuration = Date.now() - inactiveTime;
        setDynamicStartTime(
          (prevStartTime) =>
            prevStartTime + Math.floor(inactiveDuration / 1000),
        );
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [inactiveTime, setInactiveTime, setDynamicStartTime, card5]);

  // 此處的 dynamicStartTime 動態的起始時間，當視窗焦點移開時，會暫停計時；若再次焦點至視窗會從新紀錄起始時間。
  // startTime 才是最開始的時間。
  useEffect(() => {
    let timerId;
    if (dynamicStartTime && card5 === false) {
      timerId = setInterval(() => {
        const now = Math.floor(Date.now() / 1000);
        setElapsedTime(now - dynamicStartTime);
      }, 1000);
    }
    return () => clearInterval(timerId);
  }, [dynamicStartTime, card5]);

  const handleButtonClick = () => {
    const openTime = Math.floor(Date.now() / 1000);
    setStartTime(openTime);
    setDynamicStartTime(openTime);
    // 其他的按鈕點擊處理邏輯
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");
    const second = String(date.getSeconds()).padStart(2, "0");
    return `${year}/${month}/${day} ${hour}:${minute}:${second}`;
  };

  const formatElapsedTime = (seconds) => {
    const hour = Math.floor(seconds / 3600);
    const minute = Math.floor((seconds % 3600) / 60);
    const second = seconds % 60;
    return `${hour}:${minute}:${second}`;
  };
  /*-------------------------------- 計算時間 ------------------------------*/

  // const Card1Intro = ({ title, onClick }) => {
  //   const [name, setName] = useState("");
  //   const [num, setNum] = useState("");
  //   const [email, setEmail] = useState("");
  //   const [isValid, setIsValid] = useState({
  //     isValidNumber: false,
  //     isValidText: false,
  //     isValidEmail: false,
  //     isWithinLimitNum: true,
  //     isWithinLimitText: true,
  //     isWithinLimitEmail: true,
  //   });

  //   return (

  //   );
  // };

  const Card2ChoiceClass = ({ title, lastClick, nextClick, zone }) => {
    return (
      <>
        <div className="text-2xl md:text-3xl font-bold mb-1">{title}</div>
        <div className="flex flex-1 md:flex-[2] md:px-10 flex-col md:flex-row">
          <div
            style={{ minWidth: "300px" }}
            className="flex flex-[1] md:flex-[3] flex-col justify-center text-xl gap-3 mt-3"
            // css
          >
            <div className="mb-1 text-bold text-base sm:text-2xl lg:3xl">
              {uiContent.step2.description["1"]}
            </div>
            <div
              className="pl-6 sm:flex flex-col gap-2 hidden text-sm md:text-lg"
              // style={{ fontSize: "clamp(12px, 1.5vw, 24px)" }}
            >
              <div>{uiContent.step2.description["2"]}</div>
              <div>{uiContent.step2.description["3"]}</div>
              <div>{uiContent.step2.description["4"]}</div>
              <div>{uiContent.step2.description["5"]}</div>
            </div>
          </div>
          <div
            style={{ overflowY: "auto" }}
            className="flex flex-[4] items-center flex-col justify-center"
          >
            <div className="bg-gray-200 md:bg-none md:hidden w-full h-[1px] my-2"></div>
            <div className="text-base sm:text-3xl font-medium">
              請「點擊」下方雷達圖選擇對應分類：
            </div>
            <div
              style={{
                position: "relative",
                cursor: "pointer",
              }}
            >
              <div
                className="text-xl sm:text-4xl"
                style={{
                  position: "absolute",
                  zIndex: 2,
                  left: "15%",
                  top: "25%",
                  fontWeight: "bolder",
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setZone("H001");
                  setStaffEmail("H001");
                }}
              >
                創新研發
              </div>
              <div
                className="text-xl sm:text-4xl"
                style={{
                  position: "absolute",
                  zIndex: 2,
                  left: "55%",
                  top: "25%",
                  fontWeight: "bolder",
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setZone("H004");
                  setStaffEmail("H004");
                }}
              >
                雲網服務
              </div>
              <div
                className="text-xl sm:text-4xl"
                style={{
                  position: "absolute",
                  zIndex: 2,
                  left: "15%",
                  top: "65%",
                  fontWeight: "bolder",
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setZone("H002");
                  setStaffEmail("H002");
                }}
              >
                應用開發
              </div>
              <div
                className="text-xl sm:text-4xl"
                style={{
                  position: "absolute",
                  zIndex: 2,
                  left: "55%",
                  top: "65%",
                  fontWeight: "bolder",
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setZone("H003");
                  setStaffEmail("H003");
                }}
              >
                系統運維
              </div>
              <SVGRadarComponent
                radius={mediaQuery}
                zone={zone}
                setZone={setZone}
                setResultZone={setStaffEmail}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-6">
          <DivButton text={"上一步"} onClick={lastClick} />
          <DivButton
            bgColor={zone === "" ? "gray" : "#007bff"}
            noPoint={zone === "" ? "none" : ""}
            text={"下一步"}
            onClick={nextClick}
          />
        </div>
      </>
    );
  };

  const Card5Submit = ({ title, lastClick, nextClick }) => {
    return (
      <>
        <div className="text-2xl font-bold">{title}</div>
        <div className="flex-1 p-4 flex flex-col h-3">
          <div
            className="flex flex-1 flex-col"
            style={{
              overflowY: "auto",
              borderLeft: "1.5px solid rgba(0,0,0,0.5)",
              borderRight: "1.5px solid rgba(0,0,0,0.5)",
              borderTop: "1.5px solid rgba(0,0,0,0.5)",
              borderBottom: "1.5px solid rgba(0,0,0,0.5)",
            }}
          >
            {gartnerTitles &&
              gartnerTitles.map((item, index) => {
                return (
                  <InnovationListBlock
                    key={index + item + "Card5Submit"}
                    HypeCycleName={
                      // filterKeysByValue(checkedState)[index] + 1 + ". " + item
                      item
                    }
                    onClick={() => {
                      setHypeCycleSelectCard4(index);
                    }}
                    backgroundColor={
                      index === hypeCycleSelectCard4 ? "rgba(0,0,0,0.2)" : ""
                    }
                  />
                );
              })}
          </div>
          <div
            className="flex flex-[3] flex-col p-4 bg-neutral-200 gap-3 text-xs"
            style={{
              overflowY: "auto",
              borderLeft: "1.5px solid rgba(0,0,0,0.5)",
              borderBottom: "1.5px solid rgba(0,0,0,0.5)",
              borderRight: "1.5px solid rgba(0,0,0,0.5)",
              borderTop: "1.5px solid rgba(0,0,0,0.5)",
            }}
            key={"checkScroll"}
          >
            {/* {JSON.stringify(innovationIndexs[innovationSelect])} */}
            {innovationAllData[hypeCycleSelectCard4] &&
              innovationAllData[hypeCycleSelectCard4]["TechList"].map(
                (item, index) => {
                  // console.log(index, "##########");
                  // setCurrentTechName(item["innovation_tech_name"]);
                  return (
                    <div
                      className="flex flex-col rounded-lg bg-slate-100 shadow-sm p-4"
                      key={`card5submit${item}${index}`}
                    >
                      <div className="text-xl flex">
                        {item["innovation_tech_name"]}
                      </div>
                      <div style={{ flex: 2 }} className="flex flex-col">
                        <div
                          style={{ backgroundColor: "rgba(0,0,0,0.1)" }}
                          className="flex flex-1 justify-between"
                        >
                          <div
                            className="flex flex-1 items-center justify-center flex-col gap-2"
                            style={{
                              fontSize: "clamp(12px, 1.5vw, 24px)",
                              fontWeight: "normal",
                              borderTop: "1.3px solid rgba(0,0,0,0.5)",
                              borderBottom: "1.3px solid rgba(0,0,0,0.5)",
                              borderLeft: "1.3px solid rgba(0,0,0,0.5)",
                              borderRight: "1.3px solid rgba(0,0,0,0.5)",
                            }}
                          >
                            <div>可行性</div>
                            <div>評分</div>
                          </div>
                          <div
                            className="flex-1 flex flex-col items-center justify-center p-1"
                            style={{
                              borderTop: "1.3px solid rgba(0,0,0,0.5)",
                              borderBottom: "1.3px solid rgba(0,0,0,0.5)",
                              borderRight: "1.3px solid rgba(0,0,0,0.5)",
                            }}
                          >
                            <div className="tesxt-sm">1 分</div>
                            <div className="flex items-center justify-center">
                              <label>
                                <input
                                  type="radio"
                                  name={
                                    gartnerIndex[hypeCycleSelectCard4] +
                                    item["innovation_tech_name"]
                                  }
                                  checked={
                                    selectedValues?.[
                                      gartnerIndex[hypeCycleSelectCard4] +
                                        item["innovation_tech_name"]
                                    ]?.["tech_assement"]?.[
                                      "feasibility_level"
                                    ] === "1"
                                  }
                                  value="1"
                                  style={{
                                    transform: "scale(2)",
                                    margin: "10px",
                                  }}
                                  disabled={card5 ? true : false}
                                />
                              </label>
                            </div>
                          </div>
                          <div
                            className="flex-1 flex flex-col items-center justify-center p-1"
                            style={{
                              borderTop: "1.3px solid rgba(0,0,0,0.5)",
                              borderBottom: "1.3px solid rgba(0,0,0,0.5)",
                              borderRight: "1.3px solid rgba(0,0,0,0.5)",
                            }}
                          >
                            <div className="tesxt-sm">2 分</div>
                            <div className="flex items-center justify-center">
                              <label>
                                <input
                                  type="radio"
                                  name={
                                    gartnerIndex[hypeCycleSelectCard4] +
                                    item["innovation_tech_name"]
                                  }
                                  checked={
                                    selectedValues?.[
                                      gartnerIndex[hypeCycleSelectCard4] +
                                        item["innovation_tech_name"]
                                    ]?.["tech_assement"]?.[
                                      "feasibility_level"
                                    ] === "2"
                                  }
                                  value="2"
                                  style={{
                                    transform: "scale(2)",
                                    margin: "10px",
                                  }}
                                  disabled={card5 ? true : false}
                                />
                              </label>
                            </div>
                          </div>
                          <div
                            className="flex-1 flex flex-col items-center justify-center p-1"
                            style={{
                              borderTop: "1.3px solid rgba(0,0,0,0.5)",
                              borderBottom: "1.3px solid rgba(0,0,0,0.5)",
                              borderRight: "1.3px solid rgba(0,0,0,0.5)",
                            }}
                          >
                            <div className="tesxt-sm">3 分</div>
                            <div className="flex items-center justify-center">
                              <label>
                                <input
                                  type="radio"
                                  name={
                                    gartnerIndex[hypeCycleSelectCard4] +
                                    item["innovation_tech_name"]
                                  }
                                  checked={
                                    selectedValues?.[
                                      gartnerIndex[hypeCycleSelectCard4] +
                                        item["innovation_tech_name"]
                                    ]?.["tech_assement"]?.[
                                      "feasibility_level"
                                    ] === "3"
                                  }
                                  value="3"
                                  style={{
                                    transform: "scale(2)",
                                    margin: "10px",
                                  }}
                                  disabled={card5 ? true : false}
                                />
                              </label>
                            </div>
                          </div>
                          <div
                            className="flex-1 flex flex-col items-center justify-center p-1"
                            style={{
                              borderTop: "1.3px solid rgba(0,0,0,0.5)",
                              borderBottom: "1.3px solid rgba(0,0,0,0.5)",
                              borderRight: "1.3px solid rgba(0,0,0,0.5)",
                            }}
                          >
                            <div className="tesxt-sm">4 分</div>
                            <div className="flex items-center justify-center">
                              <label>
                                <input
                                  type="radio"
                                  name={
                                    gartnerIndex[hypeCycleSelectCard4] +
                                    item["innovation_tech_name"]
                                  }
                                  checked={
                                    selectedValues?.[
                                      gartnerIndex[hypeCycleSelectCard4] +
                                        item["innovation_tech_name"]
                                    ]?.["tech_assement"]?.[
                                      "feasibility_level"
                                    ] === "4"
                                  }
                                  value="4"
                                  style={{
                                    transform: "scale(2)",
                                    margin: "10px",
                                  }}
                                  disabled={card5 ? true : false}
                                />
                              </label>
                            </div>
                          </div>
                          <div
                            className="flex-1 flex flex-col items-center justify-center p-1"
                            style={{
                              borderTop: "1.3px solid rgba(0,0,0,0.5)",
                              borderBottom: "1.3px solid rgba(0,0,0,0.5)",
                              borderRight: "1.3px solid rgba(0,0,0,0.5)",
                            }}
                          >
                            <div className="tesxt-sm">5 分</div>
                            <div className="flex items-center justify-center">
                              <label>
                                <input
                                  type="radio"
                                  name={
                                    gartnerIndex[hypeCycleSelectCard4] +
                                    item["innovation_tech_name"]
                                  }
                                  checked={
                                    selectedValues?.[
                                      gartnerIndex[hypeCycleSelectCard4] +
                                        item["innovation_tech_name"]
                                    ]?.["tech_assement"]?.[
                                      "feasibility_level"
                                    ] === "5"
                                  }
                                  value="5"
                                  style={{
                                    transform: "scale(2)",
                                    margin: "10px",
                                  }}
                                  disabled={card5 ? true : false}
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                },
              )}
          </div>
        </div>
        <div className="flex justify-end gap-6">
          <DivButton text={"上一步"} onClick={lastClick} />
          <DivButton
            text={"送出"}
            onClick={() => {
              console.log(
                transformFinallResult(selectedValues),
                "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
              );
              setOver(true);
            }}
          />
        </div>
      </>
    );
  };

  /**
   * Check the size of the window and set the media query accordingly.
   */
  useEffect(() => {
    const checkSize = () => {
      if (window.innerWidth < 640) {
        setMediaQuery(120);
      } else if (window.innerWidth < 1024) {
        setMediaQuery(170); // 其他情況，設置 radius 為 230
      } else if (window.innerWidth < 1280) {
        setMediaQuery(300); // 其他情況，設置 radius 為 230
      }
    };
    window.addEventListener("resize", checkSize);
    checkSize();
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  useEffect(() => {
    if (card1) {
      localStorage.removeItem("card1");
      localStorage.removeItem("card2");
      localStorage.removeItem("card3");
      localStorage.removeItem("card4");
      localStorage.removeItem("card5");
      localStorage.removeItem("checkedState");
      localStorage.removeItem("dynamicStartTime");
      localStorage.removeItem("gartnerIndex");
      localStorage.removeItem("gartnerTitles");
      localStorage.removeItem("hypeCycleSelect");
      localStorage.removeItem("hypeCycleSelectCard4");
      localStorage.removeItem("inactiveTime");
      localStorage.removeItem("innovationAllData");
      localStorage.removeItem("innovationIndexs");
      localStorage.removeItem("mediaQuery");
      localStorage.removeItem("next");
      localStorage.removeItem("nextRef");
      localStorage.removeItem("nowCard");
      localStorage.removeItem("questionLength");
      localStorage.removeItem("selectedValues");
      localStorage.removeItem("staffEmail");
      localStorage.removeItem("startTime");
    }
  }, [card1]);

  useEffect(() => {
    if (card2) {
      fetch(`${REACT_APP_API_URL}/api/radar/radartype`)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          // setRadarType(result);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [card2]);

  useEffect(() => {
    if (card3) {
      fetchCategory(`${REACT_APP_API_URL}/api/radar/hypecyclecategory`);
      fetchHypeCycleAll(REACT_APP_API_URL);
    }
  }, [card3]);

  useEffect(() => {
    // fetchHypeCycle(REACT_APP_API_URL, categorySelect);
  }, [categorySelect]);

  const divRefs = useRef([]);
  useEffect(() => {
    divRefs.current = innovationAllData.map(
      (item, index) => divRefs.current[index] || React.createRef(),
    );
  }, [innovationAllData]);

  const scrollToDiv = (index) => {
    const currentDiv = divRefs.current[index];
    if (currentDiv) {
      currentDiv.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToDiv(nextRef);
  }, [next]);

  return (
    // <div className="flex-col w-full flex-grow h-[70%] bg-red-50 flex items-center justify-between">
    //   {/* <MyStep curStep={nowCard} /> */}
    // </div>
    <div className="flex flex-col p-6 gap-2 w-full h-[90vh] justify-between bg-white">
      {card1 && (
        <form
          className="flex flex-col"
          onSubmit={(event) => {
            event.preventDefault();
            if (isEmailValid) {
              setCard1(false);
              setCard2(false);
              setCard3(true);
              setCard4(false);
              setnowCard(3);
              handleButtonClick();
            } else {
              alert("請先輸入有效的電子郵件地址");
            }
          }}
        >
          <div className="flex-[1] text-2xl md:text-3xl font-bold">
            {uiContent.step1.title}
          </div>
          <div className="flex-[4]">
            <div className="mt-3 text-lg sm:text-lg">
              歡迎參與「
              <span style={{ fontWeight: "bold" }}>
                創新技術對標OKRs之可行性評估系統
              </span>
              」！
            </div>
            <div className="mt-1">
              本系統係以視覺化方式呈現Gartner的「Hype
              Cycle文獻」，協助各單位建立
              <span style={{ fontWeight: "bold" }}>具參考價值的技術雷達圖</span>
              。
            </div>
            <div>
              您的寶貴意見將有助於推動各單位的技術發展與決策。為表達感謝，企業架構團隊將
              <span style={{ textDecoration: "underline" }}>
                優先、即時提供技術雷達圖
              </span>
              ，並
              <span style={{ textDecoration: "underline" }}>每季持續更新</span>
              ，這將有助於您的團隊了解技術發展方向，更有效地實現OKRs。再次感謝您的參與！
            </div>
          </div>
          <div className="flex-[7] flex flex-col md:flex-row">
            <div className="flex-grow flex items-center justify-center h-full">
              <img className="w-3/5" src={cover} alt="描述" />
            </div>
            <div className="flex flex-col flex-[3] justify-center items-center">
              <div className="flex flex-col w-[70%] p-6 justify-center bg-slate-100 rounded-md shadow-lg">
                <span className="text-[18px] mb-3">{"處級單位："}</span>
                <select
                  defaultValue=""
                  className="p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  onChange={(e) => {
                    // console.log(e.target.value);
                    let target = e.target.value;
                    setRecommendIndex(recommend[target]);
                    setIsUnit(true);
                  }}
                >
                  <option value="" disabled>
                    請選擇處級單位
                  </option>
                  <option value="dev01">應用開發一處</option>
                  <option value="dev02">應用開發二處</option>
                  <option value="WTF">戰略策劃處</option>
                  {/* <option value="global_it">全球資訊服務</option> */}
                  <option value="global_sec">全球資安服務處</option>
                  <option value="global_cloud">全球雲網服務處</option>
                  {/* <option value="it_hr">IT行政處</option> */}
                </select>
              </div>
              {/* <div className="flex flex-col w-[70%] p-6 justify-center bg-slate-100 rounded-md shadow-lg">
                  <span className="mb-3">{"請輸入公司 Email："}</span>
                  <input
                    type="email"
                    placeholder="Email"
                    value={
                      JSON.parse(window.localStorage.getItem("staffEmail")) ||
                      ""
                    }
                    className="p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    //! 確保 staffEmail 的狀態始終與輸入欄位的內容同步。
                    onChange={(e) => {
                      setStaffEmail(e.target.value);
                      const emailRegex =
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                      if (emailRegex.test(e.target.value)) {
                        setIsEmailValid(true);
                      } else {
                        // alert("請輸入有效的電子郵件地址");
                        setIsEmailValid(false);
                      }
                    }}
                  />
                </div> */}
            </div>
          </div>
          <div className="flex-[1] flex items-end justify-end">
            <button
              className={`text-white rounded px-2 py-1 text-center cursor-pointer select-none transition-colors duration-300 sm:text-2xl text-sm ${
                isUnit ? "bg-blue-500" : "bg-gray-300"
              }`}
              onClick={() => {
                if (isUnit) {
                  setCard1(false);
                  setCard2(false);
                  setCard3(true);
                  setCard4(false);
                  setnowCard(3);
                  handleButtonClick();
                  setIsEmailValid(false);
                } else {
                  alert("請先選擇處級單位");
                }
              }}
            >
              下一步
            </button>
          </div>
          {/* </form> */}
          {/* <div className="mt-3 text-lg sm:text-lg">
            歡迎參與「
            <span style={{ fontWeight: "bold" }}>
              創新技術對標OKRs之可行性評估系統
            </span>
            」！
          </div> */}
        </form>
        // <Card1Intro
        //   title={uiContent.step1.title}
        //   onClick={() => {
        //     setCard1(false);
        //     setCard2(false);
        //     setCard3(true);
        //     setCard4(false);
        //     setnowCard(3);
        //     handleButtonClick();
        //   }}
        // />
      )}
      {card2 && (
        <Card2ChoiceClass
          title={uiContent.step2.title}
          lastClick={() => {
            setCard1(true);
            setCard2(false);
            setCard3(false);
            setCard4(false);
            setZone("");
          }}
          nextClick={() => {
            setCard1(false);
            setCard2(false);
            setCard3(true);
            setCard4(false);
            setnowCard(3);
          }}
          zone={zone}
        />
      )}
      {!Array.isArray(category) || (category.length !== 0 && card3) ? (
        <>
          <div className="flex flex-col md:flex-row items-top justify-between">
            <div className="text-2xl font-bold">{"專家評估-技術分類"}</div>
            <div className="flex flex-row items-center justify-between gap-3">
              <div
                onClick={() => {
                  reset();
                  window.location.reload();
                }}
                className="cursor-pointer rounded-lg p-2 bg-slate-200 hover:bg-slate-300 sm:text-md text-sm"
              >
                重新開始
              </div>
              <div className="flex flex-col font-bold text-sm md:text-md">
                <div>開始時間：{formatTime(startTime)}</div>
                {/* <div>上次填寫時間：{formatTime(dynamicStartTime)}</div> */}
                <div>實際經過時間：{formatElapsedTime(elapsedTime)}</div>
              </div>
            </div>
          </div>
          <div
            style={{ minWidth: "300px" }}
            className="justify-center text-sm md:text-xl mt-3"
            // css
          >
            {/* <div>{uiContent.step3.description["1"]}</div> */}
            二、選擇Hype Cycle文獻：以下提供113份Hype Cycle文獻，請各位專家挑選
            <span style={{ textDecoration: "underline" }}>
              與所屬部門的OKRs相關
            </span>
            且<span style={{ textDecoration: "underline" }}>具應用價值</span>
            之主題。【建議3~5份】
            <br />
          </div>
          <div className="flex flex-col md:flex-row h-3/4 border-[2px] border-black">
            <div
              style={{
                boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.25)",
              }}
              className="flex flex-col flex-[3] md:border-r-[0.5px] border-black overflow-auto"
            >
              {Array.isArray(category) ? (
                category.map((item, index) => {
                  const isUserCategory = recommend[item.category_index].some(
                    (rec) => userIndexes.includes(rec),
                  );
                  return (
                    <CategoryButton
                      key={item + index}
                      categoryTitle={
                        <div>
                          <div>{item.title_tw}</div>
                          <div>{item.title_en}</div>
                        </div>
                      }
                      onClick={() => {
                        setCategorySelect(item.category_index);
                      }}
                      backgroundColor={
                        categorySelect === item.category_index
                          ? isUserCategory
                            ? "rgba(144,238,144,0.5)"
                            : "rgba(0,0,0,0.3)"
                          : isUserCategory
                            ? "lightgreen"
                            : ""
                      }
                    />
                  );
                })
              ) : (
                <div>Category is not available</div>
              )}
            </div>
            <div
              className="border-black border-b-[0.5px] md:border-b-[0] md:border-r-[0.5px]"
              style={{
                flex: 4,
                overflowY: "auto",
              }}
            >
              {sqlHypecycle[categorySelect] ? (
                sqlHypecycle[categorySelect].map((item, index) => {
                  const isUserIndex = userIndexes.includes(item.title);
                  // console.log(item.gartner_index, "####");
                  return (
                    <HypeCycleListBlock
                      key={item.gartner_index}
                      hypeCycleTitle={item.title}
                      onClick={() => {
                        console.log(item, "!!!");
                        setHypeCycleSelect(item.gartner_index);
                      }}
                      backgroundColor={
                        item.gartner_index === hypeCycleSelect
                          ? isUserIndex
                            ? "rgba(144,238,144,0.5)"
                            : "rgba(0,0,0,0.3)"
                          : isUserIndex
                            ? "lightgreen"
                            : ""
                        // : "rgb(255,255,255)"
                      }
                      id={item.gartner_index}
                      checkedState={checkedState}
                      setCheckedState={setCheckedState}
                    />
                  );
                })
              ) : (
                <div className="p-10 gap-3">
                  <div className="text-gray flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    選擇左側分類
                  </div>
                  <Skeleton count={5} />
                </div>
              )}
            </div>
            <div
              className="flex flex-[5] flex-col p-4 bg-neutral-200 gap-3 text-sm"
              style={{
                overflowY: "auto",
              }}
            >
              <div className="md:text-xl font-bold">
                {/* {sqlHypecycle?.find(item => item.gartner_index === hypeCycleSelect)?.["title"]} */}
                {sqlHypecycle[categorySelect]?.find(
                  (item) => item.gartner_index === hypeCycleSelect,
                )?.title || (
                  <div>
                    <Skeleton className="bg-gray-100" />
                  </div>
                )}
              </div>
              {/* <div>{sqlHypecycle?.find(item => item.gartner_index === hypeCycleSelect)?.["gartner_index"]}</div> */}
              <div className="flex flex-col sm:flex-row gap-2 mb-6">
                <div className="flex flex-1 flex-col">
                  <div className="text-base">{"英文摘要"}</div>

                  <div>
                    {sqlHypecycle[categorySelect]?.find(
                      (item) => item.gartner_index === hypeCycleSelect,
                    )?.abstract_en || (
                      <div>
                        <Skeleton count={10} className="bg-gray-100" />
                      </div>
                    )}
                  </div>
                  {/* <div>{sqlHypecycle?.find(item => item.gartner_index === hypeCycleSelect)?.["abstract_en"]}</div> */}
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="text-base">{"中文摘要"}</div>
                  <div>
                    {sqlHypecycle[categorySelect]?.find(
                      (item) => item.gartner_index === hypeCycleSelect,
                    )?.abstract_tw || (
                      <div>
                        <Skeleton count={10} className="bg-gray-100" />
                      </div>
                    )}
                  </div>
                  {/* <div>{sqlHypecycle?.find(item => item.gartner_index === hypeCycleSelect)?.["abstract_tw"]}</div> */}
                </div>
              </div>

              {/* <div>{sqlHypecycle?.find(item => item.gartner_index === hypeCycleSelect)?.["releaseDate"]}</div> */}
              <img
                className="-mb-3 md:-mb-6"
                style={{ clipPath: "inset(0 0 6% 0)" }}
                src={
                  HYPECYCLES[
                    sqlHypecycle[categorySelect]?.find(
                      (item) => item.gartner_index === hypeCycleSelect,
                    )?.["gartner_index"]
                  ]?.url
                }
                alt={
                  HYPECYCLES[
                    sqlHypecycle[categorySelect]?.find(
                      (item) => item.gartner_index === hypeCycleSelect,
                    )?.["gartner_index"]
                  ]?.title
                }
              />
              <img
                style={{ clipPath: "inset(0 0 6px 0)" }}
                src={
                  HYPECYCLES[
                    sqlHypecycle[categorySelect]?.find(
                      (item) => item.gartner_index === hypeCycleSelect,
                    )?.["gartner_index"] + "_extra"
                  ]?.url
                }
                alt={
                  HYPECYCLES[
                    sqlHypecycle[categorySelect]?.find(
                      (item) => item.gartner_index === hypeCycleSelect,
                    )?.["gartner_index"] + "_extra"
                  ]?.title
                }
              />
            </div>
          </div>
          <div className="flex justify-end gap-6">
            {/* {"測試：" + JSON.stringify(filterKeys(checkedState))} */}
            <div className="text-lg flex items-center">
              目前已選數量：
              {
                Object.keys(checkedState).filter((key) => checkedState[key])
                  .length
              }
            </div>
            <DivButton
              text={"上一步"}
              onClick={() => {
                setCard1(true);
                setCard2(false);
                setCard3(false);
                setCard4(false);
                reset();
              }}
            />
            <DivButton
              bgColor={filterKeys(checkedState).length > 2 ? "#007bff" : "gray"}
              noPoint={filterKeys(checkedState).length > 2 ? "" : "none"}
              text={"下一步"}
              onClick={() => {
                let idex = [];
                let tempGartnerTitles = [];
                let tempGartnerIndex = [];

                function mergeArrays(obj) {
                  let result = [];
                  for (let key in obj) {
                    if (Array.isArray(obj[key])) {
                      result = result.concat(obj[key]);
                    }
                  }
                  return result;
                }

                filterKeys(checkedState).forEach((item) => {
                  const matchingItem = mergeArrays(sqlHypecycle).find(
                    (element) => element.gartner_index === item,
                  );
                  if (matchingItem) {
                    tempGartnerTitles.push(matchingItem.title);
                    tempGartnerIndex.push(matchingItem.gartner_index);
                    idex.push(
                      extractTechIds_new(
                        JSON.parse(matchingItem.use_tech_list_json_all),
                      ),
                    );
                  }
                  // tempGartnerTitles.push(sqlHypecycle[item]["title"]);
                  // tempGartnerIndex.push(sqlHypecycle[item]["gartner_index"]);
                  // idex.push(
                  //   extractTechIds_new(
                  //     JSON.parse(
                  //       sqlHypecycle[item]["use_tech_list_json_all"],
                  //     ),
                  //   ),
                  // );
                });

                setGartnerTitles(tempGartnerTitles);
                setGartnerIndex(tempGartnerIndex);
                setInnovationIndexs(idex);

                const arrayToString = (arr) => {
                  return `(${arr.join(",")})`;
                };

                const fetchPromises = idex.map((innovationIds, index) => {
                  return fetch(
                    `${REACT_APP_API_URL}/api/radar/innovationtechs?innovationIndex=${arrayToString(
                      innovationIds,
                    )}`,
                  )
                    .then((response) => response.json())
                    .then((result) => {
                      let techAssementList = {};
                      result.forEach((item) => {
                        techAssementList[item["id"]] = {
                          utilizatio_level: 0,
                          feasibility_level: 0,
                        };
                      });

                      return {
                        HypeCycleName: tempGartnerTitles[index],
                        gartner_index: tempGartnerIndex[index],
                        tech_assement_list: techAssementList,
                        TechList: result,
                      };
                    })
                    .catch((error) => {
                      console.error("Error fetching data:", error);
                      return null;
                    });
                });

                Promise.all(fetchPromises).then((allData) => {
                  const validData = allData.filter((data) => data !== null);
                  setInnovationAllData(validData);
                  setQuestionLength(
                    validData.reduce(
                      (total, data) => total + data.TechList.length,
                      0,
                    ),
                  );
                });

                setCard1(false);
                setCard2(false);
                setCard3(false);
                setCard4(true);
                setnowCard(4);
              }}
            />
          </div>
        </>
      ) : (
        card3 && (
          <div className="w-full h-full flex items-center justify-center">
            <BeatLoader color="rgba(0,0,0,0.4)" size={40} />
          </div>
        )
      )}
      {card4 && (
        <>
          <div className="flex flex-col md:flex-row items-top justify-between">
            <div className="text-2xl font-bold">{"專家評估-技術評分"}</div>
            <div className="flex flex-row items-center justify-between gap-3">
              <div
                onClick={() => {
                  reset();
                  window.location.reload();
                }}
                className="cursor-pointer rounded-lg p-2 bg-slate-200 hover:bg-slate-300 sm:text-md text-sm"
              >
                重新開始
              </div>
              <div className="flex flex-col font-bold text-sm md:text-md">
                <div>開始時間：{formatTime(startTime)}</div>
                {/* <div>上次填寫時間：{formatTime(dynamicStartTime)}</div> */}
                {/* <div>實際經過時間：0:37:40</div> */}
                <div>實際經過時間：{formatElapsedTime(elapsedTime)}</div>
              </div>
            </div>
          </div>
          <div
            style={{ minWidth: "300px" }}
            // className="flex flex-col justify-center text-sm sm:text-xl mt-3 gap-2"
            className="text-sm sm:text-xl mt-3 gap-2"
            // css
          >
            <>
              三、技術評分：請根據您挑選的Hype
              Cycle文獻，進行技術項目評分。以下顯示每份Hype Cycle文獻中，years
              to mainstream adoption為5年內之技術，請您根據每項技術
              <span style={{ fontWeight: "bold" }}>
                對所屬部門的OKRs之
                <span style={{ textDecoration: "underline" }}>可行性</span>
                (指可能在工作中能為部門帶來
                <span style={{ textDecoration: "underline" }}>
                  實際效益和價值
                </span>
                )
              </span>
              進行評分，評分標準共分為五個級距：【1.非常不同意 2. 部分不同意
              3.無意見 4.部分同意 5.非常同意】
            </>
            <br />
            {/* <div>{uiContent.step4.description["1"]}</div> */}
            {/* <div>{uiContent.step4.description["2"]}</div> */}
          </div>
          <div className="flex-1 flex flex-col md:flex-row border-[2px] border-black h-3/5">
            <div
              className="border-black border-b-[0.5px] md:border-b-[0] md:border-r-[0.5px]"
              style={{
                flex: 1,
                overflowY: "auto",
              }}
            >
              {gartnerTitles &&
                gartnerTitles.map((item, index) => {
                  return (
                    <InnovationListBlock
                      key={index + item + "card4"}
                      HypeCycleName={
                        // filterKeysByValue(checkedState)[index] +
                        // 1 +
                        // ". " +
                        item
                      }
                      onClick={() => {
                        setHypeCycleSelectCard4(index);
                      }}
                      backgroundColor={
                        index === hypeCycleSelectCard4 ? "rgba(0,0,0,0.2)" : ""
                      }
                    />
                  );
                })}
            </div>
            <div
              className="flex flex-[3] flex-col p-4 bg-neutral-200 gap-3 text-sm"
              style={{
                overflowY: "auto",
              }}
              key={"rightScroll"}
            >
              {innovationAllData[hypeCycleSelectCard4] &&
                innovationAllData[hypeCycleSelectCard4]["TechList"].map(
                  (item, index) => {
                    return (
                      <div
                        key={`card4${item}${index}`}
                        ref={(el) =>
                          (divRefs.current[
                            gartnerIndex[hypeCycleSelectCard4] + `${index}`
                          ] = el)
                        }
                        className="flex flex-col rounded-lg bg-slate-100 shadow-sm p-4"
                      >
                        <div
                          style={{ flex: 5 }}
                          className="flex flex-col gap-6"
                        >
                          <div className="text-xl flex">
                            {item["innovation_tech_name"]}
                          </div>
                          <div className="text-base flex flex-row gap-1">
                            <div className="flex-1">{item["definition"]}</div>
                            <div className="flex-1">
                              {item["definition_tw"]}
                            </div>
                          </div>
                          <div className="text-lg flex flex-row gap-12 pb-3">
                            <div>{item["maturity"]}</div>
                            <div>{item["position"]}</div>
                            <div>{item["time_to_plateau"]}</div>
                          </div>
                        </div>
                        <div style={{ flex: 2 }} className="flex flex-col">
                          <div
                            style={{ backgroundColor: "rgba(0,0,0,0.1)" }}
                            className="flex flex-1 justify-between"
                          >
                            <div
                              className="flex flex-1 items-center justify-center flex-col gap-2"
                              style={{
                                fontSize: "clamp(12px, 1.5vw, 24px)",
                                fontWeight: "normal",
                                borderTop: "1.3px solid rgba(0,0,0,0.5)",
                                borderBottom: "1.3px solid rgba(0,0,0,0.5)",
                                borderLeft: "1.3px solid rgba(0,0,0,0.5)",
                                borderRight: "1.3px solid rgba(0,0,0,0.5)",
                              }}
                            >
                              <div>可行性</div>
                              <div>評分</div>
                            </div>
                            <div
                              className="flex-1 flex flex-col items-center justify-center p-1"
                              style={{
                                borderTop: "1.3px solid rgba(0,0,0,0.5)",
                                borderBottom: "1.3px solid rgba(0,0,0,0.5)",
                                borderRight: "1.3px solid rgba(0,0,0,0.5)",
                              }}
                            >
                              <div className="text-sm">1 分</div>
                              <div className="flex items-center justify-center">
                                <label>
                                  <input
                                    type="radio"
                                    name={
                                      gartnerIndex[hypeCycleSelectCard4] +
                                      item["innovation_tech_name"]
                                    }
                                    checked={
                                      selectedValues?.[
                                        gartnerIndex[hypeCycleSelectCard4] +
                                          item["innovation_tech_name"]
                                      ]?.["tech_assement"]?.[
                                        "feasibility_level"
                                      ] === "1"
                                    }
                                    onChange={() => {
                                      /**
                                       * ! this is final result
                                       * ! this is final result
                                       * ! this is final result
                                       */
                                      setSelectedValues({
                                        ...selectedValues,
                                        [gartnerIndex[hypeCycleSelectCard4] +
                                        item["innovation_tech_name"]]: {
                                          gartner_index:
                                            gartnerIndex[hypeCycleSelectCard4],
                                          gartner_title:
                                            gartnerTitles[hypeCycleSelectCard4],
                                          tech_assement: {
                                            tech_id: String(item["id"]),
                                            feasibility_level: "1",
                                            // useage_level: "",
                                          },
                                        },
                                      });

                                      if (
                                        index + 1 <
                                        innovationAllData[hypeCycleSelectCard4][
                                          "TechList"
                                        ].length
                                      ) {
                                        // console.log(
                                        //   gartnerIndex[hypeCycleSelectCard4] +
                                        //     `${index + 1}`,
                                        //   "~~~~~~~~~",
                                        // );
                                        setnextRef(
                                          gartnerIndex[hypeCycleSelectCard4] +
                                            `${index + 1}`,
                                        );
                                        setnext(!next);
                                      } else {
                                        // console.log(
                                        //   innovationAllData[
                                        //     hypeCycleSelectCard4
                                        //   ]["TechList"].length,
                                        // );
                                        setnextRef(
                                          gartnerIndex[hypeCycleSelectCard4] +
                                            "0",
                                        );
                                        setnext(!next);
                                      }
                                    }}
                                    value="1"
                                    style={{
                                      transform: "scale(2)",
                                      margin: "10px",
                                    }}
                                    disabled={card5 ? true : false}
                                  />
                                </label>
                              </div>
                            </div>
                            <div
                              className="flex-1 flex flex-col items-center justify-center p-1"
                              style={{
                                borderTop: "1.3px solid rgba(0,0,0,0.5)",
                                borderBottom: "1.3px solid rgba(0,0,0,0.5)",
                                borderRight: "1.3px solid rgba(0,0,0,0.5)",
                              }}
                            >
                              <div className="text-sm">2 分</div>
                              <div className="flex items-center justify-center">
                                <label>
                                  <input
                                    type="radio"
                                    name={
                                      gartnerIndex[hypeCycleSelectCard4] +
                                      item["innovation_tech_name"]
                                    }
                                    checked={
                                      selectedValues?.[
                                        gartnerIndex[hypeCycleSelectCard4] +
                                          item["innovation_tech_name"]
                                      ]?.["tech_assement"]?.[
                                        "feasibility_level"
                                      ] === "2"
                                    }
                                    onChange={() => {
                                      /**
                                       * ! this is final result
                                       * ! this is final result
                                       * ! this is final result
                                       */
                                      setSelectedValues({
                                        ...selectedValues,
                                        [gartnerIndex[hypeCycleSelectCard4] +
                                        item["innovation_tech_name"]]: {
                                          gartner_index:
                                            gartnerIndex[hypeCycleSelectCard4],
                                          gartner_title:
                                            gartnerTitles[hypeCycleSelectCard4],
                                          tech_assement: {
                                            tech_id: String(item["id"]),
                                            feasibility_level: "2",
                                            // useage_level: "",
                                          },
                                        },
                                      });
                                      if (
                                        index + 1 <
                                        innovationAllData[hypeCycleSelectCard4][
                                          "TechList"
                                        ].length
                                      ) {
                                        console.log(
                                          gartnerIndex[hypeCycleSelectCard4] +
                                            `${index + 1}`,
                                          "~~~~~~~~~",
                                        );
                                        setnextRef(
                                          gartnerIndex[hypeCycleSelectCard4] +
                                            `${index + 1}`,
                                        );
                                        setnext(!next);
                                      } else {
                                        console.log(
                                          innovationAllData[
                                            hypeCycleSelectCard4
                                          ]["TechList"].length,
                                        );
                                        setnextRef(
                                          gartnerIndex[hypeCycleSelectCard4] +
                                            "0",
                                        );
                                        setnext(!next);
                                      }
                                    }}
                                    value="2"
                                    style={{
                                      transform: "scale(2)",
                                      margin: "10px",
                                    }}
                                    disabled={card5 ? true : false}
                                  />
                                </label>
                              </div>
                            </div>
                            <div
                              className="flex-1 flex flex-col items-center justify-center p-1"
                              style={{
                                borderTop: "1.3px solid rgba(0,0,0,0.5)",
                                borderBottom: "1.3px solid rgba(0,0,0,0.5)",
                                borderRight: "1.3px solid rgba(0,0,0,0.5)",
                              }}
                            >
                              <div className="text-sm">3 分</div>
                              <div className="flex items-center justify-center">
                                <label>
                                  <input
                                    type="radio"
                                    name={
                                      gartnerIndex[hypeCycleSelectCard4] +
                                      item["innovation_tech_name"]
                                    }
                                    checked={
                                      selectedValues?.[
                                        gartnerIndex[hypeCycleSelectCard4] +
                                          item["innovation_tech_name"]
                                      ]?.["tech_assement"]?.[
                                        "feasibility_level"
                                      ] === "3"
                                    }
                                    onChange={() => {
                                      /**
                                       * ! this is final result
                                       * ! this is final result
                                       * ! this is final result
                                       */
                                      setSelectedValues({
                                        ...selectedValues,
                                        [gartnerIndex[hypeCycleSelectCard4] +
                                        item["innovation_tech_name"]]: {
                                          gartner_index:
                                            gartnerIndex[hypeCycleSelectCard4],
                                          gartner_title:
                                            gartnerTitles[hypeCycleSelectCard4],
                                          tech_assement: {
                                            tech_id: String(item["id"]),
                                            feasibility_level: "3",
                                            // useage_level: "",
                                          },
                                        },
                                      });
                                      if (
                                        index + 1 <
                                        innovationAllData[hypeCycleSelectCard4][
                                          "TechList"
                                        ].length
                                      ) {
                                        console.log(
                                          gartnerIndex[hypeCycleSelectCard4] +
                                            `${index + 1}`,
                                          "~~~~~~~~~",
                                        );
                                        setnextRef(
                                          gartnerIndex[hypeCycleSelectCard4] +
                                            `${index + 1}`,
                                        );
                                        setnext(!next);
                                      } else {
                                        console.log(
                                          innovationAllData[
                                            hypeCycleSelectCard4
                                          ]["TechList"].length,
                                        );
                                        setnextRef(
                                          gartnerIndex[hypeCycleSelectCard4] +
                                            "0",
                                        );
                                        setnext(!next);
                                      }
                                    }}
                                    value="3"
                                    style={{
                                      transform: "scale(2)",
                                      margin: "10px",
                                    }}
                                    disabled={card5 ? true : false}
                                  />
                                </label>
                              </div>
                            </div>
                            <div
                              className="flex-1 flex flex-col items-center justify-center p-1"
                              style={{
                                borderTop: "1.3px solid rgba(0,0,0,0.5)",
                                borderBottom: "1.3px solid rgba(0,0,0,0.5)",
                                borderRight: "1.3px solid rgba(0,0,0,0.5)",
                              }}
                            >
                              <div className="text-sm">4 分</div>
                              <div className="flex items-center justify-center">
                                <label>
                                  <input
                                    type="radio"
                                    name={
                                      gartnerIndex[hypeCycleSelectCard4] +
                                      item["innovation_tech_name"]
                                    }
                                    checked={
                                      selectedValues?.[
                                        gartnerIndex[hypeCycleSelectCard4] +
                                          item["innovation_tech_name"]
                                      ]?.["tech_assement"]?.[
                                        "feasibility_level"
                                      ] === "4"
                                    }
                                    onChange={() => {
                                      /**
                                       * ! this is final result
                                       * ! this is final result
                                       * ! this is final result
                                       */
                                      setSelectedValues({
                                        ...selectedValues,
                                        [gartnerIndex[hypeCycleSelectCard4] +
                                        item["innovation_tech_name"]]: {
                                          gartner_index:
                                            gartnerIndex[hypeCycleSelectCard4],
                                          gartner_title:
                                            gartnerTitles[hypeCycleSelectCard4],
                                          tech_assement: {
                                            tech_id: String(item["id"]),
                                            feasibility_level: "4",
                                            // useage_level: "",
                                          },
                                        },
                                      });
                                      if (
                                        index + 1 <
                                        innovationAllData[hypeCycleSelectCard4][
                                          "TechList"
                                        ].length
                                      ) {
                                        console.log(
                                          gartnerIndex[hypeCycleSelectCard4] +
                                            `${index + 1}`,
                                          "~~~~~~~~~",
                                        );
                                        setnextRef(
                                          gartnerIndex[hypeCycleSelectCard4] +
                                            `${index + 1}`,
                                        );
                                        setnext(!next);
                                      } else {
                                        console.log(
                                          innovationAllData[
                                            hypeCycleSelectCard4
                                          ]["TechList"].length,
                                        );
                                        setnextRef(
                                          gartnerIndex[hypeCycleSelectCard4] +
                                            "0",
                                        );
                                        setnext(!next);
                                      }
                                    }}
                                    value="4"
                                    style={{
                                      transform: "scale(2)",
                                      margin: "10px",
                                    }}
                                    disabled={card5 ? true : false}
                                  />
                                </label>
                              </div>
                            </div>
                            <div
                              className="flex-1 flex flex-col items-center justify-center p-1"
                              style={{
                                borderTop: "1.3px solid rgba(0,0,0,0.5)",
                                borderBottom: "1.3px solid rgba(0,0,0,0.5)",
                                borderRight: "1.3px solid rgba(0,0,0,0.5)",
                              }}
                            >
                              <div className="text-sm">5 分</div>
                              <div className="flex items-center justify-center">
                                <label>
                                  <input
                                    type="radio"
                                    className="cursor-pointer"
                                    name={
                                      gartnerIndex[hypeCycleSelectCard4] +
                                      item["innovation_tech_name"]
                                    }
                                    checked={
                                      selectedValues?.[
                                        gartnerIndex[hypeCycleSelectCard4] +
                                          item["innovation_tech_name"]
                                      ]?.["tech_assement"]?.[
                                        "feasibility_level"
                                      ] === "5"
                                    }
                                    onChange={() => {
                                      /**
                                       * ! this is final result
                                       * ! this is final result
                                       * ! this is final result
                                       */
                                      setSelectedValues({
                                        ...selectedValues,
                                        [gartnerIndex[hypeCycleSelectCard4] +
                                        item["innovation_tech_name"]]: {
                                          gartner_index:
                                            gartnerIndex[hypeCycleSelectCard4],
                                          gartner_title:
                                            gartnerTitles[hypeCycleSelectCard4],
                                          tech_assement: {
                                            tech_id: String(item["id"]),
                                            feasibility_level: "5",
                                            // useage_level: "",
                                          },
                                        },
                                      });
                                      if (
                                        index + 1 <
                                        innovationAllData[hypeCycleSelectCard4][
                                          "TechList"
                                        ].length
                                      ) {
                                        console.log(
                                          gartnerIndex[hypeCycleSelectCard4] +
                                            `${index + 1}`,
                                          "~~~~~~~~~",
                                        );
                                        setnextRef(
                                          gartnerIndex[hypeCycleSelectCard4] +
                                            `${index + 1}`,
                                        );
                                        setnext(!next);
                                      } else {
                                        console.log(
                                          innovationAllData[
                                            hypeCycleSelectCard4
                                          ]["TechList"].length,
                                        );
                                        setnextRef(
                                          gartnerIndex[hypeCycleSelectCard4] +
                                            "0",
                                        );
                                        setnext(!next);
                                      }
                                    }}
                                    value="5"
                                    style={{
                                      transform: "scale(2)",
                                      margin: "10px",
                                    }}
                                    disabled={card5 ? true : false}
                                  />
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  },
                )}
            </div>
          </div>
          <div className="flex justify-end gap-6 items-center flex-row">
            <div className="w-[130px] sm:w-[300px] h-[20px] bg-gray-300 rounded-full">
              <div
                className={`h-[20px] relative bg-gray-400 rounded-full`}
                style={{
                  width: `${
                    (Number(Object.keys(selectedValues).length) /
                      Number(questionLength)) *
                    100
                  }%`,
                }}
              ></div>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-6">
              <DivButton
                text={"上一步"}
                onClick={() => {
                  setCard1(false);
                  setCard2(false);
                  setCard3(true);
                  setCard4(false);
                  setCard5(false);
                  // setGartnerTitles([]);
                  // setSelectedValues({});
                  // setGartnerIndex([]);
                  // setInnovationIndexs([]);
                  // setInnovationAllData([]);
                  // setQuestionLength(0);
                }}
              />
              {/* {JSON.stringify(Object.keys(selectedValues).length)}
              {JSON.stringify(questionLength)} */}
              <DivButton
                bgColor={
                  Object.keys(selectedValues).length === questionLength
                    ? "#007bff"
                    : "gray"
                }
                noPoint={
                  Object.keys(selectedValues).length === questionLength
                    ? ""
                    : "none"
                }
                text={"下一步"}
                onClick={() => {
                  setCard1(false);
                  setCard2(false);
                  setCard3(false);
                  setCard4(false);
                  setCard5(true);
                  setnowCard(4);
                  // transformInput(selectedValues);
                }}
              />
            </div>
            {/* {"測試：" + JSON.stringify(transformInput(selectedValues))} */}
            {/* {Number(Object.keys(selectedValues).length)/Number(questionLength) * 100} */}
          </div>
        </>
      )}
      {card5 && (
        <Card5Submit
          title={uiContent.step5.title}
          lastClick={() => {
            setCard1(false);
            setCard2(false);
            setCard3(false);
            setCard4(true);
            setCard5(false);
            // setGartnerTitles([]);
            // setGartnerIndex([]);
            // setInnovationIndexs([]);
            // setQuestionLength(0);
          }}
          nextClick={() => {
            setCard1(false);
            setCard2(false);
            setCard3(false);
            setCard4(false);
            setCard5(false);
            setOver(true);
            setnowCard(4);
          }}
        />
      )}
      {card6 && (
        <div className="h-full flex justify-center items-center">
          {/* <div className="flex flex-row h-full">
                <div className="text-4xl font-bold">{}</div>
              </div> */}
          <div className="flex flex-col justify-between items-stretch h-3/6 w-3/7 px-6">
            <div className="text-xl md:text-3xl font-bold mb-3">
              {"感謝您的填寫！"}
            </div>
            <div className="text-xl font-bold mt-3">
              {uiContent.step5.description["1"]}
            </div>
            <div className="text-3xl font-bold">
              {uiContent.step5.description["2"]}
            </div>
            <div className="flex justify-end mt-6">
              <DivButton
                // bgColor={name != "" && num != "" ? "" : "gray"}
                text={"提交其他回應"}
                onClick={() => {
                  reset();
                  window.location.reload();
                  // setCard1(true);
                  // setCard2(false);
                  // setCard3(false);
                  // setCard4(false);
                  // setCard5(false);
                  // setCard6(false);
                  // setnowCard(1);
                }}
              />
            </div>
          </div>
        </div>
      )}
      {/* {over && <div style={{width:"100vw", height:"100vh", position:"relative", backgroundColor:"rgba(0,0,0,0.5)"}}> */}
      {over && (
        <div>
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              padding: "20px",
              // borderRadius: "10px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
              width: "100vw",
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              className="w-[60vw] md:w-[30vh]"
              style={{
                backgroundColor: "white",
                borderRadius: "10px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {/* 在這裡添加您的內容 */}
              <div className="text-2xl mb-3">是否送出評估問卷？</div>
              <div className="flex gap-2">
                <DivButton
                  text={"返回"}
                  onClick={() => {
                    setOver(false);
                  }}
                />
                <DivButton
                  text={"送出"}
                  onClick={() => {
                    /**-----------------------------------------------------------------------------------------------------------------------
                     *todo                                                 console post result.
                     *-----------------------------------------------------------------------------------------------------------------------**/
                    // console.log(
                    //   JSON.stringify({
                    //     staff_id: sessionStorage.getItem("staffId"),
                    //     staff_name_tw:
                    //       sessionStorage.getItem("staff_name_tw"),
                    //     staff_email: sessionStorage.getItem("staff_email"),
                    //     type_index: "H001",
                    //     staff_unit_name_tw: resultZone,
                    //     question_reply_content: JSON.stringify(
                    //       transformFinallResult(selectedValues)
                    //     ),
                    //   })
                    // );
                    const taiwanOffset = 8 * 60 * 60 * 1000; // 將 8 小時轉換成毫秒
                    const reply_time_end = () => {
                      const now = new Date();
                      return new Date(now.getTime() + taiwanOffset);
                    };
                    const reply_time_start = () => {
                      const timestamp = Number(
                        localStorage.getItem("startTime"),
                      );
                      const now = new Date(timestamp * 1000 + taiwanOffset);
                      return now;
                    };
                    const userInfo = localStorage.getItem("userInfo")
                      ? JSON.parse(localStorage.getItem("userInfo"))
                      : {};
                    const postData = {
                      //! SSO
                      staff_id: userInfo.emp_no || "",
                      //! SSO
                      staff_name_tw: userInfo.name || "",
                      //! 使用者自行輸入
                      //! SSO
                      staff_unit_name_tw: userInfo.bg || "",
                      // staff_unit_name_tw: recommendIndex,
                      question_reply_content: JSON.stringify(
                        transformFinallResult(selectedValues),
                      ),
                    };
                    console.log(postData, "!!!!!!!!!!!!!!!!!!!!!!!!!");

                    fetch(REACT_APP_API_URL + "/api/radar/submit", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(postData),
                    })
                      .then((response) => {
                        console.log("response", response);
                        setCard1(false);
                        setCard2(false);
                        setCard3(false);
                        setCard4(false);
                        setCard5(false);
                        setCard6(true);
                        setOver(false);
                        setnowCard(1);
                        return response;
                      })
                      .then((data) => {
                        console.log(data);
                        reset();
                        // sessionStorage.removeItem("staffId");
                        // sessionStorage.removeItem("staff_name_tw");
                        // sessionStorage.removeItem("staff_email");
                        // sessionStorage.removeItem("isValid");
                      });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
