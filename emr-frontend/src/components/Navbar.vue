<template>
  <nav class="navbar is-transparent" style="background-color: #eee;" role="navigation" aria-label="main navigation">

    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        <img src="../img/LogoCropped.png" alt="Logo">
      </a>
      <a role="button" class="navbar-burger" :class="{'is-active': isActive}" aria-label="menu" aria-expanded="false" @click="toggleMenu">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div class="navbar-menu" :class="{'is-active': isActive}" id="navMenu">
      <div class="navbar-start">
        <router-link v-if="token" class="navbar-item" to="/">Dashboard</router-link>
        <router-link v-if="!token" class="navbar-item" to="/search-patient">Patient Login</router-link>
        <router-link v-if="token" class="navbar-item" to="/patients">Patients</router-link>
        <router-link v-if="token" class="navbar-item" to="/calendar">Appointments</router-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <router-link v-if="!token" class="button has-background-success" to="/register">Doctor Register</router-link>
            <router-link v-if="!token" class="button has-background-warning" to="/login">Doctor Log in</router-link>
            <a @click="logout" v-if="token" class="button has-background-danger" to="/login">Log Out</a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      isActive: false,
      token: localStorage.getItem('token')
    };
  },
  methods: {
    toggleMenu() {
      this.isActive = !this.isActive;
    },
    logout() {
      localStorage.clear()
      window.location = ('/')

    }
  },
};
</script>

<style scoped>
.navbar {
  height: 70px;
  padding: 10px;
}
</style>