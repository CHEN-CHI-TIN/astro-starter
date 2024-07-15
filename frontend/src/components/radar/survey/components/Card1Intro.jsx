import React, { useState, useEffect } from "react";
import uiContent from "../content/uiContent.json";
import cover from "../images/img_cover.png";
import { DivButton } from "./CosWheel";
import InputTextLimit from "../components/InputTextLimit";
import DropdownMenu from "../components/DropdownMenu";
import useCustomStore from "../store/useCustomStore";

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

export default function Card1Intro({ title, onClick }) {
  const { resultZone, setResultZone } = useCustomStore();
  const [name, setName] = useLocalStorage("name", "");
  const [num, setNum] = useLocalStorage("num", "");
  const [isValid, setIsValid] = useLocalStorage("isValid", {
    isValidNumber: false,
    isValidText: false,
    isWithinLimitNum: true,
    isWithinLimitText: true,
  });
  useEffect(() => {
    setName(sessionStorage.getItem("staff_name_tw") || "");
    setNum(sessionStorage.getItem("staffId") || "");
    setIsValid(
      JSON.parse(sessionStorage.getItem("isValid")) || {
        isValidNumber: false,
        isValidText: false,
        isWithinLimitNum: true,
        isWithinLimitText: true,
      },
    );
  }, []);
  return (
    <>
      <div className="flex flex-row">
        <div className="text-2xl md:text-3xl font-bold">{title}</div>
        {/* <div className="text-4xl font-bold">{<MyStep />}</div> */}
      </div>
      <div
        style={{ overflowY: "hidden", overflowX: "hidden" }}
        className="flex flex-1 p-4 flex-col md:flex-row justify-center gap-2 sm:gap-12"
      >
        <div className="flex flex-1 md:flex-[3] flex-col justify-center text-base sm:text-lg">
          <div className="mt-3 text-lg sm:text-lg">
            {/* {uiContent.step1.description["1"]} */}
            歡迎參與「
            <span style={{ fontWeight: "bold" }}>
              創新技術對標OKRs之可行性評估系統
            </span>
            」！
          </div>
          {/* <div className="flex mt-1">{uiContent.step1.description["2"]}</div> */}
          <div className="mt-1">
            本系統係以視覺化方式呈現Gartner的「Hype Cycle文獻」，協助各單位建立
            <span style={{ fontWeight: "bold" }}>具參考價值的技術雷達圖</span>。
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
          {/* <div className=（）"flex mt-1">{uiContent.step1.description["3"]}</div>
          <div className="flex mt-1">{uiContent.step1.description["4"]}</div> */}
          {/* 圖片 */}
          <div className="hidden md:flex items-center justify-center mt-6">
            <img className="w-[40%] sm:w-[50%]" src={cover} alt="描述" />
          </div>
        </div>
        <div className="flex flex-[3] items-center justify-center">
          <div
            style={{
              border: "1.5px solid rgba(0,0,0,0.1)",
              width: "100%",
            }}
            className="flex flex-col rounded-lg p-6 sm:p-12 items-start justify-between shadow-md"
          >
            <div
              style={{
                fontWeight: "revert",
              }}
              className="text-base sm:text-xl md:text-2xl mb-3"
            >
              {"請填入基本資訊"}
            </div>
            <div className="flex flex-row items-center justify-between md:justify-start w-full">
              <div className="text-base md:text-base">
                <div>{`所屬單位：`}</div>
                {/* <div>{`${resultZone}`}</div> */}
              </div>
              <DropdownMenu list={uiContent.step1.class} />
            </div>
            <InputTextLimit
              key={"staff_name_tw"}
              title={"staff_name_tw"}
              titleDisplay={"姓名"}
              limit={10}
              state={name}
              setState={setName}
              isValid={isValid}
              setIsValid={setIsValid}
              type={"text"}
            />
            <InputTextLimit
              key={"staffId"}
              title={"staffId"}
              titleDisplay={"工號"}
              limit={10}
              state={num}
              setState={setNum}
              isValid={isValid}
              setIsValid={setIsValid}
              type={"number"}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-6">
        <DivButton
          bgColor={
            isValid.isValidNumber &&
            isValid.isValidText &&
            isValid.isWithinLimitNum &&
            isValid.isWithinLimitText &&
            num !== "" &&
            name !== "" &&
            resultZone !== ""
              ? "#007bff"
              : "gray"
          }
          text={"下一步"}
          onClick={onClick}
          noPoint={
            isValid.isValidNumber &&
            isValid.isValidText &&
            isValid.isWithinLimitNum &&
            isValid.isWithinLimitText &&
            resultZone !== ""
              ? ""
              : "none"
          }
        />
      </div>
    </>
  );
}
