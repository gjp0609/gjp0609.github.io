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

<script>
    import marked from 'marked';
    import hljs from 'highlight.js';
    import 'highlight.js/styles/github.css';
    import * as cheerio from 'cheerio';
    import pangu from 'pangu';
    import { Base64 } from 'js-base64';

    const LOADING =
        'data:image/gif;base64,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';
    export default {
        name: 'Notes',
        data() {
            return {
                screenWidth: document.body.clientWidth,
                list: [],
                routePath: '/tools/notes/',
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
                    ele.attribs['src'] = LOADING;
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
                        cachedFetch(ele.getAttribute('data-url')).then((response) => {
                            if (response.status === 200) {
                                response.text().then((text) => {
                                    let json = JSON.parse(text);
                                    ele.src = 'data:image/png;base64,' + json.content;
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
                    window.screenWidth = document.body.clientWidth;
                    this.screenWidth = window.screenWidth;
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
                cachedFetch((this.fallback ? this.urlBak : this.url) + 'list.json')
                    .then((response) => {
                        if (response.status === 200) {
                            response.text().then((text) => {
                                let json = JSON.parse(text);
                                let content = Base64.decode(json.content);
                                this.list = JSON.parse(content);
                                localStorage.setItem('notes_time', new Date().getTime().toString());
                                localStorage.setItem('notes_list', content);
                                this.$notify({
                                    duration: 1000,
                                    message: 'query success'
                                });
                                this.$nextTick(() => {
                                    if (this.currentPath !== '') {
                                        this.$refs.tree.setCurrentKey(this.currentPath, true);
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
            getNote(path, note, force) {
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
                cachedFetch((this.fallback ? this.urlBak : this.url) + path + note)
                    .then((response) => {
                        if (response.status === 200) {
                            response.text().then((text) => {
                                let json = JSON.parse(text);
                                this.notePath.content = Base64.decode(json.content);
                                this.$notify({
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
            handleNodeClick(e) {
                console.log(e);
                if (e.Id.indexOf('.md') > 0) {
                    let name = e.Title + '.md';
                    let path = e.Id.substr(0, e.Id.length - name.length);
                    this.getNote(path, name, false);
                }
                return true;
            },
            highlight() {
                document.querySelectorAll('pre code').forEach((node) => {
                    hljs.highlightElement(node);
                });
            },
            scrollNote(e) {
                if (e.target.className === 'note-wrapper') {
                    let note = document.getElementsByClassName('note');
                    note[0].scroll(0, note[0].scrollTop + e.deltaY);
                }
                e.stopPropagation();
            }
        }
    };

    function cachedFetch(url, options) {
        let expiry = 60 * 60 * 24 * 2; // 缓存 2 天
        if (typeof options === 'number') {
            expiry = options;
            options = undefined;
        } else if (typeof options === 'object') {
            // I hope you didn't set it to 0 seconds
            expiry = options.seconds || expiry;
        }
        // 将 URL 作为 localStorage 的 key
        let cacheKey = url;
        let cached = localStorage.getItem(cacheKey);
        let whenCached = localStorage.getItem(cacheKey + ':ts');
        if (cached !== null && whenCached !== null) {
            // Even though 'whenCached' is a string,
            // this operation works because the minus sign converts the string to an integer and it will work.
            let age = (Date.now() - whenCached) / 1000;
            if (age < expiry) {
                let response = new Response(new Blob([cached]));
                return Promise.resolve(response);
            } else {
                // 清除旧值
                localStorage.removeItem(cacheKey);
                localStorage.removeItem(cacheKey + ':ts');
            }
        }

        return fetch(url, options).then((response) => {
            // let's only store in cache if the content-type is JSON or something non-binary
            if (response.status === 200) {
                let ct = response.headers.get('Content-Type');
                if (ct && (ct.match(/application\/json/i) || ct.match(/text\//i))) {
                    // If we don't clone the response, it will be consumed by the time it's returned.
                    // This way we're being un-intrusive.
                    response
                        .clone()
                        .text()
                        .then((content) => {
                            localStorage.setItem(cacheKey, content);
                            localStorage.setItem(cacheKey + ':ts', Date.now());
                        });
                }
            }
            return response;
        });
    }
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
            .el-tree-node .el-tree-node__label:hover {
                animation: 5s wordsLoop linear infinite normal;
            }
            @-webkit-keyframes wordsLoop {
                0%,
                20% {
                    transform: translateX(0px);
                }
                45%,
                55% {
                    transform: translateX(calc(-100% + 200px));
                }
                80%,
                100% {
                    transform: translateX(0px);
                }
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
                code {
                    $shadow-offset: 0.2rem;
                    $shadow-offset-negative: -0.2rem;
                    $shadow-blur: 0.2rem;
                    $shadow-spread: 0rem;
                    $shadow-color: $background-color;
                    background-color: $shadow-color;
                    box-shadow: $shadow-offset $shadow-offset $shadow-blur $shadow-spread $shadow-color,
                        $shadow-offset $shadow-offset-negative $shadow-blur $shadow-spread $shadow-color,
                        $shadow-offset-negative $shadow-offset $shadow-blur $shadow-spread $shadow-color,
                        $shadow-offset-negative $shadow-offset-negative $shadow-blur $shadow-spread $shadow-color;
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