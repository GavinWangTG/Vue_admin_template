import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import globalData from './modules/globalData'
import user from './modules/user'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
      globalData
  },
  getters
})

export default store
