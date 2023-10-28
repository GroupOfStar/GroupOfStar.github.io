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
        return ctx
    }
    return undefined
}
/** 获取min到max之间的随机整数 */
function getRandom(min: number, max: number) {
    return Math.floor(Math.random() * (max + 1 - min) + min)
}

class Point {
    context: CanvasRenderingContext2D
    r: number = 2;
    x: number;
    y: number;
    xSpeed: number;
    ySpeed: number;
    lastDrawTime: number | null;
    constructor(context: CanvasRenderingContext2D) {
        this.context = context
        this.x = getRandom(0, this.canvas.width - this.r / 2)
        this.y = getRandom(0, this.canvas.height - this.r / 2)
        this.xSpeed = getRandom(-30, 30)
        this.ySpeed = getRandom(-30, 30)
        this.lastDrawTime = null
    }
    get canvas() {
        return this.context.canvas
    }
    draw() {
        if (this.lastDrawTime) {
            // 计算新的坐标
            const duration = (Date.now() - this.lastDrawTime) / 1000;
            const xDis = this.xSpeed * duration
            const yDis = this.ySpeed * duration
            let x = this.x + xDis
            let y = this.y + yDis
            if (x > this.canvas.width - this.r / 2) {
                x = this.canvas.width - this.r / 2
                this.xSpeed = -this.xSpeed
            } else if (x < 0) {
                x = 0
                this.xSpeed = -this.xSpeed
            }
            if (y > this.canvas.height - this.r / 2) {
                y = this.canvas.height - this.r / 2
                this.ySpeed = -this.ySpeed
            } else if (y < 0) {
                y = 0
                this.ySpeed = -this.ySpeed
            }
            this.x = x
            this.y = y
        }
        this.context.beginPath()
        this.context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        this.context.fillStyle = "rgb(200,200,200)"
        this.context.fill()
        this.lastDrawTime = Date.now()
    }
}

class Graph {
    context: CanvasRenderingContext2D;
    maxDis: number;
    points: Point[];
    constructor(ctx: CanvasRenderingContext2D, maxDis = 180, pointTotal = 40) {
        this.context = ctx
        this.maxDis = maxDis
        this.points = Array.from({ length: pointTotal }, () => new Point(ctx))
    }
    get canvas() {
        return this.context.canvas
    }
    draw() {
        requestAnimationFrame(() => {
            this.draw()
        })
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.context.fillStyle = '#000'
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        for (let i = 0; i < this.points.length; i++) {
            const p1 = this.points[i];
            p1.draw()
            for (let j = i + 1; j < this.points.length; j++) {
                const p2 = this.points[j];
                const d = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)
                if (d > this.maxDis) {
                    continue;
                }
                this.context.beginPath()
                this.context.moveTo(p1.x, p1.y);
                this.context.lineTo(p2.x, p2.y);
                this.context.closePath()
                this.context.strokeStyle = `rgb(200,200,200, ${1 - d / this.maxDis})`
                this.context.stroke()
            }
        }
    }
}

onMounted(() => {
    const ctx = initCanvasContext()
    if (ctx) {
        const g = new Graph(ctx)
        g.draw()
    }
})
</script>

<style scoped lang="less">
#canvas {
    width: 100%;
}
</style>