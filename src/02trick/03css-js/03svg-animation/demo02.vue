<template>
    <svg class="icon" :ref="el => svgRef = (el as SVGElement)" width="200" height="200">
        <!-- <line class="p" x1="0" y1="50%" x2="50%" y2="50%"></line> -->
        <circle class="p" cx="50%" cy="50%" r="30%" />
    </svg>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
const svgRef = ref<SVGElement>()
onMounted(() => {
    const paths = svgRef.value?.querySelectorAll<SVGGeometryElement>('.p')
    if (paths) {
        paths.forEach(item => {
            const len = item.getTotalLength()
            // len + 1 是防止计算出来的长度不精确导致显示时有缺口
            item.style.setProperty("--l", `${len + 1}`)
        })
    }
})
</script>

<style scoped lang="less">
.icon {
    .p {
        fill: none;
        stroke: red;
        stroke-width: 10;
        stroke-linecap: round; // 线的两端样式， 圆角
        stroke-dasharray: var(--l); // 设置成虚线其间隔为10
        stroke-dashoffset: var(--l); // 设置偏移量
        animation: stroke 1.5s ease-out forwards;
        animation-iteration-count: infinite;
    }

    @keyframes stroke {
        to {
            stroke-dashoffset: 0;
        }
    }
}
</style>