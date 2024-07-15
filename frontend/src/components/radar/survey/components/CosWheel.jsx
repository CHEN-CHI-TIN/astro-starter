export function filterKeys(obj) {
  return Object.keys(obj).filter((key) => obj[key]);
}
/**
 * 處理最終的結果
 * @param {object} input selectValues
 * @returns []
 */
export function transformFinallResult(input) {
  const output = [];
  for (const key in input) {
    const item = input[key];
    const techId = item.tech_assement.tech_id;
    const existingItem = output.find(
      (el) => el.gartner_index === item.gartner_index,
      (el) => el.gartner_title === item.gartner_title,
    );

    if (existingItem) {
      existingItem.tech_assement_list[techId] = {
        feasibility_level: item.tech_assement.feasibility_level,
        useage_level: item.tech_assement.useage_level,
      };
    } else {
      const newItem = {
        gartner_index: item.gartner_index,
        gartner_title: item.gartner_title,
        tech_assement_list: {
          [techId]: {
            feasibility_level: item.tech_assement.feasibility_level,
            useage_level: item.tech_assement.useage_level,
          },
        },
      };
      output.push(newItem);
    }
  }
  return output;
}

/**
 * 2023.12.08 將舊的資料格式寫法先留著
 * 解決 JSON 格式內數字字串問題
 * ex. 2,3,4,5 ==> [2,3,4,5]
 * @param {string} input
 * @returns []
 */
export function extractTechIds(input) {
  // 使用正則表達式匹配所有的 tech_id 數字
  let regex = /"tech_id":(\[?[\d,]+\]?)/g;
  let matches;
  let techIds = [];
  // 使用迴圈找出所有匹配的數字
  while ((matches = regex.exec(input)) !== null) {
    // 移除方括號（如果有的話）並分割數字
    let ids = matches[1].replace(/[\[\]]/g, "").split(",");
    // 將數字加入 techIds 陣列
    ids.forEach((id) => {
      if (id.trim() !== "") {
        techIds.push(parseInt(id.trim()));
      }
    });
  }
  return techIds;
}

/**
 * 解決 tech_id merge 字串轉 array 問題
 * ex. [{time_to_plateau:'A', tech_id: '1,2,3,5'},{time_to_plateau:'A', tech_id: '5,2,32,51'}] ==> [1,2,3,5,5,2,32,51]
 * @param {object} param0 input
 * @returns []
 */
export function extractTechIds_new(input) {
  let result = input.reduce((result, obj) => {
    if (obj.tech_id) {
      const techIds = obj.tech_id.split(",").map(Number);
      result.push(...techIds);
    }
    return result;
  }, []);
  return result;
}

export function DivButton({ text, bgColor = "#007bff", onClick, noPoint }) {
  return (
    <div
      style={{ background: bgColor, pointerEvents: noPoint }}
      className={
        !bgColor
          ? "bg-blue-500 text-white rounded px-2 py-1 text-center cursor-pointer select-none transition-colors duration-300 sm:text-2xl text-sm"
          : "bg-blue-500 text-white rounded px-2 py-1 text-center cursor-pointer select-none transition-colors duration-300 sm:text-2xl hover:bg-blue-700 text-sm"
      }
      onClick={onClick}
      role="button"
      tabIndex="0"
    >
      {text}
    </div>
  );
}

export function HypeCycleListBlock({
  id,
  hypeCycleTitle,
  onClick,
  backgroundColor,
  checkedState,
  setCheckedState,
}) {
  return (
    <div onClick={onClick} className="cursor-pointer">
      <div
        style={{
          backgroundColor: backgroundColor,
          overflow: "hidden",
          alignItems: "center",
        }}
        className="cursor-pointer w-full flex gap-3 flex-row px-2 py-1 border-black border-b-[0.5px]"
      >
        <div className="flex items-center justify-center h-full">
          <input
            className="cursor-pointer"
            disabled={
              Object.keys(checkedState).filter((key) => checkedState[key])
                .length >= 15 && !checkedState[id]
            }
            style={{ width: "25px", height: "25px", cursor: "pointer" }}
            type="checkbox"
            name={id}
            checked={checkedState[id] ?? false}
            onChange={(e) => {
              setCheckedState({
                ...checkedState,
                [e.target.name]: e.target.checked,
              });
            }}
          />
        </div>
        <div className="text-base sm:text-lg lg:text-base cursor-pointer">
          {hypeCycleTitle}
        </div>
      </div>
    </div>
  );
}

export function InnovationListBlock({
  HypeCycleName,
  onClick,
  backgroundColor,
}) {
  return (
    <div
      onClick={onClick}
      className="border-black border-b-[0.5px] cursor-pointer"
    >
      <div
        style={{
          backgroundColor: backgroundColor,
        }}
        className="w-full flex gap-3 flex-row px-2 py-1"
      >
        <div className="text-base sm:text-lg lg:text-base cursor-pointer">
          {HypeCycleName}
        </div>
      </div>
    </div>
  );
}

export function transformInput(input) {
  const output = [];

  // 遍历输入对象的每个属性
  for (const key in input) {
    if (input.hasOwnProperty(key)) {
      const item = input[key];
      output.push(item);
    }
  }

  return output;
}
