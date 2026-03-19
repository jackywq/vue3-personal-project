export default [
  {
    path: '/dept',
    name: 'Dept',
    component: () => import('@/views/dept/index.vue'),
    meta: { title: '部门管理', icon: 'Connection', requiresAuth: true }
  }
];
