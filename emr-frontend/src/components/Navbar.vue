<template>
  <nav class="navbar" role="navigation" aria-label="main navigation" style="height: 100px">
    <div class="navbar-brand">
      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">

      <div class="navbar-start">
        <a class="navbar-item navbar-logo">
          <img src="../assets/LogoCropped.png">
        </a>
        <router-link class="navbar-item has-text-white" to="/">
          Dashboard
        </router-link>
        <router-link class="navbar-item has-text-white" to="/patients">
          Patients
        </router-link>
        <router-link class="navbar-item has-text-white" to="/calendar">
          Appointments
        </router-link>
        <div class="navbar-item is-hoverable has-dropdown">
          <a class="navbar-link has-text-white">
            Settings
          </a>
          <div class="navbar-dropdown">
            <a class="navbar-item">
              User
            </a>
            <a class="navbar-item">
              Theme
            </a>
            <hr class="navbar-divider">
            <a class="navbar-item">
              Report an issue
            </a>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button has-background-success">
              Sign up
            </a>
            <a class="button has-background-warning">
              Log in
            </a>
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
    const items = document.querySelector('.navbar-dropdown')

    burgerIcon.addEventListener('click', () => {
      burgerIcon.classList.toggle('is-active');
      navbarMenu.classList.toggle('is-active');
    });

    dropdown.addEventListener('click', () => {
      if(document.body.clientWidth <= 1024) {
        items.classList.toggle('show-me')
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

<style scoped>
/* .navbar-logo {
  padding-left: 30px;
  padding-right: 30px;
}

.navbar-menu {
  transition: all 0.3s ease;
}

.has-text-white {
  color: white !important;
}

.navbar-burger {
display:none;
} */

.navbar {
  background-color: #333;
  color: white;
  padding: 20px;
}

.navbar-item:hover {
  background-color: #555;
}

@media screen and (max-width: 1024px) {
  .navbar-dropdown {
    display: none;
  }
}

.show-me {
  display: block;
}

.grey-background {
  background-color: #555;
}
</style>
