<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h2 class="text-center">Create Account</h2>
          </div>
          <div class="card-body">
            <form @submit.prevent="login">
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
                <button type="submit" class="btn btn-primary">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  name: 'AccountForm',
  data() {
    return {
      account: {
        email: '',
        password: '',
        role: 'user'
      },
      successMessage: '',
      errorMessage: ''
    };
  },
  methods: {
    async login(e) {
      e.preventDefault();
      this.successMessage = '';
      this.errorMessage = '';
      try {
        const response = await fetch('http://localhost:3000/user/signin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.account)
        });
        if (response.ok) {
          this.successMessage = 'Login successful!';
          
          const {result, token} = await response.json();
          localStorage.setItem("user", result);
          localStorage.setItem("token", token);
          console.log("hi!");
          setTimeout(() => this.$router.push('/'), 1000); // Redirect after 3 seconds
        } else {
          const data = await response.json();
          this.errorMessage = data.message || 'Failed to login.';
        }
      } catch (error) {
        console.error('Error:', error);
        this.errorMessage = 'something went wrong.';
      }
    }
  }
};
</script>