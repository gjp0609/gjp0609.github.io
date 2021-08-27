<template>
    <div class="echarts">
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

let myChart
export default {
    name: 'ECharts',
    data() {
        return {
            listText: ''
        }
    },
    mounted() {
        let chartDom = document.getElementById('main')
        myChart = echarts.init(chartDom)
        this.listText = localStorage.getItem('ECharts_listText')
        if (this.listText) {
            this.exec()
        }
    },
    methods: {
        exec() {
            let json
            try {
                json = JSON.parse(this.listText)
            } catch (e) {
                json = []
            }
            let xAxisData = []
            let series = []
            if (Array.isArray(json)) {
                if (typeof json[0] === 'number') {
                    let seriesData = []
                    for (let i = 0; i < json.length; i++) {
                        xAxisData.push(i)
                        seriesData.push(json[i])
                    }
                    series.push({
                        data: seriesData,
                        type: 'line'
                    })
                } else if (typeof json[0] === 'object' && Array.isArray(json[0])) {
                    let maxLength = 0
                    for (let i = 0; i < json.length; i++) {
                        let seriesData = []
                        for (let j = 0; j < json[i].length; j++) {
                            seriesData.push(json[i][j])
                            maxLength = maxLength < j ? j : maxLength
                        }
                        series.push({
                            name: 'list' + i,
                            data: seriesData,
                            type: 'line'
                        })
                    }
                    for (let i = 0; i < maxLength; i++) {
                        xAxisData.push(i)
                    }
                }
            } else {
                let maxLength = 0
                let data = json.data
                let tags = json.tags
                for (const key in data) {
                    series.push({
                        name: key,
                        type: 'line',
                        data: data[key]
                    })
                    let length = data[key].length || 0
                    maxLength = maxLength < length ? length : maxLength
                }
                if (!tags) {
                    for (let i = 0; i < maxLength; i++) {
                        xAxisData.push(i)
                    }
                } else {
                    xAxisData = tags
                }
            }
            let legendData = []
            for (const item of series) {
                legendData.push(item.name)
            }
            let option = {
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: legendData
                },
                xAxis: {
                    type: 'category',
                    data: xAxisData
                },
                yAxis: {
                    type: 'value'
                },
                series: series
            }
            myChart.setOption(option)
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
