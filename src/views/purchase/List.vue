<template>
  <CRow>
    <CCol>
      <CCard>
        <CCardHeader class="header">Purchase</CCardHeader>
        <CCardBody>
          <div>
            <input type="text" v-model="searchKey" placeholder="Search by name or phone number" class="search-input">

            <table class="table">
              <thead>
                <tr>
                  <th>Customer Information</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(purchase, index) in filteredpurchase" :key="index">
                  <td>{{ purchase.customer.name }} | {{ purchase.customer.phone }}</td>
                  <td>{{ purchase.amount | Number }} USD</td>
                  <td>{{ formatDate(purchase.created_at) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
// Import CoreUI components
import axios from 'axios';
import { CRow, CCol, CCard, CCardHeader, CCardBody } from '@coreui/vue';

export default {
  components: {
    CRow,
    CCol,
    CCard,
    CCardHeader,
    CCardBody
  },
  data() {
    return {
      purchase: [], // Initialize purchase data array
      searchKey: '', // Initialize search key
    };
  },
  async mounted() {
    await this.fetchpurchase(); // Fetch purchase data on component mount
  },
  methods: {
    async fetchpurchase() {
      try {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
          throw new Error('Access token not found');
        }
        const response = await axios.get('http://localhost:3046/api/puchases', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            key: this.searchKey // Pass search key as a query parameter
          }
        });
        this.purchase = response.data.data; // Assign fetched data to purchase array
        console.log(this.purchase);
      } catch (error) {
        console.error('Error fetching purchase data:', error);
      }
    },
    formatDate(date) {
      // Function to format date
      return new Date(date).toLocaleDateString();
    }
  },
  watch: {
    // Watch for changes in search key and fetch purchase accordingly
    searchKey(newVal) {
      this.fetchpurchase();
    }
  },

  computed: {
    filteredpurchase() {
      // Check if this.purchase is defined before filtering
      if (!Array.isArray(this.purchase)) {
        return [];
      }
      // Filter purchase based on search key
      return this.purchase.filter(customer =>
        (customer.customer.name ?? '').toLowerCase().includes(this.searchKey.toLowerCase()) ||
        (customer.customer.name ?? '').toLowerCase().includes(this.searchKey.toLowerCase())
      );
    }
  }


};
</script>

<style scoped>
.search-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  border: 1px solid #e5e3e3;
  padding: 8px;
}

.table th {
  background-color: #f0f0f0;
  text-align: left;
}
</style>