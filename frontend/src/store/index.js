import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const Mutations = {
  SET_SELECTED_VEHICLE: 'SET_SELECTED_VEHICLE'
}

export default new Vuex.Store({
  state: {
    selectedVehicle: 'Bike'
  },
  mutations: {
    [Mutations.SET_SELECTED_VEHICLE](state, vehicle) {
      state.selectedVehicle = vehicle
    }
  },
  actions: {
    setSelectedVehicle({commit}, vehicle) {
      commit(Mutations.SET_SELECTED_VEHICLE, vehicle)
    }
  },
  modules: {}
})
