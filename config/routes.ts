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
    path: './edition/:id',
    title: 'Edition',
    component: './Edition',
  },
];
