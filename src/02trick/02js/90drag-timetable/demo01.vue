<!-- #region snippet02 -->
<template>
    <div class="container" @dragstart="onDragstart" @dragover="onDragover" @dragenter="onDragenter" @drop="onDrop">
        <div class="head" data-drop="move">
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
                    <col />
                    <col />
                    <col />
                    <col />
                    <col />
                    <col />
                    <col />
                    <col />
                </colgroup>
                <!-- 表头 -->
                <thead>
                    <tr>
                        <td></td>
                        <th>星期一</th>
                        <th>星期二</th>
                        <th>星期三</th>
                        <th>星期四</th>
                        <th>星期五</th>
                        <th>星期六</th>
                        <th>星期日</th>
                    </tr>
                </thead>
                <!-- 表格 -->
                <tbody>
                    <tr>
                        <th rowspan="4" class="span">上午</th>
                        <td data-drop="copy"></td>
                        <td data-drop="copy"></td>
                        <td data-drop="copy"></td>
                        <td data-drop="copy"></td>
                        <td data-drop="copy"></td>
                        <td data-drop="copy"></td>
                        <td data-drop="copy"></td>
                    </tr>
                    <tr>
                        <td data-drop="copy"></td>
                        <td data-drop="copy"></td>
                        <td data-drop="copy"></td>
                        <td data-drop="copy"></td>
                        <td data-drop="copy"></td>
                        <td data-drop="copy"></td>
                        <td data-drop="copy"></td>
                    </tr>
                    <tr>
                        <td data-drop="copy"></td>
                        <td data-drop="copy"></td>
                        <td data-drop="copy"></td>
                        <td data-drop="copy"></td>
                        <td data-drop="copy"></td>
                        <td data-drop="copy"></td>
                        <td data-drop="copy"></td>
                    </tr>
                    <tr>
                        <td data-drop="copy"></td>
                        <td data-drop="copy"></td>
                        <td data-drop="copy"></td>
                        <td data-drop="copy"></td>
                        <td data-drop="copy"></td>
                        <td data-drop="copy"></td>
                        <td data-drop="copy"></td>
                    </tr>
                    <tr>
                        <th rowspan="4" class="span">下午</th>
                        <td data-drop="copy"></td>
                        <td data-drop="copy"></td>
                        <td data-drop="copy"></td>
                        <td data-drop="copy"></td>
                        <td data-drop="copy"></td>
                        <td data-drop="copy"></td>
                        <td data-drop="copy"></td>
                    </tr>
                    <tr>
                        <td data-drop="copy"></td>
                        <td data-drop="copy"></td>
                        <td data-drop="copy"></td>
                        <td data-drop="copy"></td>
                        <td data-drop="copy"></td>
                        <td data-drop="copy"></td>
                        <td data-drop="copy"></td>
                    </tr>
                    <tr>
                        <td data-drop="copy"></td>
                        <td data-drop="copy"></td>
                        <td data-drop="copy"></td>
                        <td data-drop="copy"></td>
                        <td data-drop="copy"></td>
                        <td data-drop="copy"></td>
                        <td data-drop="copy"></td>
                    </tr>
                    <tr>
                        <td data-drop="copy"></td>
                        <td data-drop="copy"></td>
                        <td data-drop="copy"></td>
                        <td data-drop="copy"></td>
                        <td data-drop="copy"></td>
                        <td data-drop="copy"></td>
                        <td data-drop="copy"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<!-- #endregion snippet02 -->

<!-- #region snippet01 -->
<script setup lang="ts">
let dragElement: HTMLElement

const onDragstart = (event: DragEvent) => {
    const target = event.target as HTMLElement
    if (event.dataTransfer && target) {
        dragElement = target
        // 设置鼠标状态: copy表示复制 move表示移动
        event.dataTransfer.effectAllowed = target.dataset.effect as DataTransfer['effectAllowed']
    }
}

const onDragover = (event: DragEvent) => {
    // 默认是不允许别的元素拖到当前元素上的，这也就会导致onDrop事件不会触发，所以这里需要取消默认行为
    event.preventDefault();
}

function clearDropoverStyle() {
    document.querySelectorAll('.drop_over').forEach(node => {
        node.classList.remove('drop_over')
    })
}

function getDropNode(node: HTMLElement): HTMLElement | null {
    if (node.dataset?.drop) {
        return node
    } else {
        return node.parentNode ? getDropNode(node.parentNode as HTMLElement) : null
    }
}

const onDragenter = (event: DragEvent) => {
    // 清除之前的drop_over样式
    clearDropoverStyle()
    const dropNode = getDropNode(event.target as HTMLElement)
    if (dropNode && dropNode.dataset.drop === event.dataTransfer?.effectAllowed) {
        dropNode.classList.add('drop_over')
    }
}

const onDrop = (event: DragEvent) => {
    const dropNode = getDropNode(event.target as HTMLElement)
    if (dropNode && dropNode.dataset.drop === event.dataTransfer?.effectAllowed) {
        dropNode.classList.remove('drop_over')
        if (dropNode.dataset.drop === 'copy') {
            dropNode.innerHTML = ''
            const cloned = dragElement.cloneNode(true) as HTMLElement
            cloned.dataset.effect = 'move'
            dropNode.appendChild(cloned)
        } else {
            // move
            dragElement.remove()
        }
    }
}
</script>
<!-- #endregion snippet01 -->

<!-- #region snippet03 -->
<style scoped lang="less">
.timetable_item {
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

.container {
    .head {
        display: flex;
        gap: 12px;
        background-color: #ebebef;
        padding: 12px 6px;

        &.drop_over {
            background-color: #ccc;
        }

        .timetable_item();
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

                    .timetable_item();
                }
            }
        }
    }
}
</style>
<!-- #endregion snippet03 -->
