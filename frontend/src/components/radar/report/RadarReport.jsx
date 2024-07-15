import React, { useEffect, useState } from "react";
import { BaseTable } from "ali-react-table";
import axios from "axios";
// import report from "./report.csv";

const columns = [
  { code: "Quadrant", name: "象限", width: 150 },
  { code: "id", name: "ID", width: 100, align: "right" },
  { code: "staff_id", name: "員工ID", width: 100, align: "right" },
  { code: "staff_name", name: "員工姓名", width: 150 },
  { code: "gartner_index", name: "Gartner指數", width: 150 },
  { code: "gartner_title", name: "Gartner標題", width: 300 },
  { code: "innovation_tech_name", name: "創新技術名稱", width: 200 },
  { code: "feasibility_level", name: "可行性等級", width: 150, align: "right" },
];
const columnsAVG = [
  { code: "Quadrant", name: "象限", width: 150 },
  { code: "innovation_tech_name", name: "創新技術名稱", width: 200 },
  { code: "Person Number", name: "投票數", width: 150, align: "right" },
  {
    code: "AVG_feasibility_level",
    name: "平均分數",
    width: 150,
    align: "right",
  },
];

const fetchData = async () => {
  try {
    const response = await axios.get(
      "https://20.28.192.182/api/radar/result/table",
    );
    return response;
  } catch (err) {
    console.log(err);
  }
};

const fetchDataAvg = async () => {
  try {
    const response = await axios.get(
      "https://20.28.192.182/api/radar/result/table_avg",
    );
    return response;
  } catch (err) {
    console.log(err);
  }
};

export function RadarReport() {
  const [data, setData] = useState([]); // 初始化為空數組
  const [dataAvg, setDataAvg] = useState([]); // 初始化為空數組
  const [swith, setSwitch] = useState(1);

  useEffect(() => {
    fetchData()
      .then((response) => {
        let res = JSON.parse(response.data);
        setData(res);
      })
      .then(() => {
        fetchDataAvg().then((response) => {
          let res = JSON.parse(response.data);
          setDataAvg(res);
        });
      });
    // setData(fetchData());
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row gap-3 mt-3 ml-3">
        <button
          className="text-xl text-white shadow-md py-2 px-6 text-gray rounded-md bg-blue-600 hover:bg-blue-700"
          onClick={() => setSwitch(1)}
        >
          統計表
        </button>
        <button
          className="text-xl text-white shadow-md py-2 px-6 text-gray rounded-md bg-blue-600 hover:bg-blue-700"
          onClick={() => setSwitch(0)}
        >
          總表
        </button>
      </div>
      <BaseTable
        style={{
          fontSize: "14px",
          width: "100vw",
          height: "80vh",
          padding: "10px 10px 10px 10px",
          overflow: "auto",
          backgroundColor: "white",
        }}
        useOuterBorder
        dataSource={swith === 0 ? data : dataAvg}
        columns={swith === 0 ? columns : columnsAVG} // 根據狀態切換列
      />
    </div>
  );
}
