<template>
  <CRow>
    <CCol>
      <CCard>
        <CCardHeader class="header"> Create New Purchase</CCardHeader>
        <CCardBody>
          <div>
            <div class="customer-search-container">
              <input type="text" list="customerOptions" v-model="selectedCustomerName" @input="updateSelectedCustomerId" style="border: 1px solid #ccc;"
                placeholder="Search customers by name or phone number" class="custom-input" />
              <datalist id="customerOptions">
                <option v-for="customer in filteredCustomers" :key="customer.id" :value="customer.name"></option>
              </datalist>
            </div>

            <div class="custom-input"></div>
            <!-- Input for Purchase Amount -->
            <CFormInput type="number" size="lg" v-model="purchaseAmount" placeholder="Amount" required
              class="custom-input" />
            <!-- Submit Button -->

            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
              <CButton type="submit" color="primary" @click="createPurchase" class="custom-button">Create</CButton>

            </div>
            <!-- Display message if available -->
            <p v-if="message" class="message">{{ message }}</p>
          </div>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import { CRow, CCol, CCard, CCardHeader, CCardBody, CButton, CFormInput } from '@coreui/vue';

import axios from 'axios';

export default {
  components: {
    CRow,
    CCol,
    CCard,
    CCardHeader,
    CCardBody,
    CButton,
    CFormInput
  },
  data() {
    return {
      selectedCustomerName: '', // Holds the selected customer name
      selectedCustomerId: '', // Holds the selected customer ID
      purchaseAmount: '', // Holds the purchase amount
      message: '', // Holds success or error messages
      searchKey: '', // Holds the search key for filtering customers
      customers: [] // Holds the list of customers
    };
  },
  async mounted() {
    await this.fetchCustomers(); // Fetch customers when the component is mounted
  },
  methods: {
    async fetchCustomers() {
      try {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
          throw new Error('Access token not found');
        }
        const response = await axios.get('http://localhost:3046/api/puchases/customer', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        this.customers = response.data;
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    },
    updateSelectedCustomerId() {
      const selectedCustomer = this.customers.find(customer => customer.name === this.selectedCustomerName);
      if (selectedCustomer) {
        this.selectedCustomerId = selectedCustomer.id;
      }
    },
    async createPurchase() {
      try {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
          throw new Error('Access token not found');
        }
        const response = await axios.post('http://localhost:3046/api/puchases/create', {
          customer_id: this.selectedCustomerId,
          amount: this.purchaseAmount,
        }, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });
        this.message = response.data.message;

        console.log('New purchase created:', response.data);
        // Optionally, you can navigate to another route after creating the customer
        this.$router.push({ path: '/purchase' });
      } catch (error) {
        console.error('Error creating customer:', error);
      }
    }
  },
  computed: {
    filteredCustomers() {
      if (!this.searchKey) {
        return this.customers;
      }
      const searchKeyLowerCase = this.searchKey.toLowerCase();
      return this.customers.filter(customer =>
        customer.name.toLowerCase().includes(searchKeyLowerCase) ||
        customer.phone.toLowerCase().includes(searchKeyLowerCase)
      );
    }
  }
};
</script>

<style scoped>
.custom-button {
  margin-top: 10px;
}

.message {
  color: green;
}

.custom-input {
  padding-bottom: 10px !important;

}

.customer-search-container {
  position: relative;
  /* max-width: 400px; */
  margin: 0 auto;
}

.custom-input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  /* border: 1px solid #ccc; */
  border-radius: 5px;
  transition: border-color 0.3s;
}

.custom-input:focus {
  border-color: #928df2;
  outline: none;
  box-shadow: 0 0 8px rgba(124, 119, 235, 0.6);
}

.datalist {
  display: none;
}

.datalist option {
  padding: 8px;
  font-size: 16px;
  background: #fff;
  border-bottom: 1px solid #ccc;
}
</style>
