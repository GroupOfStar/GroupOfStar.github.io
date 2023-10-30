<template>
    <canvas id="canvas" :ref="el => canvasRef = (el as HTMLCanvasElement)"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
const canvasRef = ref<HTMLCanvasElement>()

function initCanvasContext() {
    const mainDom = document.querySelector("main.main");
    const cvs = canvasRef.value
    if (cvs && mainDom) {
        cvs.width = mainDom.clientWidth * devicePixelRatio;
        cvs.height = mainDom.clientWidth * devicePixelRatio;
        const ctx = cvs.getContext("2d");
        if (ctx) {
            ctx.fillStyle = '#000'
            ctx.fillRect(0, 0, cvs.width, cvs.height)
        }
        return ctx
    }
    return undefined
}

/** 获取随机字符 */
function getRandomChar() {
    const str = '0123456789abcdefghijklmnopqrstuvwxyz'
    return str[Math.floor(Math.random() * (str.length))]
}

function draw(ctx: CanvasRenderingContext2D, fontSize: number, charArr: number[]) {
    const canvas = ctx.canvas
    ctx.fillStyle = "rgba(0,0,0,0.1)"
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // 画文字
    ctx.fillStyle = '#6be445';
    ctx.textBaseline = 'top'
    for (let i = 0; i < charArr.length; i++) {
        const x = i * fontSize
        const y = charArr[i] * fontSize
        ctx.fillText(getRandomChar(), x, y)
        if (y > canvas.height && Math.random() > 0.99) {
            charArr[i] = 0
        } else {
            charArr[i]++
        }
    }
}

onMounted(() => {
    const ctx = initCanvasContext()
    if (ctx) {
        const fontSize = 16 * devicePixelRatio
        ctx.font = `${fontSize}px "Roboto Mono"`
        const columnCount = Math.floor(ctx.canvas.width / fontSize)
        const charArr = new Array(columnCount).fill(0)
        const drawFont = () => draw(ctx, fontSize, charArr)
        drawFont()
        setInterval(drawFont, 50)
    }
})
</script>

<style scoped lang="less">
#canvas {
    width: 100%;
}
</style>