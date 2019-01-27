<script>
import { Line } from 'vue-chartjs';

export default {
  extends: Line,
  props: ['chartData', 'chartLabels', 'options'],
  mounted() {
    this.renderChart({
      labels: this.chartLabels,
      datasets: [
        {
          label: 'Percent',
          borderColor: '#249EBF',
          pointBackgroundColor: 'white',
          borderWidth: 1,
          pointBorderColor: '#249EBF',
          backgroundColor: 'transparent',
          pointRadius: 0,
          data: this.chartData,
        },
      ],
      title: {
        display: true,
        text: 'Test',
      }
    }, this.options);
  },
};
</script>
