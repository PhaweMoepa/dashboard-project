import Vue from 'vue';
import Router from 'vue-router';

// Import your components
import Home from '../components/Home.vue';
import About from '../components/About.vue';
import Contact from '../components/Contact.vue';

Vue.use(Router);

export default new Router({
  mode: 'history', // Use history mode to avoid hash-based URLs
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    }
  ]
});
