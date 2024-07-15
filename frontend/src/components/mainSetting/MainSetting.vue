<template>
  <div class="h-full w-full bg-gradient">
    <div
      class="h-full px-6 pt-3 flex flex-col gap-3 max-w-[800px] mx-auto items-start"
    >
      <div>AI Search Index</div>
      <div class="flex flex-row gap-3">
        <input
          class="px-3"
          type="text"
          v-model="inputValue"
          placeholder="{{inputValue}}"
        />
        <button
          class="bg-[#3260C9] px-3 py-1 text-white rounded-md"
          @click="handleSubmit"
        >
          提交
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
import { ref, nextTick, watchEffect, onMounted } from "vue";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import ChatBox from "../chatbot/utils/ChatBox.vue";

import { useStore } from "@nanostores/vue";
import {
  referenceShow,
  referenceCardContent,
  toggleReferenceShow,
  referenceCardTitle,
  aiSearchIndex,
} from "../../../stores/chatbot";

import { authMiddleware } from "../../utils/authMiddleware";

onMounted(async () => {
  console.log("MainSetting~~~~~~~~~~");
  await authMiddleware();
});

// 新增 inputValue 和 handleSubmit 的邏輯
const currentIndex = aiSearchIndex.get();
const inputValue = ref(currentIndex);

const handleSubmit = () => {
  aiSearchIndex.set(inputValue.value);
};
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
