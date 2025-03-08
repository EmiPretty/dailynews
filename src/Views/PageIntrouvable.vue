<template>
  <div class="container text-center mt-5">
    <h1 class="display-4 text-danger">404 - Page introuvable</h1>
    <p class="lead">La page que vous recherchez n'existe pas.</p>
    <router-link to="/" class="btn btn-primary mt-3">Retour à l'accueil</router-link>
  </div>
</template>

<script>
export default {
  name: 'PageIntrouvable',
};
</script>
