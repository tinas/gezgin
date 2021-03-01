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
  FETCH_PARKING_UNIT_BY_CODE: 'fetchParkingUnitByCode'
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

      const bookings = request.data.bookings
      commit(Mutations.SET_BOOKING_HISTORY, bookings)

      return bookings?.reverse()
    },
    /* eslint-disable */
    async fetchParkingUnitByCode({commit}, parkingUnitCode) {
      const request = await axios.get(`/parking-units/${parkingUnitCode}`)

      return request.data[0]
    },
    /* eslint-enable */
    async startBooking({state, commit, dispatch}, parkingUnitCode) {
      const parkingUnit = await dispatch(Actions.FETCH_PARKING_UNIT_BY_CODE, parkingUnitCode)

      commit(Mutations.SET_ORIGIN_PARKING_UNIT, parkingUnit)

      await axios.post(`/passengers/${state.passengerId}/current-booking`, {
        parkingUnitId: parkingUnit._id
      })
    },
    async finishBooking({state, dispatch}, {parkingUnitCode, totalPrice}) {
      const vehicleId = state.originParkingUnit.vehicle._id
      const destinationParkingUnit = await dispatch(Actions.FETCH_PARKING_UNIT_BY_CODE, parkingUnitCode)

      if (!destinationParkingUnit) return

      await axios.patch(`/parking-units/${state.originParkingUnit._id}`, {
        vehicleType: state.originParkingUnit.vehicleType
      })

      await axios.patch(`/parking-units/${destinationParkingUnit._id}`, {
        vehicleId,
        vehicleType: destinationParkingUnit.vehicleType
      })

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
