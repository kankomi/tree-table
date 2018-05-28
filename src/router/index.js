import Vue from 'vue';
import Router from 'vue-router';
import TreeTableView from '@/views/TreeTableView';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TreeTableView',
      component: TreeTableView
    }
  ]
});
