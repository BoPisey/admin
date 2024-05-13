<template>
  <CRow>
    <CCol>
      <CCard>
        <CCardHeader class="header">
          Customer
          <div v-if="!loading"  class="d-grid gap-2 d-md-flex justify-content-md-end">
            <CButton color="primary" @click="handleClick">Create</CButton>
          </div>
        </CCardHeader>

        <CCardBody>
          <div v-if="loading" class="d-grid gap-2 d-md-flex justify-content-md-center">
            <!-- Vue Spinner Growing component -->
            <CButton color="primary" disabled>
             <CSpinner as="span" size="sm" variant="grow" aria-hidden="true" />
             Loading... 
            </CButton>
          </div>
          <div v-else>
            <input type="text" v-model="searchKey" placeholder="Search by name or phone number" class="search-input">
            <table class="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone Number</th>
                  <th>Score</th>
                  <th>Address</th>
                  <th>Registration Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(customer, index) in filteredCustomers" :key="index">
                  <td>{{ customer.name }}</td>
                  <td>{{ customer.phone }}</td>
                  <td>{{ customer.score }}</td>
                  <td>{{ customer.address }}</td>
                  <td>{{ formatDate(customer.created_at) }}</td>
                  <td>
                    <CButton color="danger" @click="deleteCustomer(customer.id)">Delete</CButton>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- Display message if available -->
          <p v-if="message" class="message">{{ message }}</p>

        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
// Import CoreUI components
import { CRow, CCol, CCard, CCardHeader, CCardBody, CButton } from '@coreui/vue';
import axios from 'axios';

export default {
  components: {
    CRow,
    CCol,
    CCard,
    CCardHeader,
    CCardBody,
    CButton

  },
  data() {
    return {
      customers: [], // Initialize customers data array
      filteredCustomers: [], // Initialize filtered customers array
      searchKey: '', // Initialize search key
      loading: false // Initialize loading state
    };
  },
  async mounted() {
    this.loading = true; // Set loading state to true before fetching data
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
      this.message = response.message;
      this.loading = false; // Set loading state to false after data is fetched
    } catch (error) {
      console.error('Error fetching customers data:', error);
      this.loading = false; // Set loading state to false if there's an error
    }
  },
  methods: {
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString();
    },
    async deleteCustomer(customerId) {
      try {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
          throw new Error('Access token not found');
        }
        await axios.delete(`http://localhost:3046/api/customers/${customerId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          }
        });
        // Filter out the deleted customer from the customers array
        this.customers = this.customers.filter(customer => customer.id !== customerId);
      } catch (error) {
        console.error('Error deleting customer:', error);
      }
    },
    handleClick() {
      this.$router.push({ path: '/customer/create' });

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
.message {
  color: green;
  /* You can adjust the color as needed */
}
</style>
