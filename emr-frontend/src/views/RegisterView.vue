<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h2 class="text-center">Create Account</h2>
          </div>
          <div class="card-body">
            <form @submit.prevent="createAccount">
              <div class="mb-3">
                <label for="email" class="form-label">email:</label>
                <input type="email" class="form-control" id="email" v-model="account.email"
                  required>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password:</label>
                <input type="password" class="form-control" id="password" v-model="account.password" required>
              </div>
              <div class="mb-3">
                <label for="firstName" class="form-label">firstName:</label>
                <input type="text" class="form-control" id="firstName" v-model="account.firstName" required>
              </div>
              <div class="mb-3">
                <label for="lastName" class="form-label">lastName:</label>
                <input type="text" class="form-control" id="lastName" v-model="account.lastName" required>
              </div>
              <div class="mb-3">
                <label for="role" class="form-label">Role:</label>
                <select class="form-control" id="role" v-model="account.role" required>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <!-- Success and Error Messages -->
              <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>
              <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
              <div class="d-grid">
                <button type="submit" class="btn btn-primary">Create Account</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AccountForm',
  data() {
    return {
      account: {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        role: 'user'
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
        const response = await fetch('http://localhost:3000/user/signup', {
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
        this.errorMessage = 'Failed to create account.';
      }
    }
  }
};
</script>