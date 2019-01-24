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
        >Tobias</v-tab>
        <v-tab
          :key="3"
          :href="`#tab-3`"
        >Jakob</v-tab>
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
              <line-chart :chart-labels="labels" :chart-data="data"></line-chart>
            </v-layout>
          </v-flex>
          <v-flex xs6>
            <v-layout justify-center>
              <line-chart :chart-labels="labels" :chart-data="data"></line-chart>
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
              <line-chart :chart-labels="labels" :chart-data="data"></line-chart>
            </v-layout>
          </v-flex>
          <v-flex xs6>
            <v-layout justify-center>
              <line-chart :chart-labels="labels" :chart-data="data"></line-chart>
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
              <line-chart :chart-labels="labels" :chart-data="data"></line-chart>
            </v-layout>
          </v-flex>
          <v-flex xs6>
            <v-layout justify-center>
              <line-chart :chart-labels="labels" :chart-data="data"></line-chart>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import LineChart from './LineChart.vue';

export default {

  name: 'Tabs',
  components: {
    LineChart,
  },
  data() {
    return {
      labels: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
      data: [5, 4, 34, 32, 21, 10, 5, 4, 34, 32, 21, 10, 5, 4, 34, 32, 21, 10],
      active_tab: 'tab-1',
    };
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
