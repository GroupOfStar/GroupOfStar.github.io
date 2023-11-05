<template>
    <svg class="icon" width="200" height="100">
        <line class="p" x1="0" y1="50%" x2="100%" y2="50%"></line>
    </svg>
</template>

<style scoped lang="less">
.icon {
    .p {
        stroke: red;
        stroke-width: 10;
        stroke-dasharray: 200; // 设置成虚线其间隔为10
        stroke-dashoffset: 200; // 设置偏移量
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