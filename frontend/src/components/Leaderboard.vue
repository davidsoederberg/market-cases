<template>
  <v-container>
    <v-layout
      text-xs
      justify-center
    align="center">
      <v-data-table :headers="mainHeaders"
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
            <td class="text-lg-center" :class="{ 'negative': props.item.today < 0,
            'positive': props.item.today > 0}">{{ props.item.today }}%</td>

          </tr>
        </template>
      </v-data-table>
    </v-layout>
  </v-container>
</template>

<script>
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
        {
          align: 'center', text: 'Dags', value: 'today', width: 150,
        },
      ],
      mainItems: [
        { name: 'David Söderberg', index: 2.02, today: 0.01 },
        { name: 'Jakob Häger', index: -5.43, today: -0.01 },
        { name: 'David Söderberg', index: 2.02, today: 0.01 },
        { name: 'Jakob Häger', index: -5.43, today: -0.01 },
        { name: 'David Söderberg', index: 2.02, today: 0.01 },
        { name: 'Jakob Häger', index: -5.43, today: -0.01 },
      ],
    };
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
