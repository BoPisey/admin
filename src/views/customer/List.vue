<template>
  <CRow>
    <CCol>
      <CCard>
        <CCardHeader class="header">Customer</CCardHeader>
        <CCardBody>
          <div>
            <input type="text" v-model="searchKey" placeholder="Search by name or phone number" class="search-input">
            <table class="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone Number</th>
                  <th>Score</th>
                  <th>Registration Date</th>
                  <th>Address</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(customer, index) in filteredCustomers" :key="index">
                  <td>{{ customer.name }}</td>
                  <td>{{ customer.phone }}</td>
                  <td>{{ customer.score }}</td>
                  <td>{{ formatDate(customer.created_at) }}</td>
                  <td>{{ customer.address }}</td>
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
      customers: [], // Initialize customers data array
      searchKey: '', // Initialize search key
    };
  },
  async mounted() {
    try {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        throw new Error('Access token not found');
      }
      const response = await axios.get('http://localhost:3046/api/customers', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      });
      this.customers = response.data.data; // Assign fetched data to customers array
    } catch (error) {
      console.error('Error fetching customers data:', error);
    }
  },
  methods: {
    formatDate(dateString) {
      
      return new Date(dateString).toLocaleDateString();
    }
  },
  computed: {
    filteredCustomers() {
      // Filter customers based on search key
      return this.customers.filter(customer =>
        customer.name.toLowerCase().includes(this.searchKey.toLowerCase()) ||
        customer.phone.toLowerCase().includes(this.searchKey.toLowerCase())
      );
    }
  },
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
