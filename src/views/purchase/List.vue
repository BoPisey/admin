<template>
  <CRow>
    <CCol>
      <CCard>
        <CCardHeader class="header">Purchase
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
                  <th>Customer Information</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(purchase, index) in filteredpurchase" :key="index">
                  <td>{{ purchase.customer.name }} | {{ purchase.customer.phone }}</td>
                  <td>{{ purchase.amount | Number }} USD</td>
                  <td>{{ formatDate(purchase.created_at) }}</td>
                  <td>
                    <CButton color="danger" @click="deletePurchase(purchase.id)">Delete</CButton>
                  </td>
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
import { CRow, CCol, CCard, CCardHeader, CCardBody,CButton } from '@coreui/vue';

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
      purchase: [], // Initialize purchase data array
      searchKey: '', // Initialize search key
      loading: false, // Initialize loading state
    };
  },
  
  async mounted() {
    await this.fetchpurchase(); // Fetch purchase data on component mount
  },
  methods: {
    async fetchpurchase() {
      this.loading = true; // Set loading state to true before fetching data
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
        this.loading = false; // Set loading state to false after data is fetched
      } catch (error) {
        console.error('Error fetching purchase data:', error);
        this.loading = false; // Set loading state to false if there's an error

      }
    },
    async deletePurchase(purchaseId) {
      try {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
          throw new Error('Access token not found');
        }
        await axios.delete(`http://localhost:3046/api/puchases/${purchaseId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          }
        });
        // Filter out the deleted customer from the customers array
        this.purchase = this.purchase.filter(purchase => purchase.id !== purchaseId);
      } catch (error) {
        console.error('Error deleting purchase:', error);
      }
    },
    
    formatDate(date) {
      // Function to format date
      return new Date(date).toLocaleDateString();
    },
    handleClick() {
      this.$router.push({ path: '/purchase/create' });
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
