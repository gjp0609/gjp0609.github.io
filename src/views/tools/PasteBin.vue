<template>
    <div class="pasteBin">
        <el-row class="search" type="flex">
            <el-col class="code">
                <el-input v-model="code" placeholder="查询请输入编码" @focus="isSave = false"></el-input>
            </el-col>
            <el-col class="button">
                <el-button v-if="isSave" type="primary" @click="saveText">保存</el-button>
                <el-button v-else type="success" @click="getText">查询</el-button>
            </el-col>
        </el-row>
        <el-row v-if="code" class="link">
            <el-card>
                Raw:&ensp;<a :href="domain + '/api/paste/raw/' + code" target="_blank"> {{ domain }}/api/paste/raw/{{ code }} </a>
            </el-card>
            <el-card>
                Redirect:&ensp;<a :href="domain + '/api/paste/redirect/' + code" target="_blank">{{ domain }}/api/paste/redirect/{{ code }}</a>
            </el-card>
        </el-row>
        <el-row>
            <el-input
                v-model="content"
                :autosize="{ minRows: 30, maxRows: 50 }"
                type="textarea"
                placeholder="保存请输入内容"
                @focus="isSave = true"
            ></el-input>
        </el-row>
        <el-dialog v-model="showLoginDialog" title="登录">
            <el-form :model="loginForm">
                <el-form-item label="Username" :label-width="'120px'">
                    <el-input v-model="loginForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Password" :label-width="'120px'">
                    <el-input v-model="loginForm.password" type="password" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="showLoginDialog = false">取 消</el-button>
                    <el-button type="primary" @click="login">确 定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
    import service from '../../api';
    import { SET_TOKEN, store } from '../../store';
    import { ElMessage } from 'element-plus';
    import MD5 from 'js-md5';
    import { Base64 } from 'js-base64';

    export default {
        name: 'PasteBin',
        data() {
            return {
                isSave: false,
                showLoginDialog: false,
                loginForm: {},
                domain: 'https://www.onysakura.fun',
                code: '',
                content: ''
            };
        },
        computed: {
            token() {
                return store.state.token;
            }
        },
        methods: {
            getText() {
                service.get('/api/paste/' + this.code).then((res) => {
                    if (res.data.status === 1) {
                        this.content = res.data.msg;
                        ElMessage({
                            message: 'query success',
                            type: 'success'
                        });
                    } else {
                        ElMessage({
                            message: 'error, ' + res.data.msg,
                            type: 'warning'
                        });
                    }
                });
            },
            saveText() {
                let token = this.checkToken();
                if (token) {
                    service
                        .put(
                            '/api/paste/auth/save',
                            { code: this.code, content: this.content },
                            {
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': token
                                }
                            }
                        )
                        .then((res) => {
                            if (res.data.status === 1) {
                                this.code = res.data.msg;
                                ElMessage({
                                    message: 'save success',
                                    type: 'success'
                                });
                            } else if (res.data.status === -200) {
                                this.toLogin();
                            } else {
                                ElMessage({
                                    message: 'error, ' + res.data.msg,
                                    type: 'warning'
                                });
                            }
                        });
                } else {
                    this.toLogin();
                }
            },
            checkToken() {
                let token = this.token;
                try {
                    let decode = Base64.decode(token);
                    // "{"typ":"JWT","alg":"RS512"}{"username":"me","iat":1631689116,"exp":1631690916}....
                    let regExp = new RegExp('"exp":[0-9]{10}', 'g');
                    let array = regExp.exec(decode);
                    let expireTime = array[0].substr(6);
                    console.log(expireTime);
                    if (new Date().getTime() / 1000 < parseInt(expireTime)) {
                        return token;
                    }
                } catch (e) {}
                return null;
            },
            toLogin() {
                console.log('login');
                this.showLoginDialog = true;
                this.loginForm = {};
            },
            login() {
                let param = Object.assign({}, this.loginForm);
                param.password = MD5(param.password);
                service
                    .post('/api/login', param, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((res) => {
                        console.log(res);
                        if (res.data.status === 1) {
                            store.commit(SET_TOKEN, { token: res.data.token });
                            ElMessage({
                                message: 'login success',
                                type: 'success'
                            });
                            this.showLoginDialog = false;
                        } else {
                            ElMessage({
                                message: 'error, ' + res.data.msg,
                                type: 'warning'
                            });
                        }
                    });
            }
        }
    };
</script>

<style lang="scss" scoped>
    .pasteBin {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .el-row {
            margin-bottom: 10px;
            &.search {
                flex-wrap: nowrap;
                justify-content: space-between;
                .code {
                    flex: auto;
                    margin-right: 20px;
                    font-family: monospace;
                }
                .button {
                    width: 70px;
                    flex: 0 0 70px;
                }
            }
            &.link {
                display: flex;
                justify-content: space-between;
                .el-card {
                    flex: 1;
                }
            }
        }
    }
</style>
