import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const register = r => require.ensure([], () => r(require('@/page/register')), 'register');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const caffeinelist = r => require.ensure([], () => r(require('@/page/caffeinelist')), 'caffeinelist');
const addcaffeine = r => require.ensure([], () => r(require('@/page/addcaffeine')), 'addcaffeine');
const userset = r => require.ensure([], () => r(require('@/page/userset')), 'userset');
const analysis = r => require.ensure([], () => r(require('@/page/analysis')), 'analysis');
const explain = r => require.ensure([], () => r(require('@/page/explain')), 'explain');

const routes = [
    {
        path: '/',
        component: login
    },
    {
        path: '/register',
        component: register
    },
    {
        path: '/manage',
        component: manage,
        children: [{
            path: '',
            component: home,
            meta: [],
        }, {
            path: '/caffeinelist',
            component: caffeinelist,
            meta: ['咖啡记录'],
        }, {
            path: '/addcaffeine',
            component: addcaffeine,
            meta: ['添加数据'],
        }, {
            path: '/userset',
            component: userset,
            meta: ['账户设置'],
        }, {
            path: '/analysis',
            component: analysis,
            meta: ['数据分析'],
        }, {
            path: '/explain',
            component: explain,
            meta: ['说明'],
        }]
    }
]

export default new Router({
    routes,
    strict: process.env.NODE_ENV !== 'production',
})