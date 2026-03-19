export default [
  {
    path: '/employee',
    name: 'Employee',
    component: () => import('@/views/employee/index.vue'),
    meta: { title: '员工管理', icon: 'User', requiresAuth: true }
  }
];
