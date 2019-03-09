# Deploy

[![Deploy](./img/cover-deploy.png)](https://pro.codely.tv/library/migrando-a-vuejs-progresivamente-desde-0)  

_El curso [Migrando a VueJS progresivamente desde 0](https://pro.codely.tv/library/migrando-a-vuejs-progresivamente-desde-0) está disponible a través de [CodelyTV](https://pro.codely.tv/)_

---

# Deploy

Para generar la versión de producción hacemos

```
yarn build
```

Esto nos generará en la carpeta `dist` una versión de nuestro proyecto ya preparada para subirla a producción (para ser servida estáticamente a través de un servidor web)

Con [`now` de _zeist_](https://zeit.co/now) podemos hacer una subida rápida a producción a un servidor temporal 

Instalamos `now` globalmente con...

```
npm i -g now
```

Podemos configurar `now` para nuestro proyecto desde la raiz añadiendo un `now.json` como este...

Con este modulo ya disponible globalmente, nos podemos ir a la carpeta `dist` (con nuestra versión de producción generada por `yarn build`) y hacer sencillamente

```
now
```

Para poder hacer esta operación directamente desde la raíz [podemos definir](https://cli.vuejs.org/guide/deployment.html#now) un[ `now.json`](https://zeit.co/blog/now-json) como este...

```
```
{
  "name": "my-example-app",
  "type": "static",
  "static": {
    "public": "dist",
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  },
  "alias": "vue-example",
  "files": [
    "dist"
  ]
}
```
```


## Recursos

- [Deploy a Vue App con now](https://cli.vuejs.org/guide/deployment.html#now)

---

El código correspondiente a esta lección lo tienes disponible [aqui](https://github.com/CodelyTV/vue-progressive-migration-course/tree/master/11-api-news)

