import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';
import BlogPosts from '../views/BlogPosts.vue';
import AddPost from '../views/AddPost.vue';
import SinglePost from '../views/SinglePost.vue';
import EditPost from '../views/EditPost.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/posts',
    name: 'posts',
    component: BlogPosts,
  },
  {
    path: '/posts/new',
    name: 'add-post',
    component: AddPost,
  },
  {
    path: '/posts/:id',
    name: 'single-post',
    component: SinglePost,
  },
  {
    path: '/posts/:id/edit',
    name: 'edit-post',
    component: EditPost,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
