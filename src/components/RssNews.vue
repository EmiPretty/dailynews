<template>
  <div class="container mt-4">
    <h2 class="mb-4">News for {{ feed ? feed.title : 'Loading...' }}</h2>

    <div class="mb-3">
      <label for="news-limit" class="form-label">Number of news items</label>
      <select id="news-limit" v-model="limit" @change="fetchNews" class="form-select">
        <option value="10">10</option>
        <option value="50">50</option>
        <option value="100">100</option>
        <option value="all">All</option>
      </select>
    </div>

    <div v-if="loading" class="alert alert-info">Loading news...</div>
    <div v-else-if="error" class="alert alert-danger">{{ error }}</div>
    <div v-else>
      <div v-for="(item, index) in displayedNews" :key="index" class="news-item mb-4 p-3 border rounded shadow-sm">
        <h3><a :href="item.link" target="_blank" rel="noopener noreferrer" class="text-decoration-none text-dark">{{ item.title }}</a></h3>
        
        <div v-if="item.description">
          <img v-if="item.imageUrl" :src="item.imageUrl" alt="News Image" class="news-image img-fluid mb-3 rounded">
          <p v-html="item.description"></p>
        </div>
        
        <router-link :to="{ path: `/news/${Index}/${index}` }" class="btn btn-primary btn-sm">View Details</router-link>
      </div>
    </div>

    <div v-if="!loading && displayedNews.length === 0" class="alert alert-warning">
      No news available
    </div>
  </div>
</template>

<script>
import { parseRssFeed } from '../services/rssService';

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
      if (this.newsItems.length === 0) return [];
      const limit = this.limit === 'all' ? this.newsItems.length : parseInt(this.limit, 10);
      this.displayedNews = this.newsItems.slice(0, limit);
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
        this.error = 'Feed not found.';
        return;
      }
    },
    async fetchNews() {
      this.loading = true;
      this.error = null;
      this.newsItems = [];

      try {
        this.newsItems = await parseRssFeed(this.feed.url);
        const limit = this.limit === 'all' ? this.newsItems.length : parseInt(this.limit, 10);
        this.displayedNews = this.newsItems.slice(0, limit);
      } catch (err) {
        this.error = 'Failed to fetch news: ' + err.message;
        console.error(err);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.news-item {
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.news-image {
  max-width: 100%;
  height: auto;
  margin-bottom: 10px;
  display: block;
}
</style>
