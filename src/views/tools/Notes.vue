<template>
    <div class="notes">
        <div class="list">
            <el-tree
                ref="tree"
                :data="list"
                :props="defaultProps"
                node-key="Id"
                :highlight-current="true"
                accordion
                @node-click="handleNodeClick"
            ></el-tree>
        </div>
        <div class="note-wrapper" @wheel="scrollNote">
            <div class="note" v-html="noteContent"></div>
        </div>
    </div>
</template>

<script lang="ts">
    import { marked } from 'marked';
    import hljs from 'highlight.js';
    import 'highlight.js/styles/github.css';
    import * as cheerio from 'cheerio';
    import pangu from 'pangu';
    import { Base64 } from 'js-base64';
    import { cachedFetch } from '../../../docs/common/js/utils/';
    import { defineComponent, ref } from 'vue';
    import { ElTree, ElNotification } from 'element-plus';

    const tree = ref<InstanceType<typeof ElTree>>();
    export default defineComponent({
        name: 'NotesTool',
        data() {
            return {
                screenWidth: document.body.clientWidth,
                list: [],
                routePath: '/tools/notes/',
                isDev: import.meta.env.DEV,
                url: import.meta.env.VITE_NOTES_API_URL,
                urlBak: import.meta.env.VITE_NOTES_API_URL_BAK,
                fallback: false,
                defaultProps: {
                    id: 'Id',
                    children: 'children',
                    label: 'Title'
                },
                notePath: {
                    content: '',
                    path: ''
                },
                currentPath: ''
            };
        },
        computed: {
            noteContent() {
                let html = marked(this.notePath.content);
                let $ = cheerio.load(html);
                for (let ele of $('img')) {
                    let url = ele.attribs['src'];
                    ele.attribs['src'] = 'LOADING';
                    ele.attribs['data-url'] = url;
                }
                return $.html();
            },
            isMobile() {
                return this.screenWidth < 1024;
            }
        },
        watch: {
            noteContent: function () {
                this.$nextTick(() => {
                    this.highlight();
                    pangu.spacingElementByTagName('p');
                    for (let ele of document.getElementsByTagName('img')) {
                        let imageUrl = ele.getAttribute('data-url') ?? '';
                        if (imageUrl.indexOf('./') === 0) {
                            imageUrl = this.url + this.currentPath.substring(0, this.currentPath.lastIndexOf('/')) + imageUrl.substring(1);
                        }
                        cachedFetch(imageUrl, undefined, this.isDev).then((response) => {
                            if (response.status === 200) {
                                response.text().then((text) => {
                                    if (this.isDev) {
                                        ele.src = imageUrl;
                                    } else {
                                        let json = JSON.parse(text);
                                        ele.src = 'data:image/png;base64,' + json.content;
                                    }
                                });
                            }
                        });
                    }
                });
            }
        },
        mounted() {
            window.onresize = () => {
                return (() => {
                    this.screenWidth = document.body.clientWidth;
                    console.log(this.screenWidth);
                })();
            };
            let currentPath = this.$router.currentRoute.value.fullPath;
            currentPath = currentPath.replace(this.routePath, '');
            currentPath = decodeURIComponent(currentPath);
            if (!currentPath) {
                currentPath = 'README.md';
            }
            this.currentPath = currentPath;
            this.getNotes();
        },
        methods: {
            getNotes() {
                cachedFetch((this.fallback ? this.urlBak : this.url) + 'list.json', undefined, this.isDev)
                    .then((response) => {
                        if (response.status === 200) {
                            response.text().then((text) => {
                                if (this.isDev) {
                                    this.list = JSON.parse(text);
                                } else {
                                    let json = JSON.parse(text);
                                    let content = Base64.decode(json.content);
                                    this.list = JSON.parse(content);
                                }
                                ElNotification({
                                    duration: 1000,
                                    message: 'query success'
                                });
                                this.$nextTick(() => {
                                    if (this.currentPath !== '') {
                                        tree.value!.setCurrentKey(this.currentPath, true);
                                        let index = this.currentPath.lastIndexOf('/') + 1;
                                        this.getNote(this.currentPath.substr(0, index), this.currentPath.substr(index), true);
                                    }
                                });
                            });
                        }
                    })
                    .catch((e) => {
                        console.log(e);
                        this.fallback = true;
                        this.getNotes();
                    });
            },
            getNote(path: string, note: string, force: boolean) {
                let baseUrl;
                let newPath = path + note;
                if (!force && newPath === this.currentPath) {
                    return;
                }
                this.$router.push(this.routePath + newPath);
                this.currentPath = newPath;
                baseUrl = (this.fallback ? this.urlBak : this.url) + path;
                marked.setOptions({
                    baseUrl: baseUrl
                });
                cachedFetch((this.fallback ? this.urlBak : this.url) + path + note, undefined, this.isDev)
                    .then((response) => {
                        if (response.status === 200) {
                            response.text().then((text) => {
                                if (this.isDev) {
                                    this.notePath.content = text;
                                } else {
                                    let json = JSON.parse(text);
                                    this.notePath.content = Base64.decode(json.content);
                                }
                                ElNotification({
                                    duration: 1000,
                                    message: 'query success'
                                });
                            });
                        }
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            },
            handleNodeClick(e: any) {
                console.log(e);
                if (e.Id.indexOf('.md') > 0) {
                    let name = e.Title + '.md';
                    let path = e.Id.substring(0, e.Id.length - name.length);
                    this.getNote(path, name, false);
                }
                return true;
            },
            highlight() {
                document.querySelectorAll('pre code').forEach((node) => {
                    hljs.highlightElement(node as HTMLElement);
                });
            },
            scrollNote(e: any) {
                if (e.target.className === 'note-wrapper') {
                    let note = document.getElementsByClassName('note');
                    note[0].scroll(0, note[0].scrollTop + e.deltaY);
                }
                e.stopPropagation();
            }
        }
    });
</script>

<style lang="scss" scoped>
    .notes {
        flex: 1;
        display: flex;
        .list {
            overflow-y: auto;
            margin-bottom: 0.5rem;
        }
        :deep(.list) {
            .el-tree-node .el-tree-node__expand-icon {
                color: var(--el-color-info);
            }
            .el-tree-node .el-tree-node__expand-icon.expanded {
                color: var(--el-color-success);
            }
            .el-tree-node > * > .is-leaf {
                color: var(--el-color-info-light);
            }
            .el-tree-node.is-current > * > .is-leaf {
                color: var(--el-color-primary);
            }
            .el-tree-node .el-tree-node__label {
                width: 15rem;
            }
        }
        @media screen and (min-width: 1024px) {
            .list {
                flex: 0 0 20rem;
            }
        }
        @media screen and (max-width: 1024px) {
            flex-direction: column;
            .list {
                flex: 0 0 6rem;
                border-bottom: 0.01rem solid lightgray;
            }
        }
        .note-wrapper {
            flex: 1;
            display: flex;
            flex-direction: column;
            @media screen and (min-width: 1024px) {
                align-items: center;
                .note {
                    flex: 1 1 0;
                    overflow-y: scroll;
                    width: 60rem;
                    // moz
                    scrollbar-width: none;
                }
                .note::-webkit-scrollbar {
                    display: none;
                }
            }
            @media screen and (max-width: 1024px) {
                .note {
                    flex: 1 1 0;
                    overflow-x: auto;
                    overflow-y: auto;
                }
            }
            :deep(.note) {
                scroll-behavior: smooth;
                $prime-color: #ecf5ff;
                $background-color: #f4f7f9;
                $background-color-darker: #e3e9ee;
                a {
                    color: black;
                    text-decoration: underline dotted 0.1rem grey;
                    text-underline-offset: 0.3rem;
                }
                blockquote {
                    box-sizing: border-box;
                    background-color: $background-color;
                    mix-blend-mode: multiply;
                    margin-right: 0;
                    border-left: $background-color-darker solid 0.2rem;
                    padding-left: 0.5rem;
                    margin-inline-start: 1rem;
                    padding-top: 0.01rem;
                    padding-bottom: 0.01rem;
                }
                /* h1 {
                    font-size: 1.75rem;
                    margin-block-start: 0.8rem;
                    margin-block-end: 0.7rem;
                }
                h2 {
                    font-size: 1.6rem;
                    margin-block-start: 0.9rem;
                    margin-block-end: 0.7rem;
                }
                h3 {
                    font-size: 1.45rem;
                    margin-block-start: 1rem;
                    margin-block-end: 0.7rem;
                }
                h4 {
                    font-size: 1.35rem;
                    margin-block-start: 1rem;
                    margin-block-end: 0.7rem;
                }
                h5 {
                    font-size: 1.25rem;
                    margin-block-start: 1rem;
                    margin-block-end: 0.7rem;
                }
                h6 {
                    font-size: 1.15rem;
                    margin-block-start: 1rem;
                    margin-block-end: 0.7rem;
                }*/
                img {
                    display: block;
                    margin-left: 1rem;
                    @media screen and (min-width: 1024px) {
                        max-width: 40rem;
                    }
                    @media screen and (max-width: 1024px) {
                        max-width: 20rem;
                    }
                }
                code,
                code * {
                    font-family: 'MononokiWoff2', 'Sarasa Mono SC', monospace;
                }
                code.hljs {
                    background-color: $background-color;
                    overflow-x: auto;
                }
                code.hljs * {
                    line-height: 1.5rem;
                }
                code .hljs-comment {
                    font-style: italic;
                }
                code .hljs-section,
                code .hljs-keyword {
                    font-weight: bold;
                }
                $code-shadow-offset: 0.2rem;
                $code-shadow-offset-negative: -0.2rem;
                $code-shadow-blur: 0.2rem;
                $code-shadow-spread: 0rem;
                code {
                    $code-shadow-color: $background-color;
                    background-color: $code-shadow-color;
                    box-shadow: $code-shadow-offset $code-shadow-offset $code-shadow-blur $code-shadow-spread $code-shadow-color,
                        $code-shadow-offset $code-shadow-offset-negative $code-shadow-blur $code-shadow-spread $code-shadow-color,
                        $code-shadow-offset-negative $code-shadow-offset $code-shadow-blur $code-shadow-spread $code-shadow-color,
                        $code-shadow-offset-negative $code-shadow-offset-negative $code-shadow-blur $code-shadow-spread $code-shadow-color;
                }
                blockquote code {
                    $code-shadow-color: darken($background-color, 5%);
                    background-color: $code-shadow-color;
                    box-shadow: $code-shadow-offset $code-shadow-offset $code-shadow-blur $code-shadow-spread $code-shadow-color,
                        $code-shadow-offset $code-shadow-offset-negative $code-shadow-blur $code-shadow-spread $code-shadow-color,
                        $code-shadow-offset-negative $code-shadow-offset $code-shadow-blur $code-shadow-spread $code-shadow-color,
                        $code-shadow-offset-negative $code-shadow-offset-negative $code-shadow-blur $code-shadow-spread $code-shadow-color;
                }
                p,
                ol li,
                ul li {
                    margin-top: 0.7rem;
                    line-height: 1.5rem;
                }
                p {
                    margin-block-start: 0.7em;
                    margin-block-end: 0.7em;
                }
                pre {
                    margin-left: 1rem;
                }
                pre code.hljs {
                    padding: 0.5rem;
                }
                table {
                    margin-left: 1rem;
                    border-collapse: collapse;
                }
                table th {
                    background-color: $prime-color;
                }
                table th,
                table td {
                    border-collapse: collapse;
                    border: black solid 0.01rem;
                    padding: 0.2rem 0.5rem;
                }
            }
        }
    }
</style>
