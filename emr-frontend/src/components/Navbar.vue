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
        <a class="navbar-item has-text-white">
          Home
        </a>
        <a class="navbar-item has-text-white">
          Documentation
        </a>
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link has-text-white">
            More
          </a>
          <div class="navbar-dropdown">
            <a class="navbar-item">
              About
            </a>
            <a class="navbar-item">
              Jobs
            </a>
            <a class="navbar-item">
              Contact
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

    burgerIcon.addEventListener('click', () => {
      burgerIcon.classList.toggle('is-active');
      navbarMenu.classList.toggle('is-active');
    });
  }
}
</script>

<style scoped>
.navbar-logo {
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
}

@media screen and (max-width: 768px) {
  .navbar-menu {
    background-color: white;
  }
  .navbar-item,
  .navbar-link {
    color: black !important;
  }
  .navbar-burger {
    display: block;
    color: white;
  }
  .navbar-burger span {
    background-color: white;
  }
}
</style>
