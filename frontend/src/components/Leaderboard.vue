<template>
  <v-container>
    <v-layout
      text-xs
      justify-center
    align="center">
      <v-data-table v-if="loaded" :headers="mainHeaders"
                    :items="mainItems"
                    header-key="index"
                    item-key="name"
                    must-sort
                    rows-per-page-items="6"
                    hide-actions
                    :pagination.sync="pagination"
                    class="elevation-1">
        <template slot="items" slot-scope="props">
          <tr @click="props.expanded = !props.expanded">
            <td class="text-lg-left">{{ props.item.name }}</td>
            <td class="text-lg-center" :class="{ 'negative': props.item.index < 0,
            'positive': props.item.index > 0}">{{ props.item.index }}%</td>
          </tr>
        </template>
      </v-data-table>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Leaderboard.vue',
  data() {
    return {
      pagination: {
        soryBy: 'index',
        descending: true,
      },
      mainHeaders: [
        {
          align: 'left', text: 'Namn', value: 'name', sortable: false, width: 200,
        },
        {
          align: 'center', text: 'YTD', value: 'index', width: 150,
        },
      ],
      mainItems: [],
      loaded: false,
    };
  },
  methods: {
    requestData() {
      axios.get('/api/user')
        .then((response) => {
          response.data.forEach((data) => {
            const object = {};
            object.name = data.name;
            object.index = this.indexToPercent(data.dayData[data.dayData.length - 1].index);
            // object.today = data.intradayData.length === 0 ? 0.00 : (this.indexToPercent(data.intradayData[data.intradayData.length - 1].index) - this.indexToPercent(data.dayData[data.dayData.length - 1].index)).toFixed(2);
            this.mainItems.push(object);
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
  .negative {
    color: red
  }
  .positive {
    color: green
  }

</style>
