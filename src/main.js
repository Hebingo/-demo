// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
Vue.use(MuseUI)
import VueResource from 'vue-resource'
Vue.use(VueResource);
import Vuex from 'vuex'
Vue.use(Vuex)
var store = new Vuex.Store({
	//状态，也就是保存数据的地方
	state: {
		numberFilter: function(data) {
			if(data >= 10000) {
				return(data / 10000).toFixed(1) + '万'

			} else {
				return data
			}
		}
	},
	mutations: {
		//font-end
		set_fe: function(state, data) {
			state.numberFilter = data
		}
	}
})
Vue.config.productionTip = false

Vue.filter('numberFilter', function(data) {
	if(data >= 10000) {
		return(data / 10000).toFixed(1) + '万'
	} else {
		return data
	}
})
export default {
	filters: {
		numberFilter: function(data) {
			if(data >= 10000) {
				return(data / 10000).toFixed(1) + '万'
			} else {
				return data
			}
		}
	}
}

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	MuseUI,
	VueResource,
	store,
	Vuex,
	template: '<App/>',
	components: {
		App
	}
})