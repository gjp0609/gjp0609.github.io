<template>
    <div class="echarts">
        <el-row class="options">

        </el-row>
        <el-row class="chart">
            <div id="main" :style="'height: '+height+'px'"></div>
        </el-row>
        <el-row class="value">
            <el-input v-model="listText" :rows="10" type="textarea" @input="exec"></el-input>
        </el-row>
    </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
    name: 'ECharts',
    data() {
        return {
            listText: '',
            type: 1,
            myChart: undefined
        }
    },
    mounted() {
        let chartDom = document.getElementById('main')
        this.myChart = echarts.init(chartDom)
        this.listText = localStorage.getItem('ECharts_listText')
        if (this.listText) {
            this.exec()
        }
    },
    methods: {
        exec() {
            let option
            switch (this.type) {
                case 1:
                    let json
                    try {
                        json = JSON.parse(this.listText)
                    } catch (e) {
                        json = []
                    }
                    let xAxisData = [], seriesData = []
                    for (let i = 0; i < json.length; i++) {
                        xAxisData.push(i)
                        seriesData.push(json[i])
                    }
                    option = {
                        xAxis: {
                            type: 'category',
                            data: xAxisData
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [{
                            data: seriesData,
                            type: 'line',
                            smooth: true
                        }]
                    }
                    break
            }
            this.myChart.setOption(option)
            localStorage.setItem('ECharts_listText', this.listText)
        }
    }
}
</script>

<style lang="scss" scoped>
.echarts {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .el-row {
        &.options {
            height: 100px;
        }
        &.value {
            flex: 0 1 auto;
        }
        &.chart {
            flex: 1 1 auto;
            display: flex;
            flex-direction: column;
            #main {
                flex: 1 1;
                width: 100%;
            }
        }
    }
}
</style>
