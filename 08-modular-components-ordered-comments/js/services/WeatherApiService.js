export default class WeatherApiService {
	constructor(api_key) {
  	this.getUrlApiWeatherSearch = this.getUrlApiWeatherSearch.bind(this, api_key)
  }
  findWeather(location) {
  	const url = this.getUrlApiWeatherSearch(location)
    return axios.get(url)
      .then(({data}) => data)
      .then(({ main }) => main)
  }
  getUrlApiWeatherSearch(api_key, location) {
    return `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${api_key}`
  }
}