<template>
  <CRow>
    <CCol>
      <CCard>
        <CCardHeader class="header"> Create New Customer</CCardHeader>
        <CCardBody>
          <div>
            <form @submit.prevent="createCustomer" class="custom-form">
              <CFormInput type="text" size="lg" v-model="customerName" placeholder="Name" required class="custom-input" />
              <CFormInput type="number" size="lg" v-model="customerPhone" placeholder="Phone" required
                class="custom-input" />

              <CFormInput type="email" size="lg" v-model="customerEmail" placeholder="name@example.com" required
                class="custom-input" />
              <CFormInput type="text" size="lg" v-model="customerAddress" placeholder="Address" class="custom-input" />

              <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <CButton type="submit" color="primary" class="custom-button">Create</CButton>
              </div>
            </form>
            <!-- Display message if available -->
            <p v-if="message" class="message">{{ message }}</p>
          </div>

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
      customerName: '',
      customerPhone: '',
      customerEmail: '',
      customerAddress: ''
    };
  },
  methods: {
    async createCustomer() {
      try {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
          throw new Error('Access token not found');
        }

        const response = await axios.post('http://localhost:3046/api/customers/create', {
          name: this.customerName,
          phone: this.customerPhone,
          email: this.customerEmail,
          address: this.customerAddress
        }, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });
        this.message = response.data.message;

        console.log('New customer created:', response.data);
        // Optionally, you can navigate to another route after creating the customer
        this.$router.push({ path: '/customer' });
      } catch (error) {
        console.error('Error creating customer:', error);
      }
    }
  }
};
</script>

<style>
.custom-form {
  margin: auto;
}

.custom-input {
  margin-bottom: 10px;
}

.message {
  color: green;
  /* You can adjust the color as needed */
}</style>