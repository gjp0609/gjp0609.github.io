<template>
    <div>
        <el-row class="switchRow">
            Mode Switch:&emsp;
            <el-switch v-model="type" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </el-row>
        <el-row :gutter="10">
            <el-col :span="8">
                <el-input v-model="source" :autosize="{ minRows: 30 }" type="textarea" placeholder="请输入内容"></el-input>
            </el-col>
            <el-col :span="8">
                <el-input v-model="format[0]" :autosize="{ minRows: 30 }" type="textarea" placeholder="请输入内容"></el-input>
            </el-col>
            <el-col :span="8">
                <div v-html="format[1]" class="result"></div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: 'Xml',
        data() {
            return {
                type: true,
                source: ``
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
                if (this.type) {
                    return this.formatXmlBySplit(this.source);
                } else {
                    return this.formatXmlByDOMParser(this.source);
                }
            }
        },
        mounted() {},
        methods: {
            formatXmlByDOMParser(content) {
                let xml_doc = null;
                const formatContent = content.replace(/[\n\r]/g, '');
                try {
                    xml_doc = new DOMParser().parseFromString(formatContent, 'text/xml');
                } catch (e) {
                    return false;
                }
                let list = [[], []];
                console.log('--------------');
                this.formatXmlWithDOMParser(list, xml_doc.documentElement, 0);
                console.log(list);
                return [list[0].join(''), list[1].join('')];
            },
            formatXmlWithDOMParser(list, element, level) {
                let nodeType = element.nodeType;
                let blankString = 'ㅤ';
                let srcString = list[0];
                let styleString = list[1];
                switch (nodeType) {
                    case Node.ELEMENT_NODE:
                        srcString.push(''.padStart(level * blankString.length, blankString) + '<' + element.nodeName + '>');
                        srcString.push('\n');
                        styleString.push(
                            ''.padStart(level * blankString.length, blankString) +
                                `<span class="inline xml_item_${level}">&lt;${element.nodeName}></span>`
                        );
                        styleString.push('<br/>');
                        for (let i = 0; i < element.childNodes.length; i++) {
                            this.formatXmlWithDOMParser(list, element.childNodes[i], level + 1);
                        }
                        if (element.childNodes.length === 0) {
                            srcString.splice(srcString.length - 1, 1);
                            styleString.splice(styleString.length - 1, 1);
                            blankString = '';
                        }
                        if (element.childNodes[0] && element.childNodes[0].nodeType !== Node.ELEMENT_NODE) {
                            srcString.splice(srcString.length - 2, 1);
                            styleString.splice(styleString.length - 2, 1);
                            blankString = '';
                        }
                        srcString.push(''.padStart(level * blankString.length, blankString) + '</' + element.nodeName + '>');
                        srcString.push('\n');
                        styleString.push(
                            ''.padStart(level * blankString.length, blankString) +
                                `<span class="inline xml_item_${level}">&lt;/${element.nodeName}></span>`
                        );
                        styleString.push('<br/>');
                        break;
                    case Node.TEXT_NODE:
                        srcString.push(element.nodeValue);
                        styleString.push(`<span class="inline xml_item_text">${element.nodeValue}</span>`);
                        break;
                    case Node.CDATA_SECTION_NODE:
                        srcString.push(element.nodeValue);
                        styleString.push(`<span class="inline xml_item_cdata">${element.nodeValue}</span>`);
                        break;
                    default:
                }
            },
            formatXmlBySplit(v) {
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
        &.switchRow {
            display: flex;
            justify-content: flex-end;
            margin-bottom: 3px;
        }
        .el-col {
            height: 95vh;
            overflow-y: auto;
            overflow-x: hidden;
        }
        ::v-deep.result {
            border: #dbdbdb solid 1px;
            border-radius: 3px;
            padding: 10px;
            .inline {
                display: inline !important;
            }
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
                color: #f33;
            }
            .xml_item_1 {
                color: #f39;
            }
            .xml_item_2 {
                color: #f5f;
            }
            .xml_item_3 {
                color: #a3c;
            }
            .xml_item_4 {
                color: #a25;
            }
            .xml_item_5 {
                color: #ea3;
            }
            .xml_item_6 {
                color: #fd3;
            }
            .xml_item_7 {
                color: #39f;
            }
            .xml_item_8 {
                color: #3f9;
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
