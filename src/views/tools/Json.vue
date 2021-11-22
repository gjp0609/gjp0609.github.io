<template>
    <div>
        <el-row>
            <el-card>
                <div class="buttons">
                    <div>
                        <span>Expand All:</span>
                        <el-switch v-model="expand" active-color="#13ce66" inactive-color="#ff4949" @change="save"></el-switch>
                    </div>
                    <div>
                        <span>Auto Format:</span>
                        <el-switch v-model="autoFormat" active-color="#13ce66" inactive-color="#ff4949" @change="save"></el-switch>
                    </div>
                    <div v-if="autoFormat">
                        <span>Pretty:</span>
                        <el-switch v-model="pretty" active-color="#13ce66" inactive-color="#ff4949" @change="save"></el-switch>
                    </div>
                </div>
            </el-card>
        </el-row>
        <el-row :gutter="10">
            <el-col :span="8">
                <el-input v-model="source" type="textarea" placeholder="请输入内容"></el-input>
            </el-col>
            <el-col :span="16">
                <div class="json-text">
                    <json-display :obj="getObj" :index="1" :expand="expand"></json-display>
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
                source: '',
                autoFormat: undefined,
                pretty: undefined,
                expand: undefined,
                isMounted: false
            };
        },
        computed: {
            getObj: function () {
                let source = this.source;
                if (this.isMounted) {
                    this.save();
                }
                if (source) {
                    console.log('%c source', 'color:green', source);
                    let obj = undefined;
                    try {
                        source = source.replace(/:\s*([-+Ee0-9.]{16,})/g, ': "$1"');
                        source = source.replace(/\n/g, '');
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
        },
        mounted() {
            console.log('mounted');
            this.get();
            this.isMounted = true;
        },
        methods: {
            save() {
                let jsonData = {
                    source: this.source,
                    autoFormat: this.autoFormat,
                    pretty: this.pretty,
                    expand: this.expand
                };
                localStorage.setItem('jsonData', JSON.stringify(jsonData));
            },
            get() {
                let jsonData;
                try {
                    jsonData = JSON.parse(localStorage.getItem('jsonData'));
                    if (!jsonData) {
                        jsonData = {
                            source: '',
                            autoFormat: true,
                            pretty: true,
                            expand: true
                        };
                    }
                } catch (e) {
                    jsonData = {
                        source: '',
                        autoFormat: true,
                        pretty: true,
                        expand: true
                    };
                }
                this.source = jsonData.source;
                this.autoFormat = jsonData.autoFormat;
                this.pretty = jsonData.pretty;
                this.expand = jsonData.expand;
                console.log(this.pretty);
            }
        }
    };
</script>

<style lang="scss" scoped>
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
            height: 91vh;
            overflow-y: auto;
            overflow-x: hidden;
            .el-textarea {
                height: 97%;
                :deep(textarea) {
                    height: 100%;
                    overflow-y: auto;
                }
            }
            .json-text {
                height: 97%;
                overflow-y: auto;
                border: 1px solid #dcdfe6;
                border-radius: 4px;
            }
        }
    }
</style>
