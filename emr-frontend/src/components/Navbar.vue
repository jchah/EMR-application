<template>
  <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        <img src="../assets/LogoCropped.png" alt="Logo">
      </a>
      <a role="button" class="navbar-burger" :class="{'is-active': isActive}" aria-label="menu" aria-expanded="false" @click="toggleMenu">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div class="navbar-menu" :class="{'is-active': isActive}" id="navMenu">
      <div class="navbar-start">
        <router-link class="navbar-item" to="/">Dashboard</router-link>
        <router-link class="navbar-item" to="/patients">Patients</router-link>
        <router-link class="navbar-item" to="/test-dashboard">Test Dashboard</router-link>
        <router-link class="navbar-item" to="/calendar">Appointments</router-link>

        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">Settings</a>
          <div class="navbar-dropdown">
            <a class="dropdown-item">User</a>
            <a class="dropdown-item">Theme</a>
            <hr class="navbar-divider">
            <a class="dropdown-item">Report an issue</a>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <router-link class="button has-background-success" to="/register">Register</router-link>
            <router-link class="button has-background-warning" to="/login">Log in</router-link>
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
    };
  },
  methods: {
    toggleMenu() {
      this.isActive = !this.isActive;
    },
  },
};
</script>

<style scoped>
.navbar {
  height: 70px;
  padding: 10px;
}

.head {
  margin-top: 70px;
}
</style>
