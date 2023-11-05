<template>
    <div class="container">
        <div class="carousel" :style="{ transform: `translateX(-${activeIndex}00%)` }">
            <div class="item" v-for="item in imgList" :key="item">
                <a href=""><img :src="`https://picsum.photos/id/${item}/500/300/`" alt=""></a>
            </div>
        </div>
        <div class="indicator">
            <span :class="index === activeIndex ? 'active' : ''" v-for="(item, index) in imgList" :key="item"
                @click="() => onIndicatorClick(index)"></span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const imgList = ref<any[]>(Array.from({ length: 4 }, (_, index) => `${index + 10}`))
const activeIndex = ref(0)
const onIndicatorClick = (idx: number) => {
    activeIndex.value = idx
}
</script>

<style scoped lang="less">
.container {
    width: 500px;
    height: 300px;
    margin: 10px auto;
    overflow: hidden;
    position: relative;

    .carousel {
        width: 100%;
        height: 100%;
        display: flex;
        transition: all 0.5s;

        img {
            width: 500px;
            height: 300px;
            max-width: unset;
        }
    }

    .indicator {
        position: absolute;
        bottom: 10px;
        display: flex;
        left: 50%;
        transform: translateX(-50%);

        span {
            width: 16px;
            height: 16px;
            border: 2px solid #ccc;
            border-radius: 50%;
            margin: 0 4px;

            &.active {
                border-color: white;
                background-color: white;
            }
        }
    }
}
</style>