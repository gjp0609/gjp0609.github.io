<template>
    <div class="encode">
        <el-row v-for="(func, index) in funcs" :key="func.name" class="funcs">
            <el-col :span="11">
                <el-input v-model="func.src" :rows="5" type="textarea" @input="exec(index, func, true)"></el-input>
            </el-col>
            <el-col :span="2" class="func-name">
                <span>{{ func.name }}</span>
            </el-col>
            <el-col :span="11">
                <el-input v-model="func.result" :rows="5" type="textarea" @input="exec(index, func, false)"></el-input>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts" setup>
    import MD5 from 'js-md5';
    import { Base64 } from 'js-base64';
    import moment from 'moment';
    import { onMounted, ref } from 'vue';

    type Func = {
        name: string;
        src: string;
        result: string;
    };
    const funcs = ref([
        { name: 'UrlEncode', src: '', result: '' },
        { name: 'Base64', src: '', result: '' },
        { name: 'MD5', src: '', result: '' },
        { name: 'Unicode', src: '', result: '' },
        { name: 'Time', src: '', result: '' }
    ]);
    onMounted(() => {
        let now = new Date();
        for (const func of funcs.value) {
            if (func.name === 'Time') {
                func.src = moment.unix(now.getTime() / 1000).format('YYYY-MM-DD HH:mm:ss');
                func.result = now.getTime() + '\nyyyy-MM-dd HH:mm:ss';
            }
        }
    });

    function exec(index: number, func: Func, leftToRight: boolean) {
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
                        temp += '\\u' + func.src.charCodeAt(i).toString(16).padStart(4, '0');
                    }
                    break;
                }
                case 'Time':
                    let timestamp = moment(('' + func.src).split('\n')[0]).unix() * 1000;
                    console.log(timestamp);
                    if (!isNaN(timestamp)) {
                        console.log(typeof timestamp);
                        temp = timestamp + '\n' + ('' + func.result).split('\n')[1];
                    } else {
                        temp = func.result;
                    }
                    break;
                default:
                    temp = func.result;
            }
            funcs.value[index].result = temp;
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
                    console.log(arr);
                    for (let item of arr) {
                        let unescapeStr = decodeURIComponent(JSON.parse('"\\' + item + '"'));
                        if (unescapeStr.length > 2 && unescapeStr.indexOf('\\') === 0) {
                            let zero = '';
                            for (let i = 0; i < 6 - unescapeStr.length; i++) {
                                zero += '0';
                            }
                            unescapeStr = decodeURIComponent(
                                JSON.parse('"' + unescapeStr.substring(0, 2) + zero + unescapeStr.substring(2, unescapeStr.length) + '"')
                            );
                        }
                        str += unescapeStr;
                    }
                    temp = str;
                    break;
                }
                case 'Time':
                    let split = ('' + func.result).split('\n');
                    let timestamp = parseInt(split[0]);
                    if (timestamp > 10000000000) {
                        timestamp = timestamp / 1000;
                    }
                    if (split[1]) {
                        temp = moment.unix(timestamp).format(split[1].replace(/dd/g, 'DD'));
                    } else {
                        temp = moment.unix(timestamp).format('YYYY-MM-DD HH:mm:ss');
                    }
                    break;
                default:
                    temp = func.src;
            }
            funcs.value[index].src = temp;
        }
    }
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
