# Preguntas desde backend

## ¿Cual sería la manera correcta de gestionar el "estado" de la app?

Lo interesante de nuestro proyecto es que hemos sido capaces de sacar la lógica de nuestra aplicación (los servicios) fuera del código vue (fuera del código de la interfaz)

Para ello hemos montado un sistema "rudimentario" (pero funcional) con el que encapsular los métodos con los que pedir los datos y el "almacenaje" de dichos datos

El siguiente paso natural de nuestra app sería utilizar [VueX](https://vuex.vuejs.org/) (o similar) para gestionar el estado de nuestra app

## async await

La declaracicón [`async`](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/funcion_asincrona) define una función asíncrona que:
- Devuelve siempre una promesa
- Permite utilizar dentro `await` asociar a una variable el resultado de una operación asíncrona (cuando llegue)

Básicamente con el [tandem `async-await`](https://developers.google.com/web/fundamentals/primers/async-functions) podemos expresar operaciones asíncronas como una sintaxis como si fueran operaciones síncronas

Internamente `async-await` utiliza generator para permitirnos poder expresar promesas de esta manera. 

Más detalles aqui:
- [Async/Await Specification](https://tc39.github.io/ecmascript-asyncawait/)
- [How JavaScript Async/Await Works Under the Hood](https://medium.com/siliconwat/how-javascript-async-await-works-3cab4b7d21da)

## El objeto `window`

El objeto global `window` hay que utilizarlo con cuidado para no caer en la "polución" del mismo y aumentar las probabilidades de colisión con otras apps que utilizen también este objeto global

Más info al respecto:
- [What does it mean global namespace would be polluted?](https://stackoverflow.com/questions/8862665/what-does-it-mean-global-namespace-would-be-polluted)
- [Writing modular JavaScript without polluting the global namespace](https://marcofranssen.nl/writing-modular-javascript-without-polluting-the-global-namespace/)
- [Use Cases for JavaScript's IIFEs](https://mariusschulz.com/blog/use-cases-for-javascripts-iifes)

## Gestión de las API keys

En nuestra app estamos gestionando directamente las peticiones a una API externa para lo cual necesitamos gestionar desde el cliente las API keys. Y claro, estas API keys cualquieras las puede ver en el código 

Lo suyo sería que fuera nuestro backend el que gestionara estas peticiones a API's externas y que esta gestión de la API key se hiciera desde el servidor (así de entrada ya no se podrían ver estas claves desde cliente)

Luego podríamos montar un sistema de autentificación para que sólo usuarios autorizados (previo registro por ejemplo) pudieran acceder a estas URL's (y por ende a estos datos externos → uso de API key)

Lo bueno de haber sacado la lógica de la app (peticiones externas) fuera de Vue es que podemos cambiar la manera de obtener los datos sin que tengamos que tocar nuestro código Vue