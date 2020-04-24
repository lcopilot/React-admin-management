import store from 'store'

const USER_KEY = 'user_key'
const WEATHER_KEY = 'weather_key'

export default {
  saveWeather(nowWeather) {
    store.set(WEATHER_KEY, nowWeather)
  },
  getWeather() {
    return store.get(WEATHER_KEY) || ''
  },

  saveUser(user) {
    store.set(USER_KEY, user)
  },
  getUser() {
    return store.get(USER_KEY) || {}
  },
  removeUser() {
    store.remove(USER_KEY)
    // store.clearAll();
  }
}