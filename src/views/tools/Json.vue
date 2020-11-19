<template>
    <div>
        <el-row>
            <el-card>
                <div class="buttons">
                    <div>
                        <span>Auto Format:</span>
                        <el-switch v-model="autoFormat" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                    </div>
                    <div>
                        <span>Pretty:</span>
                        <el-switch v-model="pretty" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                    </div>
                </div>
            </el-card>
        </el-row>
        <el-row :gutter="10">
            <el-col :span="8">
                <el-input v-model="source" :autosize="{ minRows: 30 }" type="textarea" placeholder="请输入内容"></el-input>
            </el-col>
            <el-col :span="16">
                <div class="json-text">
                    <json-display :obj="getObj" :index="1"></json-display>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import JsonDisplay from './components/JsonDisplay.vue';

    export default {
        name: 'Json',
        components: {
            JsonDisplay
        },
        data() {
            return {
                type: true,
                source: '',
                autoFormat: false,
                pretty: false
            };
        },
        computed: {
            getObj: function() {
                let source = this.source;
                if (source) {
                    console.log('%c source', 'color:green', source);
                    let obj = undefined;
                    try {
                        obj = JSON.parse(source);
                    } catch (e) {
                        console.warn('>>> parse json error, ', e.toString());
                        try {
                            obj = eval('(' + source + ')');
                        } catch (e) {
                            console.warn('>>> parse single quot json error, ', e.toString());
                        }
                    }
                    if (obj) {
                        console.log('%c obj', 'color:blue', obj);
                        if (this.autoFormat) {
                            this.source = JSON.stringify(obj);
                            if (this.pretty) {
                                this.source = JSON.stringify(obj, null, 2);
                            }
                        }
                        return obj;
                    }
                }
                return {};
            }
        }
    };
</script>

<style lang="scss" scoped>
    $colors: #fc895b #45a6e7 #31d3fc #e175e9 orange;
    $tabWidth: 1rem;
    .el-row {
        margin-bottom: 20px;
        &:last-child {
            margin-bottom: 0;
        }
        .buttons {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            & > div {
                margin-right: 30px;
            }
        }
        .el-col {
            height: 95vh;
            overflow-y: auto;
            overflow-x: hidden;
            .json-text {
                border: 1px solid #dcdfe6;
                border-radius: 4px;
            }
        }
    }
</style>
