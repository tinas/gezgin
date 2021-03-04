import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

axios.defaults.baseURL = 'http://localhost:3000'

const Mutations = {
  SET_PASSENGER_ID: 'SET_PASSENGER_ID',
  SET_PASSENGER_NAME: 'SET_PASSENGER_NAME',
  SET_ORIGIN_PARKING_UNIT: 'SET_ORIGIN_PARKING_UNIT',
  SET_BOOKING_HISTORY: 'SET_BOOKING_HISTORY'
}

const Actions = {
  FETCH_PARKING_UNIT_BY_CODE: 'fetchParkingUnitByCode',
  SET_ORIGIN_PARKING_UNIT: 'setOriginParkingUnit'
}

export default new Vuex.Store({
  state: {
    passengerId: '',
    passengerName: '',
    originParkingUnit: null,
    bookingHistory: []
  },
  mutations: {
    [Mutations.SET_PASSENGER_ID](state, passengerId) {
      state.passengerId = passengerId
    },
    [Mutations.SET_PASSENGER_NAME](state, name) {
      state.passengerName = name
    },
    [Mutations.SET_ORIGIN_PARKING_UNIT](state, parkingUnit) {
      state.originParkingUnit = parkingUnit
    },
    [Mutations.SET_BOOKING_HISTORY](state, bookingHistory) {
      state.bookingHistory = bookingHistory
    }
  },
  actions: {
    setOriginParkingUnit({commit}, parkingUnit) {
      commit(Mutations.SET_ORIGIN_PARKING_UNIT, parkingUnit)
    },
    async fetchCurrentBooking({state, commit, dispatch}) {
      const request = await axios.get(`/passengers/${state.passengerId}`)

      if (!request.data.currentBooking) return

      const parkingUnit = await dispatch(
        Actions.FETCH_PARKING_UNIT_BY_CODE,
        request.data.currentBooking.parkingUnit.code
      )

      commit(Mutations.SET_ORIGIN_PARKING_UNIT, parkingUnit)

      return request.data.currentBooking
    },
    async fetchBookings({state, commit}) {
      const request = await axios.get(`/passengers/${state.passengerId}`)

      commit(Mutations.SET_BOOKING_HISTORY, request.data.bookings?.reverse())
    },

    async fetchParkingUnitByCode({state}, parkingUnitCode) {
      try {
        const parkingUnit = await axios.get(`/parking-units/${parkingUnitCode}`)

        return parkingUnit.data[0]
      } catch (e) {
        throw e
      }
    },

    async startBooking({state, dispatch}, parkingUnitId) {
      await axios.post(`/passengers/${state.passengerId}/current-booking`, {
        parkingUnitId
      })

      const parkingUnit = await axios.patch(`/parking-units/${parkingUnitId}/state`, {state: 1})

      dispatch(Actions.SET_ORIGIN_PARKING_UNIT, parkingUnit)
    },
    async finishBooking({state}, {destinationParkingUnit, totalPrice}) {
      const vehicleId = state.originParkingUnit.vehicle._id

      await axios.patch(`/parking-units/${state.originParkingUnit._id}`, {
        vehicleType: state.originParkingUnit.vehicleType
      })

      await axios.patch(`/parking-units/${destinationParkingUnit._id}`, {
        vehicleId,
        vehicleType: destinationParkingUnit.vehicleType
      })

      await axios.patch(`/parking-units/${destinationParkingUnit._id}/state`, {state: 0})

      const booking = await axios.post(`/passengers/${state.passengerId}/bookings`, {
        destinationId: destinationParkingUnit.station,
        totalPrice
      })

      return booking
    },

    // Account
    async createPassenger({commit}, passenger) {
      const request = await axios.post('/passengers', passenger)

      commit(Mutations.SET_PASSENGER_ID, request.data._id)
      commit(Mutations.SET_PASSENGER_NAME, request.data.name)
    },
    async login({commit}, email) {
      const request = await axios.post('/passengers/login', {email})

      const passenger = request.data[0]
      if (!passenger) return

      commit(Mutations.SET_PASSENGER_ID, passenger._id)
      commit(Mutations.SET_PASSENGER_NAME, passenger.name)
    },
    logout({commit}) {
      commit(Mutations.SET_PASSENGER_ID, null)
      commit(Mutations.SET_PASSENGER_NAME, null)
      commit(Mutations.SET_ORIGIN_PARKING_UNIT, null)
      commit(Mutations.SET_BOOKING_HISTORY, null)
    }
  },
  modules: {}
})
