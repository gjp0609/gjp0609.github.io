<template>
    <div class="index">
        <span>{{ test }}</span>
        <el-button @click="asd">qwe</el-button>
        <el-button @click="index">to index</el-button>
        <el-button @click="addCount">Add</el-button>
        <!--        <iframe src="http://pay.onysakura.com/jsb/pay.html" width="400px" height="900px"></iframe>-->
    </div>
</template>

<script>
    import { SET_COUNT } from '../../store/mutation-types';
    // import service from '../../api'
    import axios from 'axios';

    export default {
        name: 'Test',
        data() {
            return {
                test: 1,
                form: ''
            };
        },
        mounted() {
            axios
                .post(
                    'http://127.0.0.1/manager-server/menuFunc/checkMenuFuncIsExists',
                    JSON.stringify({
                        funcCode: 'qwe',
                        menuCode: 'sys'
                    }),
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Origin': 'http://127.0.0.1:23232',
                            'Access-Control-Allow-Origin': 'http://127.0.0.1:23232',
                            'Authorization':
                                'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjdXJyZW50VGltZU1pbGxpcyI6IjE2MTY1NzE5MjYxNTUiLCJleHAiOjE2MTY1NzIyMjYsImFjY291bnQiOiJndW9qcCJ9.cTtcNyYuYasYTgI_SbG5oLWtosKJUpnqVredy22jRHo'
                        }
                    }
                )
                .then((res) => {
                    console.log(res.data);
                });
            // service.get('/get?a=asd');
            // axios.get('/test/get?a=asd');
            // let form =
            //     '<form action="https://epaytest.jsbchina.cn:9999/epcs/ccypubcashier/loginNobind.htm" method="post"><input type="hidden" name="charset" value="UTF-8"/><input type="hidden" name="channelNo" value="c"/><input type="hidden" name="publicKeyCode" value="00"/><input type="hidden" name="subject" value="1"/><input type="hidden" name="bizDate" value="20201201"/><input type="hidden" name="sign" value="OJW5kri8P9P5NN+SlG4X0n664KGbSsQw2Ugt32kp/ikyMjYqJlG/CWB2mQ6IL/qiiB+C6QVwCbqxKYaRL8jj9E8kYZxD1/vZt5wN7PBhVb5lrQphE44xjIdVAGcWcEil7C57ejCjuZ2anRoyGN7IHG/oUxIZ8HKPP0evj+MqVSqqElwHD6OlYLs9QUnrbvgQP0rNX1QYepQYZjiNuh5NSgqd3omt1ihYwe+tSY1DWsk7/ERfDi/U0S1nFpB1yuPStNRclrMJ8Npu8+BHLKQPG4S4U5jUCBy/iab/uaFOxiu3lQKI2ylgNJX5lQS98KmEfC86/bjLnveKTPS7FhBPlA=="/><input type="hidden" name="body" value="1111"/><input type="hidden" name="svrCode" value="2"/><input type="hidden" name="signType" value="RSA"/><input type="hidden" name="currency" value="CNY"/><input type="hidden" name="returnUrl" value="https%3A%2F%2Fsunaclivingtest.sunac.com.cn%2FpayService%2Fxcx%2Fbutler%2Fredirect%2Fbutlera397bc504b374961af4f9f880fafaa57SEPARATOR202012011145481370673103762087"/><input type="hidden" name="partnerBuyerId" value="13552535506"/><input type="hidden" name="createDate" value="20201201"/><input type="hidden" name="amount" value="0.01"/><input type="hidden" name="msgID" value="5a695f70bf5f46418fb5a291aaa053a2"/><input type="hidden" name="outerOrderNo" value="202012011616011234567890123456"/><input type="hidden" name="jumpSec" value="3"/><input type="hidden" name="version" value="v1.0.0"/><input type="hidden" name="field1" value="11"/><input type="hidden" name="createTime" value="161601"/><input type="hidden" name="service" value="nopwdCreateOrder"/><input type="hidden" name="notifyUrl" value="https%3A%2F%2Fsunaclivingtest.sunac.com.cn%2FpayService%2Fxcx%2Fjsb%2Fcallback"/><input type="hidden" name="partnerId" value="4030fca07ab34d1fb654a56c89194f4e"/><input type="hidden" name="field3" value="33"/><input type="hidden" name="field2" value="22"/><input type="submit" value="123"/></form>';
            // this.form = form;
        },
        methods: {
            asd() {
                console.log(this.$store.state.count);
                this.$message(String(this.$store.state.count));
            },
            addCount() {
                this.$store.commit(SET_COUNT, { count: this.$store.count + 1 });
            },
            index() {
                this.$router.push('/index/home');
            }
        }
    };
</script>

<style lang="scss" scoped>
    .index {
        span {
            color: #00c4a7;
        }
    }
</style>
