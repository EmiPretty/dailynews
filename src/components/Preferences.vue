<template>
  <div class="container mt-4">
    <h2 class="mb-3 text-primary">Actualités enregistrées 📰</h2>

    <input 
      type="text" 
      v-model="searchTerm" 
      class="form-control mb-3 border-primary" 
      placeholder="🔍 Rechercher dans les actualités enregistrées..." 
    />

    <div v-if="filteredNews.length === 0" class="alert alert-warning text-center">Aucune actualité correspondante trouvée. 😞</div>
    <div v-else>
      <div v-for="(newsItem, index) in filteredNews" :key="index" class="card mb-3 shadow-sm">
        <div class="card-body">
          <h3 class="card-title text-info">
            <a :href="newsItem.link" target="_blank" rel="noopener noreferrer" class="text-decoration-none">{{ newsItem.title }}</a>
          </h3>
          <img v-if="newsItem.imageUrl" :src="newsItem.imageUrl" alt="Image de l'actualité" class="img-fluid rounded mb-2" />
          <p class="card-text" v-html="newsItem.description"></p>
          <button @click="confirmRemoveFromPreferences(index)" class="btn btn-danger">❌ Supprimer</button>
        </div>
      </div>
    </div>

    <h2 class="mt-4 text-success">Flux enregistrés 📡</h2>
    <div v-if="savedFeedPreferences.length === 0" class="alert alert-info text-center">Aucun flux enregistré pour le moment. 🌱</div>
    <div v-else>
      <ul class="list-group">
        <li v-for="(feed, index) in savedFeedPreferences" :key="index" class="list-group-item d-flex justify-content-between align-items-center">
          <span>{{ feed.title }} 📎 : <a :href="feed.url" target="_blank" rel="noopener noreferrer" class="text-decoration-none text-success">{{ feed.url }}</a></span>
          <button @click="confirmRemoveFromFeedPreferences(index)" class="btn btn-danger btn-sm">❌ Supprimer</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Preferences',
  data() {
    return {
      savedNews: [],
      savedFeedPreferences: [],
      feeds: [],
      searchTerm: '',
    };
  },
  created() {
    this.loadPreferences();
    this.loadFeedPreferences();
  },
  watch: {
    savedNews: {
      handler(newVal) {
        localStorage.setItem('savedNews', JSON.stringify(newVal));
      },
      deep: true
    },
    savedFeedPreferences: {
      handler(newVal) {
        localStorage.setItem('savedFeedPreferences', JSON.stringify(newVal));
      },
      deep: true
    }
  },
  computed: {
    filteredNews() {
      const term = this.searchTerm.toLowerCase().trim();
      if (!term) {
        return this.savedNews;
      }
      return this.savedNews.filter(newsItem => {
        const title = newsItem.title.toLowerCase();
        const descriptionText = newsItem.description ? this.stripHtml(newsItem.description).toLowerCase() : '';
        return title.includes(term) || descriptionText.includes(term);
      });
    }
  },
  methods: {
    loadPreferences() {
      const savedFeeds = localStorage.getItem('rssFeeds');
      if (savedFeeds) {
        this.feeds = JSON.parse(savedFeeds);
      }
    },
    loadFeedPreferences() {
      const savedFeedsPref = localStorage.getItem('savedFeedPreferences');
      if (savedFeedsPref) {
        this.savedFeedPreferences = JSON.parse(savedFeedsPref);
      }
    },
    confirmRemoveFromPreferences(index) {
      const confirmDelete = confirm("Êtes-vous sûr de vouloir supprimer cette actualité ?");

      if (confirmDelete) {
        this.removeFromPreferences(index);
      }
    },
    confirmRemoveFromFeedPreferences(index) {
      const confirmDelete = confirm("Êtes-vous sûr de vouloir supprimer ce flux ?");

      if (confirmDelete) {
        this.removeFromFeedPreferences(index);
      }
    },
    removeFromPreferences(index) {
      this.savedNews.splice(index, 1);
    },
    removeFromFeedPreferences(index) {
      this.savedFeedPreferences.splice(index, 1);
    },
    stripHtml(html) {
      let doc = new DOMParser().parseFromString(html, 'text/html');
      return doc.body.textContent || "";
    }
  }
};
</script>

<style scoped>
/* Custom styles to enhance the UI */
.container {
  font-family: 'Arial', sans-serif;
}

.text-primary {
  color: #007bff;
}

.text-success {
  color: #28a745;
}

.text-info {
  color: #17a2b8;
}

.card-body {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
}

.card-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #007bff;
}

.card-title a {
  text-decoration: none;
}

.card-title a:hover {
  color: #0056b3;
}

.card-text {
  font-size: 1.1rem;
  color: #333;
}

button {
  font-size: 1rem;
  padding: 8px 15px;
  border-radius: 5px;
}

button:hover {
  background-color: #dc3545;
  color: white;
}

input[type="text"] {
  border-radius: 5px;
}

.list-group-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
}

.alert {
  font-size: 1.2rem;
  text-align: center;
  border-radius: 10px;
}
</style>
