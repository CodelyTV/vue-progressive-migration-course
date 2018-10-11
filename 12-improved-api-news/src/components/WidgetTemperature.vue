<template>
  <div>
    <select v-model="query" v-on:change="findWeather">
        <option selected="selected">Barcelona</option>
        <option>Madrid</option>
        <option>Murcia</option>
      </select>
    <p>Temp: {{ temp }} | Max: {{ temp_max }} | Min: {{ temp_min }}</p>
  </div>
</template>

<script>

import WeatherApiService from '../services/WeatherApiService.js'

const API_KEY = '627eb53a00b46c56672e5fef2aa41986'
const service = new WeatherApiService(API_KEY)

const DEFAULT_QUERY='Barcelona'

export default {
   data: function() {
    return {
      query: DEFAULT_QUERY,
      temp: 0,
      temp_max: 0,
      temp_min: 0,
    }
   },
  created: function () {
    service.findWeather(DEFAULT_QUERY)
      .then(this.setWeatherData)
  },
  methods: {
    findWeather: function() {
      service.findWeather(this.query)
        .then(this.setWeatherData)
    },
    setWeatherData: function({ temp, temp_max, temp_min }) {
      this.temp = temp
      this.temp_max = temp_max
      this.temp_min = temp_min
    }
  }
}
</script>