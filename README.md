MonosChinos SCRAPPER ![Licence](https://img.shields.io/npm/l/monoschinos-api) ![Version](https://img.shields.io/npm/v/monoschinos-api) ![Known Vulnerabilities](https://snyk.io/test/github/mixdevcode/monoschinos-api/badge.svg)
============
[![NPM](https://nodei.co/npm/monoschinos-api.png)](https://nodei.co/npm/monoschinos-api/)

Librería Node.js para obtener información del sitio `https://monoschinos2.com/` utilizando el método de Web-Scraping.

Instalación
============
```sh
npm install monoschinos-api
```

Uso
============
Una vez el paquete está instalado, puedes importar la librería utilizando "require":

```js
const monoschinos = require('monoschinos-api');
```

o utilizando "import":

```js
import * as monoschinos from 'monoschinos-api';
```

## Funciones
#### searchAnime(params)

|Params|Type|
|-|-|
|`query`|string|

```js
import { searchAnime } from 'monoschinos-api';

searchAnime("Black Clover").then((result) => {
  console.log(result);
});
```

###### Respuesta

Una lista JSON que contiene todos los animes encontrados utilizando el `query` especificado.

```js
[
  {
    title: 'Squishy! Black Clover',
    type: 'Corto',
    year: 2019,
    cover: 'https://monoschinos2.com/thumbs/imagen/squishy-black-clover.png?v=1.5',
    url: 'https://monoschinos2.com/anime/squishy-black-clover-sub-espanol'
  }
  ...
]
```

#### getAnimeInfo(params)

|Params|Type|
|-|-|
|`animeId`|string|

> **Note** el animeId es obtenido a través de la función `searchAnime` o removiendo `https://monoschinos2.com/anime/` de la URL de un anime.
```js
import { getAnimeInfo } from 'monoschinos-api';

getAnimeInfo("chainsaw-man").then((result) => {
  console.log(result);
});
```

###### Respuesta

Un objeto JSON que contiene la información del anime solicitado con el `animeId` especificado.

```js
{
  title: 'Chainsaw Man',
  alternative_title: 'El pibe motosierra',
  status: 'Finalizado',
  cover: 'https://monoschinos2.com/assets/img/serie/portada/chainsaw-man-1663804720.jpg',
  synopsis: 'Denji tiene un sueño simple: vivir una vida feliz y pacífica, pasando...',
  genres: [ 'Acción', 'Aventura', 'Shonen' ],
  episodes: 12,
  url: 'https://monoschinos2.com/anime/chainsaw-man'
}
```

#### getLatest()

```js
import { getLatest } from 'monoschinos-api';

getLatest().then((result) => {
  console.log(result);
});
```

###### Respuesta

Una lista JSON que contiene los últimos capítulos subidos al sitio web.

```js
[
  {
    title: 'Kage no Jitsuryokusha ni Naritakute! 1080p',
    chapter: 16,
    type: 'Anime',
    cover: 'https://monoschinos2.com/thumbs/portada/kage-no-jitsuryokusha-ni-naritakute-1080p-1671334662.jpg?v=1.5',
    url: 'https://monoschinos2.com/ver/kage-no-jitsuryokusha-ni-naritakute-1080p-episodio-16'
  }
  ...
]
```

#### getOnAir()

```js
import { getOnAir } from 'monoschinos-api';

getOnAir().then((result) => {
  console.log(result);
});
```

###### Respuesta

Una lista JSON con todos los animes en emisión del sitio.

```js
[
  {
    title: 'Majutsushi Orphen Hagure Tabi: Urbanrama-hen',
    type: 'Anime',
    year: 2023,
    cover: 'https://monoschinos2.com/thumbs/imagen/majutsushi-orphen-hagure-tabi-urbanrama-hen-1674048045.jpg?v=1.5',
    url: 'https://monoschinos2.com/anime/majutsushi-orphen-hagure-tabi-urbanrama-hen-sub-espanol'
  }
  ...
]
```

#### getCalendar()

```js
import { getCalendar } from 'monoschinos-api';

getCalendar().then((result) => {
  console.log(result);
});
```

###### Respuesta

Una lista JSON con la programación semanal.

```js
[
  {
    day: 'Lunes',
    animes: [
        {
          title: 'Cool Doji Danshi',
          chapter: 15,
          synopsis: 'Son chicos guapos que son geniales pero un poco difíciles...',
          cover: 'https://monoschinos2.com/thumbs/imagen/cool-doji-danshi-1663796951.jpg?v=1.5',
          genres: [ 'Comedia' ]
        }
        ...
    ]
  }
  ...
]
```

## TODO
 - [ ] Modificar las funciones en caso de existir una paginación en el sitio web.

## Contribuyentes

<table>
  <tr>
    <td>
      <img alt="MixDevCode" src="https://avatars.githubusercontent.com/u/66272629?v=4&s=117" width="117">
    </td>
  </tr>
  <tr>
    <td>
      <a href="https://github.com/MixDevCode">MixDevCode</a>
    </td>
  </tr>
</table>
