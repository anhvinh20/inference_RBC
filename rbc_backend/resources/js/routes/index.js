// resources/js/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    // Thêm routes khác khi cần
    // {
    //     path: '/about',
    //     name: 'about',
    //     component: () => import('../pages/About.vue')
    // }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;