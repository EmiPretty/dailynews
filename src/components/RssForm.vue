<template>
    <form @submit.prevent="handleSubmit" class="container mt-4 p-4 border rounded bg-light">
      <h2 class="mb-3">{{ formTitle }}</h2>
      <div class="mb-3">
        <label for="title" class="form-label">Titre :</label>
        <input type="text" id="title" v-model="title" class="form-control" required>
        <div v-if="errors.title" class="text-danger small">{{ errors.title }}</div>
      </div>
      <div class="mb-3">
        <label for="url" class="form-label">URL :</label>
        <input type="url" id="url" v-model="url" class="form-control" required>
        <div v-if="errors.url" class="text-danger small">{{ errors.url }}</div>
      </div>
      <button type="submit" class="btn btn-primary me-2">Enregistrer</button>
      <button type="button" v-if="!isFeedSaved" @click="saveToFeedPreferences" class="btn btn-secondary me-2">Enregistrer dans les préférences</button>
      <button type="button" v-if="isFeedSaved" @click="removeFromFeedPreferences" class="btn btn-danger">Supprimer des préférences</button>
    </form>
</template>

<script>
export default {
  name: 'RssForm',
  props: {},
  emits: ['save'],
  data() {
    return {
      title: '',
      url: '',
      errors: {
        title: '',
        url: '',
      },
      savedFeedPreferences: [],
      feeds: [],
      formTitle: "Ajouter un flux RSS",
    };
  },
  watch: {
    savedFeedPreferences: {
      handler(newVal) {
        localStorage.setItem('savedFeedPreferences', JSON.stringify(newVal));
      },
      deep: true,
    },
    '$route.query': {
      handler: 'loadFeedToEdit',
      immediate: true
    }
  },
  computed: {
    isFeedSaved() {
      if (!this.title || !this.url) return false;
      return this.savedFeedPreferences.some(item => item.title === this.title && item.url === this.url);
    }
  },
  created() {
    this.loadFeedPreferences();
    this.loadFeeds();
  },
  methods: {
    loadFeeds() {
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
    loadFeedToEdit() {
      const index = this.$route.query.index;
      if (index !== undefined) {
        const savedFeeds = localStorage.getItem('rssFeeds');
        if (savedFeeds) {
          const feeds = JSON.parse(savedFeeds);
          if (index >= 0 && index < feeds.length) {
            this.title = feeds[index].title;
            this.url = feeds[index].url;
            this.formTitle = "Modifier un flux RSS";
          }
        }
      } else {
        this.formTitle = "Ajouter un flux RSS";
        this.title = "";
        this.url = "";
      }
    },
    handleSubmit() {
      this.errors = { title: '', url: '' };
      let isValid = true;

      if (!this.title.trim()) {
        this.errors.title = 'Le titre est obligatoire.';
        isValid = false;
      }
      if (!this.url.trim()) {
        this.errors.url = 'L\'URL est obligatoire.';
        isValid = false;
      } else {
        try {
          new URL(this.url);
        } catch (error) {
          this.errors.url = 'L\'URL est invalide.';
          isValid = false;
        }
      }
      if (isValid) {
        const index = this.$route.query.index;
        if (index !== undefined) {
          const objIndex = this.feeds.findIndex(obj => obj.title === this.feeds[index].title && obj.url === this.feeds[index].url);
          this.feeds[objIndex].title = this.title;
          this.feeds[objIndex].url = this.url;
          localStorage.setItem('rssFeeds', JSON.stringify(this.feeds));
        } else {
          this.addOrUpdateFeed({ title: this.title, url: this.url });
        }
        this.$router.push(`/`);
      }
    },
    addOrUpdateFeed(newFeed) {
      this.feeds.push(newFeed);
      localStorage.setItem('rssFeeds', JSON.stringify(this.feeds));
    },
    saveToFeedPreferences() {
      if (!this.title || !this.url) return;
      const isDuplicate = this.savedFeedPreferences.some(item => item.title === this.title && item.url === this.url);
      if (!isDuplicate) {
        this.savedFeedPreferences.push({ title: this.title, url: this.url });
        alert('Flux enregistré dans les préférences !');
      } else {
        alert("Le flux est déjà enregistré dans les préférences.");
      }
    },
    removeFromFeedPreferences() {
      if (!this.title || !this.url) return;
      this.savedFeedPreferences = this.savedFeedPreferences.filter(item => !(item.title === this.title && item.url === this.url));
      alert("Flux supprimé des préférences.");
    }
  },
};
</script>
