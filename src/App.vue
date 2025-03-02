<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand fw-bold" href="#">📰 DAILY NEWS</a>
        <button 
          class="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" to="/add">Enregistrer un flux</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/">Liste des flux</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/preferences">Préférences</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
#app {
  padding: 20px;
  font-family: sans-serif;
  max-width: 100%;
}

.navbar-nav .nav-link {
  color: black;
}

.navbar-nav .router-link-exact-active {
  text-decoration: underline;
  font-weight: bold;
  color: rgb(10, 0, 84);
}
</style>
