<template>
    <div>
        {{ text }}
        <el-input v-model="param" />
        <el-button @click="testFunc">Test</el-button>
        <el-button @click="go">go</el-button>
        <el-timeline>
            <el-timeline-item
                v-for="(axisDetail, index) in axis"
                :key="index"
                :icon="axisDetail.icon"
                :type="axisDetail.type"
                :color="axisDetail.color"
                :size="axisDetail.size"
                :timestamp="axisDetail.time"
            >
                {{ axisDetail.content }}
            </el-timeline-item>
        </el-timeline>
    </div>
</template>

<script>
    import service from '../../api';

    export default {
        name: 'Xml',
        data() {
            return {
                param: '',
                text: '',
                axis: []
            };
        },
        computed: {},
        mounted() {},
        methods: {
            testFunc() {
                let _this = this;
                service.get('/test/get?s=' + _this.param).then((res) => {
                    _this.text = res;
                });
            },
            go() {
                let axis = [];
                axis.push(new AxisDetail('1:06', 'xxx', 'click'));
                axis.push(new AxisDetail('1:03', 'xxx', 'click'));
                axis.push(new AxisDetail('0:50', 'xxx', 'click'));
                this.axis = axis;
                console.log(JSON.stringify(axis));
            }
        }
    };

    class AxisDetail {
        constructor(time, princess, remark) {
            this.time = time;
            this.princess = princess;
            this.remark = remark;
        }

        setColor(color) {
            this.color = color;
            return this;
        }
    }
</script>

<style lang="scss" scoped></style>
