<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <a class="navbar-brand fw-bold text-primary" href="#">📰 DAILY NEWS 🌟</a>
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
            <router-link class="nav-link" to="/add">📝 Enregistrer un flux</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/">📜 Liste des flux</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/preferences">⚙️ Préférences</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
};
</script>

<style scoped>
.navbar {
  background-color: #f8f9fa;
  border-bottom: 2px solid #ccc;
}

.navbar-brand {
  font-size: 1.5rem;
  color: #007bff;
  transition: color 0.3s ease;
}

.navbar-brand:hover {
  color: #0056b3;
}

.navbar-nav .nav-link {
  color: #343a40;
  font-size: 1.1rem;
  font-weight: 500;
  transition: color 0.3s ease, transform 0.2s ease;
}

.navbar-nav .nav-link:hover {
  color: #28a745;
  transform: scale(1.05);
}

.navbar-nav {
  color: #343a40;
}

.navbar-nav .nav-item {
  margin-right: 15px;
}
</style>
