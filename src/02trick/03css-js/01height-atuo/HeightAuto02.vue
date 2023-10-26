<template>
    <div class="escape-demo">
        <div class="btn">
            hover me
            <div class="detail">
                <div class="content">
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
</template>


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

        // #region snippet
        &.btn:hover {
            background-color: rgba(22, 119, 255, 0.8);
            cursor: pointer;

            .detail {
                transform: scaleY(1);
            }
        }

        .detail {
            transform-origin: center top;
            transform: scaleY(0);
            transition: transform 0.5s;
            // #endregion snippet
            z-index: 99;
            position: absolute;
            left: 0;
            margin-top: 20px;
            overflow: hidden;

            .content {
                padding: 24px;
                border-radius: 4px;
                background-color: #1677ff;
                width: 500px;
            }
        }
    }
}
</style>