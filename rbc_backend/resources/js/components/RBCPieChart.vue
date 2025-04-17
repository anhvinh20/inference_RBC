// components/RBCPieChart.vue
<template>
  <div class="chart-container">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import Chart from 'chart.js/auto';

export default {
  name: 'RBCPieChart',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const chartCanvas = ref(null);
    let chart = null;
    
    const colors = {
      'T': '#FF6384',
      'SG': '#36A2EB',
      'Others': '#FFCE56',
      'Diff': '#4BC0C0'
    };
    
    const createChart = () => {
      if (!chartCanvas.value) return;
      
      const ctx = chartCanvas.value.getContext('2d');
      const labels = Object.keys(props.data);
      const values = Object.values(props.data);
      const backgroundColors = labels.map(label => colors[label] || '#' + Math.floor(Math.random()*16777215).toString(16));
      
      chart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels,
          datasets: [{
            label: 'Số lượng tế bào',
            data: values,
            backgroundColor: backgroundColors,
            borderColor: 'white',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'right',
              labels: {
                font: {
                  size: 14
                }
              }
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const label = context.label || '';
                  const value = context.raw || 0;
                  const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                  const percentage = Math.round((value / total) * 100);
                  return `${label}: ${value} (${percentage}%)`;
                }
              }
            }
          }
        }
      });
    };
    
    const updateChart = () => {
      if (!chart) {
        createChart();
        return;
      }
      
      const labels = Object.keys(props.data);
      const values = Object.values(props.data);
      
      chart.data.labels = labels;
      chart.data.datasets[0].data = values;
      chart.update();
    };
    
    onMounted(() => {
      createChart();
    });
    
    watch(() => props.data, () => {
      updateChart();
    }, { deep: true });
    
    return {
      chartCanvas
    };
  }
};
</script>

<style scoped>
.chart-container {
  position: relative;
  height: 300px;
  width: 100%;
}
</style>