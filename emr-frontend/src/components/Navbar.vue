<template>
  <nav class="navbar has-background-primary-dark" role="navigation" aria-label="main navigation" style="height: 50px">
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
        <RouterLink class="navbar-item" to="/">
          Home
        </RouterLink>
        <RouterLink class="navbar-item" to="/patients">
          Patients
        </RouterLink>
        <RouterLink class="navbar-item" to="/appointments">
          Appointments
        </RouterLink>
        <RouterLink class="navbar-item" to="/test-dashboard">
          Tests
        </RouterLink>
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
  }
}
</script>
<style>

@media screen and (max-width: 1024px) {
  .navbar-dropdown {
    display: none;
  }
}
</style>
