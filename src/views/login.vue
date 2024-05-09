<script setup>
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';
import { reactive } from 'vue';
import { onMounted, ref } from 'vue'
import Button from '@/components/Button.vue'
import useMouseClick from '@/composables/useMouseClick'
import api from '@/api'
import { useStore } from '@/store'

const store = useStore()
const mouse = useMouseClick()

const sentence = ref('')

async function fetchSentence() {
  sentence.value = await api.oneSentence()
}

onMounted(() => {
  fetchSentence()
})
</script>

<template >
  <div class="container">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit">Login</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>


<script>
// Import necessary modules
import { reactive } from 'vue';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';

export default {
  // Component options
  data() {
    return {
      username: '',
      password: '',
      error: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await fetch('http://localhost:3046/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password
          })
        });

        if (response.ok) {
          const data = await response.json();
          // Save access token and user data to local storage
          localStorage.setItem('access_token', data.data.access_token);
          localStorage.setItem('user', JSON.stringify(data.data.user));
          // Redirect to the dashboard or home page upon successful login
          this.$router.push({ path: '/dashboard' }); // Use path instead of name
        } else {
          // Display error message if login fails
          const data = await response.json();
          this.error = data.message || 'Login failed'; // Default message if server doesn't provide one
        }
      } catch (error) {
        console.error('Login failed:', error);
        this.error = 'An error occurred while logging in.';
      }
    }
  },
  created() {
    // HTTP connection to the API
    const httpLink = createHttpLink({
      uri: 'http://localhost:3020/graphql',
    });

    // Cache implementation
    const cache = new InMemoryCache();

    // Create the apollo client
    this.apolloClient = new ApolloClient({
      link: httpLink,
      cache,
    });
  },
  beforeUnmount() {
    // Cleanup code, if needed
    // For example, disconnecting subscriptions
  }
}
</script>

<style>
/* Style for the form container */
.container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 15%;
}

/* Style for form inputs */
input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 3px;
}

/* Style for the login button */
button[type="submit"] {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

/* Style for error message */
.error {
  color: red;
  margin-top: 10px;
}

/* Style for the login form header */
h2 {
  text-align: center;
  margin-bottom: 20px;
}
</style>

