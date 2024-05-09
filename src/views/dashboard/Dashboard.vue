<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue'
import { CChart } from '@coreui/vue-chartjs'
import { getStyle } from '@coreui/utils'
import { useStore } from 'vuex'; // Import useStore hook from Vuex

const widgetChartRef1 = ref()
const widgetChartRef2 = ref()
const registeredUsers = ref(0);
const customers = ref(0);
const totalPurchases = ref(0);

const store = useStore(); 

onMounted(async () => {
  try {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Access token not found');
    }
    const response = await axios.get('http://localhost:3046/api/dashboard', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    });
    const data = response.data;
    registeredUsers.value = data.registeredUsers;
    customers.value = data.customers;
    totalPurchases.value = data.totalPurchases;
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
  }

  document.documentElement.addEventListener('ColorSchemeChange', () => {
    if (widgetChartRef1.value) {
      widgetChartRef1.value.chart.data.datasets[0].pointBackgroundColor = getStyle('--cui-primary')
      widgetChartRef1.value.chart.update()
    }

    if (widgetChartRef2.value) {
      widgetChartRef2.value.chart.data.datasets[0].pointBackgroundColor = getStyle('--cui-info')
      widgetChartRef2.value.chart.update()
    }
  })
})
</script>

<template>
  <CRow :xs="{ gutter: 4 }">
    <CCol :sm="6" :xl="4" :xxl="3">
      <CWidgetStatsA color="primary">
        <!-- Display registered users -->
        <template #value>
          {{ registeredUsers }}
        </template>
        <template #title>Registered Users</template>
        <!-- Other template content -->
      </CWidgetStatsA>
    </CCol>
    <CCol :sm="6" :xl="4" :xxl="3">
      <CWidgetStatsA color="info">
        <!-- Display customers -->
        <template #value>
          {{ customers }}
        </template>
        <template #title>Customers</template>
        <!-- Other template content -->
      </CWidgetStatsA>
    </CCol>
    <CCol :sm="6" :xl="4" :xxl="3">
      <CWidgetStatsA color="warning">
        <!-- Display total purchases -->
        <template #value>
          {{ totalPurchases }}
        </template>
        <template #title>Total Purchases</template>
        <!-- Other template content -->
      </CWidgetStatsA>
    </CCol>
  </CRow>
</template>
