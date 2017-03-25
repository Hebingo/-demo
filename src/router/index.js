import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import Vuex from 'vuex'
Vue.use(Vuex)
import index from '@/components/index'
import jokeparticulars from '@/components/jokeParticulars'
import cross from '@/components/cross'
import picture from '@/components/picture'
import picparticulars from '@/components/picparticulars'


export default new Router({
  routes: [
    {
      path: '/index',
      name: 'index',
      component: index,
      children: [{
				path: 'cross',
				component: cross
			},{
				path: 'picture',
				component: picture
			},]
   }, 
    {
      path: '/jokeparticulars/:id', 
      name: 'jokeparticulars',
      component: jokeparticulars,
    },
    {
      path: '/picparticulars/:id', 
      name: 'picparticulars',
      component: picparticulars,
    },
    {
    	path:'/',
    	redirect:'/index/cross'
    }
  ]
})
