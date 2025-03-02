import Preferences from './components/Preferences.vue';
import FormulaireRss from './components/FormulaireRss.vue';
import { createRouter, createWebHistory } from 'vue-router';
import ListFlux from './components/ListFlux.vue';
import NewsDetail from './components/NewsDetail.vue';
import RssNews from './components/RssNews.vue';
import PageIntrouvable from './components/PageIntrouvable.vue';



const routes = [
  { path: '/', component: ListFlux },
  { path: '/add', component: FormulaireRss },
  { path: '/preferences', component: Preferences },
  { path: '/news/:Index', component: RssNews, props: true },
  { path: '/news/:Index/:newsIndex', component: NewsDetail, props: true },
  { path: '/:pathMatch(.*)*', component: PageIntrouvable },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;