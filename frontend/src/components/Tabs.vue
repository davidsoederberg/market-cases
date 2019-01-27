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
        <v-tab
          :key="1"
          :href="`#tab-1`"
        >David</v-tab>
        <v-tab
          :key="2"
          :href="`#tab-2`"
        >Jakob</v-tab>
        <v-tab
          :key="3"
          :href="`#tab-3`"
        >Tobias</v-tab>
        <v-tab
          :key="4"
          :href="`#tab-4`"
        >Linus</v-tab>
        <v-tab
          :key="5"
          :href="`#tab-5`"
        >Oscar</v-tab>
        <v-tab
          :key="6"
          :href="`#tab-6`"
        >Andreas</v-tab>
      </v-tabs>
    </v-layout>
    <v-tabs-items v-model="active_tab">
      <v-tab-item
        :value="`tab-1`"
        :key="1"
      >
        <v-layout row wrap >
          <v-flex xs6>
            <v-layout justify-center>
              <line-chart v-if="loaded" :options="options" :chart-labels="labels[0]" :chart-data="data[0]"></line-chart>
            </v-layout>
          </v-flex>
          <v-flex xs6>
            <v-layout justify-center>
              <line-chart v-if="loaded" :options="options2" :chart-labels="labelsIntraday[0]" :chart-data="dataIntraday[0]"></line-chart>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-tab-item>
      <v-tab-item
        :value="`tab-2`"
        :key="2"
      >
        <v-layout row wrap >
          <v-flex xs6>
            <v-layout justify-center>
              <line-chart v-if="loaded" :options="options" :chart-labels="labels[1]" :chart-data="data[1]"></line-chart>
            </v-layout>
          </v-flex>
          <v-flex xs6>
            <v-layout justify-center>
              <line-chart v-if="loaded" :options="options2" :chart-labels="labelsIntraday[1]" :chart-data="dataIntraday[1]"></line-chart>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-tab-item>
      <v-tab-item
        :value="`tab-3`"
        :key="3"
      >
        <v-layout row wrap >
          <v-flex xs6>
            <v-layout justify-center>
              <line-chart v-if="loaded" :options="options" :chart-labels="labels[2]" :chart-data="data[2]"></line-chart>
            </v-layout>
          </v-flex>
          <v-flex xs6>
            <v-layout justify-center>
              <line-chart v-if="loaded" :options="options2" :chart-labels="labelsIntraday[2]" :chart-data="dataIntraday[2]"></line-chart>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-tab-item>
      <v-tab-item
        :value="`tab-4`"
        :key="4"
      >
        <v-layout row wrap >
          <v-flex xs6>
            <v-layout justify-center>
              <line-chart v-if="loaded" :options="options" :chart-labels="labels[3]" :chart-data="data[3]"></line-chart>
            </v-layout>
          </v-flex>
          <v-flex xs6>
            <v-layout justify-center>
              <line-chart v-if="loaded" :options="options2" :chart-labels="labelsIntraday[3]" :chart-data="dataIntraday[3]"></line-chart>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-tab-item>
      <v-tab-item
        :value="`tab-5`"
        :key="5"
      >
        <v-layout row wrap >
          <v-flex xs6>
            <v-layout justify-center>
              <line-chart v-if="loaded" :options="options" :chart-labels="labels[4]" :chart-data="data[4]"></line-chart>
            </v-layout>
          </v-flex>
          <v-flex xs6>
            <v-layout justify-center>
              <line-chart v-if="loaded" :options="options2" :chart-labels="labelsIntraday[4]" :chart-data="dataIntraday[4]"></line-chart>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-tab-item>
      <v-tab-item
        :value="`tab-6`"
        :key="6"
      >
        <v-layout row wrap >
          <v-flex xs6>
            <v-layout justify-center>
              <line-chart v-if="loaded" :options="options" :chart-labels="labels[5]" :chart-data="data[5]"></line-chart>
            </v-layout>
          </v-flex>
          <v-flex xs6>
            <v-layout justify-center>
              <line-chart v-if="loaded" :options="options2" :chart-labels="labelsIntraday[5]" :chart-data="dataIntraday[5]"></line-chart>
            </v-layout>
          </v-flex>
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
            data.intradayData.forEach((intradayData) => {
              this.labelsIntraday[index].push(intradayData.time);
              this.dataIntraday[index].push(`${this.indexToPercent(intradayData.index) - this.indexToPercent(data.dayData[data.dayData.length - 1].index)}`);
            });
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
