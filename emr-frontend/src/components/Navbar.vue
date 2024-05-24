<template>
  <nav class="navbar" role="navigation" aria-label="main navigation" style="height: 5rem; background-color: #555">
    <div class="navbar-brand">
      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">

      <div class="navbar-start">
        <a class="navbar-item navbar-logo" href="/">
          <img src="../assets/LogoCropped.png">
        </a>
        <router-link class="navbar-item" to="/">
          Dashboard
        </router-link>
        <div class="navbar-item is-hoverable has-dropdown">
          <router-link class="navbar-link navbar-item" to="/patients">
            Patients
          </router-link>
          <div class="navbar-dropdown">
            <router-link class="dropdown-item" to="/test-dashboard">
              Test Dashboard
            </router-link>
          </div>
        </div>
        <router-link class="navbar-item" to="/calendar">
          Appointments
        </router-link>
        
        <div class="navbar-item is-hoverable has-dropdown">
          <a class="navbar-link navbar-item">
            Settings
          </a>
          <div class="navbar-dropdown">
            <a class="dropdown-item">
              User
            </a>
            <a class="dropdown-item">
              Theme
            </a>
            <hr class="navbar-divider">
            <a class="dropdown-item">
              Report an issue
            </a>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <RouterLink class="button has-background-success" to="/register">
              Register
            </RouterLink>
            <RouterLink class="button has-background-warning" to="/login">
              Log in
            </RouterLink>
          </div>
        </div>
      </div>
    </div>

  </nav>
</template>

<script>
export default {
  mounted() {
    const burgerIcon = document.querySelector('.navbar-burger');
    const navbarMenu = document.querySelector('.navbar-menu');
    const dropdown = document.querySelector('.has-dropdown')
    const dropdownItems = document.querySelector('.navbar-dropdown')

    burgerIcon.addEventListener('click', () => {
      burgerIcon.classList.toggle('is-active');
      navbarMenu.classList.toggle('is-active');
    });

    dropdown.addEventListener('click', () => {
      if(document.body.clientWidth <= 1024) {
        dropdownItems.classList.toggle('show-me')
      }
    })

    dropdown.addEventListener('mouseover', () => {
      if(document.body.clientWidth > 1024) {
        dropdown.classList.toggle('grey-background')
        document.querySelector('.navbar-link').classList.toggle('grey-background')
      }
    })
  }
}
</script>
<style>

nav {
  background-color: #333;
  padding: 20px;
}


@media screen and (max-width: 1024px) {
  .navbar-dropdown {
    display: none;
  }
}

.navbar-item {
  color: white!important;
}

.dropdown-item {
  color: black;
}

.navbar-item:hover {
  color: black!important;
}
</style>
