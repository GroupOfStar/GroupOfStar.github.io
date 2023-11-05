import { watchEffect, ref } from "vue";

type Theme = "light" | "dark" | "OS";

const LOCAL_KEY = "__theme__";

const theme = ref<Theme>((localStorage.getItem(LOCAL_KEY) as Theme) || "light");

const match = matchMedia("(prefers-color-scheme: dark)");

function followOS() {
  document.documentElement.dataset.theme = match.matches ? "dark" : "light";
}

watchEffect(() => {
  localStorage.setItem(LOCAL_KEY, theme.value);
  if (theme.value === "OS") {
    followOS();
    // 实现系统主题切换后 页面能自动识别
    match.addEventListener("change", followOS);
  } else {
    document.documentElement.dataset.theme = theme.value;
    match.removeEventListener("change", followOS);
  }
});

export default function useTheme() {
  return { theme };
}
