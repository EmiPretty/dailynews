import { createRouter, createWebHistory } from 'vue-router';
import RssList from './components/RssList.vue';
import RssNews from './components/RssNews.vue';
import NewsDetail from './components/NewsDetail.vue';
import NotFound from './components/PageNotFound.vue';
import Preferences from './components/Preferences.vue';
import RssForm from './components/RssForm.vue';


const routes = [
  { path: '/', component: RssList },
  { path: '/add', component: RssForm },
  { path: '/preferences', component: Preferences },
  { path: '/news/:Index', component: RssNews, props: true },
  { path: '/news/:Index/:newsIndex', component: NewsDetail, props: true },
  { path: '/:pathMatch(.*)*', component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;