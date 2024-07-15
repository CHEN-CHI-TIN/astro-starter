<template>
  <div :class="`flex flex-row ${position} text-base`">
    <div v-if="type == 'ai'" class="avatar">
      <img :src="'WTF_ai.svg'" alt="請重整" class="WTF_ai" />
      <img :src="'avatar_ai.svg'" alt="請重整" />
    </div>
    <!-- 馬的怎麼調都怪怪的 就說前端玄學 先寫死 左邊54px 搞這麼麻煩幹嘛 不懂css的設計師跟廢人沒兩樣 只會添麻煩 -->
    <div v-else-if="type == 'user'" class="w-[54px] opacity-0"></div>
    <div :class="`${bgColor} w-full px-6 py-3 rounded-xl max-w-full`">
      <!-- <div class="max-h-[300px] min-h-[48px] overflow-auto overflow-x-hidden"> -->
      <div class="">
        <!-- <div :class="`${textColor} font-bold whitespace-pre-line`">
          {{ chatContent }}
        </div> -->
        <!-- <div>sasas</div> -->
        <div v-if="type === 'ai' && cc === true">
          新竹巴菲特
          <img :src="'nick.jpg'" alt="請重整" />
        </div>
        <div
          :class="`${textColor} font-bold whitespace-pre-line`"
          v-html="formatChatContent(chatContent)"
        ></div>
        <div v-if="references?.length > 0 && type === 'ai'" class="">
          <div v-if="references?.length <= 0"></div>
          <div v-if="references?.length > 0">資料來源:</div>
          <div v-for="(e, i) in references" class="inline">
            <span
              v-if="refDocIndex.includes(String(i + 1))"
              class="text-[#3260C9] bg-[#D3E4FE] font-medium px-2 py-1 rounded-md mr-2 cursor-pointer"
              style="line-height: 2.5"
              @click="handleClick(e?.title, e?.content, e?.url)"
            >
              <a style="text-decoration: underline">
                {{ i + 1 }}. {{ e?.filepath }}
              </a>
              <!-- <a
                :href="e?.url"
                target="_blank"
                style="text-decoration: underline"
              >
                {{ i + 1 }}. {{ e?.filepath }}
              </a> -->
            </span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="type == 'user'" class="flex flex-row justify-around gap-3">
      <div class="text-[#626264]">
        <!-- {{ userStore.userInfo ? userStore.userInfo.name : "noUserName" }} -->
      </div>
    </div>
    <div v-if="type == 'ai'" class="flex flex-row justify-around gap-3">
      <div class="text-[#626264]">
        <!-- {{ aiStore.aiName ? aiStore.aiName : "???" }} -->
      </div>
    </div>
    <div v-if="type == 'user'" class="avatar">
      <img :src="'WTF_user.svg'" alt="請重整" class="WTF_user" />
      <div class="bg-white rounded-full">
        <img :src="'avatar_user.png'" alt="請重整" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";

import { useStore } from "@nanostores/vue";
import {
  referenceShow,
  referenceCardTitle,
  referenceCardContent,
  referenceCardUrl,
  toggleReferenceShow,
} from "../../../../stores/chatbot";
const refShow = useStore(referenceShow);

const refDocIndex = ref([]);
const formatChatContent = (content: string) => {
  let formattedContent = content;
  formattedContent = formattedContent.replace(
    /\*\*(.*?)\*\*/g,
    "<i><b>$1</b></i>",
  );
  formattedContent = formattedContent.replace(
    /\[doc(\d+)\]/g,
    (match, group) => {
      refDocIndex.value.push(group);
      return `<span style="color: #5F80F8;">[${group}]</span>`;
    },
  );
  formattedContent = formattedContent.replace(/\n/g, "<br>");
  return formattedContent;
};

const { chatContent, references, type } = defineProps({
  chatContent: {
    type: String,
    default: "這裡是對話框的內容。",
  },
  references: {
    type: Array as () => Array<{
      content: string;
      title: string;
      filepath: string;
      chunk_id: string;
      url: string;
    }>,
    default: [],
  },
  type: {
    type: String,
    default: "user",
  },
  cc: {
    type: Boolean,
    default: false,
  },
});

const handleClick = (title: string, content: string, url: string) => {
  toggleReferenceShow();
  referenceCardTitle.set(title);
  referenceCardContent.set(content);
  referenceCardUrl.set(url);
};

let position = "";
let bgColor = "";
let textColor = "";
if (type === "user") {
  position = "items-top justify-end";
  bgColor = "bg-[#5F80F8]";
  textColor = "text-[#EBF4FF]";
} else if (type === "ai") {
  position = "items-top justify-start";
  bgColor = "bg-[#F7FBFF]";
  textColor = "text-[#333333]";
}
</script>

<style scoped>
.text-base {
  font-size: 16px;
  line-height: 24px; /* 171.429% */
  letter-spacing: 0.21px;
}
.avatar {
  width: 48px;
  height: 48px;
  position: relative;
}
.WTF_ai {
  position: absolute;
  top: 50%;
  left: 100%;
  transform: translate(-60%, -50%);
}
.WTF_user {
  position: absolute;
  top: 50%;
  right: 100%;
  transform: translate(60%, -70%);
}
</style>
