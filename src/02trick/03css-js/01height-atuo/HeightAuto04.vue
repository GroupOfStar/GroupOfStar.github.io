<template>
    <div class="escape-demo">
        <!-- #region tmp -->
        <div class="btn" @mouseenter="onBtnMouseEnter" @mouseleave="onBtnMouseLeave">
            <!-- #endregion tmp -->
            hover me
            <div class="detail">
                <div class="content" :ref="el => modalRef = (el as HTMLDivElement)">
                    <div class="inner">
                        Lorem ipsum dolor sit amet consectetur.
                        Doloremque explicabo rem nesciunt perferendis harum!
                        Voluptatibus voluptate cum unde doloribus odio.
                        Quod tempore reprehenderit voluptate corrupti nesciunt.
                        Ratione alias doloremque facere doloribus perferendis!
                        Pariatur minima corporis illum natus expedita.
                        Quaerat soluta cupiditate amet nemo pariatur!
                        Unde corrupti porro voluptates maxime at?
                        Quas blanditiis quaerat culpa error! Laudantium.
                        Esse modi ipsum quas reprehenderit adipisci!
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<!-- #region js -->
<script setup lang="ts">
import { ref } from 'vue'

const modalRef = ref<HTMLElement | null>(null)

const onBtnMouseEnter = () => {
    const modal = modalRef.value
    if (modal) {
        modal.style.setProperty('height', 'auto')
        const { height } = modal.getBoundingClientRect()
        modal.style.setProperty('height', '0px')
        modal.style.setProperty('transition', 'height .3s')
        // modal.offsetHeight // 随便读取一个属性让ta强行绘制
        requestAnimationFrame(() => {
            modal.style.setProperty('height', `${height}px`)
        })
    }
}

const onBtnMouseLeave = () => {
    const modal = modalRef.value
    if (modal) {
        modal.style.setProperty('height', '0px')
    }
}

</script>
<!-- #endregion js -->

<style scoped lang="less">
.escape-demo {
    .btn {
        display: inline-block;
        color: #fff;
        background-color: rgb(22, 119, 255);
        font-size: 14px;
        padding: 8px 20px;
        border-radius: 4px;
        position: relative;

        // #region css
        &.btn:hover {
            background-color: rgba(22, 119, 255, 0.8);
            cursor: pointer;
        }

        .detail {
            z-index: 99;
            position: absolute;
            left: 0;
            margin-top: 20px;
            width: 500px;

            .content {
                height: 0px;
                overflow: hidden;
                // #endregion css

                .inner {
                    padding: 24px;
                    border-radius: 4px;
                    background-color: #1677ff;
                }
            }
        }
    }
}
</style>