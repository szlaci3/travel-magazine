export default [
  { path: '/', redirect: '/company-setup' },
  {
    path: './company-setup',
    title: 'CSetup',
    component: './CompanySetup',
  },
  {
    path: './join-data/:id',
    title: 'JD',
    component: './JoinData',
  },
];
