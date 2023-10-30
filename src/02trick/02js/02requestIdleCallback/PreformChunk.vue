<!-- #region snippet -->
<template>
    <div class="btn-group">
        <button class="btn" @click="onBtnClick">插入{{ total }}个元素</button>
    </div>
    <div class="box" :ref="el => boxRef = (el as HTMLElement)"></div>
</template>

<script setup lang="ts">
import { ref, h, createApp, VNode } from 'vue'
const total = ref(100000)
const boxRef = ref<HTMLElement | null>(null)

// 插入100000个元素
const onBtnClick = () => {
    // 1. 使用vue的方式 卡顿
    // const vNodes: VNode[] = []
    // for (let index = 0; index < total.value; index++) {
    //     vNodes.push(h('div', index))
    // }
    // if (boxRef.value) {
    //     createApp({ render: () => vNodes }).mount(boxRef.value)
    // }

    // 2. 使用原生的方式 也卡顿
    // const fragment = document.createDocumentFragment()
    // for (let index = 0; index < total.value; index++) {
    //     const div = document.createElement('div')
    //     div.textContent = `${index}`
    //     fragment.appendChild(div)
    // }
    // document.querySelector('.box')?.appendChild(fragment)

    const consumer: Consumer<string[] | number> = (item, index) => {
        const div = document.createElement('div')
        div.textContent = `${index}`
        document.querySelector('.box')?.appendChild(div)
    }

    // 3. 分时执行方式: 虽然执行的总时间没变，但页面没有卡顿了
    const chunkSplitor: ChunkSplitor = (nextTask) => {
        setTimeout(() => {
            nextTask((timeout) => timeout < 16)
        }, 30)
    }

    // const datas = Array.from({ length: total.value }, (_, index) => index.toString())
    // preformChunk(datas, consumer, chunkSplitor)
    // preformChunk(total.value, consumer)
    preformChunk(total.value, consumer, chunkSplitor)
}

type Consumer<T extends number | any[]> = (item: T extends (infer K)[] ? K : T, index: number) => void

type ChunkSplitor = (callback: (nextTask: (timeout: number) => boolean) => void) => void

/**
 * 分时执行函数
 * @param datas 执行数量或数据集
 * @param consumer 每段消费执行的回调
 * @param chunkSplitor 自定义分段执行器
 */
function preformChunk<T extends number | any[]>(datas: T, consumer: Consumer<T>, chunkSplitor?: ChunkSplitor) {
    const arr: (T extends (infer K)[] ? K : T)[] = Array.isArray(datas) ? datas : new Array(datas)
    if (arr.length === 0) {
        return;
    }

    let _chunkSplitor: ChunkSplitor

    if (!chunkSplitor) {
        if ((globalThis as any).requestIdleCallback) {
            _chunkSplitor = (nextTask) => {
                requestIdleCallback(idle => {
                    nextTask(() => idle.timeRemaining() > 0)
                })
            }
        } else {
            throw TypeError('当前执行环境没有 requestIdleCallback 函数，请实行定义一个 chunkSplitor 分段执行器。')
        }
    } else {
        _chunkSplitor = chunkSplitor
    }

    let i = 0 // 目前取出的任务下标
    function _run() {
        if (i === arr.length) {
            return;
        }
        _chunkSplitor(nextTask => {
            const now = Date.now()
            while (nextTask(Date.now() - now) && i < arr.length) {
                const item = arr[i];
                consumer(item, i)
                i++
            }
            _run()
        })
    }
    _run()
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
</style>