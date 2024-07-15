import React from "react";
import "../App.css";

function List(props) {
  const hadAdoptOrNot = props.csvData.some(
    (item) =>
      item["radar_locate"] === "Adopt" &&
      item["radar_zone"] === props.quadrants,
  );
  const hadTrialOrNot = props.csvData.some(
    (item) =>
      item["radar_locate"] === "Trial" &&
      item["radar_zone"] === props.quadrants,
  );
  const hadAssessOrNot = props.csvData.some(
    (item) =>
      item["radar_locate"] === "Assess" &&
      item["radar_zone"] === props.quadrants,
  );
  const hadHoldOrNot = props.csvData.some(
    (item) =>
      item["radar_locate"] === "Hold" && item["radar_zone"] === props.quadrants,
  );

  return (
    <div
      className="w-[300px] list-container"
      style={{ wordWrap: "break-word" }}
    >
      {hadAdoptOrNot && (
        <div className="ring-title">
          <div
            className="ring-title-sign"
            style={{ backgroundColor: "#FFC00F" }}
          ></div>
          <div>{"Adopt 選用"}</div>
        </div>
      )}
      {props.csvData.map((item, index) => {
        if (
          item.radar_zone === props.quadrants &&
          item.radar_locate === "Adopt"
        )
          return (
            <div
              className="item-name cursor-pointer"
              onClick={() => {
                const overlay = document.createElement("div");
                overlay.style.position = "fixed";
                overlay.style.top = 0;
                overlay.style.left = 0;
                overlay.style.width = "100%";
                overlay.style.height = "100%";
                overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
                overlay.style.display = "flex";
                overlay.style.alignItems = "center";
                overlay.style.justifyContent = "center";
                overlay.style.zIndex = 1000;

                const modal = document.createElement("div");
                modal.style.backgroundColor = "white";
                modal.style.padding = "32px";
                modal.style.borderRadius = "8px";
                modal.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
                modal.style.width = "60vw";
                modal.style.height = "70vh";
                modal.style.overflowY = "auto"; // 加上滾輪
                modal.style.gap = "6"; // 加上滾輪
                modal.innerHTML = `
                  <div class="flex flex-col gap-6">
                    <div class="flex flex-row justify-between">
                      <div class="text-lg">技術名稱: ${item.innovation_tech_name}</div>
                      <div class="text-md flex flex-row gap-9">
                        <p>平均投票: ${item.vote_avg}</p>
                        <p>投票數: ${item.vote_count}</p>
                        <p>投票總分: ${item.vote_sum}</p>
                      </div>
                    </div>
                    <p>定義: ${item.definition_tw}</p>
                    <div class="flex flex-row gap-3">
                      <p>位置: ${item.radar_locate}</p>
                      <p>區域: ${item.radar_zone}</p>
                      <p>效益評分: ${item.benefit_rating}</p>
                      <p>成熟度: ${item.maturity}</p>
                    </div>
                    <div class="flex flex-row gap-3">
                      <p>位置百分比: ${item.position}</p>
                      <p>雷達大小: ${item.radar_size}</p>
                      <p>到達高峰時間: ${item.time_to_plateau}</p>
                    </div>
                    <div class="flex flex-row gap-3">
                      <p class="flex-1">障礙: ${item.obstacles}</p>
                      <p class="flex-1">驅動因素: ${item.drivers}</p>
                    </div>
                  </div>
                  `;

                overlay.appendChild(modal);
                document.body.appendChild(overlay);

                overlay.onclick = () => {
                  document.body.removeChild(overlay);
                };
              }}
            >
              {`${index + 1} ${item.innovation_tech_name}`}
            </div>
          );
      })}
      {hadTrialOrNot && (
        <div className="ring-title" style={{ marginTop: "12px" }}>
          <div
            className="ring-title-sign"
            style={{ backgroundColor: "#F4F4F4" }}
          ></div>
          <div>{"Trial 試用"}</div>
        </div>
      )}
      {props.csvData.map((item, index) => {
        if (
          item.radar_zone === props.quadrants &&
          item.radar_locate === "Trial"
        )
          return (
            <div
              className="item-name cursor-pointer"
              onClick={() => {
                const overlay = document.createElement("div");
                overlay.style.position = "fixed";
                overlay.style.top = 0;
                overlay.style.left = 0;
                overlay.style.width = "100%";
                overlay.style.height = "100%";
                overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
                overlay.style.display = "flex";
                overlay.style.alignItems = "center";
                overlay.style.justifyContent = "center";
                overlay.style.zIndex = 1000;

                const modal = document.createElement("div");
                modal.style.backgroundColor = "white";
                modal.style.padding = "32px";
                modal.style.borderRadius = "8px";
                modal.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
                modal.style.width = "60vw";
                modal.style.height = "70vh";
                modal.style.overflowY = "auto"; // 加上滾輪
                modal.style.gap = "6"; // 加上滾輪
                modal.innerHTML = `
                  <div class="flex flex-col gap-6">
                    <div class="flex flex-row justify-between">
                      <div class="text-lg">技術名稱: ${item.innovation_tech_name}</div>
                      <div class="text-md flex flex-row gap-9">
                        <p>平均投票: ${item.vote_avg}</p>
                        <p>投票數: ${item.vote_count}</p>
                        <p>投票總分: ${item.vote_sum}</p>
                      </div>
                    </div>
                    <p>定義: ${item.definition_tw}</p>
                    <div class="flex flex-row gap-3">
                      <p>位置: ${item.radar_locate}</p>
                      <p>區域: ${item.radar_zone}</p>
                      <p>效益評分: ${item.benefit_rating}</p>
                      <p>成熟度: ${item.maturity}</p>
                    </div>
                    <div class="flex flex-row gap-3">
                      <p>位置百分比: ${item.position}</p>
                      <p>雷達大小: ${item.radar_size}</p>
                      <p>到達高峰時間: ${item.time_to_plateau}</p>
                    </div>
                    <div class="flex flex-row gap-3">
                      <p class="flex-1">障礙: ${item.obstacles}</p>
                      <p class="flex-1">驅動因素: ${item.drivers}</p>
                    </div>
                  </div>
                  `;

                overlay.appendChild(modal);
                document.body.appendChild(overlay);

                overlay.onclick = () => {
                  document.body.removeChild(overlay);
                };
              }}
            >
              {`${index + 1} ${item.innovation_tech_name}`}
            </div>
          );
      })}
      {hadAssessOrNot && (
        <div className="ring-title" style={{ marginTop: "12px" }}>
          <div
            className="ring-title-sign"
            style={{ backgroundColor: "#D3D3D3" }}
          ></div>
          {"Assess 評估"}
        </div>
      )}
      {props.csvData.map((item, index) => {
        if (
          item.radar_zone === props.quadrants &&
          item.radar_locate === "Assess"
        )
          return (
            <div
              className="item-name cursor-pointer"
              onClick={() => {
                const overlay = document.createElement("div");
                overlay.style.position = "fixed";
                overlay.style.top = 0;
                overlay.style.left = 0;
                overlay.style.width = "100%";
                overlay.style.height = "100%";
                overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
                overlay.style.display = "flex";
                overlay.style.alignItems = "center";
                overlay.style.justifyContent = "center";
                overlay.style.zIndex = 1000;

                const modal = document.createElement("div");
                modal.style.backgroundColor = "white";
                modal.style.padding = "32px";
                modal.style.borderRadius = "8px";
                modal.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
                modal.style.width = "60vw";
                modal.style.height = "70vh";
                modal.style.overflowY = "auto"; // 加上滾輪
                modal.style.gap = "6"; // 加上滾輪
                modal.innerHTML = `
                  <div class="flex flex-col gap-6">
                    <div class="flex flex-row justify-between">
                      <div class="text-lg">技術名稱: ${item.innovation_tech_name}</div>
                      <div class="text-md flex flex-row gap-9">
                        <p>平均投票: ${item.vote_avg}</p>
                        <p>投票數: ${item.vote_count}</p>
                        <p>投票總分: ${item.vote_sum}</p>
                      </div>
                    </div>
                    <p>定義: ${item.definition_tw}</p>
                    <div class="flex flex-row gap-3">
                      <p>位置: ${item.radar_locate}</p>
                      <p>區域: ${item.radar_zone}</p>
                      <p>效益評分: ${item.benefit_rating}</p>
                      <p>成熟度: ${item.maturity}</p>
                    </div>
                    <div class="flex flex-row gap-3">
                      <p>位置百分比: ${item.position}</p>
                      <p>雷達大小: ${item.radar_size}</p>
                      <p>到達高峰時間: ${item.time_to_plateau}</p>
                    </div>
                    <div class="flex flex-row gap-3">
                      <p class="flex-1">障礙: ${item.obstacles}</p>
                      <p class="flex-1">驅動因素: ${item.drivers}</p>
                    </div>
                  </div>
                  `;

                overlay.appendChild(modal);
                document.body.appendChild(overlay);

                overlay.onclick = () => {
                  document.body.removeChild(overlay);
                };
              }}
            >
              {`${index + 1} ${item.innovation_tech_name}`}
            </div>
          );
      })}
      {hadHoldOrNot && (
        <div className="ring-title" style={{ marginTop: "12px" }}>
          <div
            className="ring-title-sign"
            style={{ backgroundColor: "#979D9D" }}
          ></div>
          {"Hold 保留"}
        </div>
      )}
      {props.csvData.map((item, index) => {
        if (item.radar_zone === props.quadrants && item.radar_locate === "Hold")
          return (
            <div
              className="item-name cursor-pointer"
              onClick={() => {
                const overlay = document.createElement("div");
                overlay.style.position = "fixed";
                overlay.style.top = 0;
                overlay.style.left = 0;
                overlay.style.width = "100%";
                overlay.style.height = "100%";
                overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
                overlay.style.display = "flex";
                overlay.style.alignItems = "center";
                overlay.style.justifyContent = "center";
                overlay.style.zIndex = 1000;

                const modal = document.createElement("div");
                modal.style.backgroundColor = "white";
                modal.style.padding = "32px";
                modal.style.borderRadius = "8px";
                modal.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
                modal.style.width = "60vw";
                modal.style.height = "70vh";
                modal.style.overflowY = "auto"; // 加上滾輪
                modal.style.gap = "6"; // 加上滾輪
                modal.innerHTML = `
                  <div class="flex flex-col gap-6">
                    <div class="flex flex-row justify-between">
                      <div class="text-lg">技術名稱: ${item.innovation_tech_name}</div>
                      <div class="text-md flex flex-row gap-9">
                        <p>平均投票: ${item.vote_avg}</p>
                        <p>投票數: ${item.vote_count}</p>
                        <p>投票總分: ${item.vote_sum}</p>
                      </div>
                    </div>
                    <p>定義: ${item.definition_tw}</p>
                    <div class="flex flex-row gap-3">
                      <p>位置: ${item.radar_locate}</p>
                      <p>區域: ${item.radar_zone}</p>
                      <p>效益評分: ${item.benefit_rating}</p>
                      <p>成熟度: ${item.maturity}</p>
                    </div>
                    <div class="flex flex-row gap-3">
                      <p>位置百分比: ${item.position}</p>
                      <p>雷達大小: ${item.radar_size}</p>
                      <p>到達高峰時間: ${item.time_to_plateau}</p>
                    </div>
                    <div class="flex flex-row gap-3">
                      <p class="flex-1">障礙: ${item.obstacles}</p>
                      <p class="flex-1">驅動因素: ${item.drivers}</p>
                    </div>
                  </div>
                  `;

                overlay.appendChild(modal);
                document.body.appendChild(overlay);

                overlay.onclick = () => {
                  document.body.removeChild(overlay);
                };
              }}
            >
              {`${index + 1} ${item.innovation_tech_name}`}
            </div>
          );
      })}
    </div>
  );
}

export default List;
