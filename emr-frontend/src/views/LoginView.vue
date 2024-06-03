<template>
  <div class="section">
    <div class="container is-centered">
      <div class="columns is-centered">
        <div class="column is-one-third">
          <div class="card">
            <div class="card-content">
              <h1 class="title">Login</h1>
              <form>
                <div class="field">
                  <label class="label" for="email">Email:</label>
                  <input class="input" type="email" id="email" required>
                </div>
                <div class="field">
                  <label class="label" for="password">Password:</label>
                  <input class="input" type="text" id="password" required>
                </div>
                <button type="submit" class="button">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
</script>