import { createRouter, createWebHistory } from 'vue-router';
import employeeRoutes from './modules/employee';
import deptRoutes from './modules/dept';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: { hidden: true }
  },
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { title: '仪表盘', icon: 'Odometer', requiresAuth: true }
      },
      ...employeeRoutes,
      ...deptRoutes,
      {
        path: 'attendance',
        name: 'Attendance',
        component: () => import('@/views/attendance/index.vue'),
        meta: { title: '考勤管理', icon: 'Calendar', requiresAuth: true }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/dashboard'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// 白名单路由，不需要登录即可访问
const whiteList = ['/login', '/404', '/401'];

// 丰富路由守卫
router.beforeEach((to, from, next) => {
  // 1. 设置动态页面标题
  const defaultTitle = '管理系统';
  document.title = to.meta.title ? `${to.meta.title} - ${defaultTitle}` : defaultTitle;

  // 2. 从本地存储获取 token
  const token = localStorage.getItem('token');

  if (token) {
    // 3. 有 token 的情况
    if (to.path === '/login') {
      // 已登录且访问登录页，直接重定向到首页
      next({ path: '/' });
    } else {
      // 正常放行
      // 这里可以扩展：判断是否已获取用户信息，若未获取则在此拉取用户信息和动态路由
      next();
    }
  } else {
    // 4. 没有 token 的情况
    // 检查是否在白名单中，或者该路由没有强制要求认证 (根据之前的逻辑，没有明确 requiresAuth 也可以放行)
    if (whiteList.includes(to.path) || !to.meta.requiresAuth) {
      next(); // 放行
    } else {
      // 否则重定向到登录页，并携带原本要访问的路径，方便登录后跳回
      next(`/login?redirect=${encodeURIComponent(to.fullPath)}`);
    }
  }
});

// 全局后置钩子
router.afterEach((to, from) => {
  // 路由跳转完成后的操作
  // 例如：在这里关闭页面加载进度条 NProgress.done()
});

export default router;
