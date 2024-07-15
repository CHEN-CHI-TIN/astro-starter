<template client:only="vue">
  <div class="h-full w-full bg-gradient">
    <div class="h-full pt-3 flex flex-col gap-3 max-w-[800px] mx-auto">
      <div class="h-0 p-6 flex-grow overflow-auto w-full flex flex-col gap-8">
        <div v-if="showIntro" class="intro TY-col-center">
          <div>歡迎使用</div>
          <!-- <div class="text-red-400">還是可以問，但</div>
          <div class="text-red-400">維修中！！！維修中！！！</div> -->
          <div>EA 語音助理機器人</div>
          <div>Ver 0.9</div>
          <img class="w-[40%] sm:w-[30%]" :src="'AI_01.png'" alt="請重整" />
        </div>
        <ChatBox
          v-for="(chat, index) in session"
          :key="index"
          :type="chat.type"
          :chatContent="chat.chatContent"
          :references="chat?.reference"
        />
        <ChatBox
          v-if="runtimeQue === '/Nick'"
          :type="'ai'"
          :cc="true"
          :chatContent="''"
        />
      </div>
      <div class="px-3 flex justify-end text-sm text-gray-500">
        {{ `資料集版本: ${aiSearchIndex.get()}` }}
      </div>
      <div class="flex flex-row gap-3 justify-between bg-white">
        <div class="flex-[4] h-28">
          <textarea
            class="w-full p-3 border border-gray-300 resize-none border-none"
            id="story"
            name="story"
            v-model="runtimeQue"
            @keyup.ctrl.enter="handleEnter"
            placeholder="問我任何問題..."
            :disabled="isQuestionBlockDisabled"
          ></textarea>
        </div>
        <div
          class="flex-[1] flex flex-row pb-3 gap-1 items-end justify-end mr-6"
        >
          <div
            v-if="!isQuestionBlockDisabled"
            class="w-full flex flex-col item-center justify-center gap-2"
          >
            <div class="w-full items-center justify-center gap-3 flex flex-row">
              <div
                v-if="rec === false"
                class="cursor-pointer"
                @click="startSpeechToTxt"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <g clip-path="url(#clip0_0_3637)">
                    <path
                      d="M16 32.5C25.1127 32.5 32.5 25.1127 32.5 16C32.5 6.8873 25.1127 -0.5 16 -0.5C6.8873 -0.5 -0.5 6.8873 -0.5 16C-0.5 25.1127 6.8873 32.5 16 32.5Z"
                      fill="white"
                      stroke="#EBF5FF"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M19.7009 15.4728C19.7009 17.2201 18.2763 18.6305 16.4981 18.6305C14.72 18.6305 13.2847 17.2201 13.2847 15.4728V9.15764C13.2847 7.41043 14.72 6.00003 16.4981 6.00003C18.2763 6.00003 19.7116 7.41043 19.7116 9.15764L19.7009 15.4728ZM16.4981 20.8408C19.4545 20.8408 22.1753 18.6305 22.1753 15.4728H23.9963C23.9963 19.0725 21.0827 22.0407 17.5693 22.5459V25.9982H15.427V22.5459C11.9136 22.0301 9 19.062 9 15.4728H10.821C10.821 18.6305 13.5417 20.8408 16.4981 20.8408Z"
                      fill="#3260C9"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_0_3637">
                      <rect width="32" height="32" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div v-if="rec === true">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 46 46"
                  fill="none"
                >
                  <g clip-path="url(#clip0_0_3389)">
                    <path
                      d="M23 39.5C32.1127 39.5 39.5 32.1127 39.5 23C39.5 13.8873 32.1127 6.5 23 6.5C13.8873 6.5 6.5 13.8873 6.5 23C6.5 32.1127 13.8873 39.5 23 39.5Z"
                      fill="url(#paint0_linear_0_3389)"
                      stroke="#EBF5FF"
                    />
                    <path
                      d="M23 42.5C33.7696 42.5 42.5 33.7696 42.5 23C42.5 12.2304 33.7696 3.5 23 3.5C12.2304 3.5 3.5 12.2304 3.5 23C3.5 33.7696 12.2304 42.5 23 42.5Z"
                      fill="white"
                      fill-opacity="0.01"
                      stroke="#D6EBFF"
                    />
                    <path
                      d="M23 46.5C35.9787 46.5 46.5 35.9787 46.5 23C46.5 10.0213 35.9787 -0.5 23 -0.5C10.0213 -0.5 -0.500002 10.0213 -0.500002 23C-0.500002 35.9787 10.0213 46.5 23 46.5Z"
                      fill="white"
                      fill-opacity="0.01"
                      stroke="#9ECFFF"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M26.7009 22.4728C26.7009 24.2201 25.2763 25.6305 23.4981 25.6305C21.72 25.6305 20.2847 24.2201 20.2847 22.4728V16.1576C20.2847 14.4104 21.72 13 23.4981 13C25.2763 13 26.7116 14.4104 26.7116 16.1576L26.7009 22.4728ZM23.4981 27.8408C26.4545 27.8408 29.1753 25.6305 29.1753 22.4728H30.9963C30.9963 26.0725 28.0827 29.0407 24.5693 29.5459V32.9982H22.427V29.5459C18.9136 29.0301 16 26.062 16 22.4728H17.821C17.821 25.6305 20.5417 27.8408 23.4981 27.8408Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <linearGradient
                      id="paint0_linear_0_3389"
                      x1="41.0362"
                      y1="32.084"
                      x2="27.2042"
                      y2="3.60976"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#3260C9" />
                      <stop
                        offset="1"
                        stop-color="#58CBFC"
                        stop-opacity="0.6"
                      />
                    </linearGradient>
                    <clipPath id="clip0_0_3389">
                      <rect width="46" height="46" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div class="cursor-pointer" @click="handleEnter">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="34"
                  height="34"
                  viewBox="0 0 34 34"
                  fill="none"
                >
                  <path
                    d="M17 33.5C26.1127 33.5 33.5 26.1127 33.5 17C33.5 7.8873 26.1127 0.5 17 0.5C7.8873 0.5 0.5 7.8873 0.5 17C0.5 26.1127 7.8873 33.5 17 33.5Z"
                    fill="#3260C9"
                    stroke="#EBF5FF"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M24.9955 17.4484C25.1057 17.2245 25.1645 16.979 25.1669 16.7291C25.1693 16.4792 25.1163 16.2327 25.0104 16.0065C24.7625 15.4779 24.2824 15.2457 23.4036 14.8207L23.3986 14.8183L14.5156 10.5379L14.5016 10.5311C13.5216 10.0597 12.9799 9.79914 12.3814 9.95677C12.1292 10.0251 11.8957 10.1498 11.6993 10.3222C11.5028 10.4945 11.3483 10.7097 11.2486 10.9509C11.0147 11.5191 11.1882 12.0586 11.5342 13.135L11.5366 13.1424L12.7295 16.8379L12.6954 16.9385L11.4494 20.5637C11.0758 21.6498 10.8885 22.1943 11.1134 22.7667C11.1962 22.9767 11.3213 23.1673 11.4812 23.3271C11.6969 23.5419 11.966 23.6935 12.2611 23.7672C12.8552 23.9104 13.3677 23.6544 14.3936 23.1419L14.3987 23.1394L23.3856 18.6462C24.2608 18.209 24.7442 17.9664 24.9955 17.4484ZM14.3433 15.927L13.2615 12.5806C13.1773 12.3192 13.0916 12.0525 13.0323 11.8459C13.2297 11.9326 13.4796 12.0534 13.7242 12.1719L21.3481 15.8452L14.3433 15.927ZM12.9356 21.8323C13.1248 21.7442 13.3539 21.6296 13.5793 21.5169L21.2913 17.6631L14.3356 17.743L13.1633 21.1539C13.081 21.3913 12.9962 21.6359 12.9356 21.8323Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
            <div class="text-gray-500 text-sm text-center">
              <span v-if="!rec"> 語音輸入限時30秒 </span>
              <span v-else-if="rec">
                {{ countdown }}
              </span>
            </div>
          </div>
          <div
            v-else-if="isQuestionBlockDisabled"
            class="w-full flex justify-center cursor-pointer"
            @click="handleStrongStop"
          >
            <div
              class="rounded-full bg-[#3260C9] w-[36px] h-[36px] TY-col-center"
            >
              <div
                class="w-[18px] h-[18px] rounded-sm border-2 border-white"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="refShow"
      class="overlay cursor-pointer"
      @click="renderLeave"
    ></div>
    <div v-if="refShow" class="floating-card sm:w-[70%] w-[90%] flex flex-col">
      <div
        class="bg-[#3260C9] h-12 py-2 px-3 flex justify-between items-center text-sm text-white"
      >
        <div></div>
        <div>
          {{ referenceCardTitle.get() }}
        </div>
        <a :href="referenceCardUrl.get()" target="_blank">
          <button
            class="px-2 py-1 cursor-pointer rounded-md bg-[rgba(0,0,0,0.3)]"
          >
            下載
          </button>
        </a>
      </div>
      <div
        v-if="referenceCardUrl.get().endsWith('.pptx')"
        class="flex-1 TY-col-center"
      >
        <a :href="referenceCardUrl.get()" target="_blank">
          <button
            class="px-4 text-[32px] py-1 cursor-pointer rounded-md bg-[rgba(0,0,0,0.3)]"
          >
            PPT 下載
          </button>
        </a>
      </div>
      <!-- <iframe
        v-else-if="referenceCardUrl.get().endsWith('.pdf')"
        :src="referenceCardUrl.get()"
        style="height: 100%; width: 100%"
        @load="renderedHandler"
        @error="errorHandler"
      ></iframe> -->
      <vue-office-pdf
        v-if="referenceCardUrl.get().endsWith('.pdf')"
        :src="referenceCardUrl.get()"
        style="height: 100%; width: 100%"
        @rendered="renderedHandler"
        @error="errorHandler"
      />
      <vue-office-docx
        v-else-if="referenceCardUrl.get().endsWith('.docx')"
        :src="referenceCardUrl.get()"
        style="height: 100%; width: 100%"
        @rendered="renderedHandler"
        @error="errorHandler"
      />
      <!-- <div v-if="showLoading" class="flex-1 TY-col-center text-[32px]">
        載入中{{ ".".repeat(loadingDots % 4) }}
      </div> -->
      <!-- <iframe
        :src="`https://view.officeapps.live.com/op/view.aspx?src=${testUrl}`"
        frameborder="0"
        class="w-full h-full"
      ></iframe> -->
      <!-- <div class="font-bold px-6">
        {{ referenceCardTitle.get() }}
      </div>
      <div class="px-6 flex-1 scroll text-lg">
        {{ referenceCardContent.get() }}
      </div> -->
      <div
        class="bg-[#437CFF] h-11 mx-3 my-3 rounded-lg TY-col-center text-xl text-white cursor-pointer"
        @click="renderLeave"
      >
        離開
      </div>
    </div>
  </div>
</template>

<script setup client:only="vue" lang="ts">
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
import { ref, nextTick, watchEffect, onMounted } from "vue";
import { authMiddleware } from "../../utils/authMiddleware";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import ChatBox from "./utils/ChatBox.vue";

import { useStore } from "@nanostores/vue";
import {
  referenceShow,
  referenceCardContent,
  toggleReferenceShow,
  referenceCardTitle,
  referenceCardUrl,
  aiSearchIndex,
} from "../../../stores/chatbot";

import VueOfficePdf from "@vue-office/pdf";
import VueOfficeDocx from "@vue-office/docx";

import "@vue-office/docx/lib/index.css";

const empNo = ref("");
const insertData = async (userId, promptLogs) => {
  const response = await fetch("https://20.28.192.182/api/chatbot/insert", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: String(userId.value),
      prompt_logs: String(promptLogs),
    }),
  });

  if (response.ok) {
    const data = await response.json();
    console.log("Great! Submit prompt log success!", data.status);
  } else {
    console.log("God Damnnnn! Submit prompt log error...");
  }
};

onMounted(async () => {
  console.log("ChatBot~~~~~~~~~~");
  // await authMiddleware();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (userInfo) {
    empNo.value = userInfo.emp_no;
  }
});

const renderedHandler = () => {
  showLoading.value = false;
  console.log("渲染完成");
};

const errorHandler = () => {
  console.log("渲染失敗");
};

const renderLeave = () => {
  showLoading.value = true;
  toggleReferenceShow();
};

const refShow = useStore(referenceShow);

const lang = "zh-TW";
const runtimeQue = ref();
const runtimeAns = ref("");
const sessionGap = ref(0);
const rec = ref(false);
const showIntro = ref(true);
const showLoading = ref(true);
const loadingDots = ref(0); // 新增這一行
const strongStop = ref(false);
const session = ref([
  {
    type: "ai",
    chatContent: "HI!",
    reference: [],
  },
  {
    type: "ai",
    chatContent: "請問我任何問題我會回答你！",
    reference: [],
  },
]);

const isQuestionBlockDisabled = ref(false); // 新增這一行
const countdown = ref(30); // 新增這一行

const testUrlPPTX = ref(
  "https://stcurryshpen869709890241.blob.core.windows.net/fileupload-ea-v240604a/CiT_EA_R&R%E8%88%87%E5%8D%94%E4%BD%9C%E6%A8%A1%E5%BC%8F_20240514B.pptx",
);
const testUrlPDF = ref(
  "https://stcurryshpen869709890241.blob.core.windows.net/fileupload-ea-v240604a/The_EA%20_first%20100%20Days_725988_ndx.pdf",
);
const testUrlDOCX = ref(
  "https://stcurryshpen869709890241.blob.core.windows.net/fileupload-ea-v240604a/CiT_EA_%E6%8A%80%E8%A1%93%E8%AA%BF%E7%A0%94%E5%8F%8APOC%E9%A9%97%E8%AD%89%E9%80%B1%E6%9C%83_%E6%9C%83%E8%AD%B0%E8%A8%98%E9%8C%84_20231109A.docx",
);

// 在適當的地方啟動定時器來更新loadingDots的值
let intervalId = setInterval(() => {
  loadingDots.value = (loadingDots.value + 1) % 4; // 控制"..."的變化
}, 500); // 每隔500毫秒更新一次

// 當showLoading為false時清除定時器
watchEffect(() => {
  if (!showLoading.value) {
    clearInterval(intervalId);
  }
});

const handleStrongStop = () => {
  strongStop.value = true;
};

const newline = () => {
  runtimeQue.value += "\n";
};

const handleEnter = (event) => {
  insertData(empNo, `text: ${runtimeQue.value}`);
  fetchEventSourceFunc(runtimeQue.value, aiSearchIndex.get());
};

const formatChatContent = (content: string) => {
  let formattedContent = content;
  formattedContent = formattedContent.replace(
    /\*\*(.*?)\*\*/g,
    "<i><b>$1</b></i>",
  );
  formattedContent = formattedContent.replace(/\n/g, "<br>");
  return formattedContent;
};

const fetchEventSourceFunc = (question, index) => {
  if (!question) {
    return;
  }
  showIntro.value = false;
  session.value.push({
    type: "user",
    chatContent: question,
    reference: [],
  });
  runtimeQue.value = "";
  session.value.push({
    type: "ai",
    chatContent: "詢問中......",
    reference: [],
  });

  isQuestionBlockDisabled.value = true;

  const scrollToBottom = () => {
    nextTick(() => {
      const chatContainer = document.querySelector(".h-0.flex-grow");
      chatContainer.scrollTop = chatContainer.scrollHeight;
    });
  };

  scrollToBottom();

  const ctrl = new AbortController();
  const onclose = () => {
    console.log("onclose");
    sessionGap.value = 0;
    isQuestionBlockDisabled.value = false;
    strongStop.value = false;
  };

  fetchEventSource(
    `https://20.28.192.182/api/chatbot/ai_search/stream?query=${question}&index=${index}`,
    // `/api/chatbot/ai_search/stream?query=${question}&index=${index}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      signal: ctrl.signal,
      openWhenHidden: true,
      onmessage(msg) {
        if (strongStop.value) {
          ctrl.abort();
          onclose();
          return;
        }
        console.log("onmessage", msg);
        if (sessionGap.value === 0) {
          if (session.value[session.value.length - 1].type === "ai") {
            session.value[session.value.length - 1].chatContent = "";
            session.value[session.value.length - 1].chatContent += msg.data;
          }
          sessionGap.value = 1;
        } else if (session.value[session.value.length - 1].type === "ai") {
          if (msg.event !== "reference") {
            session.value[session.value.length - 1].chatContent += msg.data;
          } else if (msg.event === "reference") {
            session.value[session.value.length - 1].reference = JSON.parse(
              msg.data,
            );
          }
        }
        scrollToBottom();
      },
      onclose,
      onerror(err) {
        console.log("onerror", err);
        sessionGap.value = 0;
        ctrl.abort();
        throw err;
      },
    },
  );
};

const startSpeechToTxt = () => {
  console.log("start speech");
  rec.value = true;
  window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new window.SpeechRecognition();
  recognition.lang = lang;
  recognition.interimResults = true;

  recognition.addEventListener("result", (event) => {
    const text = Array.from(event.results)
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join("");
    console.log(text);
    runtimeQue.value = text;
  });

  recognition.addEventListener("end", async () => {
    setTimeout(() => {
      insertData(empNo, `speech: ${runtimeQue.value}`);
      fetchEventSourceFunc(runtimeQue.value, aiSearchIndex.get());
      runtimeQue.value = "";
      recognition.stop();
      rec.value = false;
      nextTick().then(() => {
        document.querySelector(".h-0.flex-grow").scrollIntoView(false);
      });
    }, 3000);
  });

  // recognition.addEventListener("start", () => {
  //   console.log("Speech recognition started");
  //   setTimeout(() => {
  //     recognition.stop();
  //     rec.value = false;
  //   }, 30000);
  // });

  recognition.addEventListener("start", () => {
    console.log("Speech recognition started");
    countdown.value = 30; // 重置倒數計時
    const countdownInterval = setInterval(() => {
      console.log(`倒數計時: ${countdown.value} 秒`);
      countdown.value--;
      if (countdown.value < 0) {
        clearInterval(countdownInterval);
        recognition.stop();
        rec.value = false;
      }
    }, 1000);
  });

  recognition.addEventListener("error", (event) => {
    console.error("Speech recognition error", event);
    rec.value = false;
  });

  recognition.start();
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
  background-color: rgba(0, 0, 0, 0.7);
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
