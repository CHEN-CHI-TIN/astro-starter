<template>
  <div class="flex flex-col items-center gap-2">
    <a :href="href">
      <div
        class="w-[150px] h-[120px] rounded-xl flex justify-center relative"
        :style="style"
      >
        <img :src="picture" alt="menu button" style="height: 100%" />
        <div
          v-if="overlay"
          class="absolute rounded-xl inset-0 bg-black bg-opacity-40 flex items-center justify-center"
        >
          <span class="text-white TY-super-hard-text">施工中</span>
        </div>
      </div>
    </a>
    <div :style="{ color: color }">{{ title }}</div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  title: {
    type: String,
    default: "放名字啦操",
  },
  picture: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "normal",
  },
  href: {
    type: String,
    required: true,
  },
});

const style = computed(() => {
  if (props.type === "normal") {
    return "background: linear-gradient(0deg, #437CFF 0.69%, rgba(24, 66, 162, 0.70) 100%);";
  } else if (props.type === "fix") {
    return "background: rgba(128, 128, 128, 0.60);";
  }
});

const color = computed(() => {
  if (props.type === "normal") {
    return "#000000"; // normal 時的文字顏色
  } else if (props.type === "fix") {
    return "#AEAEAE"; // fix 時的文字顏色
  }
});

const overlay = computed(() => {
  return props.type === "fix";
});

const title = ref(props.title);
const picture = ref(props.picture);
const href = ref(props.href);
</script>
