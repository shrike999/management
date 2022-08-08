<template>
<div id="big">
  <el-row :gutter="24">
    <el-col :span="8">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span id="title">个人资料</span>
          <img src="../assets/user.png" alt="头像" id="profilePic">
          <p>shrike999</p>
        </div>
        <div id="occupation">{{userClass}}</div>
        <div id="school">北京理工大学</div>
      </el-card>
      <el-card style="margin-top: 20px; border-radius: 20px;">
        <el-table
          :data="tableData"
          height="auto">
          <el-table-column
            fixed
            prop="subject"
            label="类目"
            width="auto">
          </el-table-column>
          <el-table-column
            prop="today"
            label="今日/h"
            width="auto">
          </el-table-column>
          <el-table-column
            prop="thisMonth"
            label="本月/h"
            width="auto">
          </el-table-column>
          <el-table-column
            prop="total"
            label="总记/h"
            width="auto">
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16">
      <div class="cards">
        <el-card v-for="data in countData" :key="data.icon" class="card">
          <div class="detail">
            <i :class="data.icon" class="icon"></i>
            <div>{{data.value}}</div>
            <div>{{data.name}}</div>
          </div>
        </el-card>
      </div>
      <el-card class="lineChart">
        <div id="lineC" style="height:240px;"></div>
      </el-card>
      <div class="feet">
        <el-card class="foot">
          <div id="bar" style="height:200px;"></div>
        </el-card>
        <el-card class="foot">
          <div id="pie" style="height:180px;"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</div>
</template>

<script type="text/javascript">
import * as echarts from 'echarts'
export default {
  name: 'Home',
  data(){
    return {
      tableData: [
        {
          subject:'HTML',
          today: 1,
          thisMonth: 7,
          total: 100
        },
        {
          subject:'CSS',
          today: 2,
          thisMonth: 8,
          total: 123
        },
        {
          subject:'JacaScript',
          today: 1,
          thisMonth: 2,
          total: 300,
        },
        {
          subject:'Algorithm',
          today: 1.5,
          thisMonth: 13,
          total: 100
        },
        {
          subject:'Vue',
          today: 3,
          thisMonth: 20,
          total: 70
        },
        {
          subject:'Project',
          today: 4,
          thisMonth: 36,
          total: 50
        },
      ],
      countData: [
        {
          name: '今日学习时长',
          value: 4,
          icon: 'el-icon-tickets'
        },
        {
          name: '今日操作时长',
          value: 4,
          icon: 'el-icon-edit-outline'
        },
        {
          name: '今日复习时长',
          value: 2,
          icon: 'el-icon-paperclip'
        },
        {
          name: '本月学习时长',
          value: 130,
          icon: 'el-icon-tickets'
        },
        {
          name: '本月操作时长',
          value: 100,
          icon: 'el-icon-edit-outline'
        },
        {
          name: '本月复习时长',
          value: 50,
          icon: 'el-icon-paperclip'
        },
      ]
    }
  },
  mounted(){
    //
    this.$axios.get('http://localhost:3000/list')
    .then((response)=>{
      console.log('response:', response);
      let keyArr = []
      let series = []
      console.log(response.data);
      keyArr = Object.keys(response.data[0])
      keyArr.forEach((key)=>{
        series.push({
          name: key,
          type: 'line',
          data: response.data.map(item => item[key])
        })
      })
      let lineChart = echarts.init(document.getElementById('lineC'))
      const optionLine = {
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: keyArr
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
        },
        yAxis: {
          type: 'value'
        },
        series: series
      };
      lineChart.setOption(optionLine)
    })
    .catch((error)=>{
      console.log('error', error)
    });

    //
    this.$axios.get('http://localhost:3000/weekly')
    .then((response)=>{
      let lastWeek = response.data.lastWeek
      let thisWeek = response.data.thisWeek
      //柱状图
      let barChart = echarts.init(document.getElementById('bar'))
      let optionBar = {
        title: {
          text: '',
          subtext: ''
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['上周', '本周']
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { show: false, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: false },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            // prettier-ignore
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '上周',
            type: 'bar',
            data: lastWeek,
            markLine: {
              data: [{ type: 'average', name: 'Avg' }]
            }
          },
          {
            name: '本周',
            type: 'bar',
            data: thisWeek,
            markLine: {
              data: [{ type: 'average', name: 'Avg' }]
            }
          }
        ]
      };
      barChart.setOption(optionBar)
    })
    .catch((error)=>{
      console.log('error', error)
    });
    //
    this.$axios.get('http://localhost:3000/total')
    .then((response)=>{
      let data = response.data
      console.log(data);
      let pieChart = echarts.init(document.getElementById('pie'))
      let optionPie = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: data
          }
        ]
      };
      optionPie && pieChart.setOption(optionPie)
    })
    .catch((error)=>{
      console.log('error', error)
    })
  },
  computed: {
    userClass(){
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box-card{
  margin-top: 20px;
  border-radius: 20px;
}
.cards{
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: space-around;
}
.detail{
  display: flex;
  align-items: center;
  gap: 20px;
}
.card{
  border-radius: 10px;
  width: 250px;
}
.icon{
  background-color: #FFBF68;
}
.lineChart{
  height: 260px;
  margin: 20px;
  border-radius: 20px;
}
.feet{
  margin: 20px;
  display: flex;
  justify-content: space-between;
}
.foot{
  width: 400px;
  height: 180px;
  border-radius: 20px;
}
#profilePic{
  width:50px;
  float: right;
}
.clearfix{
  height: 60px;
}
#occupation{
  font-size: 20px;
}
#school{
  margin-top: 5px;
  font-size: 10px;
  color: #999;
}
#title{
  color: #999;
  font-size: 18px;
}
#big{
  max-width: 1553px;
}
</style>
