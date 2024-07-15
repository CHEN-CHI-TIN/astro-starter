import React, { useEffect, useState } from "react";
import pkg from "file-saver";
const { saveAs } = pkg;
import Papa from "papaparse";
import Radar from "./components/Radar/Radar";
import List from "./modules/List";
import Title from "./modules/Title";
import ZoneInput from "./modules/ZoneInput";
// import "./App.css";
import Draggable from "react-draggable"; // <-- 引入react-draggable
import html2canvas from "html2canvas"; // <-- 引入 html2canvas
import axios from "axios";

const config = ["生成式AI", "ESG", "數據治理", "EAM"];
const zones = ["Gen-AI", "ESG", "Data-Governance", "EAM"];
const singleCount = 24;
const dateRange = { start_date: "2024/06/23", end_date: "2024/06/29" };

const lineStyle = (zoneType, color1, color2, height) => {
  return {
    width: zoneType === 0 ? "20%" : "2%",
    height: height,
    background: `linear-gradient(to bottom, ${color1}, ${color2})`,
  };
};
const quadrantOrder = ["H001", "H002", "H003", "H004"];
const timeOrder = ["Adopt", "Trial", "Assess", "Hold"];
const setup = {
  title: "創新技術雷達圖",
  fontSize: 0.1,
  itemFontSize: 10,
  radiusDiminish: 1.5,
  initWidth: 570,
  rings: ["Adopt", "Trial", "Assess", "Hold"],
  quadrants: ["H001"],
};

const transformRadarZone = (zone) => {
  switch (zone) {
    case "Gen-AI":
      return "H001";
    case "ESG":
      return "H002";
    case "Data-Governance":
      return "H003";
    case "EAM":
      return "H004";
    default:
      return zone;
  }
};
const transformRadarSize = (size) => {
  switch (size) {
    case "Transformational":
      return "Transformational";
    case "High":
      return "High";
    case "Moderate":
      return "Moderate";
    case "Low":
      return "Low";
    default:
      return size;
  }
};
const transformRadarLocate = (lo) => {
  const roundedSize = Math.round(lo); // 先將 size 四捨五入
  if (roundedSize >= 4 && roundedSize <= 5) {
    return "Adopt";
  } else if (roundedSize >= 3 && roundedSize < 4) {
    return "Trial";
  } else if (roundedSize >= 2 && roundedSize < 3) {
    return "Assess";
  } else if (roundedSize >= 1 && roundedSize < 2) {
    return "Hold";
  }
};

export function RadarCreator() {
  const [csvData, setCsvData] = useState([]);
  const [csvDataSingle, setCsvDataSingle] = useState([]);
  const [reset, setReset] = useState(false);
  const [innovationIndex, setInnovationIndex] = useState([]);
  const [innovationIndexSingle, setInnovationIndexSingle] = useState([]);
  const [radarWidth, setRadarWidth] = useState(setup.initWidth);
  const [quadrants, setQuadrants] = useState([]); // 新增state
  const [laptopRadarX, setLaptopRadarX] = useState(0);
  const [single, setSingle] = useState(false);
  const [rawInput, setRawInput] = useState();
  const [zoneNameList, setZoneNameList] = useState(config);
  const [zoneType, setZoneType] = useState(0);
  const [rename, setRename] = useState(false);
  const [renameStore, setRenameStore] = useState([]);

  const [data, setData] = useState(null);

  const start = "2024-06-23T17:00:14.0970000";
  const end = "2024-06-28T23:59:59.9999999";
  const type = "radar";
  const count = 6;
  const count_all = 4;

  // const fetchData = async (start, end, data_type, zone, count) => {
  //   try {
  //     const response = await axios.get("https://20.28.192.182/api/result", {
  //       params: {
  //         start_date: start,
  //         end_date: end,
  //         data_type: data_type,
  //         zone: zone,
  //         count: count,
  //       },
  //     });
  //     return response;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  const fetchData = async (data_for) => {
    try {
      const response = await axios.get(
        "https://20.28.192.182/api/radar/result",
        {
          params: {
            data_for: data_for,
          },
        },
      );
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  // This function will handle the CSV download
  const handleFileDownload = () => {
    // Add the zone names to the csvData
    const dataWithZoneNames = csvData.map((row) => {
      return {
        ...row,
        H001_title: zoneNameList[0],
        H002_title: zoneNameList[1],
        H003_title: zoneNameList[2],
        H004_title: zoneNameList[3],
      };
    });

    const csv = Papa.unparse(dataWithZoneNames);
    const blob = new Blob([`\ufeff${csv}`], {
      type: "text/csv;charset=utf-8;",
    }); // '\ufeff' ensures proper encoding
    saveAs(blob, "data.csv");
  };

  const handleScreenshotDownload = () => {
    if (zoneType === 0) {
      const container = document.querySelector(".grid-container");

      if (container) {
        html2canvas(container, {
          useCORS: true,
          backgroundColor: null, // 使背景透明
        }).then((canvas) => {
          canvas.toBlob((blob) => {
            if (zoneType === 0) {
              saveAs(blob, `radar-all.png`);
            } else {
              saveAs(blob, `radar-${zoneNameList[zoneType - 1]}.png`);
            }
          });
        });
      }
    } else {
      const container = document.querySelector(".container-single");
      if (container) {
        html2canvas(container, {
          useCORS: true,
          backgroundColor: null, // 使背景透明
        }).then((canvas) => {
          canvas.toBlob((blob) => {
            if (zoneType === 0) {
              saveAs(blob, `radar-all.png`);
            } else {
              saveAs(blob, `radar-${zoneNameList[zoneType - 1]}.png`);
            }
          });
        });
      }
    }
  };

  const handleFileUpload = (event) => {
    Papa.parse(event.target.files[0], {
      header: true,
      complete: function (results) {
        const data = results.data.filter(
          (item) => item.innovation_tech_name !== "",
        );
        setRawInput(data);
        // console.log(data, "!!!!!");
        // 檢查是否存在 H001_title, H002_title, H003_title, H004_title 這些欄位
        const titles = ["H001_title", "H002_title", "H003_title", "H004_title"];
        let newZoneNameList = [...zoneNameList];
        titles.forEach((title, index) => {
          if (data[0][title]) {
            newZoneNameList[index] = data[0][title];
          }
        });
        setZoneNameList(newZoneNameList);
      },
    });
  };

  const fetchDataForZones = async () => {
    try {
      // const responses = await Promise.all(zones.map((zone) => fetchData("4")));

      // const allResults = responses.flatMap((response) => {
      //   const res = JSON.parse(response.data);
      //   console.log(res, "~~~~~");
      //   return res.map((item) => {
      //     // 這裡可以對每一個欄位做動作
      //     return item;
      //   });
      // });
      fetchData().then((response) => {
        let res = JSON.parse(response.data);
        handleFileUploadAPI(res); // 傳遞展平後的資料
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleFileUploadAPI = (data) => {
    setRawInput(data);
    // console.log(data, "!!!!!");
    // 檢查是否存在 H001_title, H002_title, H003_title, H004_title 這些欄位
    const titles = ["H001_title", "H002_title", "H003_title", "H004_title"];
    let newZoneNameList = [...zoneNameList];
    titles.forEach((title, index) => {
      if (data[0][title]) {
        newZoneNameList[index] = data[0][title];
      }
    });
    setZoneNameList(newZoneNameList);
  };

  useEffect(() => {
    // console.log(zoneType, "!!!!!!!!!!!!!!!!!!");
    setZoneType(0);
  }, []);
  useEffect(() => {
    // console.table(csvData);
  }, [csvData]);

  useEffect(() => {
    // console.log(reset);
  }, [reset]);

  useEffect(() => {
    // console.log(rawInput, "!!!!!!!!");
    if (rawInput === undefined) return;
    if (zoneType === 1) {
      setQuadrants(["H001"]);
    } else if (zoneType === 2) {
      setQuadrants(["H002"]);
    } else if (zoneType === 3) {
      setQuadrants(["H003"]);
    } else if (zoneType === 4) {
      setQuadrants(["H004"]);
    } else if (zoneType === 0) {
      // ! 總象限，順序影響到雷達圖的呈現
      setQuadrants(["H004", "H002", "H001", "H003"]);
    }

    let limitedResults = [];
    if (zoneType === 0) {
      limitedResults = quadrantOrder
        .map((zone) => {
          return rawInput
            .filter((item) => item.radar_zone === zone)
            .slice(0, 8);
        })
        .flat();
    } else {
      limitedResults = rawInput
        .filter((item) => item.radar_zone === quadrantOrder[zoneType - 1])
        .slice(0, 16);
    }

    const sortedData = [...limitedResults].sort((a, b) => {
      if (
        quadrantOrder.indexOf(a.radar_zone) -
        quadrantOrder.indexOf(b.radar_zone)
      ) {
        return (
          quadrantOrder.indexOf(a.radar_zone) -
          quadrantOrder.indexOf(b.radar_zone)
        );
      } else if (
        timeOrder.indexOf(a.radar_locate) - timeOrder.indexOf(b.radar_locate)
      ) {
        return (
          timeOrder.indexOf(a.radar_locate) - timeOrder.indexOf(b.radar_locate)
        );
      } else {
        return a.innovation_tech_name.localeCompare(b.innovation_tech_name);
      }
    });
    // ! 給List用的，也用作下載

    if (zoneType > 0) {
      setCsvDataSingle(sortedData);
      let array = [];
      let i = 0;
      while (i < sortedData.length) {
        const item = sortedData[i];
        array.push(item["radar_zone"] + item["innovation_tech_name"]);
        i++;
      }
      // ! 核對技術index
      setInnovationIndexSingle(array);
    } else {
      setCsvData(sortedData);
      let array = [];
      let i = 0;
      while (i < sortedData.length) {
        const item = sortedData[i];
        array.push(item["radar_zone"] + item["innovation_tech_name"]);
        i++;
      }
      // ! 核對技術index
      setInnovationIndex(array);
    }
  }, [zoneType, rawInput]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 640) {
        setLaptopRadarX(20);
        setRadarWidth(570);
      } else if (width <= 1024) {
        setLaptopRadarX(20);
        setRadarWidth(570);
      } else if (width >= 1536) {
        setLaptopRadarX(15);
        setRadarWidth(730);
      } else {
        setLaptopRadarX(10);
        setRadarWidth(600 + (width - 1024) * 0.1); // 根據螢幕寬度動態調整
      }
    };

    window.addEventListener("resize", handleResize);

    // Initial setup
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-screen h-full items-center justify-center flex flex-col">
      {rename && (
        <div className="w-full h-full bg-white">
          <div
            className="absolute mt-10 py-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-md flex items-center justify-center z-30"
            onClick={() => {
              setRename(false);
            }}
          >
            <div
              className="bg-white rounded-2xl w-[70vw] h-full flex flex-col items-center justify-between px-9 py-6"
              onClick={(e) => {
                // ! 阻止事件冒泡，避免點擊事件影響到外層元素
                e.stopPropagation();
              }}
            >
              <div className="w-full text-xl font-bold">
                於輸入框內輸入欲修改象限名稱：
              </div>
              <div
                className="grid-rename-parent gap-3 p-4 h-[80%]"
                style={{ aspectRatio: "1/1" }}
              >
                {zoneNameList.map((zoneName, index) => (
                  <ZoneInput
                    key={index}
                    value={zoneName}
                    index={index}
                    onChange={(e) => {
                      let newList = [...zoneNameList];
                      newList[index] = e.target.value;
                      setZoneNameList(newList);
                    }}
                  />
                ))}
              </div>
              <div className="w-full flex gap-6 justify-end">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    setRename(false);
                    setZoneNameList(renameStore);
                  }}
                >
                  取消
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    setRename(false);
                  }}
                >
                  確認
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* // ! 按鈕 */}
      <div className="flex flex-row items-start gap-10 w-full justify-around py-6">
        {/* {data?[0]["radar_size"]} */}
        <div className="flex gap-6">
          <button
            className={`text-white font-bold py-2 px-4 rounded ${
              rawInput && zoneType === 0 ? "bg-blue-500" : "bg-gray-500"
            }`}
            onClick={() => {
              setZoneType(0);
            }}
          >
            總象限
          </button>
          <button
            className={`text-white font-bold py-2 px-4 rounded ${
              rawInput && zoneType === 1 ? "bg-blue-500" : "bg-gray-500"
            }`}
            onClick={() => {
              setZoneType(1);
              // fetchData().then((response) => {
              //   let res = JSON.parse(response.data);
              //   const limitedResults = res
              //     .filter((item) => item.radar_zone === quadrantOrder[0])
              //     .slice(0, 16);
              //   handleFileUploadAPI(limitedResults); // 傳遞篩選後的資料
              // });
            }}
          >
            {zoneNameList[0]}
          </button>
          <button
            className={`text-white font-bold py-2 px-4 rounded ${
              rawInput && zoneType === 2 ? "bg-blue-500" : "bg-gray-500"
            }`}
            onClick={() => {
              setZoneType(2);
              // fetchData().then((response) => {
              //   let res = JSON.parse(response.data);
              //   const limitedResults = res
              //     .filter((item) => item.radar_zone === quadrantOrder[1])
              //     .slice(0, 16);
              //   handleFileUploadAPI(limitedResults); // 傳遞篩選後的資料
              // });
            }}
          >
            {zoneNameList[1]}
          </button>
          <button
            className={`text-white font-bold py-2 px-4 rounded ${
              rawInput && zoneType === 3 ? "bg-blue-500" : "bg-gray-500"
            }`}
            onClick={() => {
              setZoneType(3);
              // fetchData().then((response) => {
              //   let res = JSON.parse(response.data);
              //   const limitedResults = res
              //     .filter((item) => item.radar_zone === quadrantOrder[2])
              //     .slice(0, 16);
              //   handleFileUploadAPI(limitedResults); // 傳遞篩選後的資料
              // });
            }}
          >
            {zoneNameList[2]}
          </button>
          <button
            className={`text-white font-bold py-2 px-4 rounded ${
              rawInput && zoneType === 4 ? "bg-blue-500" : "bg-gray-500"
            }`}
            onClick={() => {
              setZoneType(4);
              // fetchData().then((response) => {
              //   let res = JSON.parse(response.data);
              //   const limitedResults = res
              //     .filter((item) => item.radar_zone === quadrantOrder[3])
              //     .slice(0, 16);
              //   handleFileUploadAPI(limitedResults); // 傳遞篩選後的資料
              // });
            }}
          >
            {zoneNameList[3]}
          </button>
        </div>
        <div className="flex gap-6">
          <input
            id="fileInput" // 确保id属性设置正确
            style={{ display: "none" }}
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              const fileInput = document.getElementById("fileInput");
              if (fileInput) {
                fileInput.click(); // 确保元素存在再调用 click 方法
              }
            }}
          >
            上傳文件
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              setZoneType(0);
              fetchDataForZones();
            }}
          >
            同步資料庫
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleFileDownload}
          >
            下載排序文件
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleScreenshotDownload}
          >
            截圖
          </button>
          <div className="w-[80px]"></div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              setReset(!reset);
            }}
          >
            重整位置
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              setRename(true);
              setRenameStore(zoneNameList);
            }}
          >
            象限命名
          </button>
        </div>
      </div>
      {zoneType !== 0 && (
        <div className="container-single">
          <div className="flex flex-row flex-[2] h-full items-center justify-start">
            <div className="mr-5 ml-36 title-left h-[80%]">
              {zoneNameList[zoneType - 1].split("").map((char, index) => (
                <div key={index} className="writing-vertical">
                  {char}
                </div>
              ))}
            </div>
            <div
              className="mr-9"
              style={lineStyle(zoneType, "#3375BA", "#5BB9CC", "80%")}
            ></div>
            <div className="h-[80%]">
              <List
                csvData={csvDataSingle}
                quadrants={quadrantOrder[zoneType - 1]}
              />
            </div>
          </div>

          <div className="flex flex-row flex-[3] h-full items-center justify-start">
            <div className="radar-single">
              <div
                className={
                  zoneType !== 0 ? "radar-cover-single" : "radar-cover-full"
                }
              >
                <Radar
                  {...{ ...setup, quadrants }} // 修改此行，使quadrants成為動態的
                  data={csvDataSingle}
                  innovationIndex={innovationIndexSingle}
                  radiusDiminish={setup.radiusDiminish}
                  // width={820}
                  width={radarWidth}
                />
                <img
                  src="/tip-01.png"
                  alt="Tip"
                  style={{
                    position: "absolute",
                    width: "140px",
                    bottom: "-30px",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {zoneType === 0 && (
        <div className="grid-container">
          <Title zoneNameList={zoneNameList} zoneIndex={0} justify="end" />
          <Title zoneNameList={zoneNameList} zoneIndex={1} justify="end" />
          <Title zoneNameList={zoneNameList} zoneIndex={3} justify="start" />
          <Title zoneNameList={zoneNameList} zoneIndex={2} justify="start" />
          <div className="grid-line-01 grid-line">
            <div style={lineStyle(zoneType, "#3375BA", "#5BB9CC", "90%")}></div>
          </div>
          <div className="grid-line-02 grid-line">
            <div style={lineStyle(zoneType, "#D9453A", "#E68E47", "90%")}></div>
          </div>
          <div className="grid-line-03 grid-line">
            <div style={lineStyle(zoneType, "#BCBC4D", "#90B784", "90%")}></div>
          </div>
          <div className="grid-line-04 grid-line">
            <div style={lineStyle(zoneType, "#A52D58", "#672765", "90%")}></div>
          </div>
          <div className="grid-list-01">
            <List csvData={csvData} quadrants="H001" />
          </div>
          <div className="grid-list-02">
            <List csvData={csvData} quadrants="H002" />
          </div>
          <div className="grid-list-03">
            <List csvData={csvData} quadrants="H003" />
          </div>
          <div className="grid-list-04">
            <List csvData={csvData} quadrants="H004" />
          </div>
          <div className="grid-title-main">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                fontSize: "60px",
              }}
            >
              {/* <div>中央資訊</div> */}
              {/* <div>企業架構</div> */}
              {/* <div>創新技術雷達</div> */}
            </div>
          </div>
          <div className="grid-radar">
            <div
              className={
                zoneType !== 0 ? "radar-cover-single" : "radar-cover-full"
              }
              style={{
                position: "relative",
                transform: `translateX(${laptopRadarX}px)`,
              }}
            >
              <Radar
                {...{ ...setup, quadrants }} // 修改此行，使quadrants成為動態的
                data={csvData}
                innovationIndex={innovationIndex}
                radiusDiminish={setup.radiusDiminish}
                width={radarWidth}
              />
              <img
                src="/tip-01.png"
                alt="Tip"
                style={{
                  position: "absolute",
                  width: "120px",
                  bottom: "-30px",
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
