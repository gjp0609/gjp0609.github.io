<template>
    <div>
        <el-row class="search" type="flex">
            <el-col class="code">
                <el-input v-model="code" @focus="type = false" placeholder="查询请输入编码"></el-input>
            </el-col>
            <el-col class="button">
                <el-button v-if="type" @click="saveText" type="primary">保存</el-button>
                <el-button v-else @click="getText" type="success">查询</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-input v-model="content" @focus="type = true" :autosize="{ minRows: 30 }" type="textarea" placeholder="保存请输入内容"></el-input>
        </el-row>
    </div>
</template>

<script>
    import { algorithmService } from '../../api';

    export default {
        name: 'AlgorithmApi',
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
                _this.content = '';
                algorithmService.get('/api/content/' + _this.code).then((res) => {
                    _this.content = res.data;
                });
            },
            saveText() {
                let _this = this;
                _this.code = '';
                algorithmService
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
