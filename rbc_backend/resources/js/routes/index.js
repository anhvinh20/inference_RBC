// routes/index.js
import { createRouter, createWebHistory } from 'vue-router';

// Import các component trang
import RBCAnalysis from '../pages/rbc/Analysis.vue';
import About from '../pages/rbc/About.vue';
import Home from '../pages/rbc/Home.vue';

// Định nghĩa các route
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/analysis',
    name: 'analysis',
    component: RBCAnalysis
  },
  {
    path: '/about',
    name: 'about',
    component: About
  }
];

// Khởi tạo router
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: 'active-link'
});

export default router;