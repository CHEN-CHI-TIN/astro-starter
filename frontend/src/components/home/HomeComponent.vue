<template>
  <div
    class="h-full"
    style="
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.3) 51.78%,
        rgba(67, 124, 255, 0.14) 92.63%
      );
    "
  >
    <div
      class="w-full gap-6 sm:gap-12 sm:px-[64px] px-[26px] flex flex-row flex-wrap pt-8 justify-center sm:justify-start text-lg"
    >
      <!-- {{ empNo }} -->
      <!-- <ButtonMenu
        title="EA 語音助理機器人"
        picture="AI_04.png"
        href="/chatbot"
      /> -->
      <!-- <ButtonMenu
        v-if="limit(empNo)"
        title="專家評估系統"
        picture="radar.png"
        href="/radarSurvey"
      /> -->
      <ButtonMenu
        title="專家評估系統"
        picture="/public/background-radar-2.png"
        href="/radarCreator"
      />
      <ButtonMenu
        title="創新技術雷達圖"
        picture="/public/radar.png"
        href="/radarSurvey"
      />
      <!-- <ButtonMenu title="專家評估報表" picture="none_02.png" type="fix" /> -->
      <!-- <ButtonMenu title="技術雷達圖" picture="none_02.png" type="fix" /> -->
      <!-- <ButtonMenu title="EA 語音聊天機器人" picture="AI_04.png" />
      <ButtonMenu title="EA 語音聊天機器人" picture="AI_04.png" /> -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { authMiddleware } from "../../utils/authMiddleware";
import ButtonMenu from "./utils/ButtonMenu.vue";
import authLimit from "./utils/authLimit.json";

const empNo = ref("");

const limit = (empNo) => {
  if (empNo) {
    return authLimit.radar_survey.includes(empNo);
  }
};

// onMounted(async () => {
//   console.log("Home~~~~~~~~~~");
//   await authMiddleware();
//   let emp_no = JSON.parse(localStorage.getItem("userInfo"));
//   console.log(emp_no);
//   if (emp_no) {
//     emp_no = emp_no.emp_no;
//     empNo.value = emp_no;
//   }
// });
</script>
