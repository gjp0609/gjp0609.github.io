<template>
    <div>
        <el-row>
            <el-form :model="formData" label-width="80px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="formData.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="formData.password" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="login">Login</el-button>
                </el-form-item>
            </el-form>
        </el-row>
    </div>
</template>

<script>
    import { algorithmService } from '../../api';
    import { Message } from 'element-ui';

    export default {
        name: 'AlgorithmLogin',
        data() {
            return {
                formData: {
                    username: '',
                    password: ''
                }
            };
        },
        methods: {
            login() {
                algorithmService.post('/auth/login', this.formData).then((res) => {
                    if (res.data && res.data.code === 0) {
                        localStorage.setItem('token', res.data.data);
                        localStorage.setItem('tokenTime', new Date().getTime().toString());
                        Message({
                            showClose: true,
                            message: '登录成功',
                            type: 'success'
                        });
                    }
                });
            }
        }
    };
</script>

<style lang="scss" scoped></style>
