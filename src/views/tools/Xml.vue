<template>
    <div>
        <el-row>
            <el-card>
                <div class="buttons">
                    <div>
                        <span>Show Plain Text:</span>
                        <el-switch v-model="plainText" active-color="#13ce66" inactive-color="#ff4949" @change="save"></el-switch>
                    </div>
                    <div>
                        <span>Mode Switch:</span>
                        <el-switch v-model="splitMode" active-color="#13ce66" inactive-color="#ff4949" @change="save"></el-switch>
                    </div>
                    <div v-if="!splitMode">
                        <span>Thin:</span>
                        <el-switch v-model="thin" active-color="#13ce66" inactive-color="#ff4949" @change="save"></el-switch>
                    </div>
                </div>
            </el-card>
        </el-row>
        <el-row :gutter="10">
            <el-col :span="8">
                <el-input v-model="source" :autosize="{ minRows: 30 }" type="textarea" placeholder="请输入内容"></el-input>
            </el-col>
            <el-col v-if="plainText" :span="8">
                <el-input v-model="format[0]" :autosize="{ minRows: 30 }" type="textarea" placeholder="请输入内容"></el-input>
            </el-col>
            <el-col :span="plainText ? 8 : 16">
                <div class="result" v-html="format[1]"></div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: 'Xml',
        data() {
            return {
                source: '',
                splitMode: undefined,
                plainText: undefined,
                thin: undefined,
                isMounted: false
            };
        },
        computed: {
            format() {
                console.log('save');
                if (this.isMounted) {
                    this.save();
                }
                this.source = this.source
                    .replace(/\n/g, '')
                    .replace(/\t/g, ' ')
                    .replace(/>[ ]+/g, '>')
                    .replace(/[ ]+</g, '<')
                    .replace(/ +/g, ' ');
                if (this.splitMode) {
                    return this.formatXmlBySplit(this.source);
                } else {
                    let list = this.formatXmlByDOMParser(this.source);
                    if (this.thin) {
                        let list2 = list[2];
                        let str = '';
                        if (list2) {
                            for (let item of list2) {
                                if (item && item.replace(/[ ㅤ]*\t*/g, '') !== '') {
                                    str += item;
                                }
                            }
                        }
                        this.source = str;
                    }
                    return list;
                }
            }
        },
        mounted() {
            console.log('get');
            this.get();
            this.isMounted = true;
        },
        methods: {
            formatXmlByDOMParser(content) {
                if (!content) {
                    return ['', ''];
                }
                let xml_doc = null;
                const formatContent = content.replace(/[\n\r]/g, '');
                try {
                    xml_doc = new DOMParser().parseFromString(formatContent, 'text/xml');
                } catch (e) {
                    return false;
                }
                let list = [[], [], []];
                console.log('--------------');
                this.formatXmlWithDOMParser(list, xml_doc.documentElement, 0);
                return [list[0].join(''), list[1].join(''), list[2]];
            },
            formatXmlWithDOMParser(list, element, level) {
                let nodeType = element.nodeType;
                let blankString = 'ㅤ';
                let srcString = list[0];
                let styleString = list[1];
                let noneBlankString = list[2];
                switch (nodeType) {
                    case Node.ELEMENT_NODE:
                        noneBlankString.push('<' + element.nodeName + '>');
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
                        if (element.childNodes[0] && [Node.ELEMENT_NODE, Node.COMMENT_NODE].indexOf(element.childNodes[0].nodeType) === -1) {
                            srcString.splice(srcString.length - 2, 1);
                            styleString.splice(styleString.length - 2, 1);
                            blankString = '';
                        }
                        noneBlankString.push('</' + element.nodeName + '>');
                        srcString.push(''.padStart(level * blankString.length, blankString) + '</' + element.nodeName + '>');
                        srcString.push('\n');
                        styleString.push(
                            ''.padStart(level * blankString.length, blankString) +
                                `<span class="inline xml_item_${level}">&lt;/${element.nodeName}></span>`
                        );
                        styleString.push('<br/>');
                        break;
                    case Node.TEXT_NODE:
                        noneBlankString.push(element.nodeValue);
                        srcString.push(element.nodeValue);
                        styleString.push(`<span class="inline xml_item_text">${element.nodeValue}</span>`);
                        break;
                    case Node.COMMENT_NODE:
                        noneBlankString.push('<!-- ' + element.nodeValue + ' -->');
                        srcString.push(''.padStart(level * blankString.length, blankString) + '<!-- ' + element.nodeValue + ' -->');
                        srcString.push('\n');
                        styleString.push(
                            ''.padStart(level * blankString.length, blankString) + `<span class="inline xml_item_${level}">&lt;!-- </span>`
                        );
                        styleString.push(`<span class="inline xml_item_comment">${element.nodeValue}</span>`);
                        styleString.push(`<span class="inline xml_item_${level}"> --></span>`);
                        styleString.push('<br/>');
                        break;
                    case Node.CDATA_SECTION_NODE:
                        noneBlankString.push(element.nodeValue);
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
                        space3 += '<span class="xml_space"></span>';
                        space2 += '  ';
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
            },
            save() {
                let xmlData = {
                    source: this.source,
                    plainText: this.plainText,
                    thin: this.thin,
                    splitMode: this.splitMode
                };
                localStorage.setItem('xmlData', JSON.stringify(xmlData));
            },
            get() {
                let xmlData;
                try {
                    xmlData = JSON.parse(localStorage.getItem('xmlData'));
                } catch (e) {
                    xmlData = {
                        source: '',
                        plainText: true,
                        thin: true,
                        splitMode: true
                    };
                }
                this.source = xmlData.source;
                this.plainText = xmlData.plainText;
                this.thin = xmlData.thin;
                this.splitMode = xmlData.splitMode;
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
            height: 95vh;
            overflow-y: auto;
            overflow-x: hidden;
        }
        :deep(.result) {
            border: #dbdbdb solid 1px;
            border-radius: 3px;
            padding: 10px;
            overflow-y: auto;
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
            .xml_item_comment {
                color: grey;
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
