<template>
    <svg class="icon" :ref="el => svgRef = (el as SVGElement)" viewBox="0 0 1024 1024" version="1.1"
        xmlns="http://www.w3.org/2000/svg" width="200" height="200">
        <path class="p"
            d="M901.888 573.2864c-5.3248 0-10.6496-2.048-14.6432-6.144l-377.1904-385.536-376.4224 385.1264c-7.8848 8.0896-20.8896 8.2432-28.9792 0.3072s-8.2432-20.8896-0.3072-28.9792l378.9312-387.7376a37.05344 37.05344 0 0 1 26.7264-11.3152c10.1376 0 19.6608 4.0448 26.7776 11.3152l379.6992 388.096a20.52096 20.52096 0 0 1-0.3072 28.9792c-3.9424 3.9424-9.1136 5.888-14.2848 5.888z">
        </path>
        <path class="p"
            d="M416.4608 891.8528H231.2704c-20.736 0-37.5808-17.0496-37.5808-38.0416V474.7776c0-11.3152 9.1648-20.48 20.48-20.48s20.48 9.1648 20.48 20.48v376.1152h178.432v-125.2352c0-20.8384 16.7424-37.888 37.3248-38.0416l136.96-0.9216h0.1536a20.47488 20.47488 0 0 1 0.1536 40.96l-133.5808 0.8704v125.2864c-0.0512 20.992-16.9472 38.0416-37.632 38.0416zM787.712 891.8528h-162.9696c-11.3152 0-20.48-9.1648-20.48-20.48s9.1648-20.48 20.48-20.48h159.5904v-205.6704c0-11.3152 9.1648-20.48 20.48-20.48s20.48 9.1648 20.48 20.48v208.5888c0 20.992-16.8448 38.0416-37.5808 38.0416z">
        </path>
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
        stroke-width: 50px;
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