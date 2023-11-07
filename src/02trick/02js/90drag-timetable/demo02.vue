<template>
    <div class="container" @dragstart="onDragstart" @dragover="onDragover" @dragenter="onDragenter" @drop="onDrop">
        <div class="head">
            <div data-effect="copy" draggable="true" class="item color1">语文</div>
            <div data-effect="copy" draggable="true" class="item color2">数学</div>
            <div data-effect="copy" draggable="true" class="item color3">英语</div>
            <div data-effect="copy" draggable="true" class="item color4">地理</div>
            <div data-effect="copy" draggable="true" class="item color5">政治</div>
            <div data-effect="copy" draggable="true" class="item color6">历史</div>
            <div data-effect="copy" draggable="true" class="item color7">体育</div>
        </div>
        <div class="content">
            <table>
                <!-- 列的分组 -->
                <colgroup>
                    <col v-for="(item, index) in timeTabel.thead" :key="index" />
                </colgroup>
                <!-- 表头 -->
                <thead>
                    <tr>
                        <th v-for="item in timeTabel.thead" :key="item">{{ item }}</th>
                    </tr>
                </thead>
                <!-- 表格 -->
                <tbody>
                    <tr v-for="item in timeTabel.tbody" :key="item.id">
                        <th v-if="item.hasTh" rowspan="4" class="span">{{ item.thName }}</th>
                        <td v-for="(ele, eleIdx) in item.tdArr" :key="`${item.id}-${eleIdx}`">{{ ele }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'

const timeTabel = reactive({
    thead: ['', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
    tbody: [
        { id: 1, thName: '上午', hasTh: true, tdArr: Array.from({ length: 7 }, item => undefined) },
        { id: 2, thName: '上午', hasTh: false, tdArr: Array.from({ length: 7 }, item => undefined) },
        { id: 3, thName: '上午', hasTh: false, tdArr: Array.from({ length: 7 }, item => undefined) },
        { id: 4, thName: '上午', hasTh: false, tdArr: Array.from({ length: 7 }, item => undefined) },
        { id: 5, thName: '下午', hasTh: true, tdArr: Array.from({ length: 7 }, item => undefined) },
        { id: 6, thName: '下午', hasTh: false, tdArr: Array.from({ length: 7 }, item => undefined) },
        { id: 7, thName: '下午', hasTh: false, tdArr: Array.from({ length: 7 }, item => undefined) },
        { id: 8, thName: '下午', hasTh: false, tdArr: Array.from({ length: 7 }, item => undefined) },
    ]
})

const onDragstart = (event: DragEvent) => {
    const target = event.target as HTMLElement
    if (event.dataTransfer && target) {
        event.dataTransfer.effectAllowed = target.dataset.effect as DataTransfer['effectAllowed']
    }
}

const onDragover = (event: DragEvent) => {
    event.preventDefault();
    // console.log('onDragover :>> ', event.target);
}

const onDragenter = (event: DragEvent) => {
    const target = event.target as HTMLElement
    console.log('onDragenter :>> ', target);
    target.classList.add('drop_over')
}

const onDrop = (event: DragEvent) => {
    console.log('onDrop :>> ', event.target);
}

</script>

<style scoped lang="less">
.container {
    .head {
        display: flex;
        gap: 12px;
        background-color: #ccc;
        padding: 12px 6px;

        .item {
            padding: 12px;
            user-select: none;
            font-weight: bold;

            &.color1 {
                background-color: crimson;
            }

            &.color2 {
                background-color: blue;
            }

            &.color3 {
                background-color: deeppink;
            }

            &.color4 {
                background-color: darkgoldenrod;
            }

            &.color5 {
                background-color: darkorchid;
            }

            &.color6 {
                background-color: darkseagreen;
            }

            &.color7 {
                background-color: lightskyblue;
            }
        }
    }

    .content {
        overflow: hidden;

        table {
            margin: 0;

            colgroup,
            thead,
            tbody {
                width: 100%;

                tr th {
                    text-align: center;
                }
            }


            tbody {
                td {
                    width: 90px;
                    height: 60px;

                    &.drop_over {
                        background-color: #ccc;
                    }
                }
            }
        }
    }
}
</style>