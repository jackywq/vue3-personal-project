import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    userInfo: null,
    roles: []
  }),
  actions: {
    setToken(token) {
      this.token = token;
      localStorage.setItem('token', token);
    },
    logout() {
      this.token = '';
      this.userInfo = null;
      this.roles = [];
      localStorage.removeItem('token');
    }
  }
});
