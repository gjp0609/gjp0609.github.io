<template>
    <el-row :gutter="10">
        <el-col :span="8">
            <el-input :rows="30" v-model="source" autosize type="textarea" placeholder="请输入内容"></el-input>
        </el-col>
        <el-col :span="8">
            <el-input :rows="30" v-model="format[0]" autosize type="textarea" placeholder="请输入内容"></el-input>
        </el-col>
        <el-col :span="8">
            <div v-html="format[1]" class="result"></div>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: 'Xml',
        data() {
            return {
                source:
                    '<?xml version="1.0" encoding="GBK" standalone="no"?><B2CReq><interfaceName>ICBC_WAPB_THIRD</interfaceName><interfaceVersion>1.0.0.0</interfaceVersion><orderInfo><orderDate>20180308094713</orderDate><orderid>20180308094713008000505003</orderid><amount>19000</amount><installmentTimes></installmentTimes><curType>001</curType><merID>1202EE20257014</merID><merAcct>1202027709900246492</merAcct><expireTime>20181212121212</expireTime><unipassID></unipassID><shopAppID>2018wx34454523</shopAppID></orderInfo><custom><verifyJoinFlag>0</verifyJoinFlag><Language>zh_CN</Language></custom><message><goodsID>1159199</goodsID><goodsName>1个月</goodsName><goodsNum>1</goodsNum><carriageAmt>0</carriageAmt><merHint>商城提示</merHint><remark1>remark1</remark1><remark2>remark2</remark2><merURL>http://www.onysakura.com/icbc</merURL><merVAR>备注</merVAR><notifyType>HS</notifyType><resultType>0</resultType><limitPay></limitPay><backup1></backup1><backup2></backup2><backup3></backup3><backup4></backup4><isSupportDISCOUFlag></isSupportDISCOUFlag><thirdPartyFlag></thirdPartyFlag></message></B2CReq>'
            };
        },
        computed: {
            format() {
                this.source = this.source
                    .replace(/\n/g, '')
                    .replace(/\t/g, ' ')
                    .replace(/>[ ]+/g, '>')
                    .replace(/[ ]+</g, '<')
                    .replace(/ +/g, ' ');
                return this.formatXml(this.source);
            }
        },
        mounted() {},
        methods: {
            formatXml(v) {
                let value = v.replace(/<!\[CDATA\[[\s\S]*?]]>/g, (str) => {
                    return `BEGIN_CDATA${encodeURIComponent(str)}END_CDATA`;
                });
                let split = value.split('<');
                split = split.slice(1);
                let all = [];
                for (let item of split) {
                    item = '<' + item;
                    if (item.lastIndexOf('>') === item.length - 1) {
                        all.push(item);
                    } else {
                        let arr = item.split('>');
                        all.push(arr[0] + '>');
                        all.push(arr[1]);
                    }
                }
                let arr = [];
                for (let item of all) {
                    if (item && item.trim() !== '' && item.trim() !== '\n') {
                        arr.push(item);
                    }
                }
                let index = -1;
                let arr2 = [];
                let arr3 = [];
                let isEnd = false; // 结束标签
                let isText = true; // 文本行
                for (let item of arr) {
                    let item2;
                    let item3;
                    item = item.replace(/BEGIN_CDATA.*?END_CDATA/g, (str) => {
                        return decodeURIComponent(str.replace('BEGIN_CDATA', '').replace('END_CDATA', ''));
                    });
                    item = item.replace('<', '&lt;');
                    item = item.replace('>', '&gt;');
                    if (item.indexOf('&lt;?') === 0 && item.lastIndexOf('?&gt;') === item.length - 5) {
                        // 声明行
                        if (!isEnd) {
                            index++;
                        }
                        isEnd = true;
                        isText = false;
                        item2 = `my_blank_word${item}\n`;
                        item3 = `<div class="xml_item_${index}">my_blank_word<span>${item}</span></div>`;
                    } else if (item.indexOf('&lt;!--') === 0 && item.lastIndexOf('--&gt;') === item.length - 6) {
                        // 注释行
                        if (!isEnd) {
                            index++;
                        }
                        isEnd = true;
                        isText = false;
                        item2 = `my_blank_word${item}\n`;
                        item3 = `<div class="xml_item_${index}">my_blank_word<span>${item}</span></div>`;
                    } else if (item.indexOf('&lt;![CDATA') === 0) {
                        // 数据标签文本行
                        if (!isEnd) {
                            index++;
                        }
                        isEnd = true;
                        isText = true;
                        item2 = `my_blank_word${item}\n`;
                        item3 = `<span class="xml_item_cdata">&lt;![CDATA[</span>${item.substring(
                            12,
                            item.length - 6
                        )}<span class="xml_item_cdata">]]&gt;</span>`;
                        item3 = `<div class="xml_item_text">my_blank_word<span>${item3}</span></div>`;
                    } else if (item.indexOf('&lt;!') === 0) {
                        // 声明行
                        if (!isEnd) {
                            index++;
                        }
                        isEnd = true;
                        isText = false;
                        item2 = `my_blank_word${item}\n`;
                        item3 = `<div class="xml_item_${index}">my_blank_word<span>${item}</span></div>`;
                    } else if (item.indexOf('&lt;/') === 0) {
                        // 结束行
                        if (isText || isEnd) {
                            index--;
                        }
                        isEnd = true;
                        isText = false;
                        item2 = `my_blank_word${item}\n`;
                        item3 = `<div class="xml_item_${index}">my_blank_word<span>${item}</span></div>`;
                    } else if (item.indexOf('&lt;') === 0 && item.lastIndexOf('/&gt;') === item.length - 5) {
                        // 单行
                        if (!isEnd) {
                            index++;
                        }
                        isEnd = true;
                        isText = false;
                        item2 = `my_blank_word${item}\n`;
                        item3 = `<div class="xml_item_${index}">my_blank_word<span>${item}</span></div>`;
                    } else if (item.indexOf('&lt;') === 0) {
                        // 开始行
                        if (!isEnd) {
                            index++;
                        }
                        isEnd = false;
                        isText = false;
                        item2 = `my_blank_word${item}\n`;
                        item3 = `<div class="xml_item_${index}">my_blank_word<span>${item}</span></div>`;
                    } else {
                        // 文本行
                        index++;
                        isEnd = false;
                        isText = true;
                        item2 = `my_blank_word${item}\n`;
                        item3 = `<div class="xml_item_text">my_blank_word<span>${item}</span></div>`;
                    }
                    let space3 = '';
                    let space2 = '';
                    for (let i = 0; i < index; i++) {
                        space3 += `<span class="xml_space"></span>`;
                        space2 += `  `;
                    }
                    item2 = item2.replace('my_blank_word', space2);
                    item3 = item3.replace('my_blank_word', space3);
                    arr3.push(item3);
                    arr2.push(item2);
                }
                let str3 = '';
                let str2 = '';
                for (let item of arr3) {
                    str3 += item;
                }
                for (let item of arr2) {
                    str2 += item;
                }
                str2 = str2.replace(/&lt;/g, '<');
                str2 = str2.replace(/&gt;/g, '>');
                return [str2, str3];
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
        }
        ::v-deep.result {
            border: #dbdbdb solid 1px;
            border-radius: 3px;
            padding: 10px;
            .xml_item_text,
            .xml_item_0,
            .xml_item_1,
            .xml_item_2,
            .xml_item_3,
            .xml_item_4 {
                display: flex;
                justify-content: left;
            }
            .xml_item_0 {
                color: #f39;
            }
            .xml_item_1 {
                color: #39f;
            }
            .xml_item_2 {
                color: #3f9;
            }
            .xml_item_3 {
                color: #f33;
            }
            .xml_item_4 {
                color: #a3c;
            }
            .xml_item_5 {
                color: #f5f;
            }
            .xml_item_6 {
                color: #a25;
            }
            .xml_item_7 {
                color: #fd3;
            }
            .xml_item_8 {
                color: #ea3;
            }
            .xml_item_9 {
                color: #993;
            }
            .xml_item_10 {
                color: #f39;
            }
            .xml_item_11 {
                color: #39f;
            }
            .xml_item_12 {
                color: #3f9;
            }
            .xml_item_13 {
                color: #f33;
            }
            .xml_item_14 {
                color: #a3c;
            }
            .xml_item_15 {
                color: #f5f;
            }
            .xml_item_16 {
                color: #a25;
            }
            .xml_item_17 {
                color: #fd3;
            }
            .xml_item_18 {
                color: #ea3;
            }
            .xml_item_19 {
                color: #993;
            }
            .xml_item_cdata {
                color: #6cc;
            }
            .xml_item_text {
                color: forestgreen;
            }
            .xml_space {
                margin-left: 20px;
            }
        }
    }
</style>
