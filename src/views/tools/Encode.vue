<template>
    <div class="encode">
        <el-row v-for="(func, index) in funcs" :key="func.name" class="funcs">
            <el-col :span="11">
                <el-input v-model="func.src" :rows="5" @input="exec(index, func, true)" type="textarea"></el-input>
            </el-col>
            <el-col :span="2" class="func-name">
                <span>{{ func.name }}</span>
            </el-col>
            <el-col :span="11">
                <el-input v-model="func.result" :rows="5" @input="exec(index, func, false)" type="textarea"></el-input>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    let MD5 = require('js-md5');
    import { Base64 } from 'js-base64';

    export default {
        name: 'Encode',
        data() {
            return {
                funcs: [
                    { name: 'UrlEncode', src: '', result: '' },
                    { name: 'Base64', src: '', result: '' },
                    { name: 'MD5', src: '', result: '' },
                    { name: 'Unicode', src: '', result: '' }
                ]
            };
        },
        methods: {
            exec(index, func, leftToRight) {
                if (leftToRight) {
                    let temp;
                    switch (func.name) {
                        case 'UrlEncode':
                            temp = encodeURIComponent(func.src);
                            break;
                        case 'MD5': {
                            let m = String(MD5(func.src));
                            temp = m.toUpperCase() + '\n\n' + m.toLowerCase();
                            break;
                        }
                        case 'Base64':
                            temp = Base64.encode(func.src);
                            break;
                        case 'Unicode': {
                            temp = '';
                            for (let i = 0; i < func.src.length; i++) {
                                temp += '\\u' + func.src.charCodeAt(i).toString(16);
                            }
                            break;
                        }
                        default:
                            temp = func.result;
                    }
                    this.funcs[index].result = temp;
                } else {
                    let temp;
                    switch (func.name) {
                        case 'UrlEncode':
                            temp = decodeURIComponent(func.result);
                            break;
                        case 'Base64':
                            temp = Base64.decode(func.result);
                            break;
                        case 'Unicode': {
                            let arr = func.result.split(/\\/g).slice(1);
                            let str = '';
                            for (let item of arr) {
                                let unescapeStr = unescape('%' + item);
                                if (unescapeStr.length > 2 && unescapeStr.indexOf('%') === 0) {
                                    let zero = '';
                                    for (let i = 0; i < 6 - unescapeStr.length; i++) {
                                        zero += '0';
                                    }
                                    unescapeStr = unescape(unescapeStr.substring(0, 2) + zero + unescapeStr.substring(2, unescapeStr.length));
                                }
                                str += unescapeStr;
                            }
                            temp = str;
                            break;
                        }
                        default:
                            temp = func.src;
                    }
                    this.funcs[index].src = temp;
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    .encode {
        .funcs {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin: 20px auto;
            &:first-child {
                margin-top: 0;
            }
            &:last-child {
                margin-bottom: 0;
            }
            .func-name {
                text-align: center;
                line-height: 115px;
            }
        }
    }
</style>
