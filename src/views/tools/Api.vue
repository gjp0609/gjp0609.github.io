<template>
    <div>
        <!--        <el-row class="switchRow">-->
        <!--            Mode Switch:&emsp;-->
        <!--            <el-switch v-model="type" active-color="#13ce66" inactive-color="#ff4949"></el-switch>-->
        <!--        </el-row>-->
        <el-row class="search" type="flex">
            <el-col class="code">
                <el-input v-model="code" placeholder="查询请输入编码" @focus="type = false"></el-input>
            </el-col>
            <el-col class="button">
                <el-button v-if="type" type="primary" @click="saveText">保存</el-button>
                <el-button v-else type="success" @click="getText">查询</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-input v-model="content" :autosize="{ minRows: 30 }" type="textarea" placeholder="保存请输入内容" @focus="type = true"></el-input>
        </el-row>
    </div>
</template>

<script>
    import service from '../../api';

    export default {
        name: 'Api',
        data() {
            return {
                type: false,
                code: '',
                content: ''
            };
        },
        methods: {
            getText() {
                let _this = this;
                service.get('/api/' + _this.code).then((res) => {
                    _this.content = res.data;
                });
            },
            saveText() {
                let _this = this;
                service
                    .put('/api', _this.content, {
                        headers: {
                            'Content-Type': 'text/plain'
                        }
                    })
                    .then((res) => {
                        _this.code = res.data;
                    });
            }
        }
    };
</script>

<style lang="scss" scoped>
    .el-row {
        &.switchRow {
            display: flex;
            justify-content: flex-end;
            margin-bottom: 10px;
        }
        &.search {
            margin-bottom: 10px;

            .code {
                display: flex;
                width: 100%;
            }
            .button {
                display: flex;
                width: 80px;
                justify-content: flex-end;
            }
        }
    }
</style>
