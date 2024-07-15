<template>
  <div class="h-full w-full bg-gradient">
    <div class="h-full px-6 pt-3 TY-col-center gap-3 max-w-[800px] mx-auto">
      <div
        class="h-[50%] w-[70%] rounded-xl bg-white shadow-lg TY-col-center gap-16 text-[32px]"
      >
        <div>相信登入</div>
        <button
          class="bg-[#3260C9] w-[50%] py-2 text-white text-[1.5rem] rounded-md"
          @click="handleClick"
        >
          登入
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { authMiddleware } from "../../utils/authMiddleware";

onMounted(async () => {
  const loginOrNot = localStorage.getItem("loginOrNot");
  if (loginOrNot === "yes") {
    window.location.href = "/home";
  }
});

const handleClick = () => {
  window.location.href =
    "https://sso.foxconn.com/connect/authorize?client_id=EAaaSRadarSurvey&redirect_uri=https%3A//20.28.192.182%3A5000/home&response_type=code&scope=openid%20profile%20foxconn";
};
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
// import { ref, nextTick, watchEffect } from "vue";
// import { fetchEventSource } from "@microsoft/fetch-event-source";
// import ChatBox from "./utils/ChatBox.vue";

// import { useStore } from "@nanostores/vue";
// import {
//   referenceShow,
//   referenceCardContent,
//   toggleReferenceShow,
//   referenceCardTitle,
//   aiSearchIndex,
// } from "../../../stores/chatbot";

// // 新增 inputValue 和 handleSubmit 的邏輯
// const currentIndex = aiSearchIndex.get();
// const inputValue = ref(currentIndex);

// const handleSubmit = () => {
//   aiSearchIndex.set(inputValue.value);
// };
</script>

<style scoped>
textarea:focus {
  outline: none;
}
.bg-gradient {
  background: linear-gradient(
    180deg,
    rgba(185, 251, 255, 0.7) 0%,
    rgba(209, 201, 241, 0.7) 100%
  );
  /* filter: blur(20.387113571166992px); */
}
.floating-card {
  font-size: small;
  position: fixed;
  height: 70%;
  background-color: rgba(255, 255, 255);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  z-index: 2;
  white-space: pre-line;
}
.scroll {
  overflow-y: auto;
  overflow-x: hidden;
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}
.intro {
  color: #1842a2;
  text-align: center;
  font-family: "Microsoft YaHei";
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 35px; /* 145.833% */
}
</style>
