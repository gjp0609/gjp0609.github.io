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
        <el-dialog v-model="auth.loginDialogVisible" title="Login" width="30%" center>
            <el-form label-width="200">
                <el-form-item label="Username">
                    <el-input type="text" v-model="auth.username"></el-input>
                </el-form-item>
                <el-form-item label="Password">
                    <el-input type="password" @keyup.enter="getNotes" v-model="auth.password"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="auth.loginDialogVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="getNotes">Confirm</el-button>
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
    export default {
        name: 'Notes',
        data() {
            return {
                test: 1,
                list: [],
                routePath: '/test/notes/',
                url: import.meta.env.VITE_NOTES_URL,
                auth: {
                    loginDialogVisible: false,
                    username: '',
                    password: '',
                    authorization: '',
                    getAuth() {
                        this.authorization = this.authorization || 'Basic ' + Base64.encode(this.username + ':' + this.password);
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
            saveAuth() {
                localStorage.setItem('Notes_Auth', this.auth.getAuth());
                this.auth.loginDialogVisible = false;
            },
            handleNodeClick(e) {
                if (e.name.indexOf('.md') > 0) {
                    let path = e.path.substr(0, e.path.length - e.name.length);
                    this.getNote(path, e.name);
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
    .notes {
        display: flex;
        height: 100%;
        .list {
            flex: 0 0 200px;
        }
        .note-wrapper {
            flex: 1;
            overflow-y: auto;
            height: 95vh;
            .note {
                margin: 30px auto;
                width: 800px;
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
                    border-left: $background-color-darker solid 0.3rem;
                    padding-left: 0.5rem;
                    margin-inline-start: 2rem;
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
                    max-width: 600px;
                    display: block;
                    margin-left: 2rem;
                }

                p {
                    margin-block-start: 0.7em;
                    margin-block-end: 0.7em;
                }

                code.hljs {
                    background-color: $background-color;
                    overflow-x: auto;
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
