# Identificadores UUID, Timestamps con Moment, y Axios para consumir APIs HTTP asíncronamente

[![Identificadores UUID, Timestamps con Moment, y Axios para consumir APIs HTTP asíncronamente](./img/cover-buenas-practicas.png)](https://pro.codely.tv/library/migrando-a-vuejs-progresivamente-desde-0)  

_El curso [Migrando a VueJS progresivamente desde 0](https://pro.codely.tv/library/migrando-a-vuejs-progresivamente-desde-0) está disponible a través de [CodelyTV](https://pro.codely.tv/)_

---

# Buenas prácticas

## Manejo de ID's

Generamos desde el cliente los ID's utilizando algún formato standard. En nuestro caso nos hemos definido un helper `HELPERS.guid` en `helpers/index.js` que nos va a devolver un ID con el formato [UUID](https://es.wikipedia.org/wiki/Identificador_%C3%BAnico_universal) distinto cada vez

Otra variante similar sería el formato [GUID](https://es.wikipedia.org/wiki/Identificador_%C3%BAnico_global)

En el curso de CodelyTV [CQRS: Command Query Responsibility Segregation](https://pro.codely.tv/library/cqrs-command-query-responsibility-segregation-3719e4aa/62554/about/) teneis una explicación de cómo esta generación de ID's en el cliente encaja con el patrón de arquitectura CQRS

## Manejo de Fechas

Para el manejo de fechas, vamos a utilizar el formato [timestamp](https://es.wikipedia.org/wiki/Marca_temporal). A partir de este valor, y utilizando la librería [moment.js](https://momentjs.com/) podemos mostrar la fecha con el formato que queramos

```js
moment().format('MMMM Do YYYY, h:mm:ss a'); // February 20th 2019, 9:05:39 am
moment().format('dddd');                    // Wednesday
moment().format("MMM Do YY");               // Feb 20th 19
moment().format('YYYY [escaped] YYYY');     // 2019 escaped 2019
moment().format();                          // 2019-02-20T09:05:39+01:00

moment("20111031", "YYYYMMDD").fromNow(); // 7 years ago
moment("20120620", "YYYYMMDD").fromNow(); // 7 years ago
moment().startOf('day').fromNow();        // 9 hours ago
moment().endOf('day').fromNow();          // in 15 hours
moment().startOf('hour').fromNow();       // 6 minutes ago
```


## Organización de scripts

Estructuramos un poco nuestros scripts para que se entienda un poco mejor la función de cada archivo

```html
<!-- VUE -->
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>

  <!-- HELPER LIBRARIES -->
  <script src="https://cdn.jsdelivr.net/npm/axios@0.18.0/dist/axios.min.js"></script>
  <script src="https://momentjs.com/downloads/moment.js"></script>
  <script src="js/helpers/index.js"></script>

  <!-- SERVICES -->
  <script src="js/WeatherApiService.js"></script>

  <!-- VUE APP -->
  <script src="js/widget-weather.js"></script> 
  <script src="js/components/CommentsItem.js"></script>
  <script src="js/components/CommentsList.js"></script>
  <script src="js/components/CommentsForm.js"></script>
  <script src="js/widget-comments.js"></script>
```

## Llamadas asíncronas con axios

Para manejar peticiones asíncronas los 2 métodos más populares diría que son:
- [`fetch`](https://developer.mozilla.org/es/docs/Web/API/Fetch_API) → Método nativo de Javascript
- [`axios`](https://github.com/axios/axios) → Librería externa que hay que instalar

Nos decantamos por axios por que es más sencilla de utilizar y más potente (y ahora mismo no nos supone un problema cargar una libreria externa)

`axios` nos va a devolver una [promesa](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Usar_promesas) representado la petición asíncrona. Cuando termine la petición se ejecutará el método pasado en el `.then()` con la respuesta de la petición

---

El código correspondiente a esta lección lo tienes disponible [aqui](https://github.com/CodelyTV/vue-progressive-migration-course/blob/master/07-IDS-timestamps)

