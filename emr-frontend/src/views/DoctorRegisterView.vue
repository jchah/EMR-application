<template>
  <div class="container mt-5">
    <div class="columns is-centered">
      <div class="column is-half">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title has-text-centered">
              Create Doctor Account
            </p>
          </header>
          <div class="card-content">
            <form @submit.prevent="createAccount">
              <div class="field">
                <label class="label" for="email">Email</label>
                <div class="control">
                  <input type="email" class="input" id="email" v-model="account.email" required>
                </div>
              </div>
              <div class="field">
                <label class="label" for="password">Password</label>
                <div class="control">
                  <input type="password" class="input" id="password" v-model="account.password" required>
                </div>
              </div>
              <div class="field">
                <label class="label" for="firstName">First Name</label>
                <div class="control">
                  <input type="text" class="input" id="firstName" v-model="account.firstName" required>
                </div>
              </div>
              <div class="field">
                <label class="label" for="lastName">Last Name</label>
                <div class="control">
                  <input type="text" class="input" id="lastName" v-model="account.lastName" required>
                </div>
              </div>
              <!-- Success and Error Messages -->
              <div v-if="successMessage" class="notification is-success">{{ successMessage }}</div>
              <div v-if="errorMessage" class="notification is-danger">{{ errorMessage }}</div>
              <div class="control">
                <button type="submit" class="button is-primary is-fullwidth">Create Account</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const API_URL = 'http://localhost:3000'

export default {
  name: 'AccountForm',
  data() {
    return {
      account: {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
      },
      successMessage: '',
      errorMessage: ''
    };
  },
  methods: {
    async createAccount() {
      this.successMessage = '';
      this.errorMessage = '';
      try {
        const response = await fetch(`${API_URL}/user/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.account)
        });
        if (response.ok) {
          this.successMessage = 'Account created successfully!';
          setTimeout(() => this.$router.push('/login'), 3000); // Redirect after 3 seconds
        } else {
          const data = await response.json();
          this.errorMessage = data.message || 'Failed to create account.';
        }
      } catch (error) {
        console.error('Error:', error);
        this.errorMessage = 'Something went wrong. Please try again later.';
      }
    }
  }
};
</script>
