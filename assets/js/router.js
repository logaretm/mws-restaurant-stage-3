import Router from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('./pages/Home'),
    meta: {
      breadcrumb: false,
      layout: 'default'
    }
  },
  {
    path: '/restaurant',
    name: 'restaurant',
    component: () => import('./pages/Restaurant'),
    meta: {
      breadcrumb: true,
      layout: 'split'
    }
  }
];

export default new Router({
  mode: 'history',
  routes
});
