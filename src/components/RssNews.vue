<template>
  <div class="container mt-4">
    <h2 class="mb-4 text-primary">Actualités de {{ feed ? feed.title : 'Chargement...' }}</h2>

    <div class="mb-3">
      <label for="news-limit" class="form-label">Nombre d'articles</label>
      <select id="news-limit" v-model="limit" @change="updateNewsLimit" class="form-select">
        <option value="10">10</option>
        <option value="50">50</option>
        <option value="100">100</option>
        <option value="all">Tous</option>
      </select>
    </div>

    <div v-if="loading" class="alert alert-info text-center">
      Chargement des actualités, un instant s'il vous plaît... ⏳
    </div>
    <div v-else-if="error" class="alert alert-danger text-center">
      Erreur : {{ error }} ⚠️
    </div>

    <div v-else>
      <div v-for="(item, index) in displayedNews" :key="index" class="news-item mb-4 p-4 border rounded shadow-lg bg-light">
        <h3 class="text-info">
          <a :href="item.link" target="_blank" rel="noopener noreferrer" class="text-decoration-none">
            {{ item.title }}
          </a>
        </h3>

        <div v-if="item.description">
          <img v-if="item.imageUrl" 
               :src="item.imageUrl" 
               :alt="item.title" 
               class="news-image img-fluid mb-3 rounded" 
               @error="item.imageUrl = null" 
               v-lazy>
          <p v-html="item.description" class="text-muted"></p>
        </div>

        <router-link :to="{ path: `/news/${Index}/${index}` }" class="btn btn-primary btn-sm">Voir les détails</router-link>
      </div>
    </div>

    <div v-if="!loading && displayedNews.length === 0" class="alert alert-warning text-center">
      Aucune actualité disponible pour ce flux. 😔
    </div>
  </div>
</template>

<script>
import { getRssFeed } from '../services/rss';

export default {
  name: 'RssNews',
  props: {
    Index: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      feed: null,
      newsItems: [],
      loading: false,
      error: null,
      limit: '10',
      displayedNews: []
    };
  },
  watch: {
    limit() {
      this.updateNewsLimit();
    }
  },
  async created() {
    await this.getFeeds();
    await this.fetchNews();
  },
  methods: {
    async getFeeds() {
      const savedFeeds = localStorage.getItem('rssFeeds');
      if (savedFeeds) {
        this.feed = JSON.parse(savedFeeds)[this.Index];
      }

      if (!this.feed) {
        this.error = 'Flux introuvable.';
        return;
      }
    },
    async fetchNews() {
      this.loading = true;
      this.error = null;
      this.newsItems = [];

      try {
        this.newsItems = await getRssFeed(this.feed.url);
        this.updateNewsLimit();
      } catch (err) {
        this.error = 'Échec du chargement des actualités : ' + err.message;
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    updateNewsLimit() {
      if (this.newsItems.length === 0) return [];
      const limit = this.limit === 'all' ? this.newsItems.length : parseInt(this.limit, 10);
      this.displayedNews = this.newsItems.slice(0, limit);
    }
  }
};
</script>

<style scoped>
.news-item {
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  background-color: #f8f9fa;
}

.news-image {
  width: 100%;
  height: auto;
  margin-bottom: 10px;
  display: block;
  object-fit: cover;
}

.news-item h3 {
  font-size: 1.3rem;
  color: #007bff;
  font-weight: bold;
}

.news-item p {
  font-size: 1rem;
  line-height: 1.6;
}

.news-item a:hover {
  color: #0056b3;
}

.news-item .btn-primary {
  font-size: 1.25rem;
  padding: 12px 20px; 
  border-radius: 5px; 
  height: auto;  
}

.news-item .btn-primary:hover {
  background-color: #fbfbfb;
  border-color: #0056b3;
}

.alert {
  font-size: 1.2rem;
  padding: 15px;
  text-align: center;
}

.alert-info {
  background-color: #e9f7fd;
  border-color: #b8daff;
}

.alert-danger {
  background-color: #f8d7da;
  border-color: #f5c6cb;
}

.alert-warning {
  background-color: #fff3cd;
  border-color: #ffeeba;
}

.form-select {
  border-radius: 5px;
}

</style>
