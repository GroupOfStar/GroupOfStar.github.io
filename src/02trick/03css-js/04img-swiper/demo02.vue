<template>
    <div class="wrapper">
        <div class="carousel">
            <div class="indicator prev" @click="() => onIndicatorClick('prev')">く</div>
            <div class="carousel_list">
                <img class="carousel_item" v-for="(item, index) in imgList" :key="item"
                    :src="`https://picsum.photos/id/${item}/300/200`" :style="carouselItemStyle(index)" />
            </div>
            <div class="indicator next" @click="() => onIndicatorClick('next')">く</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, StyleValue } from 'vue'

const imgList = ref<any[]>(Array.from({ length: 7 }, (_, index) => `${index + 10}`))
// 当前轮播图index
const activeIndex = ref(3)

const carouselItemStyle = computed(() => {
    // 每张轮播图之间的间隙
    const xOffsetStep = 80
    // 缩放的递减倍率
    const scaleStep = 0.8
    // 透明度的递减倍率
    const opacityStep = 0.9

    // transform: translateX(-200px) scale(0.6) rotateY(-45deg);
    return (idx: number): StyleValue => {
        // 倍数
        const multiple = Math.abs(activeIndex.value - idx)
        // 符号
        const sign = Math.sign(idx - activeIndex.value)

        let xOffset = (idx - activeIndex.value) * xOffsetStep
        // 紧挨着当前图片的图片太紧凑，给个基础距离
        if (idx !== activeIndex.value) {
            xOffset = xOffset + 60 * sign
        }
        const scale = scaleStep ** multiple
        const rotateY = idx === activeIndex.value ? 0 : 45 * -sign
        return {
            transform: `translateX(${xOffset}px) scale(${scale}) rotateY(${rotateY}deg)`,
            zIndex: imgList.value.length - multiple,
            opacity: opacityStep ** multiple
        }
    }
})

const onIndicatorClick = (type: "prev" | "next") => {
    if (type === 'prev' && activeIndex.value > 0) {
        activeIndex.value = activeIndex.value - 1
    }
    if (type === 'next' && activeIndex.value < imgList.value.length - 1) {
        activeIndex.value = activeIndex.value + 1
    }
}

</script>

<style scoped lang="less">
.wrapper {
    background-color: black;
    padding: 48px 0;

    .carousel {
        display: flex;
        justify-content: space-between;
        align-items: center;
        overflow: hidden;

        .carousel_list {
            width: 300px;
            height: 200px;
            position: relative;

            .carousel_item {
                position: absolute;
                transition: transform 0.5s;
                max-width: unset;
                height: unset;
            }
        }

        .indicator {
            font-size: 36px;
            color: #dadada;
            font-weight: bold;
            cursor: pointer;
            z-index: 999;
            line-height: 36px;
            padding: 12px 0;
            background-color: rgba(0, 0, 0, 0.2);
            border-radius: 2px;
            user-select: none;

            &.prev {
                margin-left: 24px;
            }

            &.next {
                margin-right: 24px;
                transform: rotateY(180deg);
            }
        }
    }
}
</style>