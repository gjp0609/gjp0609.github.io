<template>
    <div class="notes">
        <div class="list">
            <el-tree
                ref="tree"
                :data="list"
                :props="defaultProps"
                node-key="path"
                :highlight-current="true"
                accordion
                @node-click="handleNodeClick"
            ></el-tree>
        </div>
        <div class="note-wrapper">
            <div class="note" v-html="noteContent"></div>
        </div>
        <el-dialog v-model="auth.loginDialogVisible" title="Login" :width="isMobile ? '20rem' : '30rem'" center>
            <el-form label-width="200">
                <el-form-item label="Username">
                    <el-input v-model="auth.username" type="text"></el-input>
                </el-form-item>
                <el-form-item label="Password">
                    <el-input v-model="auth.password" type="password" @keyup.enter="getNotes"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button :size="isMobile ? 'small' : ''" @click="auth.loginDialogVisible = false">Cancel</el-button>
                    <el-button type="primary" :size="isMobile ? 'small' : ''" @click="login">Confirm</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
    import marked from 'marked';
    import hljs from 'highlight.js';
    import 'highlight.js/styles/github.css';
    import * as cheerio from 'cheerio';
    import { Base64 } from 'js-base64';
    import MD5 from 'js-md5';

    export default {
        name: 'Notes',
        data() {
            return {
                screenWidth: document.body.clientWidth,
                list: [],
                routePath: '/test/notes/',
                url: import.meta.env.VITE_NOTES_URL,
                loginUrl: import.meta.env.VITE_LOGIN_URL,
                auth: {
                    loginDialogVisible: false,
                    username: '',
                    password: '',
                    authorization: '',
                    getAuth() {
                        // this.authorization = this.authorization || 'Basic ' + Base64.encode(this.username + ':' + this.password);
                        return this.authorization;
                    }
                },
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                notePath: {
                    content: '',
                    path: ''
                },
                currentNote: ''
            };
        },
        computed: {
            noteContent() {
                let html = marked(this.notePath.content);
                let $ = cheerio.load(html);
                for (let ele of $('img')) {
                    let url = ele.attribs['src'];
                    ele.attribs['src'] = 'data:image/png;base64,';
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
                    for (let ele of document.getElementsByTagName('img')) {
                        fetch(ele.getAttribute('data-url'), {
                            headers: { Authorization: this.auth.getAuth() }
                        }).then((response) => {
                            if (response.status !== 200) {
                                this.toLogin();
                            } else {
                                response
                                    .blob()
                                    .then(
                                        (blob) =>
                                            new Promise((resolve, reject) => {
                                                const reader = new FileReader();
                                                reader.onloadend = () => resolve(reader.result);
                                                reader.onerror = reject;
                                                reader.readAsDataURL(blob);
                                            })
                                    )
                                    .then((dataUrl) => {
                                        ele.src = dataUrl;
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
            if (!currentPath) {
                currentPath = 'Quick/index.md';
            }
            this.currentPath = currentPath;
            let auth = localStorage.getItem('Notes_Auth');
            if (auth) {
                this.auth.authorization = auth;
                this.getNotes();
            } else {
                this.toLogin();
            }
        },
        methods: {
            getNotes() {
                fetch(this.url + 'list.json', { headers: { Authorization: this.auth.getAuth() } })
                    .then((response) => {
                        if (response.status !== 200) {
                            this.toLogin();
                        } else {
                            this.saveAuth();
                            response.text().then((text) => {
                                this.list = JSON.parse(text);
                                this.$nextTick(() => {
                                    this.$refs.tree.setCurrentKey(this.currentPath, true);
                                });
                                this.$notify({
                                    duration: 1000,
                                    message: 'query success'
                                });
                                let index = this.currentPath.lastIndexOf('/') + 1;
                                this.getNote(this.currentPath.substr(0, index), this.currentPath.substr(index));
                            });
                        }
                    })
                    .catch((e) => {
                        console.log(e);
                        this.toLogin();
                    });
            },
            getNote(path, note) {
                let newPath = path + note;
                if (newPath === this.currentNote) {
                    return;
                }
                this.$router.push(this.routePath + newPath);
                this.currentNote = newPath;
                let baseUrl = this.url + path;
                marked.setOptions({
                    baseUrl: baseUrl
                });
                fetch(this.url + newPath, { headers: { Authorization: this.auth.getAuth() } })
                    .then((response) => {
                        if (response.status !== 200) {
                            this.toLogin();
                        } else {
                            response.text().then((text) => {
                                this.notePath.content = text;
                                this.$notify({
                                    duration: 1000,
                                    message: 'query success'
                                });
                            });
                        }
                    })
                    .catch((e) => {
                        console.log(e);
                        this.toLogin();
                    });
            },
            toLogin() {
                this.auth.authorization = '';
                this.auth.loginDialogVisible = true;
            },
            login() {
                fetch(this.loginUrl, {
                    body: JSON.stringify({
                        Username: 'me',
                        Password: String(MD5('123456'))
                    }),
                    method: 'POST'
                }).then((response) => {
                    if (response.status !== 200) {
                        this.toLogin();
                    } else {
                        response.text().then((text) => {
                            let json = JSON.parse(text);
                            console.log(json);
                            if (json.Code === 1) {
                                this.auth.authorization = json.Data;
                                this.getNotes();
                            } else {
                                this.$notify({
                                    duration: 1000,
                                    message: json.Msg
                                });
                                this.toLogin();
                            }
                        });
                    }
                });
            },
            saveAuth() {
                localStorage.setItem('Notes_Auth', this.auth.getAuth());
                this.auth.loginDialogVisible = false;
            },
            handleNodeClick(e) {
                console.log(e);
                if (e.path.indexOf('.md') > 0) {
                    let name = e.name.replace(/ /g, '_') + '.md';
                    let path = e.path.substr(0, e.path.length - name.length);
                    this.getNote(path, name);
                }
            },
            highlight() {
                document.querySelectorAll('code').forEach((node) => {
                    hljs.highlightElement(node);
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    @font-face {
        font-family: MonacoWoff2;
        src: url('data:font/woff2;base64,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')
            format('woff2');
    }
    .notes {
        flex: 1;
        display: flex;
        .list {
            overflow-y: auto;
            margin-bottom: 0.5rem;
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
                    overflow-y: auto;
                    width: 50rem;
                    padding: 1rem 100%;
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
                h1 {
                    font-size: 1.7rem;
                    margin-block-start: 0.67rem;
                    margin-block-end: 0.67rem;
                }
                h2 {
                    font-size: 1.6rem;
                    margin-block-start: 0.77rem;
                    margin-block-end: 0.67rem;
                }
                h3 {
                    font-size: 1.5rem;
                    margin-block-start: 0.87rem;
                    margin-block-end: 0.67rem;
                }
                h4 {
                    font-size: 1.4rem;
                    margin-block-start: 0.97rem;
                    margin-block-end: 0.67rem;
                }
                h5 {
                    font-size: 1.3rem;
                    margin-block-start: 0.97rem;
                    margin-block-end: 0.67rem;
                }
                h6 {
                    font-size: 1.2rem;
                    margin-block-start: 0.97rem;
                    margin-block-end: 0.67rem;
                }
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
                p {
                    margin-block-start: 0.7em;
                    margin-block-end: 0.7em;
                }
                code.hljs {
                    background-color: $background-color;
                    overflow-x: auto;
                }
                code.hljs,
                code.hljs * {
                    font-family: 'MonacoWoff2', monospace;
                    font-size: 0.9rem;
                }
                code.hljs * {
                    line-height: 1.7rem;
                }
                code .hljs-comment {
                    font-style: oblique;
                }
                code .hljs-section,
                code .hljs-keyword {
                    font-size: 0.85rem;
                    font-weight: bold;
                }
                table {
                    border-collapse: collapse;
                }
                table th {
                    background-color: $prime-color;
                }
                table th,
                table td {
                    border-collapse: collapse;
                    border: black solid 0.01rem;
                    padding: 0 0.5rem 0;
                }
            }
        }
    }
</style>
