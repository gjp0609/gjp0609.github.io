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
                    <div v-show="autoFormat">
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
                    <json-display :obj="target" :index="1" :expand="expand"></json-display>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts" setup>
    import JsonDisplay from './components/JsonDisplay.vue';
    import { onMounted, watch, ref } from 'vue';

    const source = ref('');
    const target = ref({});
    const expand = ref(true);
    const autoFormat = ref(true);
    const pretty = ref(true);
    const isMounted = ref(false);

    type Save = {
        source: string;
        expand: boolean;
        autoFormat: boolean;
        pretty: boolean;
    };

    onMounted(() => {
        console.log('mounted');
        get();
        isMounted.value = true;
    });
    watch([source, expand, autoFormat, pretty], (values) => {
        if (isMounted.value) {
            save();
        }
        let src = values[0];
        if (src) {
            console.log('%c source', 'color:green', src);
            let obj = undefined;
            try {
                src = src.replace(/:\s*([-+Ee0-9.]{16,})/g, ': "$1"');
                src = src.replace(/\n/g, '');
                obj = JSON.parse(src);
            } catch (e) {
                console.warn('>>> parse json error, ', e);
                try {
                    obj = eval('(' + src + ')');
                } catch (e) {
                    console.warn('>>> parse single quot json error, ', e);
                }
            }
            if (obj) {
                console.log('%c obj', 'color:blue', obj);
                if (autoFormat.value) {
                    source.value = JSON.stringify(obj);
                    if (pretty.value) {
                        source.value = JSON.stringify(obj, null, 2);
                    }
                }
                target.value = obj;
                return;
            }
        }
        target.value = {};
    });

    function save() {
        let jsonData = {
            source: source.value,
            expand: expand.value,
            autoFormat: autoFormat.value,
            pretty: pretty.value
        };
        localStorage.setItem('jsonData', JSON.stringify(jsonData));
    }
    function get() {
        let jsonData: Save;
        try {
            jsonData = JSON.parse(localStorage.getItem('jsonData') ?? '');
        } catch (e) {
            jsonData = {
                source: '',
                expand: true,
                autoFormat: true,
                pretty: true
            };
        }
        source.value = jsonData.source;
        expand.value = jsonData.expand;
        autoFormat.value = jsonData.autoFormat;
        pretty.value = jsonData.pretty;
    }
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
