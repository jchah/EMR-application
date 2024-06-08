<template>
  <div class="container mt-5">
    <div class="columns is-centered">
      <div class="column is-half">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title has-text-centered">
              Doctor Login to EMR
            </p>
          </header>
          <div class="card-content">
            <form @submit.prevent="login">
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
                <label class="label" for="role">Role</label>
                <div class="control">
                </div>
              </div>
              <!-- Success and Error Messages -->
              <div v-if="successMessage" class="notification is-success">{{ successMessage }}</div>
              <div v-if="errorMessage" class="notification is-danger">{{ errorMessage }}</div>
              <div class="control">
                <button type="submit" class="button is-primary is-fullwidth">Login</button>
              </div>
            
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container mt-5">
    <div class="columns is-centered">
      <div class="column is-half">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title has-text-centered">
              Patient Login to EMR
            </p>
          </header>
          <div class="card-content">
            <form @submit.prevent="login">
              <div class="field">
                <label class="label" for="email">Healthcard ID</label>
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
                <label class="label" for="role">Role</label>
                <div class="control">
                </div>
              </div>
              <!-- Success and Error Messages -->
              <div v-if="successMessage" class="notification is-success">{{ successMessage }}</div>
              <div v-if="errorMessage" class="notification is-danger">{{ errorMessage }}</div>
              <div class="control">
                <button type="submit" class="button is-primary is-fullwidth">Login</button>
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
        role: 'user'
      },
      successMessage: '',
      errorMessage: ''
    };
  },
  methods: {
    async login() {
      this.successMessage = '';
      this.errorMessage = '';
      try {
        const response = await fetch('http://localhost:3000/user/signin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.account)
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data.result);
          this.successMessage = 'Login successful!';
          localStorage.setItem("user", JSON.stringify(data.result));
          localStorage.setItem("token", data.token);
          setTimeout(() => {
            window.location = ('/')

          }, 1000); // Redirect after 1 second to dashboard
        } else {
          const data = await response.json();
          this.errorMessage = data.message || 'Failed to login.';
        }
      } catch (error) {
        console.error('Error:', error);
        this.errorMessage = 'Something went wrong. Please try again later.';
      }
    }
  }
};
</script>
