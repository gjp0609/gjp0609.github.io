<template>
    <div>
        <el-row :gutter="10">
            <el-col :span="16">
                <el-input v-model="text" :autosize="{ minRows: 30 }" type="textarea" placeholder="请输入内容"></el-input>
            </el-col>
            <el-col :span="8">
                <el-card class="options">
                    <span>QrCode Size:&emsp;</span>
                    <el-input-number v-model="width" :step="10"></el-input-number>
                </el-card>
                <el-card class="qrCode">
                    <qrcode :options="{ width: width }" :value="getText"></qrcode>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import Vue from 'vue';
    import VueQrCode from '@chenfengyuan/vue-qrcode';
    Vue.component(VueQrCode.name, VueQrCode);

    export default {
        name: 'QrCode',
        data() {
            return {
                text: '',
                width: '300'
            };
        },
        computed: {
            getText() {
                if (this.text && this.text.length > 0) {
                    return this.text;
                } else {
                    return 'onysakura.fun';
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    .el-row {
        .el-col {
            height: 95vh;
            overflow-y: auto;
            overflow-x: hidden;
            .el-card {
                &.options {
                    margin-bottom: 10px;
                }
                &.qrCode {
                    text-align: center;
                }
            }
        }
    }
</style>
