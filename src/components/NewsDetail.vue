<template>
  <div class="container mt-4">
    <div v-if="newsItem" class="card shadow-sm">
      <div class="card-body">
        <h2 class="card-title">{{ newsItem.title }}</h2>
        <img v-if="newsItem.imageUrl" :src="newsItem.imageUrl" alt="Image de l'actualité" class="img-fluid rounded mb-3" />
        <p v-html="newsItem.description" class="card-text"></p>
        <button class="btn btn-primary me-2" @click="saveToPreferences">Enregistrer pour plus tard</button>
        <router-link :to="{ path: `/news/${Index}` }" class="btn btn-secondary">Retour à la liste</router-link>
      </div>
    </div>
    <div v-else class="alert alert-danger">
      Actualité introuvable.
    </div>
  </div>
</template>

<script>
import { parseRssFeed } from '../services/rssService';

export default {
  name: 'NewsDetail',
  props: {
    Index: {
      type: [String, Number],
      required: true,
    },
    newsIndex: {
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {
      newsItem: null,
      feeds: []
    };
  },
  async created() {
    await this.loadNewsItem();
  },
  watch: {
    Index: "loadNewsItem",
    newsIndex: "loadNewsItem"
  },
  methods: {
    async loadNewsItem() {
      const savedFeeds = localStorage.getItem('rssFeeds');
      if (savedFeeds) {
        this.feeds = JSON.parse(savedFeeds);
      } else {
        this.newsItem = null;
        return;
      }

      const feed = this.feeds[parseInt(this.Index, 10)];

      if (!feed) {
        this.newsItem = null;
        return;
      }

      try {
          const newsItems = await parseRssFeed(feed.url);
          const index = parseInt(this.newsIndex, 10);
          if (isNaN(index) || index < 0 || index >= newsItems.length) {
              this.newsItem = null;
              return;
          }
        this.newsItem = newsItems[index];
        this.newsItem.feedUrl = feed.url;

      } catch (error) {
        console.error("Erreur lors du chargement de l'actualité :", error);
        this.newsItem = null;
      }
    },

    saveToPreferences() {
      if (!this.newsItem) return;
      let savedNews = JSON.parse(localStorage.getItem('savedNews') || '[]');
      const isDuplicate = savedNews.some(item => item.title === this.newsItem.title && item.link === this.newsItem.link);

      if (!isDuplicate) {
        savedNews.push(this.newsItem);
        localStorage.setItem('savedNews', JSON.stringify(savedNews));
        alert('Actualité enregistrée dans les préférences !');
      } else {
        alert('Actualité déjà enregistrée !');
      }
    },
  },
};
</script>

<style scoped>
.img-fluid {
  max-width: 100%;
  height: auto;
}
</style>
