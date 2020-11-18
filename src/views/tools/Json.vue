<template>
    <div>
        <el-row :gutter="10">
            <el-col :span="8">
                <el-input v-model="source" :autosize="{ minRows: 30 }" type="textarea" placeholder="请输入内容"></el-input>
            </el-col>
            <el-col :span="16">
                <div>
                    <json-display :obj="getObj" :index="1"></json-display>
                </div>
            </el-col>
            <!--            <el-col :span="8">-->
            <!--                <div v-html="format" class="result"></div>-->
            <!--            </el-col>-->
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
                index: 1,
                source: '{"k1":"v1","k2":{"k2k1":"v2v1","k2k2":{"k2k2k1":"v2v2v1","k2k2k2":["bb","cc"],"a":"asd"}},"k3":["v3-1","v3-2",{"k3k1":"v3v1"}]}'
            };
        },
        computed: {
            format: function() {
                let source = this.source;
                try {
                    let obj = JSON.parse(source);
                    let innerHTML = this.init(obj);
                    this.source = JSON.stringify(obj);
                    return innerHTML;
                } catch (e) {
                    console.log(e);
                }
                return '';
            },
            getObj: function() {
                let source = this.source;
                try {
                    let obj = JSON.parse(source);
                    this.source = JSON.stringify(obj);
                    return obj;
                } catch (e) {
                    console.log(e);
                }
                return {};
            }
        },
        mounted() {},
        methods: {
            init(obj) {
                let parent = document.createElement('div');
                this.buildHtml(obj, parent);
                return parent.innerHTML;
            },
            buildHtml(obj, parent) {
                if (obj instanceof Object) {
                    if (obj instanceof Array) {
                        parent.className += ' array';
                        for (let value of obj) {
                            let valueElement = document.createElement('div');
                            parent.appendChild(valueElement);
                            valueElement.className = 'value index-' + this.index;
                            this.index++;
                            this.buildHtml(value, valueElement);
                            this.index--;
                        }
                    } else {
                        parent.className += ' object';
                        for (let key in obj) {
                            let parentElement = document.createElement('div');
                            parentElement.className = 'parent index-' + this.index;
                            parent.appendChild(parentElement);
                            let keyElement = document.createElement('div');
                            parentElement.appendChild(keyElement);
                            let valueElement = document.createElement('div');
                            parentElement.appendChild(valueElement);
                            valueElement.className = 'value index-' + this.index;
                            let value = obj[key];
                            keyElement.innerText = key;
                            keyElement.className = 'key index-' + this.index;
                            this.index++;
                            this.buildHtml(value, valueElement);
                            this.index--;
                        }
                    }
                } else {
                    parent.className += ' text';
                    let valueElement = document.createElement('div');
                    parent.appendChild(valueElement);
                    valueElement.className = 'value index-' + this.index;
                    valueElement.innerText = obj;
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    $colors: #fc895b #45a6e7 lightseagreen #e175e9 orange;
    $tabWidth: 1rem;
    .el-row {
        .el-col {
            height: 95vh;
            overflow-y: auto;
            overflow-x: hidden;
        }
    }
    ::v-deep.result {
        font-family: 'Iosevka SS07', 'Sarasa Mono T SC', monospace;
        .parent {
            display: flex;
            flex-direction: row;
        }
        .array > .value {
            margin-left: $tabWidth;
        }
        .key {
            margin-left: $tabWidth;
            word-break: keep-all;
            @for $i from 1 through length($colors) {
                &.index-#{$i} {
                    color: nth($colors, $i);
                }
            }
            &:after {
                content: ':';
            }
        }
        .value {
            margin-left: 0.25rem;
            word-break: break-all;
        }
        .object {
            @for $i from 1 through length($colors) {
                &:before {
                    content: '{';
                    margin-left: 0.25rem;
                    &.index-#{$i} {
                        color: nth($colors, $i);
                    }
                }
            }
            &:after {
                content: '}';
                margin-left: 0.25rem;
            }
        }
        .array {
            .code {
                display: block;
            }
            &:before {
                content: '[';
            }
            &:after {
                content: ']';
            }
        }
        //@for $i from 1 through 10 {
        //    .parent .index-#{$i} {
        //        margin-left: 20px * $i;
        //    }
        //}
    }
</style>
