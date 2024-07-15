import { useState, useEffect } from "react";

export default function InputTextLimit({
  title,
  titleDisplay,
  limit,
  state,
  setState,
  isValid,
  setIsValid,
  type,
}) {
  // 使用 useEffect 來處理輸入驗證的側效
  const [init, setInit] = useState(true);

  useEffect(() => {
    // 定義數字、中英文字及電子郵件的正則表達式
    const regNumberAndLetters = /^[0-9A-Za-z-_]*$/;
    const regText = /^[a-zA-Z\u4e00-\u9fa5]+$/;
    const regEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!init && state !== "") {
      // 根據輸入類型進行驗證
      if (type === "number") {
        setIsValid((pre) => ({
          ...pre,
          isValidNumber: regNumberAndLetters.test(state),
          isWithinLimitNum: state.length <= limit,
        }));
      } else if (type === "text") {
        setIsValid((pre) => ({
          ...pre,
          isValidText: regText.test(state),
          isWithinLimitText: state.length <= limit,
        }));
      } else if (type === "email") {
        setIsValid((pre) => ({
          ...pre,
          isValidEmail: regEmail.test(state),
        }));
      }
    }
  }, [state, type, limit, setIsValid, init]);

  useEffect(() => {
    setIsValid((pre) => ({
      ...pre,
      isValidNumber: false,
      isValidText: false,
      isValidEmail: false,
      isWithinLimitNum: true,
      isWithinLimitText: true,
    }));
  }, [setIsValid]);

  return (
    <>
      <div className="flex flex-row items-center">
        <div className="text-base md:text-xl">{`${titleDisplay}：`}</div>
        <div className="flex flex-col gap-1 items-center justify-center">
          {/* 根據輸入的類型和驗證結果顯示對應的錯誤訊息 */}
          {type === "number" && !isValid?.isValidNumber && !init && (
            <div className="text-red-500 text-sm">請輸入數字或英文</div>
          )}
          {type === "number" && !isValid?.isWithinLimitNum && !init && (
            <div className="text-red-500 text-sm">字數最多 {limit} 字</div>
          )}
          {type === "text" && !isValid?.isValidText && !init && (
            <div className="text-red-500 text-sm">請輸入中文或英文</div>
          )}
          {type === "text" && !isValid?.isWithinLimitText && !init && (
            <div className="text-red-500 text-sm">字數最多 {limit} 字</div>
          )}
          {type === "email" && !isValid?.isValidEmail && !init && (
            <div className="text-red-500 text-sm">請輸入有效的電子郵件地址</div>
          )}
        </div>
      </div>
      <input
        type={type === "email" ? "email" : "text"}
        maxLength={type === "email" ? undefined : limit}
        className="mb-3 bg-slate-200 w-full shadow-sm rounded-lg border-x-stone-300 p-2"
        value={sessionStorage.getItem(title) || ""}
        onChange={(e) => {
          setState(e.target.value);
          sessionStorage.setItem(title, e.target.value);
          sessionStorage.setItem("isValid", JSON.stringify(isValid));
          setInit(false);
        }}
      />
    </>
  );
}
