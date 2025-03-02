<template>
  <div class="container mt-4">
    <h2 class="text-center mb-4">La liste des Flux RSS</h2>
    <ul v-if="feeds.length > 0" class="list-group">
      <li
        v-for="(feed, index) in feeds"
        :key="index"
        class="list-group-item d-flex justify-content-between align-items-center">
        <span @click="showNews(index)" class="text-primary fw-bold cursor-pointer underline hover-green">
          {{ feed.title }}
        </span>
        <div>
          <button @click="editFeed(index)" class="btn btn-sm btn-outline-primary me-2">
            Modifier
          </button>
          <button @click="deleteFeed(index)" class="btn btn-sm btn-outline-danger">
            Supprimer
          </button>
        </div>
      </li>
    </ul>
    <div v-else class="alert alert-info text-center mt-3">
      Aucun flux RSS ajouté pour le moment.
    </div>
  </div>
</template>

<script>
import RssForm from './RssForm.vue';

export default {
  name: 'RssList',
  components: {
    RssForm,
  },
  data() {
    return {
      feeds: [],
      selectedFeed: { title: '', url: '' },
      formTitle: "Ajouter un flux RSS",
    };
  },
  created() {
    const savedFeeds = localStorage.getItem('rssFeeds');
    if (savedFeeds) {
      this.feeds = JSON.parse(savedFeeds);
    }
  },
  watch: {
    feeds: {
      handler(newVal) {
        localStorage.setItem('rssFeeds', JSON.stringify(newVal));
      },
      deep: true,
    },
  },
  methods: {
    addOrUpdateFeed(newFeed) {
      if (this.selectedFeed.title !== "" && this.selectedFeed.url !== "") {
        const objIndex = this.feeds.findIndex(
          (obj) => obj.title === this.selectedFeed.title && obj.url === this.selectedFeed.url
        );
        this.feeds[objIndex].title = newFeed.title;
        this.feeds[objIndex].url = newFeed.url;
        this.selectedFeed = { title: '', url: '' };
        this.formTitle = "Ajouter un flux RSS";
      } else {
        this.feeds.push(newFeed);
      }
      this.$router.push(`/`);
    },
    editFeed(index) {
      this.$router.push({ path: '/add', query: { index } });
    },
    deleteFeed(index) {
      if (confirm('Êtes-vous sûr de vouloir supprimer ce flux ?')) {
        this.feeds.splice(index, 1);
      }
    },
    showNews(index) {
      this.$router.push(`/news/${index}`);
    },
  },
};
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
.underline {
  text-decoration: underline;
}

.hover-green:hover {
  color: green !important;
}

</style>
