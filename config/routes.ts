export default [
  { path: '/', redirect: '/dashboard' },
  {
    path: './dashboard',
    title: 'Dashboard',
    component: './Dashboard',
  },
  {
    path: './article/:id',
    title: 'Article',
    component: './Article',
  },
  {
    path: '*',
    title: '404',
    component: './404',
  },
];
