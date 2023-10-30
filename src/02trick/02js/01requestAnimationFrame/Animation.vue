<!-- #region snippet -->
<template>
    <div class="btn-group">
        <button class="btn" @click="onStart">开始</button>
        <button class="btn" @click="onStop">停止</button>
        <button class="btn" @click="onReset">重置</button>
    </div>
    <div class="box" :ref="el => boxRef = (el as HTMLElement)"></div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const boxRef = ref<HTMLElement | null>(null)
let animationId: number

// 开始
const onStart = () => {
    let start: number;
    const step: FrameRequestCallback = (timestamp) => {
        const box = boxRef.value
        if (box) {
            if (start === undefined) {
                start = timestamp;
            }
            // 3秒走完的进度
            const progress = Math.ceil((timestamp - start) / 3000 * 100)
            if (progress < 100) {
                box.style.width = `${progress}%`;
                animationId = requestAnimationFrame(step)
            }
        }
    }
    animationId = requestAnimationFrame(step)
}

// 暂停
const onStop = () => {
    cancelAnimationFrame(animationId);
}

// 重置
const onReset = () => {
    cancelAnimationFrame(animationId);
    requestAnimationFrame(() => {
        boxRef.value?.style.setProperty('width', "0%")
    })
}
</script>
<!-- #endregion snippet -->

<style scoped lang="less">
.btn-group {
    display: flex;
    gap: 12px;

    .btn {
        box-sizing: border-box;
        background-color: #ffffff;
        color: rgba(0, 0, 0, 0.88);
        box-shadow: 0 2px 0 rgba(0, 0, 0, 0.02);

        font-size: 14px;
        height: 32px;
        padding: 4px 15px;
        border-radius: 6px;

        outline: none;
        position: relative;
        display: inline-block;
        text-align: center;
        border: 1px solid #d9d9d9;
        cursor: pointer;
        transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
        user-select: none;
        touch-action: manipulation;

        &:hover {
            color: #4096ff;
            border-color: #4096ff;
        }
    }
}

.box {
    width: 0;
    height: 50px;
    background-color: tomato;
}
</style>