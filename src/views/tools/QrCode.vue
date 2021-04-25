<template>
    <div class="qrcode">
        <el-row :gutter="10">
            <el-col :span="16">
                <el-input v-model="text" :autosize="{ minRows: 30 }" type="textarea" placeholder="请输入内容"></el-input>
            </el-col>
            <el-col :span="8">
                <el-card class="options">
                    <el-row :gutter="20">
                        <el-col :span="2"></el-col>
                        <el-col :span="5" class="label">
                            <el-tooltip class="item" effect="dark" content="Error correction level." placement="bottom-start">
                                <span>Level:&emsp;</span>
                            </el-tooltip>
                        </el-col>
                        <el-col :span="16">
                            <el-radio v-model="level" label="L">L</el-radio>
                            <el-radio v-model="level" label="M">M</el-radio>
                            <el-radio v-model="level" label="Q">Q</el-radio>
                            <el-radio v-model="level" label="H">H</el-radio>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="2"></el-col>
                        <el-col :span="5" class="label">
                            <span>Size:&emsp;</span>
                        </el-col>
                        <el-col :span="16">
                            <el-input-number v-model="width" :step="10" :min="30"></el-input-number>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="2"></el-col>
                        <el-col :span="5" class="label">
                            <el-tooltip class="item" effect="dark" content="Mask pattern used to mask the symbol." placement="bottom-start">
                                <span>Type:&emsp;</span>
                            </el-tooltip>
                        </el-col>
                        <el-col :span="16">
                            <el-select v-model="type" placeholder="请选择">
                                <el-option label="Auto" :value="undefined"></el-option>
                                <el-option label="0" :value="0"></el-option>    
                                <el-option label="1" :value="1"></el-option>
                                <el-option label="2" :value="2"></el-option>
                                <el-option label="3" :value="3"></el-option>
                                <el-option label="4" :value="4"></el-option>
                                <el-option label="5" :value="5"></el-option>
                                <el-option label="6" :value="6"></el-option>
                                <el-option label="7" :value="7"></el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                </el-card>
                <el-card class="qrCode">
                    <canvas id="qrcode"></canvas>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import QRCode from 'qrcode';

    export default {
        name: 'QrCode',
        data() {
            return {
                text: '',
                width: 100,
                type: undefined,
                level: 'M',
                src: null
            };
        },
        watch: {
            text: function () {
                this.update();
            },
            width: function () {
                this.update();
            },
            level: function () {
                this.update();
            },
            type: function () {
                this.update();
            }
        },
        mounted() {
            this.update();
        },
        methods: {
            update() {
                if (this.text && this.text.length > 0) {
                    let canvas = document.getElementById('qrcode');
                    let option = {
                        errorCorrectionLevel: this.level,
                        width: this.width,
                        maskPattern: this.type
                    };
                    console.log(option);
                    QRCode.toCanvas(canvas, this.text, option);
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    .qrcode {
        > .el-row {
            > .el-col {
                height: 95vh;
                overflow-y: auto;
                overflow-x: hidden;
                .el-card {
                    &.options {
                        margin-bottom: 10px;
                        .el-row {
                            line-height: 60px;
                            .label {
                                text-align: right;
                                span {
                                    line-height: 40px;
                                }
                            }
                        }
                    }
                    &.qrCode {
                        text-align: center;
                    }
                }
            }
        }
    }
</style>
