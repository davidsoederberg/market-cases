<template>
  <v-container>
    <v-layout
      text-xs
      justify-center
      padding-bottom>
      <v-tabs
        slider-color="teal"
        centered
        v-model="active_tab">
        <v-tab v-for="index in 6"
          :key="index"
          :href="`#tab-${index}`"
        >{{names[index - 1]}}</v-tab>
      </v-tabs>
    </v-layout>
    <v-tabs-items v-model="active_tab">
      <v-tab-item
        v-for="index in 6" :value="`tab-${index}`"
        :key="`${index}`"
      >
        <v-layout justify-center>
          <line-chart v-if="loaded" :options="options" :chart-labels="labels[index - 1]" :chart-data="data[index - 1]"></line-chart>
        </v-layout>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import axios from 'axios';
import LineChart from './LineChart.vue';

export default {

  name: 'Tabs',
  components: {
    LineChart,
  },
  data() {
    return {
      names: ["David", "Jakob", "Tobias", "Linus", "Oscar", "Andreas"],
      labels: [[], [], [], [], [], []],
      data: [[], [], [], [], [], []],
      labelsIntraday: [[],[],[],[],[],[]],
      dataIntraday: [[],[],[],[],[],[]],
      loaded: false,
      active_tab: 'tab-1',
      options: {
        scales: {
          yAxes: [{
            ticks: {
              callback(value, index, values) {
                return `${value}%`;
              },
            },
            gridLines: {
              display: true,
            },
          }],
          xAxes: [{
            gridLines: {
              display: false,
            },
          }],
        },
        legend: {
          display: false,
        },
        responsive: false,
        maintainAspectRatio: true,
        title: {
          display: true,
          text: 'YTD',
        }
      },
      options2: {
        scales: {
          yAxes: [{
            ticks: {
              callback(value, index, values) {
                return `${value}%`;
              },
            },
            gridLines: {
              display: true,
            },
          }],
          xAxes: [{
            gridLines: {
              display: false,
            },
          }],
        },
        legend: {
          display: false,
        },
        responsive: false,
        maintainAspectRatio: true,
        title: {
          display: true,
          text: 'Intraday',
        }
      },
    };
  },
  methods: {
    requestData() {
      axios.get('/api/user')
        .then((response) => {
          for(let i = 0; i<6; i++) {
            this.labels[i].push("2019/01/01");
            this.data[i].push(0);
            this.labelsIntraday[i].push("");
            this.dataIntraday[i].push(0);
          }
          response.data.forEach((data, index) => {
            data.dayData.forEach((dayData) => {
              this.labels[index].push(dayData.day);
              this.data[index].push(`${this.indexToPercent(dayData.index)}`);
            });
            /* data.intradayData.forEach((intradayData) => {
              this.labelsIntraday[index].push(intradayData.time);
              this.dataIntraday[index].push(`${this.indexToPercent(intradayData.index) - this.indexToPercent(data.dayData[data.dayData.length - 1].index)}`);
            }); */
          });
          this.loaded = true;
        });
    },
    indexToPercent(index) {
      return Number((index - 100).toFixed(2));
    },
  },
  mounted() {
    this.requestData();
  },
};
</script>

<style scoped>
  .padding-bottom {
    padding-bottom: 1em;
  }
  .margin-auto {
    margin: auto;
  }
</style>
