import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { Routes } from '@/router/types';
import store from '@/store/index';
import StartPage from '@/views/StartPage.vue';
import RegisterCooperation from '@/views/RegisterCooperation.vue';
import RegisterUser from '@/views/RegisterUser.vue';
import UserLogin from '@/views/UserLogin.vue';
import MainPage from '@/views/MainPage.vue';
import CooperationInfo from '@/views/CooperationInfo.vue';

const routes: RouteRecordRaw[] = [
  {
    path: Routes.StartPage,
    component: StartPage,
  },
  {
    name: Routes.UserLogin,
    path: Routes.UserLogin,
    component: UserLogin,
  },
  {
    path: Routes.RegisterCooperation,
    component: RegisterCooperation,
  },
  {
    path: Routes.RegisterUser,
    component: RegisterUser,
  },
  {
    path: Routes.MainPage,
    component: MainPage,
    children: [
      {
        path: Routes.Cooperation,
        component: CooperationInfo,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path === Routes.MainPage && !store.getters['userStore/loggedIn']) {
    next({ path: Routes.StartPage });
  } else {
    next();
  }
});

export default router;
