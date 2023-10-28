<template>
    <input :value="color" @change="onColorChange" type="color" />
    <canvas id="canvas" :ref="el => canvasRef = (el as HTMLCanvasElement)" @click="onCanvasClick"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const color = ref('#000000')

const canvasRef = ref<HTMLCanvasElement>()

function initCanvasContext() {
    const cvs = canvasRef.value
    if (cvs) {
        const ctx = cvs.getContext("2d", {
            willReadFrequently: true
        });
        if (ctx) {
            const img = new Image()
            img.onload = () => {
                cvs.width = img.width;
                cvs.height = img.height;
                ctx.drawImage(img, 0, 0)
            }
            img.src = '/cosmeticCase.png'
            // ctx.fillStyle = '#000'
            // ctx.fillRect(0, 0, cvs.width, cvs.height)
        }
        return ctx
    }
    return undefined
}
function onColorChange(event: Event) {
    color.value = (event.target as any).value
}

function onCanvasClick(event: MouseEvent) {
    console.log('event :>> ', event);

    console.log('color.value :>> ', color.value);
    const context = canvasRef.value?.getContext("2d")
    if (context) {
        const imgData = context.getImageData(0, 0, context.canvas.width, context.canvas.height)
        console.log('imgData :>> ', imgData);
    }
}

onMounted(() => {
    initCanvasContext()
})
</script>

<style scoped lang="less">
#canvas {
    margin: auto;
    border: 2px solid #919191;
}
</style>